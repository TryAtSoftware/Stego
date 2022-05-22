import React from "react";

export interface IFormControlProps {
    label: React.ReactNode;
}

export interface ITextInputProps extends IFormControlProps {
    placeholder?: string;
}
