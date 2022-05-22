import React from "react";
import NextLink from "next/link";
import MUILink from "@mui/material/Link";
import { IParentComponentProps } from "@stego/interfaces/IParentComponentProps";

interface ILinkProps extends IParentComponentProps {
    href: string;
}

const LinkComponent = ({ href, children }: ILinkProps): JSX.Element => {
    return <NextLink href={href} passHref>
        <MUILink underline="none">{children}</MUILink>
    </NextLink>;
};

export const Link = React.memo(LinkComponent);