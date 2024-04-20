import {randomUUID, UUID} from "node:crypto";

export interface Route {
    id: UUID
    name: string //route name
    image: string //image loc
    color1: string
    color2: string
    holds: HoldData[]
    naturals: NaturalData[]
}

export interface HoldData {
    id: UUID
    x: number
    y: number
}

export interface NaturalData {
    id: UUID
    x1: number
    y1: number
    x2: number
    y2: number
}

export const exampleRoute: Route = {
    id: randomUUID(),
    name: "Sunset Climb",
    image: "path/to/sunset_climb.jpg",
    color1: "#FF5733",
    color2: "#C70039",
    holds: [
        { id: randomUUID(), x: 15, y: 20 },
        { id: randomUUID(), x: 30, y: 50 },
        { id: randomUUID(), x: 45, y: 75 }
    ],
    naturals: [
        { id: randomUUID(), x1: 60, y1: 100, x2: 65, y2: 105 },
        { id: randomUUID(), x1: 70, y1: 110, x2: 75, y2: 115 }
    ]
};
