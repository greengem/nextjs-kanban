import { auth } from "@/auth";
import NavbarAvatarClient from "./NavbarAvatar.client";

export default async function NavbarAvatar() {
    const session = await auth();

    if (!session) {
        return null;
    }

    const userName = session.user?.name ?? '';
    const userImage = session.user?.image ?? '';

    return (
        <NavbarAvatarClient userName={userName} userImage={userImage} />
    );
}
