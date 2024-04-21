import RouteViewer from "./viewer";
import path from "path";
import fs from "fs";

export default async function Page() {
    const directories = await readDirectories()

    return (
        <main>
            <RouteViewer fileNames={directories}/>
        </main>
    );
}

async function readDirectories() {
    const dir = path.join(process.cwd(), 'public/json')
    const files =  fs.readdirSync(dir)
    return files.map(file => file.substring(0, file.lastIndexOf(".")));
}
