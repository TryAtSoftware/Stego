from pydantic import BaseModel, Field


class SecretInputModel(BaseModel):
    key: str


class AlgorithmConfig(BaseModel):
    bits_per_pixel: int = Field(ge=1, le=8)
    secret: SecretInputModel | None


algorithm_config_field = Field(default=AlgorithmConfig(bits_per_pixel=1))


class EncodeMessageInputModel(BaseModel):
    image_id: str
    message: str
    config: AlgorithmConfig = algorithm_config_field


class DecodeMessageInputModel(BaseModel):
    image_id: str
    config: AlgorithmConfig = algorithm_config_field
