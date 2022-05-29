import { FileUploadControl, LongTextInput } from "@stego/components/Input";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { IEncodeRequest } from "@stego/models/IEncodeRequest";
import { IChangeProps } from "@stego/interfaces/IValueChangeProps";
import { IFormState } from "@stego/models/common/IFormState";
import { FormContainer } from "@stego/components/Forms/Common";
import { IFileData } from "@stego/models/common/IFileData";
import { useEncryptionDetails } from "@stego/components/Forms/Encode/useEncryptionDetails";

type EncodeFormProps = IChangeProps<IFormState<IEncodeRequest>>;
const EncodeFormComponent = ({ onChange }: EncodeFormProps): JSX.Element => {
    const [image, setImage] = useState<IFileData | null>(null);
    const [message, setMessage] = useState("");
    const encryptionDetails = useEncryptionDetails();

    useEffect((): void => {
        const currentState: IFormState<IEncodeRequest> = {
            isValid: !!image && !!message && encryptionDetails.state.isValid,
            model: { image_id: image?.id ?? "", message, config: encryptionDetails.state.model }
        };
        onChange?.(currentState);
    }, [image, message, encryptionDetails.state]);

    return <FormContainer>
        <FileUploadControl currentValue={image} onChange={setImage} />
        <Box>
            <LongTextInput label="Message" currentValue={message} onChange={setMessage} />
        </Box>
        {encryptionDetails.render()}
    </FormContainer>;
};

export const EncodeForm = React.memo(EncodeFormComponent);