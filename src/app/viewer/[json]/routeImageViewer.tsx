import { LegacyRef, useRef } from "react";
import { ClimbingRoute, HoldData, NaturalData } from "../../editor/climbingRoute";
import { lightenHexColor } from "../../theme";

interface RouteViewerProps {
    climbingRoute: ClimbingRoute
}

function hexToRgba(hex: string, alpha: number): string {
    const [r, g, b] = hex.match(/\w\w/g)!.map(x => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
}

export default function RouteImageViewer(props: RouteViewerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const opacity = 0.75;

return (
    <div>
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
                <pattern id="cautionPattern" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(-45)">
                    <rect width="10" height="20" fill={hexToRgba(props.climbingRoute.color1, opacity)}/>
                    <rect x="10" width="10" height="20" fill={props.climbingRoute.color2 ? hexToRgba(props.climbingRoute.color2, opacity) : hexToRgba(props.climbingRoute.color1, opacity)}/>
                </pattern>
                <pattern id="lightCautionPattern" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(-45)">
                    <rect width="10" height="20" fill={hexToRgba(lightenHexColor(props.climbingRoute.color1, 0.2), opacity)}/>
                    <rect x="10" width="10" height="20" fill={props.climbingRoute.color2 ? hexToRgba(lightenHexColor(props.climbingRoute.color2, 0.2), opacity) : hexToRgba(lightenHexColor(props.climbingRoute.color1, 0.2), opacity)}/>
                </pattern>
        </defs>
    </svg>
        <div style={{ position: 'relative', width: '100%', height: 'auto'}}>
            <img
                ref={ref as LegacyRef<HTMLImageElement>}
                src={props.climbingRoute.image}
                alt={props.climbingRoute.name}
                style={{width: '100%', height: 'auto'}}
            />
            {props.climbingRoute.holds.map((hold: HoldData) => (
                <HoldNode hold={hold} key={hold.id} />
            ))}
            {props.climbingRoute.naturals.map((natural: NaturalData) => {
                const hold1 = props.climbingRoute.holds.find(hold => hold.id === natural.hold1id)!;
                const hold2 = props.climbingRoute.holds.find(hold => hold.id === natural.hold2id)!;

                return (
                    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none'}}>
                        <line
                            x1={`${hold1.x}%`}
                            y1={`${hold1.y}%`}
                            x2={`${hold2.x}%`}
                            y2={`${hold2.y}%`}
                            stroke="url(#cautionPattern)"
                            strokeWidth="1vw"
                        />
                    </svg>
                );
            })}
        </div>
    </div>
);
}
interface HoldNodeProps{
    hold: HoldData
}

function HoldNode({hold}: HoldNodeProps) {
return  <div style={{
            position: "absolute",
            top: `${hold.y}%`,
            left: `${hold.x}%`,
            width: "1px",
            height: "1px",
        }}
        >
            <svg width="5vw" height="5vw" style={{transform: "translate(-50%, -50%)"}}>
                    <circle
                        cx="2.5vw"
                        cy="2.5vw"
                        r="2vw"
                        fill={"url(#cautionPattern)"}
                    />
                </svg>
        </div>
}