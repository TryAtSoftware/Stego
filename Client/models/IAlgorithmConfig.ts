import { ISecret } from "@stego/models/ISecret";

export interface IAlgorithmConfig {
    bits_per_pixel: number;
    secret?: ISecret;
}