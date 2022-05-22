FORMAT = "png"
MEDIA_TYPE = "image/png"

BYTES_COUNT = 8
ENCODING = "utf-8"


def encode_str(text: str) -> bytes:
    return text.encode(ENCODING)


def decode_str(data: bytes) -> str:
    return data.decode(ENCODING)