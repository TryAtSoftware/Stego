import { NextPage } from "next";
import { useCallback, useState } from "react";
import { EncodeForm } from "@stego/components/Forms";
import { IEncodeRequest } from "@stego/models/IEncodeRequest";
import { defaultFormState, IFormState } from "@stego/models/common/IFormState";
import { SubmitButton } from "@stego/components/Buttons";
import { Box, CircularProgress } from "@mui/material";
import { useService } from "@stego/hooks/useService";
import { encodeAsync } from "../services/stego-service";
import { IEncodeResponse } from "@stego/models/IEncodeResponse";
import { EncodeResponseView } from "@stego/components/Views";

const EncodePage: NextPage = () => {
    const service = useService();
    const [formState, setFormState] = useState<IFormState<IEncodeRequest>>(defaultFormState<IEncodeRequest>());
    const [isEncoding, setIsEncoding] = useState<boolean>( false)
    const [encodeResponse, setEncodeResponse] = useState<IEncodeResponse | null>(null);

    const submitForm = useCallback(async (): Promise<void> => {
        if (!isEncoding) setIsEncoding(true);
        const callResult = await service.call((ac) => encodeAsync(formState.model, ac));
        if (!callResult.isActive) return;

        if (!callResult.result.isSuccessful()) console.log(callResult.result.getErrorMessages());
        else setEncodeResponse(callResult.result.getData() ?? null);
        setIsEncoding(false);
    }, [formState.model, service]);

    return (
        <>
            <h1>Encode!</h1>
            <Box sx={{ py: 2 }}>
                <EncodeForm onChange={setFormState} />
            </Box>
            <SubmitButton text="Encode" onClick={submitForm} disabled={!formState.isValid} />
            {isEncoding && <CircularProgress />}
            {!isEncoding && encodeResponse && <EncodeResponseView response={encodeResponse} />}
        </>
    );
};

export default EncodePage;