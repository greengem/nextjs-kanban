import { auth } from "@/auth";
import { Suspense } from "react";
import { Avatar } from "@nextui-org/avatar";
import NavbarAvatarClient from "./NavbarAvatar.client";

export default async function NavbarAvatar() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const userName = session.user?.name ?? "";
  const userImage = session.user?.image ?? "";

  return (
    <Suspense
    fallback={
      <Avatar showFallback isBordered size="sm" className="dark" />
    }
  >
      <NavbarAvatarClient userName={userName} userImage={userImage} />
    </Suspense>
  );
}
