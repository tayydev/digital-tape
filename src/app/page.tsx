import Stack from "@mui/material/Stack";
import {Typography} from "@mui/material";
import React from "react";
import {Box} from "@mui/system";

export default function Home() {
  return (
    <main>
        <Stack textAlign={"center"} spacing={4}>
            <Box/>
            <Typography variant={"h1"} fontWeight={"bold"}>
                Settr Pro
            </Typography>
            <Typography variant={"h3"}>
                Route Preservation? Solved.
            </Typography>
        </Stack>
    </main>
  );
}
