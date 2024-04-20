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

    const [highlightedHold, setHighlightedHold]: [string | null, (value: (((prevState: (string | null)) => (string | null)) | string | null)) => void] = useState<string|null>(null)
    const [selectedHold, setSelectedHold]: [string | null, (value: (((prevState: (string | null)) => (string | null)) | string | null)) => void] = useState<string|null>(null)

    return <>
        <Stack direction={"row"}>
            <Box style={{width: "75%", backgroundColor: "red"}}>
                <ImageEditor
                    routeState={[route, setRoute]}
                    highlightedState={[highlightedHold, setHighlightedHold]}
                    selectedState={[selectedHold, setSelectedHold]}
                />
            </Box>
            <Box style={{width: "25%"}}>
                <HoldEditor
                    routeState={[route, setRoute]}
                    highlightedState={[highlightedHold, setHighlightedHold]}
                    selectedState={[selectedHold, setSelectedHold]}
                />
            </Box>
        </Stack>
    </>
}

export default RouteEditor;
