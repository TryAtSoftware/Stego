import { useCallback, useState } from "react";
import { CircularProgress } from "@mui/material";

export const useLoadingManager = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const startLoading = useCallback((): void => setIsLoading(true), []);
    const stopLoading = useCallback((): void => setIsLoading(false), []);
    const render = useCallback((): JSX.Element => {
        if (isLoading) return <CircularProgress />;
        return <></>;
    }, [isLoading]);

    return { startLoading, stopLoading, isLoading, render };
};