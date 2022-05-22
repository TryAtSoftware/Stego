from pydantic import BaseModel


class EncodeMessageInputModel(BaseModel):
    image_id: str
    message: str
    bits_per_pixel: int = 1


class DecodeMessageInputModel(BaseModel):
    image_id: str
    bits_per_pixel: int = 1
