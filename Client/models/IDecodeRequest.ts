import { ISecret } from "@stego/models/ISecret";

export interface IDecodeRequest {
    image_id: string;
    bits_per_pixel: number;
    secret?: ISecret
}