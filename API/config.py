from pydantic import BaseSettings


class CorsSettings(BaseSettings):
    client_url: str
    allowed_methods: list

    class Config:
        env_file = ".env.cors"


class AlgorithmSettings(BaseSettings):
    prefix: str
    suffix: str

    class Config:
        env_file = ".env.algorithm"


class StorageSettings(BaseSettings):
    root_directory: str

    class Config:
        env_file = ".env.storage"
