'use client'

import React, { useState } from "react";
import Stack from "@mui/material/Stack";

import {ClimbingRoute, defaultRoute} from "@/app/editor/climbingRoute";
import ImageEditor from "@/app/editor/imageEditor";
import HoldEditor from "@/app/editor/holdEditor";
import {Box} from "@mui/system";
import CheecheeDraggable from "@/app/editor/cheecheeDraggable";
import ImageWithOverlay from "@/app/editor/cheecheeDraggable";
import DragWithOverlay from "@/app/editor/draggingPercentage";

const myImage = "/resources/MOCK_rock_wall.jpg";

interface ObjectData {
    id: number;
    x: number;
    y: number;
}

function RouteEditor() {
    const [route, setRoute]: [ClimbingRoute, (value: (((prevState: ClimbingRoute) => ClimbingRoute) | ClimbingRoute)) => void] = useState<ClimbingRoute>(
        defaultRoute
    );

    return <>
        <Stack direction={"row"}>
            {/*<DragWithOverlay/>*/}
            <Box style={{maxWidth: "75%", backgroundColor: "red"}}>
                <ImageEditor routeState={[route, setRoute]}/>
            </Box>
            <HoldEditor routeState={[route, setRoute]}/>
        </Stack>
    </>
}

export default RouteEditor;
