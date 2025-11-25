
from fastapi import FastAPI
import redis

app=FastAPI()
r=redis.Redis(host="redis",port=6379,db=0)

@app.post("/visita/{id}")
def incr(id:str):
    r.zincrby("productos:vistas",1,id)
    return {"msg":"ok"}

@app.get("/top")
def top():
    return r.zrevrange("productos:vistas",0,9)
