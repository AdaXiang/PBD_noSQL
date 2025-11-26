from pydantic import BaseModel
import requests, time

class DTOListAnalytics(BaseModel):
    evento: dict | list
    operacion: str |list


