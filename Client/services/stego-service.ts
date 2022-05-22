import { IEncodeRequest } from "@stego/models/IEncodeRequest";
import { OperationResult } from "./OperationResult";
import { postAsync } from "./utilities";
import { IEncodeResponse } from "@stego/models/IEncodeResponse";
import { IDecodeRequest } from "@stego/models/IDecodeRequest";
import { IDecodeResponse } from "@stego/models/IDecodeResponse";
import { IFileData } from "@stego/models/common/IFileData";

export function encodeAsync(data: IEncodeRequest | undefined, abortController: AbortController): Promise<OperationResult<IEncodeResponse>> {
    return postAsync<IEncodeResponse>("http://localhost:8000/encode", data, { abortController });
}

export function decodeAsync(data: IDecodeRequest | undefined, abortController: AbortController): Promise<OperationResult<IDecodeResponse>> {
    return postAsync<IDecodeResponse>("http://localhost:8000/decode", data, { abortController });
}

export function uploadFileAsync(file: File, abortController: AbortController): Promise<OperationResult<IFileData>> {
    const headers = { "Content-Type": "multipart/form-data" };

    const formData = new FormData();
    formData.append("file", file);

    return postAsync<IFileData>("http://localhost:8000/upload", formData, { headers, abortController });
}