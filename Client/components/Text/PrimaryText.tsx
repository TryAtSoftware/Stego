import React, { useCallback } from "react";
import { Theme, Typography } from "@mui/material";
import { ITextComponentProps } from "@stego/components/Text/interfaces";

const PrimaryTextComponent = ({ text }: ITextComponentProps): JSX.Element => {
    const styles = useCallback((theme: Theme) => ({ color: theme.palette.text.primary }), []);
    return <Typography sx={styles}>{text}</Typography>;
};

export const PrimaryText = React.memo(PrimaryTextComponent);