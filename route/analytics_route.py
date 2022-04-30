from flask import Blueprint
from flask_login import login_required
from core import analytics

analytics_api = Blueprint('analytics_api', __name__)

@analytics_api.route("/topic_frequency")
@login_required
def topic_frequency():
    # return {"topic_frequecny": analytics.fetch_topic_frequency_data()}
    return analytics.fetch_topic_frequency_data()

@analytics_api.route("/company_frequency")
@login_required
def company_frequency():
    return analytics.fetch_company_selection_frequency_data()

@analytics_api.route("/cgpa_company")
@login_required
def cgpa_company():
    return analytics.fetch_cgpa_company_data()

@analytics_api.route("/difficulty_level")
@login_required
def difficulty_level():
    return analytics.fetch_difficulty_level_data()
