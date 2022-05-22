import base64
import secrets

from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

import stego_utils

iterations = 100_000


def encrypt(text: str, password: str) -> str:
    text_bytes = stego_utils.encode_str(text)
    password_bytes = stego_utils.encode_str(password)

    salt = secrets.token_bytes(16)
    print(salt)
    key = derive_key(password_bytes, salt)

    encrypted_bytes = Fernet(key).encrypt(text_bytes)

    salt_text = stego_utils.decode_str(base64.b64encode(salt))
    encrypted_text = stego_utils.decode_str(base64.b64encode(encrypted_bytes))

    print(salt_text, encrypted_text)

    return f'{salt_text}{encrypted_text}'


def decrypt(text: str, password: str) -> str:
    if len(text) < 24:
        return text

    salt, encrypted_message = base64.b64decode(text[:24]), base64.b64decode(text[24:])
    password_bytes = stego_utils.encode_str(password)

    key = derive_key(password_bytes, salt)

    decrypted_bytes = Fernet(key).decrypt(encrypted_message)
    return stego_utils.decode_str(decrypted_bytes)


def derive_key(password: bytes, salt: bytes) -> bytes:
    kdf = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=iterations)
    derived_key = kdf.derive(password)
    return base64.urlsafe_b64encode(derived_key)
