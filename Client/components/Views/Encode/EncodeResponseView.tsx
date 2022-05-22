import React from "react";
import { IEncodeResponse } from "@stego/models/IEncodeResponse";
import { Box } from "@mui/material";
import { buildFileUrl } from "@stego/services/utilities";

interface IEncodeResponseViewProps {
    response: IEncodeResponse | null;
}

const EncodeResponseViewComponent = ({ response }: IEncodeResponseViewProps): JSX.Element | null => {
    if (!response) return null;

    return <Box>
        <a download href={buildFileUrl(response.id)}>
            Download the encoded image from here
        </a>
    </Box>;
};

export const EncodeResponseView = React.memo(EncodeResponseViewComponent);