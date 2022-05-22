import React, { useCallback } from "react";
import { IValueChangeProps } from "@stego/interfaces/IValueChangeProps";
import { TextField } from "@mui/material";
import { ITextInputProps } from "@stego/interfaces/IFormControlProps";

type LongTextControlProps = IValueChangeProps<string> & ITextInputProps;
const LongTextControlComponent = ({ currentValue, label, onChange, placeholder }: LongTextControlProps): JSX.Element => {
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value), [onChange]);

    return <TextField label={label} placeholder={placeholder} onChange={handleChange} value={currentValue} multiline />;
};
export const LongTextInput = React.memo(LongTextControlComponent);