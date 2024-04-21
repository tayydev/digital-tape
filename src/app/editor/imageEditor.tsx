import {saveAs} from "file-saver";
import Draggable from "react-draggable";
import React, { useRef, useEffect, useState } from 'react';
import {ClimbingRoute, HoldData, NaturalData} from "@/app/editor/climbingRoute";
import { v4 as uuidv4 } from 'uuid';
import {AtRule} from "csstype";
import { Button, colors } from "@mui/material";
import { lightenHexColor, selectColor } from "../theme";

interface Size {
    width: number;
    height: number;
}

const useComponentSize = (): [React.RefObject<HTMLDivElement>, Size] => {
    const ref = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<Size>({ width: 0, height: 0 });

    const handleResize = () => {
        if (ref.current) {
            setSize({
                width: ref.current.offsetWidth,
                height: ref.current.offsetHeight
            });
        }
    };

    useEffect(() => {
        handleResize(); // Set initial size
        window.addEventListener("resize", handleResize); // Adjust on window resize
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return [ref, size];
};


interface ImageEditorProps {
    routeState: [ClimbingRoute, (value: (((prevState: ClimbingRoute) => ClimbingRoute) | ClimbingRoute)) => void]
    highlightedState: [string | null, (value: (((prevState: (string | null)) => (string | null)) | string | null)) => void]
    selectedState: [string | null, (value: (((prevState: (string | null)) => (string | null)) | string | null)) => void]
}

export default function ImageEditor(props: ImageEditorProps) {
    const [route, setRoute] = props.routeState //climbing route state
    const [highlighted, setHighlighted] = props.highlightedState
    const [selected, setSelected] = props.selectedState
    const [ref, size] = useComponentSize() //image size state

    const handleStop = (id: string, data: { x: number; y: number }) => {
        setSelected(id)

        const parent = route.holds.filter(it => it.id == id)[0]
        const child: HoldData = {
            id: parent.id,
            x: (data.x / size.width) * 100 + parent.x,
            y: (data.y / size.height) * 100 + parent.y
        }
        setRoute(
            {
                ...route,
                holds: [...route.holds.filter(it => it.id != id), child]
            }
        )
        console.log(route.holds)
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

    function determineHoldColor(id: string): string {
        if (selected === id) {
            return selectColor;
        }
        if (highlighted === id) {
            return "url(#lightCautionPattern)";
        }
        return "url(#cautionPattern)";
    }

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

    const saveObjects = () => {
        const blob = new Blob([JSON.stringify(route)], {type: "text/plain;charset=utf-8"});
        saveAs(blob, `${route.name}.json`);
    };


    useEffect(() => {
        console.log("route update", route)
    }, [route]);

    return (
        <div>
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
                <pattern id="cautionPattern" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(-45)">
                    <rect width="10" height="20" fill={route.color1}/>
                    <rect x="10" width="10" height="20" fill={route.color2 ? route.color2 : route.color1}/>
                </pattern>
                <pattern id="lightCautionPattern" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(-45)">
                    <rect width="10" height="20" fill={lightenHexColor(route.color1, 0.2)}/>
                    <rect x="10" width="10" height="20" fill={route.color2 ? lightenHexColor(route.color2, 0.2) : lightenHexColor(route.color1, 0.2)}/>
                </pattern>
            </defs>
        </svg>
            <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
                <img
                    ref={ref}
                    src={route.image}
                    alt={route.name}
                    style={{width: '100%', height: 'auto'}}
                />
                {route.holds.map((hold: HoldData) => (
                    <Draggable
                        bounds={"parent"}
                        key={hold.id}
                        onStop={(e, data) => handleStop(hold.id, data)}
                        position={{x: 0, y: 0}}
                    >
                        <div style={{
                            position: "absolute",
                            top: `${hold.y}%`,
                            left: `${hold.x}%`,
                            width: "1px",
                            height: "1px",
                        }}
                             onMouseEnter = {() => setHighlighted(hold.id)}
                             onMouseLeave = {() => setHighlighted(null)}
                        >
                            <svg width="50" height="50" style={{transform: "translate(-50%, -50%)"}}>
                                <circle cx="25" cy="25" r="25" fill={determineHoldColor(hold.id)} />
                            </svg>
                            {/* <div style={{
                                position: "relative",
                                width: "50px",
                                height: "50px",
                                backgroundColor: determineHoldColor(hold.id),
                                borderRadius: "50%",
                                transform: "translate(-50%, -50%)", // This centers the box at the hold.x% and hold.y% position
                            }}
                            >
                            </div> */}
                        </div>
                    </Draggable>
                ))}
                {route.naturals.map((natural: NaturalData) => {
                    const hold1 = route.holds.find(hold => hold.id === natural.hold1id);
                    const hold2 = route.holds.find(hold => hold.id === natural.hold2id);

                    return (
                        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none'}}>
                            {/* <defs>
                                <pattern id="cautionPattern" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(-45)">
                                    <rect width="10" height="20" fill={route.color1}/>
                                    <rect x="10" width="10" height="20" fill={route.color2 ? route.color2 : route.color1}/>
                                </pattern>
                            </defs> */}
                            <line
                                x1={`${hold1.x}%`}
                                y1={`${hold1.y}%`}
                                x2={`${hold2.x}%`}
                                y2={`${hold2.y}%`}
                                stroke="url(#cautionPattern)"
                                strokeWidth=".5rem"
                            />
                            
                        </svg>
                    );
                })}
            </div>
            <Button onClick={() => createHold()}>Create Hold</Button>
            <Button onClick={createNatural}>Create Natural</Button>
            <Button onClick={saveObjects}>Save Objects</Button>
        </div>
    );
}