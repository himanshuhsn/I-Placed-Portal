# I-Placed-Portal
One portal for placement related student experiences for IIT Bhilai.

Do the following steps to run the app:
* Add the required values to config.py
* USER, PASSWORD, HOST, PORT, DATABASE
* Create a google cloud account and retrieve the following credentials  GOOGLE_CLIENT_ID , GOOGLE_CLIENT_SECRET , GOOGLE_DISCOVERY_URL and also add these to config.py . 

* Install docker on your machine, you can refer:

[Docker install](https://docs.docker.com/engine/install/)

* Pull postgres container image using:

`docker pull postgres`


* Run the following command to install dependencies:

`pip install -r requirements.txt`

* Run the following to create database (Only run if db does not exists):

`python3 model/model.py`

* Run the following command to start the app:

`python3 app.py`

* Navigate to `https://127.0.0.1/5000` to view the running app.

Contributors:
* Swapnil Narad
* Himanshu Shekhar Nayak
* Devansh Chaudhary