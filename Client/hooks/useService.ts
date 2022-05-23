import { useCallback, useRef } from "react";

export interface IServiceCallResult<TResult> {
    isActive: boolean;
    result: TResult;
}

export interface IServiceAccessor {
    call<TResult>(func: (abortController: AbortController) => Promise<TResult>): Promise<IServiceCallResult<TResult>>;
}

export function useService(): IServiceAccessor {
    const abortController = useRef<AbortController | null>(null);

    const call = useCallback(async <TResult>(func: (abortController: AbortController) => Promise<TResult>): Promise<IServiceCallResult<TResult>> => {
        if (abortController.current) abortController.current.abort();

        const currentAbortController = new AbortController();
        abortController.current = currentAbortController;

        const result = await func(currentAbortController);

        const isActive = !currentAbortController.signal.aborted;
        if (isActive) abortController.current = null;

        return { isActive, result };
    }, []);

    return { call };
}