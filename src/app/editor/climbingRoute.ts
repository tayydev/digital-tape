import {v4 as uuidv4} from "uuid";

export interface ClimbingRoute {
    id: string
    name: string //route name
    image: string //image loc
    color1: string
    color2: string
    holds: HoldData[]
    naturals: NaturalData[]
}

export interface HoldData {
    id: string
    x: number
    y: number
}

export interface NaturalData {
    id: string
    hold1id: string
    hold2id: string
}

export const exampleRoute: ClimbingRoute = {
    id: uuidv4(),
    name: "Sunset Climb",
    image: "path/to/sunset_climb.jpg",
    color1: "#FF5733",
    color2: "#C70039",
    holds: [
        { id: uuidv4(), x: 15, y: 20 },
        { id: uuidv4(), x: 30, y: 50 },
        { id: uuidv4(), x: 45, y: 75 }
    ],
    naturals: [
        { id: uuidv4(), x1: 60, y1: 100, x2: 65, y2: 105 },
        { id: uuidv4(), x1: 70, y1: 110, x2: 75, y2: 115 }
    ]
};

export const defaultRoute: ClimbingRoute = {
    id: uuidv4(),
    name: "Untitled",
    image: "/resources/MOCK_rock_wall.jpg",
    color1: "#FF5733",
    color2: "#C70039",
    holds: [],
    naturals: []
};
