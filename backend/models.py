from pydantic import BaseModel


class site(BaseModel):
    city: str = None
    location: str = None