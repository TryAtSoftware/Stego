import { useCallback, useState } from "react";
import { Alert } from "@mui/material";

export const useErrors = () => {
    const [errors, setErrors] = useState<string[]>([]);

    const clearErrors = useCallback((): void => setErrors([]), []);
    const render = useCallback((): JSX.Element => {
        return <>{errors.map((e, index) => <Alert key={index} severity="error">{e}</Alert>)}</>;
    }, [errors]);

    return { setErrors, clearErrors, render };
};