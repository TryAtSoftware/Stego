import { FileUploadControl } from "@stego/components/Input";
import React, { useEffect, useState } from "react";
import { IChangeProps } from "@stego/interfaces/IValueChangeProps";
import { IFormState } from "@stego/models/common/IFormState";
import { FormContainer } from "@stego/components/Forms/Common";
import { IFileData } from "@stego/models/common/IFileData";
import { IDecodeRequest } from "@stego/models/IDecodeRequest";
import { useEncryptionDetails } from "@stego/components/Forms/Encode/useEncryptionDetails";

type DecodeFormProps = IChangeProps<IFormState<IDecodeRequest>>;
const DecodeFormComponent = ({ onChange }: DecodeFormProps): JSX.Element => {
    const [image, setImage] = useState<IFileData | null>(null);
    const encryptionDetails = useEncryptionDetails();

    useEffect((): void => {
        const currentState: IFormState<IDecodeRequest> = {
            isValid: !!image && encryptionDetails.state.isValid,
            model: { image_id: image?.id ?? "", config: encryptionDetails.state.model }
        };
        onChange?.(currentState);
    }, [image, encryptionDetails.state]);

    return <FormContainer>
        <FileUploadControl currentValue={image} onChange={setImage} />
        {encryptionDetails.render()}
    </FormContainer>;
};

export const DecodeForm = React.memo(DecodeFormComponent);