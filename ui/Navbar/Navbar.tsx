import { auth } from "@/auth";
import NavbarTitle from "./NavbarTitle";
import ColourPicker from "./ColourPicker";
import NavbarAvatar from "./NavbarAvatar";

export default async function Navbar () {
    const session = await auth();

    return (
        <>
            <nav className="flex gap-2 px-5 py-2 bg-zinc-900 items-center justify-between opacity-80">
                <NavbarTitle />
                <ColourPicker />
                <NavbarAvatar userAvatar={session?.user?.image} userName={session?.user?.name} />
            </nav>
        </>
    )
}
