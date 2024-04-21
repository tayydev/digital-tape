import Draggable from "react-draggable";
import React, {useRef, useEffect, useState, LegacyRef} from 'react';
import {ClimbingRoute, HoldData, NaturalData} from "@/app/editor/climbingRoute";
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
    const [possibleIds, setPossibleIds] = useState<string[]>([])

    useEffect(() => {
        const truth = selected != null
        if(selected != null) {
            const parent = route.naturals.filter(nat => nat.id == selected)
            if(parent.length > 0) {
                setPossibleIds([parent[0].hold1id, parent[0].id, parent[0].hold2id])
            }
            else {
                setPossibleIds([selected])
            }
        }
        else {
            setPossibleIds([selected ?? "help"])
        }
    }, [route, selected]);

    const handleStop = (id: string, data: { x: number; y: number }) => {
        const allChildren = route.naturals.flatMap(it => [it.hold1id, it.hold2id])
        setSelected(
            allChildren.includes(id)
                ? route.naturals.filter(nat => nat.hold1id == id || nat.hold2id == id)[0].id
                : id
        )

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
    };

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
            <div style={{ position: 'relative', width: '100%', height: 'auto'}}>
                <img
                    ref={ref as LegacyRef<HTMLImageElement>}
                    src={route.image}
                    alt={route.name}
                    style={{width: '100%', height: 'auto'}}
                />
                {route.holds.map((hold: HoldData) => (
                    <HoldNode
                        hold={hold}
                        setHighlighted={() => setHighlighted(hold.id)}
                        unHighlight={() => setHighlighted(null)}
                        isHighlighted={highlighted === hold.id}
                        isSelected={possibleIds.includes(hold.id)}
                        handleStop={handleStop}
                    />
                ))}
                {route.naturals.map((natural: NaturalData) => {
                    const hold1 = route.holds.find(hold => hold.id === natural.hold1id)!;
                    const hold2 = route.holds.find(hold => hold.id === natural.hold2id)!;

                    return (
                        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none'}}>
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
        </div>
    );
}

interface HoldNodeProps {
    hold: HoldData,
    setHighlighted: () => void,
    unHighlight: () => void,
    isHighlighted: boolean,
    isSelected: boolean,
    handleStop: (id: string, data: { x: number; y: number }) => void
}

function HoldNode(props: HoldNodeProps) {
    return <Draggable
            bounds={"parent"}
            key={props.hold.id}
            onStop={(e, data) => props.handleStop(props.hold.id, data)}
            position={{x: 0, y: 0}}
        >
            <div style={{
                position: "absolute",
                top: `${props.hold.y}%`,
                left: `${props.hold.x}%`,
                width: "1px",
                height: "1px",
            }}
                 onMouseEnter = {() => props.setHighlighted()}
                 onMouseLeave = {() => props.unHighlight()}
            >
                <svg width="50" height="50" style={{transform: "translate(-50%, -50%)"}}>
                    <circle
                        cx="25"
                        cy="25"
                        r="23"
                        fill={props.isHighlighted ? "url(#lightCautionPattern)" : "url(#cautionPattern)"}
                        stroke={props.isSelected ? selectColor : "none"}
                        strokeWidth={"3"}
                    />
                </svg>
            </div>
        </Draggable>
}