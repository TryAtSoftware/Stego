import { ISecret } from "@stego/models/ISecret";

export interface IDecodeRequest {
    image_id: string;
    secret?: ISecret
}