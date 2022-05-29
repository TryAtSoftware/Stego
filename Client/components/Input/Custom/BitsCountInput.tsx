import React from "react";
import { IValueChangeProps } from "@stego/interfaces/IValueChangeProps";
import { NumericInput } from "@stego/components/Input/NumericInput";

const BitsCountInputComponent = ({ currentValue, onChange }: IValueChangeProps<number>): JSX.Element => {
    return <NumericInput label="Bits per pixel" currentValue={currentValue} onChange={onChange} min={1} max={8} />

};

export const BitsCountInput = React.memo(BitsCountInputComponent);