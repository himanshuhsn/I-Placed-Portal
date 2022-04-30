from flask import Blueprint, request
from flask_login import login_required
from core import experience
import json

experience_api = Blueprint('experience_api', __name__)

@experience_api.route("/add", methods=['POST'])
@login_required
def add():
    add_experience_data = request.get_json()
    return experience.addExp(add_experience_data)

@experience_api.route("/approve", methods=['POST'])
@login_required
def approve():
    Credentials = request.get_json()
    return experience.approve(Credentials["blog_id"],Credentials["admin_id"])

@experience_api.route("/deny", methods=['POST'])
@login_required
def deny():
    Credentials = request.get_json()
    return experience.deny(Credentials["blog_id"],Credentials["admin_id"])

@experience_api.route("/search", methods=['POST'])
@login_required
def search():
    tags = request.get_json()
    return experience.search(tags)

@experience_api.route("/view", methods=['GET'])
@login_required
def view():
    return {"data": experience.viewExp()}
