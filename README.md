# google-auth-flask
A simple web app to develop Google authentication with the help of flask-login and storing user data on PostgreSQL database hosted on a remote VM.

Do the following steps to run the app:
* Add the required values to config.py

* Run the following command to install dependencies:
`pip install -r requirements.txt`

* Run the following to create database (Only run if db does not exists):
`python3 model/model.py`

* Run the following command to start the app:
`python3 app.py`