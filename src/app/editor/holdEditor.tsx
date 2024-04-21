import {ClimbingRoute, HoldData, NaturalData} from "@/app/editor/climbingRoute";
import Stack from "@mui/material/Stack";
import React, {useEffect, useState} from "react";
import {Box} from "@mui/system";
import {
    Button, Checkbox,
    createTheme,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import {lightenHexColor, offBlack, selectColor} from "@/app/theme";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {v4 as uuidv4} from "uuid";
import {saveAs} from "file-saver";
import {Dropdown} from "@mui/base";
import {HexColorPicker} from "react-colorful";
import {GetStaticProps} from "next";
import DeleteIcon from '@mui/icons-material/Delete';
import {DeleteOutline} from "@mui/icons-material";


// export async function getArticles(fs: any): Promise<string[]> {
//     const dir = path.join(process.cwd(), 'public/img')
//     const posts = fs.readdirSync(dir)
//     return
// }

interface HoldEditorProps {
    routeState: [ClimbingRoute, (value: (((prevState: ClimbingRoute) => ClimbingRoute) | ClimbingRoute)) => void]
    highlightedState: [string | null, (value: (((prevState: (string | null)) => (string | null)) | string | null)) => void]
    selectedState: [string | null, (value: (((prevState: (string | null)) => (string | null)) | string | null)) => void]
    imageNames: string[]
}

// Create a dark theme instance for a specific component.
const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const grades = ["5.5", "5.6", "5.7", "5.8", "5.9", "5.10", "5.11", "5.12", "5.13"]

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
        x += Math.random() * 20
        y += Math.random() * 20

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
        setSelected(
            newHold.id
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
                naturals: [...route.naturals, newNatural],
            }
        )

        setSelected(
            newNatural.id
        )
    }

    console.log("image", route.image)

    return <Stack spacing={1} padding={'1rem'} style={{width: "100%"}}>
        <Box/>
        <ThemeProvider theme={darkTheme}>
            <FormControl>
                <InputLabel id="demo-simple-select-img">Wall</InputLabel>
                <Select
                    value={route.image.substring(5)}
                    labelId="demo-simple-select-img"
                    label="Wall"
                    onChange={(event) => {
                        setRoute({
                            ...route,
                            image: `/img/${event.target.value}`
                        })
                    }}
                >
                    {props.imageNames.map(img =>
                        <MenuItem value={img}>{img}</MenuItem>
                    )}
                </Select>

            </FormControl>
            <TextField
                label={"Route Name"}
                variant={"outlined"}
                value={route.name}
                onChange={(event) => {
                    setRoute({
                        ...route,
                        name: event.target.value
                    })
                }}
            />
            {/*<Box/>*/}
            <Stack direction={"row"} spacing={1}>
                <TextField
                    style={{width: "50%"}}
                    label={"Setter"}
                    variant={"outlined"}
                    value={route.setter}
                    onChange={(event) => {
                        setRoute({
                            ...route,
                            setter: event.target.value
                        })
                    }}
                />
                <FormControl style={{width: "50%"}}>
                    <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                    <Select
                        value={route.grade}
                        labelId="demo-simple-select-label"
                        label="Grade"
                        onChange={(event) => {
                            setRoute({
                                ...route,
                                grade: event.target.value
                            })
                        }}
                    >
                        {grades.map(grade =>
                            <MenuItem value={grade}>{grade}</MenuItem>
                        )}
                    </Select>

                </FormControl>
            </Stack>
        </ThemeProvider>
        {/*<Box/>*/}
        <Stack direction={"row"} spacing={2} height={"12rem"}>
            <HexColorPicker
                style={{height: "100%", width: "50%"}}
                color={route.color1}
                onChange={(color) => {
                    setRoute({
                        ...route,
                        color1: color
                    })
                }}
            />
            <Stack style={{width: "50%", padding: 0}}>
                <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
                    <Typography>
                        Secondary Color?
                    </Typography>
                    <ThemeProvider theme={darkTheme}>
                        <Checkbox
                            checked={route.color2 != ""}
                            onChange={(event) => {
                                setRoute({
                                    ...route,
                                    color2: event.target.checked ? "#d64242" : ""
                                })
                            }}
                        />
                    </ThemeProvider>
                </Stack>
                {route.color2 !== ""
                    ? <HexColorPicker
                        style={{height: "100%", width: "100%"}}
                        color={route.color2}
                        onChange={(color) => {
                            setRoute({
                                ...route,
                                color2: color
                            })
                        }}
                    />
                    : <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "55%",
                        // backgroundColor: "#e0e0e0"
                    }}>
                        <Typography variant="subtitle2" color={"darkgray"}>
                            No Secondary Color
                        </Typography>
                    </div>
                }
            </Stack>
        </Stack>
        <Box/>
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
        <Stack spacing={1}>
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
                <Typography fontWeight={"bold"}>Hold </Typography>
                <Typography marginLeft={"0.5rem"} fontWeight={"bold"} color={"lightgrey"}>({props.name})</Typography>
                <Button
                    variant="text"
                    startIcon={
                        <Stack direction={"row"} justifyContent={"center"} style={{width: "100%"}}>
                            <DeleteOutline style={{margin: "0.5rem"}}/>
                        </Stack>
                    }
                    style={{ marginLeft: "auto", color: "red", minWidth: "0"}}
                />
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
                <Typography fontWeight={"bold"}>Natural Hold </Typography>
                <Typography marginLeft={"auto"} fontWeight={"bold"}>{props.name}</Typography>
            </Stack>
        </Box>
    </>
}