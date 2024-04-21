"use client"

import {ClimbingRoute} from "../../editor/climbingRoute";
import RouteImageViewer from "../routeImageViewer";

interface RenderPreviewProps {
    json: ClimbingRoute
}

export default function JsonPreview(props: RenderPreviewProps) {
    return <RouteImageViewer climbingRoute={props.json}/>
}