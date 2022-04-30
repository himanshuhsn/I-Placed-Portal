import random
from sqlite3 import Timestamp
import string
from wsgiref.handlers import format_date_time
from sqlalchemy import engine_from_config, false, inspect, true
import time
from sqlalchemy.sql import text
from model.model import SQLALCHEMY_DATABASE_URI
from model.model import db
from model.model import Blog, Company, Login_Data, User_Company_Blog, User
#from route.experience_route import view
from utils.keygenerator import KeyGenerator 


keyGen = KeyGenerator()

engine = db.create_engine(SQLALCHEMY_DATABASE_URI,{})
ts = time.time()

def check_admin(login_id):
    try:
        adm = Login_Data.query.filter_by(id=login_id).first().admin
        db.session.remove()
        if(adm==False):
            return {"isAdmin" : False}
    except Exception as e:
        return(str(e))
    return {"isAdmin" : True}


def addExp(formData):
    _id = keyGen.getKey()
    user_id = keyGen.getKey()
    company_id = keyGen.getKey()
    blog_id = keyGen.getKey()
    _key = keyGen.getKey()
    print(formData)
    _article = formData['round_data']
    _level = formData["level"]
    _firstName = formData["first_name"]
    _lastName= formData["last_name"]
    _email = formData["email"]
    _batch = formData["batch"]
    _company = formData["company"]
    _feedback = formData["feedback"]
    _status = 'U'
    _tags = formData["tags"]
    _cgpa = formData["cgpa"]

    if(userExists(_email)==False):
        try:
            new_user = User(
                id = user_id,
                email = _email,
                key = _key,
                admin = False,
                first_name = _firstName,
                last_name = _lastName,
                batch = _batch,
                cgpa = _cgpa,
                timestamp = time.time(),
                status = _status
            )
            db.session.add(new_user)
            db.session.commit()
            print("new user added")
        except Exception as e:
            print(str(e))
            return(str(e))
    else:
        user_id = User.query.filter_by(email=_email).first().id
        print(user_id)
    if(companyExists(_company)==False):
        try:
            new_company = Company(
                id = company_id,
                name = _company,
                timestamp = time.time(),
                status = _status
            )
            db.session.add(new_company)
            db.session.commit()
            print("new company added")
        except Exception as e:
            print(str(e))
            return(str(e))
    else:
        company_id = Company.query.filter_by(name=_company).first().id
        print(company_id)
        
    try:
        new_blog = Blog(
                id = blog_id,
                level = _level,
                article = _article,
                timestamp = time.time(),
                status = _status,
                tags = _tags,
                feedback = _feedback
        )
        db.session.add(new_blog)
        db.session.commit()
        print("new blog added")
    except Exception as e:
        print(str(e))
        return(str(e))
    try:
        new_blog = User_Company_Blog(
                id = _id,
                user_id = user_id,
                company_id = company_id,
                blog_id = blog_id,
                timestamp = time.time(),
                status = _status,
                selected= formData["status"]
        )
        db.session.add(new_blog)
        db.session.commit()
        print("new user_company_blog added")
        return "Success"
    except Exception as e:
        print(str(e))
        return(str(e))
    
def userExists(_email):
    try:
        tuple = User.query.filter_by(email=_email).first()
        print(tuple)
        if tuple is not None:
            return True
        return False
    except Exception as e:
        return(str(e))

def companyExists(_name):
    try:
        tuple = Company.query.filter_by(name=_name).first()
        if tuple is not None:
            return True
        return False
    except Exception as e:
        return(str(e))

def viewExp():
    try:
        sql = text("Select  user_data.first_name, user_data.last_name, user_data.email, user_data.cgpa, company.name, blog.level, blog.article, blog.status, blog.tags,blog.feedback "+
"from user_data "+" inner join user_company_blog on user_data.id = user_company_blog.user_id"+
" inner join company on company.id = user_company_blog.company_id "+
" inner join blog on blog.id = user_company_blog.blog_id")
        results = engine.execute(sql)
        ans = []
        for item in results:
            ans.append(item)
        return ans 
    except Exception as e:
        return(str(e))

def intersection(lst1, lst2):
    lst3 = [value for value in lst1 if value in lst2]
    if lst3 == []:
        return False
    return True
def search(tags_list,company_list=None):
    try:
        sql = text("Select  user_data.first_name, user_data.last_name, user_data.email, user_data.key, user_data.admin, user_data.cgpa, company.name, blog.level, blog.article, blog.status, blog.tags,blog.feedback "+
"from user_data "+" inner join user_company_blog on user_data.id = user_company_blog.user_id"+
" inner join company on company.id = user_company_blog.company_id "+
" inner join blog on blog.id = user_company_blog.blog_id")
        results = engine.execute(sql)
        ans = []
        if(tags_list==[]):
            for item in results:
                if item[6] in company_list:
                    ans.append(item)
        elif(company_list==[] or company_list == None):
            for item in results:
                if intersection(item[10],tags_list):
                    ans.append(item)
        else:
            for item in results:
                if item[6] in company_list and intersection(item[10],tags_list):
                    ans.append(item)
        return ans
    except Exception as e:
        print(str(e))
        return None

def approve(_id,login_id):
    try:
        adm = Login_Data.query.filter_by(id=login_id).first().admin
        db.session.remove()
        if(adm==False):
            return "Sorry you're not admin :("
    except Exception as e:
        return(str(e))

    try:
        tuple = User_Company_Blog.query.filter_by(id=_id).first()
        tuple.status = "A"
        user_tuple = User.query.filter_by(id=tuple.user_id).first()
        user_tuple.status = "A"
        company_tuple = Company.query.filter_by(id=tuple.company_id).first()
        company_tuple.status = "A"
        blog_tuple = Blog.query.filter_by(id=tuple.blog_id).first()
        blog_tuple.status = "A"
        db.session.commit()
        return "Success"
    except Exception as e:
        return(str(e))

def deny(_id,login_id):
    try:
        adm = Login_Data.query.filter_by(id=login_id).first().admin
        db.session.remove()
        if(adm==False):
            return "Sorry you're not admin :("
    except Exception as e:
        return(str(e))

    try:
        blogId= User_Company_Blog.query.filter_by(id=_id).first().blog_id
        User_Company_Blog.query.filter_by(id=_id).first().delete()
        Blog.query.filter_by(id=blogId).first().delete()
        db.session.commit()
        return "Success"
    except Exception as e:
        return(str(e))

def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}
