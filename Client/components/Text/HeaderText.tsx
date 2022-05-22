import React, { useCallback } from "react";
import { Theme, Typography, withStyles } from "@mui/material";
import { ITextComponentProps } from "@stego/components/Text/interfaces";

const HeaderTextComponent = ({ text }: ITextComponentProps): JSX.Element => {
    const styles = useCallback((theme: Theme) => ({ color: theme.palette.primary.contrastText }), []);
    return <Typography sx={styles}>{text}</Typography>;
};

export const HeaderText = React.memo(HeaderTextComponent);