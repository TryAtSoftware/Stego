import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "./Home.module.css";
import { Link } from "@stego/components/Links";

import OriginalFlowers from "@stego/assets/images/flowers-original.jpg";
import EncodedFlowers from "@stego/assets/images/flowers-encoded.png";
import Image from "next/image";

const HomeComponent = (): JSX.Element => {
    return <Box sx={{ overflow: "hidden" }}>
        <Typography className={styles.Animated} sx={{ textTransform: "uppercase" }} align="center" variant="h1">stego</Typography>
        <Typography className={styles.Animated} align="center" variant="h3" gutterBottom>Try at software [Tony Troeff]</Typography>
        <Typography className={styles.Animated + " " + styles.SecondStep}>
            Here you can hide a message in any picture and retrieve it later.
            If you wish, you can share the result with your friends and family and no one will even know that you've hidden a message in there.
        </Typography>
        <Typography className={styles.Animated + " " + styles.SecondStep}>
            Just give it a try! Go to the <Link href="/encode">encode</Link> page, upload some picture, write down some text and see the *magic*.
            Then, after you've got the result, go to the <Link href="/decode">decode</Link> page and see what you've hidden.
        </Typography>

        <br />
        <Typography className={styles.Animated + " " + styles.ThirdStep}>
            Down there you can see an example - on the left side, you can see the original photo and on the right side, the photo with the encoded message.
        </Typography>
        <Typography className={styles.Animated + " " + styles.ThirdStep} sx={{ fontStyle: "italic" }}>You may even try decoding the encoded message using the default setup from the <Link href="/decode">decode</Link> page. Our team has hidden something nice for you!</Typography>
        <Box className={styles.Animated + " " + styles.ThirdStep} sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Image src={OriginalFlowers} alt="A picture of some flowers" />
            <Image src={EncodedFlowers} alt="A picture of some flowers with an encoded message" />
        </Box>
    </Box>;
};

export const Home = React.memo(HomeComponent);