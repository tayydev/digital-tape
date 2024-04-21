import RouteEditor from "@/app/editor/editor";
import fs from "fs";
import path from "path";


export interface StaticData {
    json: Map<string, string> //json name, json content
    images: string[];
}

export default async function Page() {
    const data = await readDirectories()

    return (
        <main>
            <RouteEditor images={data} />
        </main>
    );
}

async function readDirectories() {
    const dir = path.join(process.cwd(), 'public/img')
    return fs.readdirSync(dir)
}
