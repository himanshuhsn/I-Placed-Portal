import os
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(SCRIPT_DIR))

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

# Internal imports
from core import user

# Flask app setup
app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)

# User session management setup
# https://flask-login.readthedocs.io/en/latest
login_manager = LoginManager()
login_manager.init_app(app)

# Flask-Login helper to retrieve a user from our db
# This will manage login session for user
@login_manager.user_loader
def load_user(user_id):
    return user.google_user.get_user(user_id[2:len(user_id)-3])


from route.auth_route import auth_api as auth_blueprint
from route.analytics_route import analytics_api as analytics_blueprint
from route.experience_route import experience_api as experience_blueprint

app.register_blueprint(auth_blueprint, url_prefix='/')
app.register_blueprint(analytics_blueprint, url_prefix='/analytics')
app.register_blueprint(analytics_blueprint, url_prefix='/experience')

# Database setup
from config import USER, PASSWORD, HOST, PORT, DATABASE
SQLALCHEMY_DATABASE_URI = f'postgresql+psycopg2://{USER}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
db = SQLAlchemy(app)

if __name__ == "__main__":
    app.run(ssl_context="adhoc")
