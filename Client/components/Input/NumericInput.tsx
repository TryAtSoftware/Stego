import React, { useCallback } from "react";
import { IValueChangeProps } from "@stego/interfaces/IValueChangeProps";
import { TextField } from "@mui/material";
import { INumericInputProps } from "@stego/interfaces/IFormControlProps";

type NumericInputProps = IValueChangeProps<number> & INumericInputProps;
const NumericInputComponent = ({ currentValue, label, onChange, min, max }: NumericInputProps): JSX.Element => {
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!onChange) return;

        let value = parseFloat(e.target.value);
        onChange(value);
    }, [onChange]);

    return <TextField label={label} type="number" InputProps={{ inputProps: { max, min } }} onChange={handleChange} value={currentValue} />;
};
export const NumericInput = React.memo(NumericInputComponent);