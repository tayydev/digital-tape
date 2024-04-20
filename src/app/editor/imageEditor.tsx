import {saveAs} from "file-saver";
import Draggable from "react-draggable";
import React, { useRef, useEffect, useState } from 'react';
import {ClimbingRoute, HoldData} from "@/app/editor/climbingRoute";
import { v4 as uuidv4 } from 'uuid';
import {AtRule} from "csstype";

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
}

export default function ImageEditor(props: ImageEditorProps) {
    const [route, setRoute] = props.routeState //climbing route state
    const [ref, size] = useComponentSize() //image size state

    const handleStop = (id: string, data: { x: number; y: number }) => {
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
        console.log(route.holds[0])
    };

    const createHold = () => {
        const newHold: HoldData = {
            id: uuidv4(),
            x: 50,  //These are percentages
            y: 50
        }
        setRoute(
            {
                ...route,
                holds: [...route.holds, newHold]
            }
        )
    };

    const saveObjects = () => {
        const blob = new Blob([JSON.stringify(route)], {type: "text/plain;charset=utf-8"});
        saveAs(blob, `${route.name}.json`);
    };


    useEffect(() => {
        console.log("route update", route)
    }, [route]);

    return (
        <div>
            <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
                <img
                    ref={ref}
                    src={route.image}
                    alt={route.name}
                    style={{width: '100%', height: 'auto' }}
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
                        }}>
                            <div style={{
                                position: "relative",
                                width: "50px",
                                height: "50px",
                                backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent white box
                                transform: "translate(-50%, -50%)", // This centers the box at the hold.x% and hold.y% position
                            }}>
                            </div>
                        </div>
                    </Draggable>
                ))}
            </div>
            <button onClick={createHold}>Create Hold</button>
            {/* <button onClick={createNatural}>Create Natural</button> */}
            <button onClick={saveObjects}>Save Objects</button>
        </div>
    );
}