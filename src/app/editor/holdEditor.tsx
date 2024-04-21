import {ClimbingRoute, HoldData} from "@/app/editor/climbingRoute";
import Stack from "@mui/material/Stack";
import {useEffect, useState} from "react";
import {Box} from "@mui/system";
import {TextField, Typography} from "@mui/material";
import {lightenHexColor, offBlack, selectColor} from "@/app/theme";

interface HoldEditorProps {
    routeState: [ClimbingRoute, (value: (((prevState: ClimbingRoute) => ClimbingRoute) | ClimbingRoute)) => void]
    highlightedState: [string | null, (value: (((prevState: (string | null)) => (string | null)) | string | null)) => void]
    selectedState: [string | null, (value: (((prevState: (string | null)) => (string | null)) | string | null)) => void]
}

export default function HoldEditor(props: HoldEditorProps) {
    const [route, setRoute] = props.routeState
    const [highlighted, setHighlighted] = props.highlightedState
    const [selected, setSelected] = props.selectedState
    //we want to take our holds and naturals and make a list of effective hold ids
    const [unownedHolds, setUnownedHolds] = useState<HoldData[]>([])

    useEffect(() => {
        const naturalOwnedIds = route.naturals.flatMap(it => [it.hold1id, it.hold2id])
        const unowned = route.holds.filter(it => !naturalOwnedIds.includes(it.id))
        setUnownedHolds(unowned)
    }, [route]);

    return <Stack spacing={1} padding={'1rem'} style={{width: "100%"}}>
        {unownedHolds.toSorted((a, b) => a.id.localeCompare(b.id)).map(hold =>
            <SingleHold
                name={hold.id.substring(0, 4)}
                onHover={() => setHighlighted(hold.id)}
                onHoverEnd={() => setHighlighted(null)}
                onSelect={() => setSelected(hold.id)}
                isHovered={hold.id == highlighted}
                isSelected={hold.id == selected}
            />
        )}
        {route.naturals.toSorted((a, b) => a.id.localeCompare(b.id)).map(hold =>
            <NaturalHoldProps
                name={hold.id.substring(0, 4)}
                onHover={() => setHighlighted(hold.id)}
                onHoverEnd={() => setHighlighted(null)}
                onSelect={() => setSelected(hold.id)}
                isHovered={hold.id == highlighted}
                isSelected={hold.id == selected}
            />
        )}
    </Stack>
}

interface SingleHoldProps {
    name: string,
    onHover: () => void,
    onHoverEnd: () => void,
    onSelect: () => void,
    isHovered: boolean,
    isSelected: boolean
}

function SingleHold(props: SingleHoldProps) {
    return <>
        <Box style={{
            backgroundColor: props.isSelected ? (props.isHovered ? "#7fa6c9" : "#488bc7") : (props.isHovered ? "grey" : "#292929"),
            borderRadius: "10px",
            minHeight: "2.5rem",
            width: "100%"
        }}
             onMouseEnter={() => props.onHover()}
             onMouseLeave={() => props.onHoverEnd()}
             onClick={() => props.onSelect()}
        >
            <Stack direction={"row"} alignItems={"center"} padding={"0.5rem"}>
                <Typography fontWeight={"bold"}>Hold: </Typography>
                <Typography marginLeft={"auto"} fontWeight={"bold"}>{props.name}</Typography>
            </Stack>
        </Box>
    </>
}

function NaturalHoldProps(props: SingleHoldProps) {
    return <>
        <Box style={{
            backgroundColor: props.isSelected ? (props.isHovered ? lightenHexColor(selectColor, 0.3) : selectColor) : (props.isHovered ? lightenHexColor(offBlack, 0.3) : offBlack),
            borderRadius: "10px",
            minHeight: "2.5rem",
            width: "100%"
        }}
             onMouseEnter={() => props.onHover()}
             onMouseLeave={() => props.onHoverEnd()}
             onClick={() => props.onSelect()}
        >
            <Stack direction={"row"} alignItems={"center"} padding={"0.5rem"}>
                <Typography fontWeight={"bold"}>Natural Hold: </Typography>
                <Typography marginLeft={"auto"} fontWeight={"bold"}>{props.name}</Typography>
            </Stack>
        </Box>
    </>
}