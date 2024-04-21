import RouteViewer from "./viewer";
import path from "path";
import fs from "fs";
import {ClimbingRoute} from "../editor/climbingRoute";

export default async function Page() {
    const directories = await readDirectories()

    return (
        <main>
            <RouteViewer routes={directories}/>
        </main>
    );
}

async function readDirectories() {
    const dir = path.join(process.cwd(), 'public/json')
    const files =  fs.readdirSync(dir)

    const routesMap = new Map<string, ClimbingRoute>();
    files.forEach(file => {
        const fileName = file.substring(0, file.lastIndexOf("."));
        const fileContent = fs.readFileSync(path.join(dir, file), "utf-8");
        routesMap.set(fileName, JSON.parse(fileContent) as ClimbingRoute);
    });
    return routesMap;
}
