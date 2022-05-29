import { NextPage } from "next";
import { useService } from "@stego/hooks/useService";
import { defaultFormState, IFormState } from "@stego/models/common/IFormState";
import { decodeAsync } from "../services/stego-service";
import { DecodeForm } from "@stego/components/Forms";
import { SubmitButton } from "@stego/components/Buttons";
import { useCallback, useState } from "react";
import { IDecodeRequest } from "@stego/models/IDecodeRequest";
import { Box } from "@mui/material";
import { IDecodeResponse } from "@stego/models/IDecodeResponse";
import { DecodeResponseView } from "@stego/components/Views/Encode/DecodeResponseView";
import { useErrors } from "@stego/hooks/useErrors";
import { useLoadingManager } from "@stego/hooks/useLoadingManager";

const DecodePage: NextPage = () => {
    const loadingManager = useLoadingManager();
    const errors = useErrors();
    const service = useService();
    const [formState, setFormState] = useState<IFormState<IDecodeRequest>>(defaultFormState<IDecodeRequest>());
    const [decodeResponse, setDecodeResponse] = useState<IDecodeResponse | null>(null);

    const submitForm = useCallback(async (): Promise<void> => {
        loadingManager.startLoading();
        setDecodeResponse(null)
        errors.clearErrors();
        const callResult = await service.call((ac) => decodeAsync(formState.model, ac));
        if (!callResult.isActive) return;

        if (!callResult.result.isSuccessful()) errors.setErrors(callResult.result.getErrorMessages());
        else setDecodeResponse(callResult.result.getData() ?? null);
        loadingManager.stopLoading();
    }, [formState.model, service, loadingManager]);

    return (
        <>
            <h1>Decode!</h1>
            <Box sx={{ py: 2 }}>
                <DecodeForm onChange={setFormState} />
            </Box>
            <SubmitButton text="Decode" onClick={submitForm} disabled={!formState.isValid} />
            <Box>
            {loadingManager.render()}
            {!loadingManager.isLoading && decodeResponse && <DecodeResponseView response={decodeResponse} />}
            {errors.render()}
            </Box>
        </>
    );
};

export default DecodePage;