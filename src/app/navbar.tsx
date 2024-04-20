import Link from "next/link";

export default function Navbar() {
    return (
        <nav style={{ background: "blue", padding: "1rem" }}>
            <Link href="/">
                About
            </Link>
            <Link href={"/viewer"}>
                Viewer
            </Link>
            <Link href={"/editor"}>
                Editor
            </Link>
        </nav>
    );
};