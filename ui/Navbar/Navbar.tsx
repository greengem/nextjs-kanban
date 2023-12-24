import { auth } from "@/auth";
import NavbarWrapper from "./NavbarWrapper";

export default async function Navbar () {
    const session = await auth();

    if (!session) {
        return null;
    }

    const userName = session.user?.name ?? '';
    const userImage = session.user?.image ?? '';

    return (
        <nav className="
            flex gap-2 items-center justify-between
            px-5 py-1
            bg-zinc-900"
        >
            <NavbarWrapper userName={userName} userImage={userImage} />
        </nav>
    )

}
