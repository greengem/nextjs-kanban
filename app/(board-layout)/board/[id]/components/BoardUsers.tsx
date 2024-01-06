import { auth } from "@/auth";
import {Avatar, AvatarGroup} from "@nextui-org/avatar";

export default async function BoardUsers() {
    const session = await auth();
    const userId = session?.user?.id;
  
    if (!userId) {
      return <div>User not authenticated</div>;
    }

    return (
        <AvatarGroup isBordered size="sm" color="primary">
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
        </AvatarGroup>
    )
}