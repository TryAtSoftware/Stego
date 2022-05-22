from pydantic import BaseModel


class SecretInputModel(BaseModel):
    key: str


class EncodeMessageInputModel(BaseModel):
    image_id: str
    message: str
    secret: SecretInputModel | None
    bits_per_pixel: int = 1


class DecodeMessageInputModel(BaseModel):
    image_id: str
    secret: SecretInputModel | None
    bits_per_pixel: int = 1
