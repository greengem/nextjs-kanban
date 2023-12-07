import { auth } from "@/auth";
import NavbarTitle from "./NavbarTitle";
import Image from "next/image";
import { SignOutButton } from "../AuthButtons";
import { Avatar } from "@nextui-org/avatar";

export default async function Navbar () {
    const session = await auth();
    const defaultImageUrl = "https://loremflickr.com/36/36";

    return (
        <nav className="flex px-5 py-2 bg-zinc-900 items-center justify-between">
            <NavbarTitle />
            <div className="flex gap-5 items-center">
                <div className="flex gap-2">
                    <SignOutButton />
                </div>
                <Avatar isBordered color="secondary" src={session?.user?.image || defaultImageUrl} size="sm" />
            </div>
        </nav>
    )
}
