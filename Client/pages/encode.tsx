import { NextPage } from "next";
import { useCallback, useState } from "react";
import { EncodeForm } from "@stego/components/Forms";
import { IEncodeRequest } from "@stego/models/IEncodeRequest";
import { defaultFormState, IFormState } from "@stego/models/common/IFormState";
import { SubmitButton } from "@stego/components/Buttons";
import { Box } from "@mui/material";
import { useService } from "@stego/hooks/useService";
import { encodeAsync } from "../services/stego-service";
import { IEncodeResponse } from "@stego/models/IEncodeResponse";
import { EncodeResponseView } from "@stego/components/Views";
import { useErrors } from "@stego/hooks/useErrors";
import { useLoadingManager } from "@stego/hooks/useLoadingManager";

const EncodePage: NextPage = () => {
    const loadingManager = useLoadingManager();
    const errors = useErrors();
    const service = useService();
    const [formState, setFormState] = useState<IFormState<IEncodeRequest>>(defaultFormState<IEncodeRequest>());
    const [encodeResponse, setEncodeResponse] = useState<IEncodeResponse | null>(null);

    const submitForm = useCallback(async (): Promise<void> => {
        loadingManager.startLoading();
        setEncodeResponse(null);
        errors.clearErrors();
        const callResult = await service.call((ac) => encodeAsync(formState.model, ac));
        if (!callResult.isActive) return;

        if (!callResult.result.isSuccessful()) errors.setErrors(callResult.result.getErrorMessages());
        else setEncodeResponse(callResult.result.getData() ?? null);
        loadingManager.stopLoading();
    }, [formState.model, service, loadingManager]);

    return (
        <>
            <h1>Encode!</h1>
            <Box sx={{ py: 2 }}>
                <EncodeForm onChange={setFormState} />
            </Box>
            <SubmitButton text="Encode" onClick={submitForm} disabled={!formState.isValid} />
            <Box>
                {loadingManager.render()}
                {!loadingManager.isLoading && encodeResponse && <EncodeResponseView response={encodeResponse} />}
                {errors.render()}
            </Box>
        </>
    );
};

export default EncodePage;