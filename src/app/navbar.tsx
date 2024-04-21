"use client"

import { usePathname } from "next/navigation";
import { lightenHexColor, selectColor } from "@/app/theme";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import Link from "next/link";
import {offBlack} from "./theme";

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path;
    };

    const linkStyle = (path: string) => ({
        color: isActive(path) ? offBlack : "inherit",
    });

    return (
        <nav style={{ background: lightenHexColor(selectColor, -0.3), padding: "1rem" }}>
            <Stack direction="row" justifyContent="center" spacing={2}>
                <Link href="/">
                    <Typography variant="h6" style={linkStyle("/")}>
                        About
                    </Typography>
                </Link>
                <Link href="/viewer">
                    <Typography variant="h6" style={linkStyle("/viewer")}>
                        Viewer
                    </Typography>
                </Link>
                <Link href="/editor">
                    <Typography variant="h6" style={linkStyle("/editor")}>
                        Editor
                    </Typography>
                </Link>
            </Stack>
        </nav>
    );
};
