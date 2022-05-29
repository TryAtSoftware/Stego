import React, { useCallback, useMemo } from "react";
import { Link } from "@stego/components/Links";
import { AppBar, Theme, Toolbar } from "@mui/material";
import { HeaderText } from "@stego/components/Text/HeaderText";

const HeaderComponent = (): JSX.Element => {
    const toolbarStyles = useCallback((theme: Theme) => ({ display: "flex", columnGap: theme.spacing(2) }), []);
    const toolbarItems = useMemo(() => ["Encode", "Decode"], []);

    return <AppBar position="sticky">
        <Toolbar sx={toolbarStyles}>
            <Link href="/"><HeaderText text="Home" /></Link>
            {toolbarItems.map((i: string, index: number) => <Link href={`/${i.toLowerCase()}`} key={index}><HeaderText text={i} /></Link>)}
        </Toolbar>
    </AppBar>;
};

export const Header = React.memo(HeaderComponent);