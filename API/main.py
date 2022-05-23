from cryptography.fernet import InvalidToken

import config
import encryption
import models
import stego_utils

from PIL import Image
from fastapi import FastAPI, HTTPException, File
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import FileResponse
from storage_management import build_path, open_file, generate_file_id

app = FastAPI()
algorithm_settings = config.AlgorithmSettings()
cors_settings = config.CorsSettings()
app.add_middleware(CORSMiddleware, allow_origins=[cors_settings.client_url],
                   allow_methods=cors_settings.allowed_methods)


@app.post("/upload")
def upload(file: bytes = File()):
    file_id = generate_file_id()
    with open_file(file_id) as physical_file:
        physical_file.write(file)

    return {"id": file_id}


@app.get("/file/{file_id}")
def get_file(file_id: str):
    path = build_path(file_id)
    return FileResponse(path=path, media_type=stego_utils.MEDIA_TYPE)


@app.post("/encode")
def encode(input_model: models.EncodeMessageInputModel):
    with load_image(input_model.image_id) as image:
        return encode_internally(image, input_model)


@app.post("/decode")
def decode(input_model: models.DecodeMessageInputModel):
    with load_image(input_model.image_id) as image:
        message = decode_message(image, input_model.bits_per_pixel)

    if input_model.secret:
        try:
            message = encryption.decrypt(message, input_model.secret.key)
        except InvalidToken:
            raise HTTPException(status_code=400, detail="Invalid encryption token")

    return {"message": message}


def load_image(file_id: str) -> Image:
    path = build_path(file_id)
    img = Image.open(path)
    return img


def encode_internally(image: Image, input_model: models.EncodeMessageInputModel):
    image_bands = len(image.getbands())
    print(f'Message bands count: {image_bands}')
    total_bytes = image.width * image.height * image_bands
    available_positions = total_bytes * input_model.bits_per_pixel

    message = input_model.message
    if input_model.secret:
        message = encryption.encrypt(message, input_model.secret.key)

    message_bits = to_bits(format_message(message))
    if available_positions < len(message_bits):
        error_message = f"The message is too long. There are {available_positions} available positions but {len(message_bits)} are required."
        raise HTTPException(status_code=400, detail=error_message)

    print(f'Available positions: {available_positions}', f'Message bits: {len(message_bits)}')

    changes = encode_message(image, message_bits, input_model.bits_per_pixel)
    if changes < 0:
        raise HTTPException(status_code=400, detail="Encoding was unsuccessful")

    file_id = generate_file_id()
    with open_file(file_id) as save_destination:
        image.save(save_destination)

    return {"id": file_id, "changes": changes}


def encode_message(image: Image, message_bits: list, bits_per_pixel: int) -> int:
    pixels = image.load()
    total_changes = 0

    message_index = 0
    for i in range(0, image.width):
        for j in range(0, image.height):
            has_changes = False

            current_pixels = pixels[i, j]
            modified_pixels = []
            for pixel in current_pixels:
                pixel_temp = pixel
                for power_position in range(bits_per_pixel):
                    if message_index == len(message_bits):
                        break

                    bit_value = get_bit(pixel_temp, power_position)
                    if bit_value != message_bits[message_index]:
                        pixel_temp = flip_bit(pixel_temp, power_position)
                        total_changes += 1
                        has_changes = True

                    message_index += 1

                modified_pixels.append(pixel_temp)

            if has_changes:
                pixels[i, j] = tuple(modified_pixels)

            if message_index == len(message_bits):
                return total_changes

    return -1


def decode_message(image: Image, bits_per_pixel: int) -> str:
    pixels = image.load()

    reached_prefix = False
    message = ''
    character_bits = []
    for i in range(0, image.width):
        for j in range(0, image.height):
            current_pixels = pixels[i, j]
            for pixel in current_pixels:
                for power_position in range(0, bits_per_pixel):
                    bit_value = get_bit(pixel, power_position)
                    character_bits.append(bit_value)

                    if len(character_bits) == stego_utils.BYTES_COUNT:
                        letter = from_bits(character_bits)

                        if letter == algorithm_settings.prefix and not reached_prefix:
                            reached_prefix = True
                        elif letter == algorithm_settings.suffix:
                            return message
                        elif reached_prefix:
                            message += letter

                        character_bits.clear()

    return ""


def format_message(text: str) -> str:
    return f'{algorithm_settings.prefix}{text}{algorithm_settings.suffix}'


def get_bit(value: int, power_position: int) -> int:
    if value & (1 << power_position):
        return 1
    return 0


def set_bit(value: int, power_position: int) -> int:
    return value | (1 << power_position)


def flip_bit(value: int, power_position: int) -> int:
    return value ^ (1 << power_position)


def get_last_bits(number: int, count: int) -> list:
    bits = []
    for position in reversed(range(0, count)):
        bits.append(get_bit(number, position))

    return bits


def from_bits(bits: list) -> str:
    number = 0
    for power_position in range(0, len(bits)):
        if bits[power_position]:
            number = set_bit(number, len(bits) - (power_position + 1))

    return chr(number)


def to_bits(text: str) -> list:
    text_bytes = stego_utils.encode_str(text)

    bits = []
    for byte in text_bytes:
        current_bits = get_last_bits(byte, stego_utils.BYTES_COUNT)
        for bit in current_bits:
            bits.append(bit)

    return bits
