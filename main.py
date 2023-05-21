# Database stuff
from pymongo import MongoClient

# API stuff
from flask import Flask

# Encoding stuff
from bson.json_util import default
import json

# Enviroment variables stuff
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
cluster = MongoClient(os.environ["MONGO_LINK"])

db = cluster["db"]
collection_projects = db.get_collection("projects")
collection_skills = db.get_collection("skills")

def cursor_to_json(cursor):
    return json.dumps(list(cursor), default=default, indent=2)

@app.route('/projects')
def get_projects():
    return cursor_to_json(collection_projects.find()), 200, {"Content-Type": "application/json"}

@app.route('/skills')
def get_skills():
    return cursor_to_json(collection_skills.find()), 200, {"Content-Type": "application/json"}
