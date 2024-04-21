"use client"
import {Button, Typography} from '@mui/material';
import {ClimbingRoute} from "../editor/climbingRoute";
import Stack from "@mui/material/Stack";
import {Route} from "next";
import {lightenHexColor, offBlack} from "../theme";
import {useState} from "react";

interface RouteViewerProps {
    routes: Map<string, ClimbingRoute>
}

export default function RouteViewer(props: RouteViewerProps) {

    console.log("got dirs", props.routes)

    const handleOpen = (file: any) => {
        window.location.href = `/viewer/${file}`;
    };

    return (
        <Stack
            padding={"1rem"}
            spacing={2}
            justifyContent={"center"}
            // width={"100%"}
            maxWidth={"200mm"}
            marginX={"auto"}
        >
            <Typography variant={"h2"}>
                Saved Routes
            </Typography>
            {Array.from(props.routes).map(pair => (
                <RouteButton
                    route={pair[1]}
                    onClick={() => handleOpen(pair[0])}
                />
            ))}
        </Stack>
    );
}

interface RouteButtonProps {
    route: ClimbingRoute
    onClick: () => void
}

function RouteButton(props: RouteButtonProps) {
    const [isHover, setIsHover] = useState(false)

    return <Stack
        padding={"0.5rem"}
        onClick={() => props.onClick()}
        direction={"row"}
        alignItems={"center"}
        style={{
            background: isHover ? lightenHexColor(offBlack, 0.3) : offBlack,
            borderRadius: "10px",
        }}
        spacing={2}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
    >
        <Typography variant={"h3"}>{props.route.grade}</Typography>
        <Typography variant={"h5"}>{props.route.name}</Typography>
        <Typography style={{marginLeft: "auto"}}>Set by: {props.route.setter}</Typography>
    </Stack>
}