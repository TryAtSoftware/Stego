import os.path
import uuid
from typing import IO

from config import StorageSettings
from stego_utils import FORMAT

storage_settings = StorageSettings()


def generate_file_id() -> str:
    return str(uuid.uuid4())


def build_path(file_id: str) -> str:
    if not file_id:
        raise Exception("Invalid file identifier was provided to the `build_path` function.")

    file_name = f'{file_id}.{FORMAT}'
    return os.path.join(storage_settings.root_directory, file_name)


def open_file(file_id: str) -> IO:
    path = build_path(file_id)
    return open(path, "xb")
