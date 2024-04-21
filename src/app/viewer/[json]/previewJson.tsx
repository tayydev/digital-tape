"use client"

import {ClimbingRoute} from "../../editor/climbingRoute";
import RouteImageViewer from "./routeImageViewer";
import React from "react";
import Stack from "@mui/material/Stack";
import {Typography} from "@mui/material";
import {Box} from "@mui/system";
import {lightenHexColor, offBlack} from "../../theme";

interface RenderPreviewProps {
    json: ClimbingRoute
}

export default function JsonPreview(props: RenderPreviewProps) {
    return <Stack>
        <Typography align={"center"} variant={"h2"} padding={"0.5rem"} fontWeight={"bold"}>{props.json.name}</Typography>
        <Typography align={"center"} variant={"h5"}>
            {props.json.grade} - {props.json.setter}
        </Typography>
        <Box padding={"1rem"}>
            <RouteImageViewer climbingRoute={props.json}/>
        </Box>
    </Stack>
}