from flask import Blueprint, request
from core import experience
import json

experience_api = Blueprint('experience_api', __name__)

@experience_api.route("/add", methods=['POST'])
def add():
    add_experience_data = request.get_json()
    return experience.addExp(add_experience_data.to_dict())

@experience_api.route("/approve", methods=['POST'])
def approve():
    Credentials = request.get_json()
    return experience.approve(Credentials["blog_id"],Credentials["admin_id"])

@experience_api.route("/deny", methods=['POST'])
def deny():
    Credentials = request.get_json()
    return experience.deny(Credentials["blog_id"],Credentials["admin_id"])

@experience_api.route("/search", methods=['POST'])
def search():
    tags = request.get_json()
    return experience.search(tags)

@experience_api.route("/view", methods=['GET'])
def view():
    return {"data": experience.viewExp()}
