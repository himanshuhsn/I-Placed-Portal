from flask import redirect, request, render_template, Blueprint, session
from oauthlib.oauth2 import WebApplicationClient
import requests
import json

from sqlalchemy import false, true
from core.experience import check_admin 

# Internal imports
from core import user

auth_api = Blueprint('auth_api', __name__)

# OAuth 2 client setup
from config import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_DISCOVERY_URL
client = WebApplicationClient(GOOGLE_CLIENT_ID)

from flask_login import (
    current_user,
    login_required,
    login_user,
    logout_user,
)

@auth_api.route("isAdmin")
def is_admin():
    if check_admin(session.user_id):
        return True
    return False

@auth_api.route("loggedIn")
def is_logged_in():
    return {"status" : current_user.is_authenticated}

def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()

@auth_api.route("")
def index():
    return render_template("index.html")


@auth_api.route("analytics")
def analytics():
    if 'user_id' in session.keys():
        return render_template("analytics.html")
    else:
        return render_template("index.html")
    

@auth_api.route("experience")
def experience():
    if 'user_id' in session.keys():
        return render_template("form.html")
    else:
        return render_template("index.html")

@auth_api.route("search")
def search():
    if 'user_id' in session.keys():
        return render_template("search.html")
    else:
        return render_template("index.html")

@auth_api.route("home")
def home():
    if 'user_id' in session.keys():
        return render_template("home.html")
    else:
        return render_template("index.html")
    

@auth_api.route("admin")
def admin():
    if 'user_id' in session.keys() and is_admin:
        return render_template("admin.html")
    else:
        return render_template("index.html")


@auth_api.route("login")
def login():
    # Find out what URL to hit for Google login
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    # Use library to construct the request for Google login and provide
    # scopes that let you retrieve user's profile from Google
    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=request.base_url + "/callback",
        scope=["openid", "email", "profile"],
    )
    return redirect(request_uri)

@auth_api.route("login/callback")
def callback():
    # Get authorization code Google sent back to you
    code = request.args.get("code")
    # Find out what URL to hit to get tokens that allow you to ask for
    # things on behalf of a user
    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]
    # Prepare and send a request to get tokens! Yay tokens!
    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=request.base_url,
        code=code
    )
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )

    # Parse the tokens!
    client.parse_request_body_response(json.dumps(token_response.json()))
    # Now that you have tokens (yay) let's find and hit the URL
    # from Google that gives you the user's profile information,
    # including their Google profile image and email
    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)
    # You want to make sure their email is verified.
    # The user authenticated with Google, authorized your
    # app, and now you've verified their email through Google!
    if userinfo_response.json().get("email_verified"):
        unique_id = userinfo_response.json()["sub"]
        users_email = userinfo_response.json()["email"]
        users_name = userinfo_response.json()["given_name"]
    else:
        return "User email not available or not verified by Google.", 400
    # Create a user in your db with the information provided
    # by Google
    # print(unique_id, users_email, users_name)

    # Doesn't exist? Add it to the database.
    if not user.google_user.get_user(unique_id):
        user.google_user.create_user(unique_id, users_name, users_email)

    test_user = user.google_user(
        id_ = unique_id, 
        name = users_name,
        email = users_email
        )

    # Begin user session by logging the user in
    login_user(test_user)
    # Send user back to homepage
    return redirect("/")

@auth_api.route("logout")
@login_required
def logout():
    logout_user()
    return redirect("/")