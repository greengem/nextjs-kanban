import { auth } from "@/auth";
import NavbarWrapper from "./NavbarWrapper";

export default async function Navbar () {
    const session = await auth();

    if (!session) {
        return null;
    }

    return <NavbarWrapper session={session} />;
}
