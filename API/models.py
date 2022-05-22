from pydantic import BaseModel, Field

bits_per_pixel_field = Field(ge=1, le=8)


class SecretInputModel(BaseModel):
    key: str


class EncodeMessageInputModel(BaseModel):
    image_id: str
    message: str
    secret: SecretInputModel | None
    bits_per_pixel: int = bits_per_pixel_field


class DecodeMessageInputModel(BaseModel):
    image_id: str
    secret: SecretInputModel | None
    bits_per_pixel: int = bits_per_pixel_field
