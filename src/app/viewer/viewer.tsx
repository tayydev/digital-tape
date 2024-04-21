"use client"
import { Button } from '@mui/material';

interface RouteViewerProps {
    fileNames: string[]
}

export default function RouteViewer(props: RouteViewerProps) {

    console.log("got dirs", props.fileNames)

    const handleOpen = (file: any) => {
        window.location.href = `/viewer/${file}`;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
        {props.fileNames.map((file) => (
                <Button onClick={() => handleOpen(file)}>
                    {file}
                </Button>
            ))}
        </div>
    );
}