import Stack from "@mui/material/Stack";
import {Typography} from "@mui/material";
import React from "react";
import {Box} from "@mui/material";

export default function Home() {
  return (
    <main>
        <Stack textAlign={"center"} spacing={2}>
            <Box/>
            <Typography variant={"h1"} fontWeight={"bold"}>
                Settr Pro
            </Typography>
            <Typography variant={"h3"}>
                Route Preservation? Solved. Take a look:
            </Typography>
            <Box style={{width: "100%"}}>
                <Box
                    style={{ border: "2px solid lightgrey", maxWidth: "200mm", margin: "auto" }}
                >
                    <video width="100%" height="auto" autoPlay muted loop>
                        <source src="/demo.mp4" type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                </Box>
            </Box>
        </Stack>
    </main>
  );
}
