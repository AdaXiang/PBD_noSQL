from pydantic import BaseModel
from typing import Union, List, Dict, Any

class DTOFinal(BaseModel):
    recommendation: dict
    analytics: dict
    catalog: dict
    # Aceptamos dict (un producto), list (varios) o None (borrado) o str (mensaje de resultado)
    producto: List|Dict|str|None 