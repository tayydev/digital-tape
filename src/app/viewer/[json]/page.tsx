import path from "path";
import fs from "fs";
import {ClimbingRoute} from "../../editor/climbingRoute";
import JsonPreview from "./previewJson";


export default async function Page({params}: { params: { json: string } }) {
    // const params = useParams();
    // const { json } = params
    const { json } = params
    const route = await readJson(json)
    return <JsonPreview json={route}/>
}

async function readDirectories() {
    const dir = path.join(process.cwd(), 'public/json')
    const images = fs.readdirSync(dir).map(file => path.basename(file, path.extname(file)));

    console.log("images being generated", images)

    return images  // Assuming content is to be split by lines into an array
}

async function readJson(json: string) {
    const filePath = path.join("./public/json", `${json}.json`);

    const data = fs.readFileSync(filePath, "utf8");
    const jsonData: ClimbingRoute = JSON.parse(data);
    return jsonData
}

export async function generateStaticParams() {
    const dirs = await readDirectories()

    return dirs.map(it => {
        return {
            json: it
        }
    })
}