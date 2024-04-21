import fs from "fs";
import path from "path";
import {ClimbingRoute} from "./climbingRoute";
import RouteEditor from "./editor";


export interface StaticData {
    json: Map<string, string> //json name, json content
    images: string[];
}

export default async function Page() {
    const data = await readDirectories()
    const route = await readJson("treeHugger")

    return (
        <main>
            <RouteEditor images={data} starterRoute={route} />
        </main>
    );
}

async function readDirectories() {
    const dir = path.join(process.cwd(), 'public/img')
    return fs.readdirSync(dir)
}

async function readJson(json: string) {
    const filePath = path.join("./public/json", `${json}.json`);

    const data = fs.readFileSync(filePath, "utf8");
    const jsonData: ClimbingRoute = JSON.parse(data);
    return jsonData
}
