import { IAlgorithmConfig } from "@stego/models/IAlgorithmConfig";

export interface IEncodeRequest {
    image_id: string;
    message: string;
    config?: IAlgorithmConfig;
}