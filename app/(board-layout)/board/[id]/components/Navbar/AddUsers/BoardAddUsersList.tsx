"use client";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";
import { IconMinus } from "@tabler/icons-react";
import { handleRemoveUserFromBoard } from "@/server-actions/InvitationActions";
import { toast } from "sonner";
import { BoardMemberWithUser } from "@/types/types";
import { User } from "@prisma/client";

interface BoardAddUsersListProps {
  owner: User | null;
  members: BoardMemberWithUser[];
  boardId: string;
  isOwner: boolean;
  loggedInUserId: string;
}

export default function BoardAddUsersList({
  owner,
  members,
  boardId,
  isOwner,
  loggedInUserId,
}: BoardAddUsersListProps) {
  const router = useRouter();

  const handleRemoveUser = async (userId: string) => {
    if (!confirm("Are you sure you want to remove this user?")) return;

    try {
      const response = await handleRemoveUserFromBoard({ boardId, userId });
      if (response.success) {
        //router.push('/board/');
        toast.success("User removed successfully");
      } else {
        toast.error(response.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error removing user:", error);
      toast.error("An error occurred while removing the user.");
    }
  };

  return (
    <ul className="mb-5">
      {owner && (
        <li className="flex gap-2 items-center border-b-1 border-zinc-800 last:border-b-0 py-3">
          <Avatar
            className="shrink-0 grow-0"
            showFallback
            isBordered
            color="primary"
            name={owner.name || ""}
            src={owner.image || undefined}
          />
          <div className="grow">
            <p>{owner.name || ""}</p>
            <p className="text-xs">Owner</p>
          </div>
        </li>
      )}
      {members.map((member) => (
        <li
          key={member.user.id}
          className="flex gap-2 items-center border-b-1 border-zinc-300 last:border-b-0 py-3"
        >
          <Avatar
            className="shrink-0 grow-0"
            showFallback
            isBordered
            name={member.user.name || ""}
            src={member.user.image || undefined}
          />
          <div className="grow">
            <p>{member.user.name || ""}</p>
            <p className="text-xs">Member</p>
          </div>
          {(isOwner || member.user.id === loggedInUserId) && (
            <Button
              size="sm"
              isIconOnly
              onClick={() => handleRemoveUser(member.user.id)}
            >
              <IconMinus size={16} />
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}
