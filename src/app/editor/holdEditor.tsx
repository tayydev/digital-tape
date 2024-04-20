import {ClimbingRoute} from "@/app/editor/climbingRoute";

interface HoldEditorProps {
    routeState: [ClimbingRoute, (value: (((prevState: ClimbingRoute) => ClimbingRoute) | ClimbingRoute)) => void]
}

export default function HoldEditor(prop: HoldEditorProps) {
    return <>
        Hello Hold Editor Friends
    </>
}