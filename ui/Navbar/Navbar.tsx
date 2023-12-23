import { auth } from "@/auth";
import NavbarWrapper from "./NavbarWrapper";

export default async function Navbar () {
    const session = await auth();

    if (!session) {
        return null;
    }

    const userName = session.user?.name ?? '';
    const userImage = session.user?.image ?? '';

    return <NavbarWrapper userName={userName} userImage={userImage} />;
}
