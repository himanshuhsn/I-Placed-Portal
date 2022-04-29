from utils import keygenerator

from model.model import Login_Data
from model.model import db

key_object = keygenerator.KeyGenerator()

from flask_login import UserMixin

class google_user(UserMixin):
    def __init__(self,id_,  name, email):
        self.id = id_,
        self.name = name,
        self.email = email

    @staticmethod
    def get_user(user_id):
        try:
            users = Login_Data.query.filter_by(id=str(user_id)).all()
            db.session.remove()
            if len(users) > 0:
                new_user = google_user(
                    id_ = users[0].id ,
                    name = users[0].name,
                    email =  users[0].email
                    )
                return new_user
            else: 
                return None
        except Exception as e:
            return None

    @staticmethod
    def create_user(_id ,_name, _email, _admin = False):
        key_object.generateKey(10)
        dev_key = key_object.getKey()
        try:
            new_user = Login_Data(
                    id = _id,
                    name = _name,
                    email = _email,
                    key = dev_key,
                    admin = _admin
            )
            db.session.add(new_user)
            db.session.commit()
            print("user added")
            return dev_key
        except Exception as e:
            return(str(e))



# if __name__ == "__main__":
    # users = Login_Data.query.filter_by(name="test").all()
    # print(len(users))
    # print(get_user("test"))
    