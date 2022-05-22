import { useCallback, useRef } from "react";

export interface IServiceCallResult<TResult> {
    isActive: boolean;
    result: TResult
}

export interface IServiceAccessor {
    call<TResult>(func: (abortController: AbortController) => Promise<TResult>): Promise<IServiceCallResult<TResult>>;
}

export function useService(): IServiceAccessor {
    const abortController = useRef<AbortController | null>(null);

    const call = useCallback(async <TResult>(func: (abortController: AbortController) => Promise<TResult>): Promise<IServiceCallResult<TResult>> => {
        if (abortController.current) {
            console.log('Aborting previous request')
            abortController.current.abort();
        }

        const currentAbortController = new AbortController();
        abortController.current = currentAbortController;

        console.log('Start request')
        const result = await func(currentAbortController);

        const isActive = !currentAbortController.signal.aborted;
        if (isActive) {
            console.log('Request was active')
            abortController.current = null;
        } else console.log('Request was not active')

        return { isActive, result };
    }, []);

    return { call };
}