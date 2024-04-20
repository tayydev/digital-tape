import {saveAs} from "file-saver";
import Draggable from "react-draggable";
import React from "react";
import {ClimbingRoute, HoldData} from "@/app/editor/climbingRoute";
import { v4 as uuidv4 } from 'uuid';

interface ImageEditorProps {
    routeState: [ClimbingRoute, (value: (((prevState: ClimbingRoute) => ClimbingRoute) | ClimbingRoute)) => void]
}

export default function ImageEditor(props: ImageEditorProps) {
    const [route, setRoute] = props.routeState

    const handleStop = (id: string, mysticalIgnoredParameter: any, data: { x: number; y: number }) => {
        const hold = route.holds.filter(it => it.id == id)[0]
        hold.x = data.x
        hold.y = data.y
        setRoute(route)
    };

    const createObject = () => {
        const newHold: HoldData = {
            // id: randomUUID(),
            id: uuidv4(),
            x: 0,
            y: 0
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

    return (
        <div>
            <img src={route.image} alt={route.name} style={{ position: 'relative' }} />
            {route.holds.map((object) => (
                <Draggable
                    key={object.id}
                    defaultPosition={{ x: object.x, y: object.y }}
                    onStop={(e, data) => handleStop(object.id, e, data)}
                >
                    <div style={{ position: 'absolute' }}>Object {object.id}</div>
                </Draggable>
            ))}
            <button onClick={createObject}>Create Object</button>
            <button onClick={saveObjects}>Save Objects</button>
        </div>
    );
}