import { auth } from "@/auth";
import { Suspense } from "react";
import { User } from "@nextui-org/user";

export default async function SidebarHeader() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const userName = session.user?.name ?? "";
  const userImage = session.user?.image ?? "";

  return (
    <div className="px-5 pt-3">
      <Suspense fallback={<User name="Loading..." />}>
        <User
          name={userName}
          description="Product Designer"
          avatarProps={{
            src: userImage,
          }}
        />
      </Suspense>
    </div>
  );
}
