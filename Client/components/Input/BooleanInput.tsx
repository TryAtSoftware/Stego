import React, { useCallback } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { IFormControlProps } from "@stego/interfaces/IFormControlProps";
import { IValueChangeProps } from "@stego/interfaces/IValueChangeProps";

type BooleanInputProps = IValueChangeProps<boolean> & IFormControlProps;
const BooleanInputComponent = ({ currentValue, label, onChange }: BooleanInputProps): JSX.Element => {
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.checked), [onChange]);
    return <FormControlLabel control={<Checkbox value={currentValue} onChange={handleChange} />} label={label} />;
};
export const BooleanInput = React.memo(BooleanInputComponent);