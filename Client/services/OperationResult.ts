export class OperationResult<TResult> {
    private readonly _errorMessages: string[] = [];
    private _data: TResult | undefined;

    public getErrorMessages(): string[] {
        return [...this._errorMessages];
    }

    public addError(error: string): void {
        if (!error) return;
        this._errorMessages.push(error);
    }

    public isSuccessful(): boolean {
        return this._errorMessages.length === 0;
    }

    public getData(): TResult | undefined {
        return this._data;
    }

    public setData(data: TResult): void {
        this._data = data;
    }
}