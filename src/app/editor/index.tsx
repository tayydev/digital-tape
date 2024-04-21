import type { InferGetStaticPropsType, GetStaticProps } from 'next'

import path from "path"
import fs from "fs"


//if this arcane magic doesn't work blame carson: (https://github.com/Mee42/carson.sh/blob/master/src/pages/blog.tsx)
export const getStaticProps: GetStaticProps = async (context) => {
    const dir = path.join(process.cwd(), 'public/img')
    const imageNames = fs.readdirSync(dir)
    // const fullPaths = posts.map((filename: string) => {
    //     const filepath = path.join(dir, filename)
    //     return fs.readFileSync(filepath, 'utf8')
    // })

    return {
        props: {
            images: imageNames,
        }
    }
}