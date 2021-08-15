import pymongo
from pymongo import MongoClient

cluster = MongoClient(
    "mongodb+srv://sdankit01:Qwerty1234@clusteraks.gaxcz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
)
db = cluster["meeting"]


class DB():

    def insert(context: any, collectionStr: str, payload: dict):
        collection = db[collectionStr]
        collection.insert_one(payload)

    def getAll(context: any, collectionStr: str):
        collection = db[collectionStr]
        result = collection.find()
        return result

    def get(context: any, collectionStr: str, id):
        collection = db[collectionStr]
        result = collection.find_one({'_id': id})
        return result

    def approveClient(context: any, collectionStr: str, id):
        collection = db[collectionStr]
        result = collection.find_one_and_update(
            {'_id': id}, {'$set': {'approved': True}}, upsert=True)
        return result

    def getAllApproved(context: any):
        collection = db['client']
        result = collection.find({'approved': True})
        return result

    def deleteClient(context: any, id: str):
        collection = db['client']
        result = collection.delete_one({"_id": id})
        return result
