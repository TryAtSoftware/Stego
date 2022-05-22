import { FileUploadControl, LongTextInput } from "@stego/components/Input";
import React, { useCallback, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { IEncodeRequest } from "@stego/models/IEncodeRequest";
import { IChangeProps } from "@stego/interfaces/IValueChangeProps";
import { IFormState } from "@stego/models/common/IFormState";
import { BooleanInput } from "@stego/components/Input/BooleanInput";
import { FormContainer } from "@stego/components/Forms/Common";
import { SecretForm } from "@stego/components/Forms";
import { ISecret } from "@stego/models/ISecret";
import { IFileData } from "@stego/models/common/IFileData";
import { NumericInput } from "@stego/components/Input/NumericInput";

type EncodeFormProps = IChangeProps<IFormState<IEncodeRequest>>;
const EncodeFormComponent = ({ onChange }: EncodeFormProps): JSX.Element => {
    const [image, setImage] = useState<IFileData | null>(null);
    const [message, setMessage] = useState("");
    const [bitsPerPixel, setBitsPerPixel] = useState(1);
    const [withSecret, setWithSecret] = useState(false);
    const [secretFormState, setSecretFormState] = useState<IFormState<ISecret>>();

    const handleWithSecretChange = useCallback((newValue: boolean): void => {
        setWithSecret(newValue);
        if (!newValue) setSecretFormState(undefined);
    }, []);

    useEffect((): void => {
        const secretIsValid = !withSecret || !!secretFormState?.isValid;
        const currentState: IFormState<IEncodeRequest> = {
            isValid: !!image && !!message && secretIsValid,
            model: { image_id: image?.id ?? "", message, bits_per_pixel: bitsPerPixel, secret: secretFormState?.model }
        };
        onChange?.(currentState);
    }, [image, message, bitsPerPixel, withSecret, secretFormState]);

    return <FormContainer>
        <FileUploadControl currentValue={image} onChange={setImage}>
            <Button variant="contained" component="span">
                Upload
            </Button>
        </FileUploadControl>
        <Box>
            <LongTextInput label="Message" currentValue={message} onChange={setMessage} />
        </Box>
        <Box>
            <NumericInput label="Bits per pixel" currentValue={bitsPerPixel} onChange={setBitsPerPixel} min={1} max={8} />
        </Box>
        <Box>
            <BooleanInput currentValue={withSecret} onChange={handleWithSecretChange} label="With encryption" />
            {withSecret && <Box sx={{ padding: 1 }}><SecretForm onChange={setSecretFormState} /></Box>}
        </Box>
    </FormContainer>;
};

export const EncodeForm = React.memo(EncodeFormComponent);