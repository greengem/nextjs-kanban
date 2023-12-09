import { auth } from "@/auth";
import NavbarWrapper from "./NavbarWrapper";

export default async function Navbar () {
    const session = await auth();
    return <NavbarWrapper userAvatar={session?.user?.image} userName={session?.user?.name} />;
}
