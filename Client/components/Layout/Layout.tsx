import Head from "next/head";
import React from "react";
import { IParentComponentProps } from "@stego/interfaces/IParentComponentProps";
import { createTheme, ThemeProvider } from "@mui/material";
import { blue, pink } from "@mui/material/colors";
import { Header } from "@stego/components/Header";
import styles from "./Layout.module.css";

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: pink
    },
    spacing: 10
});

const LayoutComponent = ({ children }: IParentComponentProps) => {
    return <>
        <Head>
            <title>Try at software - Stego</title>
            <meta name="description" content="Developed by Tony Troeff" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            <ThemeProvider theme={theme}>
                <Header />
                <div className={styles.MainContent}>
                    {children}
                </div>
            </ThemeProvider>
        </main>

        <footer>
        </footer>
    </>;
};
export const Layout = React.memo(LayoutComponent);