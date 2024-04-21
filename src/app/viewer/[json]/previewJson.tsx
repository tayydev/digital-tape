"use client"

import {ClimbingRoute} from "../../editor/climbingRoute";
import {Typography} from "@mui/material";

interface RenderPreviewProps {
    json: ClimbingRoute
}

export default function JsonPreview(props: RenderPreviewProps) {
    return <Typography>{props.json.name}</Typography>
}