import React, { useCallback, useState } from "react";
import { IFormState } from "@stego/models/common/IFormState";
import { ISecret } from "@stego/models/ISecret";
import { BitsCountInput } from "@stego/components/Input/Custom";
import { BooleanInput } from "@stego/components/Input/BooleanInput";
import { SecretForm } from "@stego/components/Forms";
import { Box } from "@mui/material";
import { IAlgorithmConfig } from "@stego/models/IAlgorithmConfig";

interface IEncryptionDetails {
    state: IFormState<IAlgorithmConfig>;
    render: () => JSX.Element;
}

export function useEncryptionDetails(): IEncryptionDetails {
    const [bitsPerPixel, setBitsPerPixel] = useState(1);
    const [withSecret, setWithSecret] = useState(false);
    const [secretFormState, setSecretFormState] = useState<IFormState<ISecret>>();

    const handleWithSecretChange = useCallback((newValue: boolean): void => {
        setWithSecret(newValue);
        if (!newValue) setSecretFormState(undefined);
    }, []);

    const renderEncryptionDetails = useCallback((): JSX.Element => {
        return <>
            <Box>
                <BitsCountInput currentValue={bitsPerPixel} onChange={setBitsPerPixel} />
            </Box>
            <Box>
                <BooleanInput currentValue={withSecret} onChange={handleWithSecretChange} label="With encryption" />
                {withSecret && <Box sx={{ padding: 1 }}><SecretForm onChange={setSecretFormState} /></Box>}
            </Box>
        </>;
    }, [bitsPerPixel, withSecret]);

    return {
        state: {
            isValid: !withSecret || !!secretFormState?.isValid,
            model: { bits_per_pixel: bitsPerPixel, secret: secretFormState?.model }
        },
        render: renderEncryptionDetails
    };
}