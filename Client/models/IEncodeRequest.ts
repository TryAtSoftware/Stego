import { ISecret } from "@stego/models/ISecret";

export interface IEncodeRequest {
    image_id: string;
    message: string;
    secret?: ISecret;
}