import { ISecret } from "@stego/models/ISecret";

export interface IEncodeRequest {
    image_id: string;
    message: string;
    bits_per_pixel: number;
    secret?: ISecret;
}