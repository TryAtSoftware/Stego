import { IAlgorithmConfig } from "@stego/models/IAlgorithmConfig";

export interface IDecodeRequest {
    image_id: string;
    config?: IAlgorithmConfig;
}