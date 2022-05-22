import React from "react";
import { Box, Typography } from "@mui/material";
import { IDecodeResponse } from "@stego/models/IDecodeResponse";

interface IDecodeResponseViewProps {
    response: IDecodeResponse | null;
}

const DecodeResponseViewComponent = ({ response }: IDecodeResponseViewProps): JSX.Element | null => {
    if (!response) return null;

    return <Box sx={{ wordBreak: "break-all" }}>
        <Typography>{response.message}</Typography>
    </Box>;
};

export const DecodeResponseView = React.memo(DecodeResponseViewComponent);