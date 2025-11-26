from pydantic import BaseModel

class DTOCatalogo(BaseModel):
    producto: dict | list 
    operacion: str | list
