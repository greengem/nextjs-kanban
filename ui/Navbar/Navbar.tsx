import { auth } from "@/auth";
import NavbarTitle from "./NavbarTitle";
import Image from "next/image";
import { IconInbox, IconNotification } from "@tabler/icons-react";
import { SignInButton, SignOutButton } from "../AuthButtons";

export default async function Navbar () {
    const session = await auth();
    const defaultImageUrl = "https://loremflickr.com/36/36";

    return (
        <nav className="flex px-5 py-2 bg-zinc-900 items-center justify-between">
            <NavbarTitle />
            <div className="flex gap-5 items-center">
                <div className="flex gap-2">
                    <SignInButton />
                    <SignOutButton />
                    <IconNotification />
                    <IconInbox size={24} />
                </div>
                <Image
                    src={session?.user?.image || defaultImageUrl}
                    height={36}
                    width={36}
                    className="p-1 rounded-full ring-2 ring-purple-500"
                    alt="User profile picture"
                />
            </div>
        </nav>
    )
}
