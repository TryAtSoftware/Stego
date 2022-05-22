import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { OperationResult } from "../OperationResult";

export interface IRequestOptions {
    params?: unknown;
    headers?: AxiosRequestHeaders;
    abortController: AbortController;
}

export async function getAsync<TResult>(url: string, options: IRequestOptions | null = null): Promise<OperationResult<TResult>> {
    const operationResult = new OperationResult<TResult>();

    try {
        const result = await axios.get<TResult>(url, constructRequestConfig(options));
        operationResult.setData(result.data);
    } catch (error) {
        setErrors(operationResult, error);
    }

    return operationResult;
}

export async function postAsync<TResult>(url: string, body: unknown, options: IRequestOptions | null = null): Promise<OperationResult<TResult>> {
    const operationResult = new OperationResult<TResult>();

    try {
        const result = await axios.post<TResult>(url, body, constructRequestConfig(options));
        operationResult.setData(result.data);
    } catch (error) {
        setErrors(operationResult, error);
    }

    return operationResult;
}

function constructRequestConfig(options: IRequestOptions | null): AxiosRequestConfig {
    const config: AxiosRequestConfig = {};
    if (options?.abortController) config.signal = options.abortController.signal;
    if (options?.params) config.params = options.params;
    if (options?.headers) config.headers = options.headers;

    return config;
}


function setErrors<TResult>(operationResult: OperationResult<TResult>, error: any): void {
    if (!operationResult) return;

    console.log(error)

    if (error.response && error.response.data) operationResult.addError(error.response.data);
    else if (error.request) operationResult.addError("No response was received.");
    else operationResult.addError("An error occurred.");
}