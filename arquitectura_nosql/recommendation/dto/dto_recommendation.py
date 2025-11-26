from pydantic import BaseModel

class ProductoScore(BaseModel):
    detalle: dict
    operacion: str
