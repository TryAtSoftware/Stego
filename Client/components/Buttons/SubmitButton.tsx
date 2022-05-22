import React from "react";
import { Button } from "@mui/material";
import { IButtonProps } from "@stego/components/Buttons/interfaces/IButtonProps";

const SubmitButtonComponent = ({ disabled, onClick, text }: IButtonProps): JSX.Element => {
    return <Button variant="outlined" color="primary" onClick={onClick} disabled={disabled}>{text}</Button>;
};
export const SubmitButton = React.memo(SubmitButtonComponent);