import { auth } from "@/auth";
import NavbarTitle from "./NavbarTitle";
import Image from "next/image";
import { SignOutButton } from "../AuthButtons";
import { Avatar } from "@nextui-org/avatar";
import ThemePicker from "./ColourPicker";
import ThemeNavbar from "./ThemeNavbar";

export default async function Navbar () {
    const session = await auth();
    const defaultImageUrl = "https://loremflickr.com/36/36";

    return (
        <>
        <nav className="flex gap-2 px-5 py-2 bg-zinc-900 items-center justify-between opacity-80">
            <NavbarTitle />
            <ThemeNavbar />
            <div className="w-8 flex justify-end shrink-0 grow-0">
                <Avatar isBordered color="primary" src={session?.user?.image || defaultImageUrl} size="sm" />
            </div>
        </nav>
        
        </>
    )
}
