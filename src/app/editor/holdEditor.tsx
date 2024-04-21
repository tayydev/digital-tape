import {ClimbingRoute, HoldData, NaturalData} from "@/app/editor/climbingRoute";
import Stack from "@mui/material/Stack";
import {useEffect, useState} from "react";
import {Box} from "@mui/system";
import {Button, Typography} from "@mui/material";
import {lightenHexColor, offBlack, selectColor} from "@/app/theme";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {v4 as uuidv4} from "uuid";
import {saveAs} from "file-saver";

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

    function saveObjects() {
        const blob = new Blob([JSON.stringify(route)], {type: "text/plain;charset=utf-8"});
        saveAs(blob, `${route.name}.json`);
    };

    function createHold(x:number = 50, y: number = 50): HoldData { // these are percentages
        const newHold: HoldData = {
            id: uuidv4(),
            x: x,
            y: y,
        }
        setRoute(
            {
                ...route,
                holds: [...route.holds, newHold]
            }
        )
        return newHold;
    };

    function createNatural(){
        // Create a natural hold which contains two holds with a line between them
        const hold1id: HoldData = createHold(45, 50)
        const hold2id: HoldData = createHold(55, 50)

        const newNatural: NaturalData = {
            id: uuidv4(),
            hold1id: hold1id.id,
            hold2id: hold2id.id,
        }

        setRoute(
            // both holds and naturals are arrays, so we need to spread the existing
            // arrays and add the new hold and natural

            // because of the way state works in react, even though we call setRoute 3 times,
            // it only updates during the last call
            {
                ...route,
                holds: [...route.holds, hold1id, hold2id],
                naturals: [...route.naturals, newNatural]
            }
        )
    }


    return <Stack spacing={1} padding={'1rem'} style={{width: "100%"}}>
        <Stack direction={"row"} spacing={1} height={"2.5rem"}>
            <Button
                onClick={() => createHold()}
                variant="contained" style={{fontWeight: "bold", borderRadius: "10px", width: "33%"}}>
                <Stack direction={"row"} spacing={0.5}>
                    <AddCircleIcon/>
                    <Typography fontWeight={"bold"}>Hold</Typography>
                </Stack>
            </Button>
            <Button
                onClick={() => createNatural()}
                variant="contained" style={{fontWeight: "bold", borderRadius: "10px", width: "33%"}}>
                <Stack direction={"row"} spacing={0.5}>
                    <AddCircleIcon/>
                    <Typography fontWeight={"bold"}>Natural</Typography>
                </Stack>
            </Button>
            <Button
                onClick={() => saveObjects()}
                variant="contained" style={{fontWeight: "bold", borderRadius: "10px", width: "33%"}}>
                <Typography fontWeight={"bold"}>Export</Typography>
            </Button>
        </Stack>
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