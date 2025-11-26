from pydantic import BaseModel

class ProductosScore(BaseModel):
    detalle: dict|list
    operacion: str|list
