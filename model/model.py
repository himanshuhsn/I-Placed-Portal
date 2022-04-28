from flask import Flask

from sqlalchemy import ForeignKey
from flask_sqlalchemy import SQLAlchemy

from config import USER, PASSWORD, HOST, PORT, DATABASE

SQLALCHEMY_DATABASE_URI = f'postgresql+psycopg2://{USER}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}'

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
db = SQLAlchemy(app)

class Login_Data(db.Model):
    __tablename__ = 'login_data'
    id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), nullable=False)
    key = db.Column(db.String(), nullable=False)
    admin = db.Column(db.Boolean(), unique=False, default=False)

    def __init__(self, id, email, key, admin, name):
        self.id = id
        self.name = name
        self.email = email
        self.key = key
        self.admin = admin

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'key': self.key,
            'admin': self.admin
        }

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.String(), primary_key=True)
    email = db.Column(db.String(), nullable=False)
    key = db.Column(db.String(), nullable=False)
    admin = db.Column(db.Boolean(), unique=False, default=False)
    first_name = db.Column(db.String(), nullable=False)
    last_name = db.Column(db.String(), nullable=False)
    batch = db.Column(db.Integer)
    cgpa = db.Column(db.Numeric(4,2))
    timestamp = db.Column(db.Integer)
    status = db.Column(db.Enum("A","U",name='approval_status'))

    def __init__(self, id, email, key, admin, first_name, last_name, batch, cgpa, timestamp, status):
        self.id = id
        self.email = email
        self.key = key
        self.admin = admin
        self.first_name = first_name
        self.last_name = last_name
        self.batch = batch
        self.cgpa = cgpa
        self.timestamp = timestamp
        self.status = status

    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'key': self.key,
            'admin': self.admin,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'batch': self.batch,
            'cgpa': self.cgpa,
            'timestamp': self.timestamp,
            'status': self.status
        }

class Company(db.Model):
    __tablename__ = 'company'

    id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String(), nullable=False)
    timestamp = db.Column(db.Integer)
    status = db.Column(db.Enum("A","U",name='approval_status'))

    def __init__(self, id, name, timestamp, status):
        self.id = id
        self.name = name
        self.timestamp = timestamp
        self.status = status

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'timestamp': self.timestamp,
            'status': self.status
        }

class Blog(db.Model):
    __tablename__ = 'blog'

    id = db.Column(db.String(), primary_key=True)
    level = db.Column(db.Integer, nullable=False)
    article = db.Column(db.ARRAY(db.TEXT), primary_key=False)
    timestamp = db.Column(db.Integer)
    status = db.Column(db.Enum("A","U",name='approval_status'))
    tags = db.Column(db.ARRAY(db.TEXT))
    feedback = db.Column(db.TEXT)

    def __init__(self, id, level, article, timestamp, status, feedback):
        self.id = id
        self.level = level
        self.article = article
        self.timestamp = timestamp
        self.status = status
        self.feedback = feedback

    def serialize(self):
        return {
            'id': self.id,
            'level': self.level,
            'article': self.article,
            'timestamp': self.timestamp,
            'status': self.status,
            'feedback': self.feedback
        }

class User_Company_Blog(db.Model):
    __tablename__ = 'user_company_blog'

    id = db.Column(db.String(), primary_key=True)
    user_id = db.Column(db.String(), ForeignKey('user.id'))
    company_id = db.Column(db.String(), ForeignKey('company.id'))
    blog_id = db.Column(db.String(), ForeignKey('blog.id'))
    selected = db.Column(db.Boolean(), unique=False, default=False)
    timestamp = db.Column(db.Integer)
    status = db.Column(db.Enum("A","U",name='approval_status'))

    def __init__(self, id, user_id, company_id, blog_id, selected, timestamp, status):
        self.id = id
        self.user_id = user_id
        self.company_id = company_id
        self.blog_id = blog_id
        self.selected = selected
        self.timestamp = timestamp
        self.status = status

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'company_id': self.company_id,
            'blog_id': self.blog_id,
            'selected': self.selected,
            'timestamp': self.timestamp,
            'status': self.status
        }

db.create_all()