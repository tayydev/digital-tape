import {ClimbingRoute, HoldData} from "@/app/editor/climbingRoute";
import Stack from "@mui/material/Stack";
import {useEffect, useState} from "react";
import {Box} from "@mui/system";
import {TextField, Typography} from "@mui/material";

interface HoldEditorProps {
    routeState: [ClimbingRoute, (value: (((prevState: ClimbingRoute) => ClimbingRoute) | ClimbingRoute)) => void]
}

export default function HoldEditor(props: HoldEditorProps) {
    const [route, setRoute] = props.routeState
    //we want to take our holds and naturals and make a list of effective hold ids
    const [unownedHolds, setUnownedHolds] = useState<HoldData[]>([])

    useEffect(() => {
        const naturalOwnedIds = route.naturals.flatMap(it => [it.hold1id, it.hold2id])
        const unowned = route.holds.filter(it => !naturalOwnedIds.includes(it.id))
        setUnownedHolds(unowned)
    }, [route]);

    return <Stack spacing={1} padding={'1rem'} style={{width: "100%"}}>
        {unownedHolds.map(hold =>
            <SingleHold
                name={hold.id.substring(0, 4)}
                onHover={() => {}}
                onSelect={() => {}}
                isHovered={false}
                isSelected={false}
            />
        )}
    </Stack>
}

interface SingleHoldProps {
    name: string,
    onHover: () => void,
    onSelect: () => void,
    isHovered: boolean,
    isSelected: boolean
}

function SingleHold(props: SingleHoldProps) {
    return <>
        <Box style={{
            backgroundColor: "darkgray",
            borderRadius: "10px",
            minHeight: "2.5rem",
            width: "100%"
        }}>
            <Stack direction={"row"} alignItems={"center"} padding={"0.5rem"}>
                <Typography fontWeight={"bold"}>Hold: </Typography>
                <Typography marginLeft={"auto"} fontWeight={"bold"}>{props.name}</Typography>
            </Stack>
        </Box>
    </>
}