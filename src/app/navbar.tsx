import {lightenHexColor, selectColor} from "@/app/theme";
import Stack from "@mui/material/Stack";
import {Typography} from "@mui/material";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav style={{ background: lightenHexColor(selectColor, -0.3), padding: "1rem" }}>
            <Stack direction="row" justifyContent="center" spacing={2}>
                <Link href="/">
                    <Typography variant={"h6"}>
                        About
                    </Typography>
                </Link>
                <Link href="/viewer">
                    <Typography variant={"h6"}>
                        Viewer
                    </Typography>
                </Link>
                <Link href="/editor">
                    <Typography variant={"h6"}>
                        Editor
                    </Typography>
                </Link>
            </Stack>
        </nav>
    );
};