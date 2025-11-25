from fastapi import FastAPI
from pydantic import BaseModel
import requests, time

app = FastAPI()
RIAK = "http://riak:8098"

class DTOAnalytics(BaseModel):
    evento: dict
    operacion: str


