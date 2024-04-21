"use client"
import { Button, Modal } from '@mui/material';
import { useEffect, useState } from 'react';

export default function RouteViewer() {
    const [files, setFiles] = useState<{name: string}[]>([]);
    const [selectedFile, setSelectedFile] = useState<any | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fileNames = ['example.json', 'example2.json'];

        Promise.all(
            fileNames.map(fileName => 
                fetch(`/json/${fileName}`)
                    .then(response => response.json())
            )
        ).then(data => setFiles(data.flat()));
    }, []);

    const handleOpen = (file: any) => {
        setSelectedFile(file);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
        {files.map((file: any, index: any) => (
                <Button key={index} onClick={() => handleOpen(file)}>
                    {file.name}
                </Button>
            ))}
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {selectedFile && (
                        <>
                            <h2>{selectedFile.name}</h2>
                            <img src={selectedFile.image} alt={selectedFile.name} style = {{width: "50%"}} />
                            <Button onClick={handleClose}>Close</Button>
                        </>
                    )}
                </div>
            </Modal>
        </div>
    );
}