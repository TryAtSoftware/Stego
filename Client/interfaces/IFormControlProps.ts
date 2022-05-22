import React from "react";

export interface IFormControlProps {
    label: React.ReactNode;
}

export interface ITextInputProps extends IFormControlProps {
    placeholder?: string;
}

export interface INumericInputProps extends IFormControlProps {
    min?: number;
    max?: number;
}