from flask import Blueprint
from ..core import analytics

analytics_api = Blueprint('analytics_api', __name__)

@analytics_api.route("/topic_frequency")
def topic_frequency():
    return analytics.fetch_topic_frequency_data()

@analytics_api.route("/company_frequency")
def company_frequency():
    return analytics.fetch_company_selection_frequency_data()

@analytics_api.route("/cgpa_company")
def cgpa_company():
    return analytics.fetch_cgpa_company_data()

@analytics_api.route("/difficulty_level")
def difficulty_level():
    return analytics.fetch_difficulty_level_data()
