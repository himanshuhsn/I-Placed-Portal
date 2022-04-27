import os
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(SCRIPT_DIR))

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from route.auth_route import auth_api as auth_blueprint
# add more route here

# Flask app setup
app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)

app.register_blueprint(auth_blueprint, url_prefix='/')
# register more blueprint here

# Database setup
from config import USER, PASSWORD, HOST, PORT, DATABASE
SQLALCHEMY_DATABASE_URI = f'postgresql+psycopg2://{USER}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
db = SQLAlchemy(app)

if __name__ == "__main__":
    app.run(ssl_context="adhoc")
