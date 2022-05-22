export interface IValueChangeProps<TValue> extends IChangeProps<TValue> {
    currentValue: TValue;
}

export interface IChangeProps<TValue> {
    onChange: (value: TValue) => void;
}