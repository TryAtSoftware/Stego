import React, { useEffect, useState } from "react";
import { IChangeProps } from "@stego/interfaces/IValueChangeProps";
import { IFormState } from "@stego/models/common/IFormState";
import { ISecret } from "@stego/models/ISecret";
import { LongTextInput } from "@stego/components/Input";
import { FormContainer } from "@stego/components/Forms/Common";
import { Box } from "@mui/material";

type EncodeFormProps = IChangeProps<IFormState<ISecret>>;
const SecretFormComponent = ({ onChange }: EncodeFormProps): JSX.Element => {
    const [secret, setSecret] = useState("");

    useEffect((): void => {
        const state: IFormState<ISecret> = {
            isValid: !!secret,
            model: { key: secret }
        }
        onChange?.(state);
    }, [secret])

    return <FormContainer>
        <Box>
            <LongTextInput label="Secret key" currentValue={secret} onChange={setSecret} />
        </Box>
    </FormContainer>;
};
export const SecretForm = React.memo(SecretFormComponent);