from fastapi import FastAPI
import redis

app = FastAPI()

# Redis container (docker-compose)
r = redis.Redis(host="redis", port=6379, db=0, decode_responses=True)

ZSET = "productos:vistas"


# ---------------------------------------------------------
# 1) Incrementar vistas de un producto
# ---------------------------------------------------------
@app.post("/visita/{id}")
def incr(id: str):
    score = r.zincrby(ZSET, 1, id)
    return {"msg": "ok", "producto": id, "vistas": score}


# ---------------------------------------------------------
# 2) Disminuir vistas
# ---------------------------------------------------------
@app.post("/visita/{id}/decr")
def decr(id: str):
    score = r.zincrby(ZSET, -1, id)
    return {"msg": "ok", "producto": id, "vistas": score}


# ---------------------------------------------------------
# 3) Obtener el TOP N de productos
# ---------------------------------------------------------
@app.get("/top/{n}")
def top(n: int):
    return r.zrevrange(ZSET, 0, n - 1, withscores=True)


# ---------------------------------------------------------
# 4) Obtener el score/vistas de un producto
# ---------------------------------------------------------
@app.get("/producto/{id}")
def get_score(id: str):
    score = r.zscore(ZSET, id)
    return {"producto": id, "vistas": score}


# ---------------------------------------------------------
# 5) Eliminar un producto del ranking
# ---------------------------------------------------------
@app.delete("/producto/{id}")
def delete(id: str):
    r.zrem(ZSET, id)
    return {"msg": "eliminado", "producto": id}


# ---------------------------------------------------------
# 6) Resetear todo el ZSET
# ---------------------------------------------------------
@app.delete("/reset")
def reset():
    r.delete(ZSET)
    return {"msg": "ranking reseteado"}


# ---------------------------------------------------------
# 7) Insertar múltiples productos de golpe
# ---------------------------------------------------------
@app.post("/bulk")
def bulk_insert(productos: dict):
    """
    Ejemplo JSON:
    {
        "prod1": 10,
        "prod2": 5,
        "prod3": 8
    }
    """
    with r.pipeline() as pipe:
        for p, score in productos.items():
            pipe.zadd(ZSET, {p: score})
        pipe.execute()

    return {"msg": "bulk insert ok", "productos": productos}


# ---------------------------------------------------------
# 8) Obtener rango parcial (paginación)
# ---------------------------------------------------------
@app.get("/rango")
def rango(start: int = 0, stop: int = 9):
    """
    Devuelve productos ordenados por score DESC
    """
    return r.zrevrange(ZSET, start, stop, withscores=True)


# ---------------------------------------------------------
# 9) Obtener todos ordenados por vistas
# ---------------------------------------------------------
@app.get("/all")
def get_all():
    return r.zrevrange(ZSET, 0, -1, withscores=True)


# ---------------------------------------------------------
# 10) Filtrar productos por score mínimo y máximo
# ---------------------------------------------------------
@app.get("/filtrar")
def filtrar(min: float = "-inf", max: float = "+inf"):
    """
    Ejemplo:
    /filtrar?min=5&max=20
    """
    return r.zrangebyscore(ZSET, min, max, withscores=True)
