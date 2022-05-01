from sqlalchemy.sql import text
from model.model import SQLALCHEMY_DATABASE_URI
import json
import decimal, datetime

# IMPORT THE REQUIRED LIBRARY
import sqlalchemy as db
 
# DEFINE THE ENGINE (CONNECTION OBJECT)
engine = db.create_engine(SQLALCHEMY_DATABASE_URI)

def alchemyencoder(obj):
    """JSON encoder function for SQLAlchemy special classes."""
    if isinstance(obj, datetime.date):
        return obj.isoformat()
    elif isinstance(obj, decimal.Decimal):
        return float(obj)

def to_json(res):
    return json.dumps([dict(r) for r in res], default=alchemyencoder)

# get topic frequency data from db
def get_topic_frequency_data():
    topic_dict = dict()
    try:
        sql = text("SELECT tags "+
                    "FROM blog "+
                    "WHERE status = 'A' ")
        results = engine.execute(sql)
        for item in results:
            for tags in item.tags:
                if tags in topic_dict.keys():
                    topic_dict[tags] += 1
                else:
                    topic_dict[tags] = 1
        return topic_dict
    except Exception as e:
        print(str(e))
        return []

# delete old data and store topic frequency to db
# to be ran in schedule
def store_topic_frequency_data():
    try:
        sql = text("DELETE FROM topic_frequency_data")
        engine.execute(sql)
        data_tags = get_topic_frequency_data()
        for item in data_tags.keys():
            sql = text("INSERT INTO topic_frequency_data (topic, frequency) " +
                    "VALUES(:x, :y);")
            engine.execute(sql, x = item, y = data_tags[item])
        return True
    except Exception as e:
        print(str(e))
        return False

# fetch data from db
def fetch_topic_frequency_data():
    store_topic_frequency_data()
    try:
        sql = text("SELECT * FROM topic_frequency_data")
        result = engine.execute(sql)
        print(result)
        return to_json(result)
    except Exception as e:
        print(str(e))
        return {}

def get_company_selection_frequency_data() -> list:
    try:
        sql = text("SELECT company.name, COUNT(*) as frequency " + 
                "FROM company INNER JOIN user_company_blog " +
                "ON company.id = user_company_blog.company_id " +
                "WHERE user_company_blog.selected = 'true' and user_company_blog.status = 'A' " +
                "GROUP BY company.name " +
                "ORDER BY frequency desc " + 
                "LIMIT 10")
        results = engine.execute(sql)
        company_frequency_list = list()
        for item in results:
            row = {"company_name": item.name, "frequency": item.frequency}
            company_frequency_list.append(row)
        return company_frequency_list
    except Exception as e:
        print(str(e))
        return []

def store_company_selection_frequency_data():
    try:
        sql = text("DELETE FROM company_selection_frequency_data")
        engine.execute(sql)
        data_tags = get_company_selection_frequency_data()
        for item in data_tags:
            sql = text("INSERT INTO company_selection_frequency_data (company_name, frequency) " +
                    "VALUES(:x, :y);")
            engine.execute(sql, x = item['company_name'], y = item['frequency'])
        return True
    except Exception as e:
        print(str(e))
        return False

def fetch_company_selection_frequency_data():
    store_company_selection_frequency_data()
    try:
        sql = text("SELECT * FROM company_selection_frequency_data")
        result = engine.execute(sql)
        print(result)
        return to_json(result)
    except Exception as e:
        print(str(e))
        return {}
    
def get_cgpa_company_data():
    try:
        sql = text("SELECT company.name, avg(user_data.cgpa) as average_cgpa " +
                    "FROM company " + 
                    "INNER JOIN user_company_blog ON company.id = user_company_blog.company_id " +
                    "INNER JOIN user_data ON user_company_blog.user_id = user_data.id " +
                    "WHERE user_company_blog.selected = 'true' and user_company_blog.status = 'A' " +
                    "GROUP BY company.name " +
                    "LIMIT 10")
        results = engine.execute(sql)
        average_cgpa_list = list()
        for item in results:
            row = {"company_name": item.name, "avg_cgpa": item.average_cgpa}
            average_cgpa_list.append(row)
        return average_cgpa_list
    except Exception as e:
        print(str(e))
        return []

def store_cgpa_company_data():
    try:
        sql = text("DELETE FROM cgpa_company_data")
        engine.execute(sql)
        data_tags = get_cgpa_company_data()
        for item in data_tags:
            sql = text("INSERT INTO cgpa_company_data (company_name, avg_cgpa) " +
                    "VALUES(:x, :y);")
            engine.execute(sql, x = item['company_name'], y = item['avg_cgpa'])
        return True
    except Exception as e:
        print(str(e))
        return False

def fetch_cgpa_company_data():
    store_cgpa_company_data()
    try:
        sql = text("SELECT * FROM cgpa_company_data")
        result = engine.execute(sql)
        return to_json(result)
    except Exception as e:
        print(str(e))
        return {}

def get_difficulty_level_data():
    try:
        sql = text("SELECT level ,COUNT(*) " +
                    "FROM blog " +
                    "WHERE status = 'A' " +
                    "GROUP BY level")
        results = engine.execute(sql)
        difficulty_level_list = list()
        for item in results:
            row = {"level": item.level, "frequency": item.count}
            difficulty_level_list.append(row)
        return difficulty_level_list
    except Exception as e:
        print(str(e))
        return []

def store_difficulty_level_data():
    try:
        sql = text("DELETE FROM difficulty_level_data")
        engine.execute(sql) 
        data_tags = get_difficulty_level_data()
        for item in data_tags:
            sql = text("INSERT INTO difficulty_level_data (level, frequency) " +
                    "VALUES(:x, :y);")
            engine.execute(sql, x = item['level'], y = item['frequency'])
        return True
    except Exception as e:
        print(str(e))
        return False

def fetch_difficulty_level_data():
    store_difficulty_level_data()
    try:
        sql = text("SELECT * FROM difficulty_level_data")
        result = engine.execute(sql)
        return to_json(result)
    except Exception as e:
        print(str(e))
        return {}


# if __name__ == "__main__":
    # print(get_company_selection_frequency_data())
    # print(get_cgpa_company_data())
    # print(get_difficulty_level_data())
    # print(get_topic_frequency_data())
    # store_topic_frequency_data()
    # store_company_selection_frequency_data()
    # store_cgpa_company_data()
    # store_difficulty_level_data()
    # print(fetch_topic_frequency_data())
    # print(fetch_company_selection_frequency_data())
    # print(fetch_cgpa_company_data())
    # print(fetch_difficulty_level_data())