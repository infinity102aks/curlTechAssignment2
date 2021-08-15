from typing import Dict
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from starlette.responses import JSONResponse, Response
from mongo import DB
from datetime import date, datetime, timedelta

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# to run this app use
#  hypercorn main:app --reload

db = DB()
clients = []
approved = []


class Client(BaseModel):
    id: str
    name: str
    company: str


@app.get("/")
def main():
    return {"message": "Hello World"}


@app.get('/clients')
def getClients():
    result = db.getAll("client")
    l = list()
    for item in result:
        d = dict(item)
        di = date.fromisoformat(d.get('created'))
        today = datetime.now() - timedelta(1)
        if today == datetime.fromisoformat(d.get('created')):
            db.deleteClient(d.get('_id'))
        else:
            l.append(item)
    return l


@app.get('/clients/{id}')
def getClients(id: str):
    result = db.get('client', id)
    return result


@app.post('/clients')
def createClient(client: Client):
    d = dict()
    d.__setitem__("_id", client.id)
    d.__setitem__("name", client.name)
    d.__setitem__("company", client.company)
    d.__setitem__("created", date.today().isoformat())
    d.__setitem__("approved", False)
    db.insert('client', d)
    return {"_id": client.id, "name": client.name, "company": client.company, "approved": False}


@app.get('/approve/{client_id}')
def approving(client_id: str):
    client = db.approveClient('client', client_id)
    if client:
        return True
    return False


@app.get('/approved')
def approving():
    result = db.getAllApproved()
    l = list()
    for item in result:
        l.append(item)
    return l


@app.delete("/clients/{id}")
def deleteClient(id: str):
    result = db.deleteClient(id)
    if result:
        return True
    return False
