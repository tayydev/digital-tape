import {v4 as uuidv4} from "uuid";

export interface ClimbingRoute {
    id: string
    name: string //route name
    grade: string
    setter: string
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

export const defaultRoute: ClimbingRoute = {
    id: uuidv4(),
    name: "Untitled",
    grade: "5.5",
    setter: "",
    image: "/img/rope1.jpeg",
    color1: "#09e570",
    color2: "",
    holds: [],
    naturals: []
};
