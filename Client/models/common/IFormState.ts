export interface IFormState<TModel> {
    isValid: boolean;
    model: TModel | undefined;
}

export function defaultFormState<TModel>(model?: TModel): IFormState<TModel> {
    return {
        isValid: false,
        model: model
    };
}