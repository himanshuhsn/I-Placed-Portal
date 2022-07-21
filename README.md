# I-Placed-Portal
One portal for placement related student experiences for IIT Bhilai.

### You can find a working MVP here -> [LINK](https://swapnilnarad2000.github.io/I-Placed-Portal-MVP/)

Do the following steps to run the app:
* Add the required values to config.py
* USER, PASSWORD, HOST, PORT, DATABASE
* Create a google cloud account and retrieve the following credentials  GOOGLE_CLIENT_ID , GOOGLE_CLIENT_SECRET , GOOGLE_DISCOVERY_URL and also add these to config.py . 

* Install docker on your machine, you can refer:

[Docker install](https://docs.docker.com/engine/install/)

* Pull postgres container image using:

`docker pull postgres`

* Run Postgres Docker Image

`sudo docker run --rm --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres_pass postgres` 

* Also pull dpage/pgadmin4 and Run Pgadmin using

`sudo docker run -p 5555:80 --name pgadmin -e PGADMIN_DEFAULT_EMAIL="example@email.com" -e PGADMIN_DEFAULT_PASSWORD="example" dpage/pgadmin4`

* Run the following command to install dependencies:

`pip install -r requirements.txt`

* Run the following to create database (Only run if db does not exists):

`python3 model/model.py`

* Run the following command to start the app:

`python3 app.py`

* Navigate to `https://127.0.0.1/5000` to view the running app.

* Create an admin user manually in database to approve reviews.

Contributors:
* Swapnil Narad
* Himanshu Sekhar Nayak
* Devansh Chaudhary
