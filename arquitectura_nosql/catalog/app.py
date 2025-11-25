
from fastapi import FastAPI
from pymongo import MongoClient

app=FastAPI()
db=MongoClient("mongodb://mongo:27017").catalogo

@app.post("/productos")
def crear(p:dict):
    db.productos.insert_one(p)
    return p

app.post("/productos/lote")
def crear_lote(lista: list):
    # Inserta todos los documentos tal cual vienen
    db.productos.insert_many(lista)
    return {"insertados": len(lista)}

@app.get("/productos")
def listar():
    return list(db.productos.find({},{"_id":0}))

@app.get("/productos/{id}")
def obtener(id:str):
    return db.productos.find_one({"_id":id},{"_id":0})

@app.put("/productos/{id}")
def actualizar(id:str,p:dict):
    db.productos.update_one({"_id":id},{"$set":p})
    return {"msg":"actualizado"}

@app.delete("/productos/{id}")
def borrar(id:str):
    db.productos.delete_one({"_id":id})
    return {"msg":"borrado"}
