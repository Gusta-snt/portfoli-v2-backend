import pymongo
from pymongo import MongoClient
from flask import Flask, jsonify
from bson.json_util import dumps, loads
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
cluster = MongoClient(os.environ["MONGO_LINK"])

db = cluster["db"]
collection = db.get_collection("projects")

@app.route('/')
def hello():
    documents = collection.find()
    list_cur = list(documents)
    json_data = dumps(list_cur)
    return jsonify(json_data)
