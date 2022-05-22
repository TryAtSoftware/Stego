import React from "react";
import { IEncodeResponse } from "@stego/models/IEncodeResponse";
import { Box, Typography } from "@mui/material";
import { buildFileUrl } from "@stego/services/utilities";

interface IEncodeResponseViewProps {
    response: IEncodeResponse | null;
}

const EncodeResponseViewComponent = ({ response }: IEncodeResponseViewProps): JSX.Element | null => {
    if (!response) return null;

    return <Box>
        <Typography>
            The encoding process finished with {response.changes} changes being made.
        </Typography>
        <a download href={buildFileUrl(response.id)}>
            Download the encoded image from here
        </a>
    </Box>;
};

export const EncodeResponseView = React.memo(EncodeResponseViewComponent);