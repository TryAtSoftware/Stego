import { useEffect, useRef } from "react";

export function usePrevious<TValue>(value: TValue): TValue | undefined {
    const ref = useRef<TValue>();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}