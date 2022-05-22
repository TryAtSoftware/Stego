import { IEncodeRequest } from "@stego/models/IEncodeRequest";
import { OperationResult } from "./OperationResult";
import { postAsync } from "./utilities";
import { IEncodeResponse } from "@stego/models/IEncodeResponse";
import { IDecodeRequest } from "@stego/models/IDecodeRequest";
import { IDecodeResponse } from "@stego/models/IDecodeResponse";
import { IFileData } from "@stego/models/common/IFileData";

export function encodeAsync(data: IEncodeRequest | undefined, abortController: AbortController): Promise<OperationResult<IEncodeResponse>> {
    return postAsync<IEncodeResponse>("/api/encode", data, { abortController });
}

export function decodeAsync(data: IDecodeRequest | undefined, abortController: AbortController): Promise<OperationResult<IDecodeResponse>> {
    return postAsync<IDecodeResponse>("/api/decode", data, { abortController });
}

export function uploadFileAsync(file: File, abortController: AbortController): Promise<OperationResult<IFileData>> {
    const headers = { "Content-Type": "multipart/form-data" };

    const formData = new FormData();
    formData.append("file", file);

    return postAsync<IFileData>("/api/upload", formData, { headers, abortController });
}