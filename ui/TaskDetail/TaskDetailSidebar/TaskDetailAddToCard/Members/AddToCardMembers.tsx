"use client";
import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { IconPlus, IconUser, IconMinus } from "@tabler/icons-react";
import TaskPopoverWrapper from "../components/TaskPopoverWrapper";
import TaskPopoverHeading from "../components/TaskPopoverHeading";
import { Input } from "@nextui-org/input";
import { Avatar } from "@nextui-org/avatar";
import TaskPopoverSubtitle from "../components/TaskPopoverSubtitle";
import { Button } from "@nextui-org/react";
import {
  handleAddUserToTask,
  handleRemoveUserFromTask,
} from "@/actions/TaskServerActions";
import { BoardMemberWithUser, CardMemberWithUser } from "@/types/types";

interface AddToCardMembersProps {
  boardMembers: BoardMemberWithUser[];
  cardMembers: CardMemberWithUser[];
  taskId: string;
  boardId: string;
}

export default function AddToCardMembers({
  boardMembers,
  cardMembers,
  taskId,
  boardId,
}: AddToCardMembersProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const isMemberInCard = (userId: string) => {
    return cardMembers.some((member) => member.user.id === userId);
  };

  // Filter out board members who are already assigned to the task
  const availableBoardMembers = boardMembers.filter(
    (member) => !isMemberInCard(member.user.id),
  );

  const filteredMembers = availableBoardMembers.filter(
    (member) =>
      member.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddClick = async (userId: string) => {
    const result = await handleAddUserToTask(userId, taskId, boardId);
    console.log(result);
    // Optionally, update the UI based on the result
  };

  const handleRemoveClick = async (userId: string) => {
    const result = await handleRemoveUserFromTask(userId, taskId, boardId);
    console.log(result);
    // Optionally, update the UI based on the result
  };

  return (
    <li className="bg-zinc-900 hover:bg-zinc-800 ring-zinc-800 rounded-md ring-2 hover:ring-primary">
      <Popover placement="left-start" triggerScaleOnOpen={false}>
        <PopoverTrigger>
          <button className="flex items-center gap-2 px-2 py-2 w-full">
            <IconUser size={14} /> Members
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <TaskPopoverWrapper>
            <TaskPopoverHeading title="Members" />

            <Input
              placeholder="Search Members..."
              label="Members"
              className="mb-3"
              size="sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {cardMembers.length > 0 && (
              <>
                <TaskPopoverSubtitle>Card Members</TaskPopoverSubtitle>
                <ul className="flex flex-col gap-y-3 mb-5">
                  {cardMembers.map((cardMember) => (
                    <MemberListItem
                      key={cardMember.user.id}
                      member={cardMember}
                      onAddClick={handleAddClick}
                      onRemoveClick={handleRemoveClick}
                      isCardMember={true}
                    />
                  ))}
                </ul>
              </>
            )}

            {filteredMembers.length > 0 && (
              <>
                <TaskPopoverSubtitle>Board Members</TaskPopoverSubtitle>
                <ul className="flex flex-col gap-y-3 mb-5">
                  {filteredMembers.map((member) => (
                    <MemberListItem
                      key={member.user.id}
                      member={member}
                      onAddClick={handleAddClick}
                      onRemoveClick={handleRemoveClick}
                      isCardMember={false}
                    />
                  ))}
                </ul>
              </>
            )}
          </TaskPopoverWrapper>
        </PopoverContent>
      </Popover>
    </li>
  );
}

interface MemberListItemProps {
  member: BoardMemberWithUser | CardMemberWithUser;
  onAddClick: (userId: string) => void;
  onRemoveClick: (userId: string) => void;
  isCardMember: boolean;
}

function MemberListItem({
  member,
  onAddClick,
  onRemoveClick,
  isCardMember,
}: MemberListItemProps) {
  return (
    <li
      key={member.user.id}
      className="flex justify-between items-center grow py-1"
    >
      <div className="flex gap-3">
        <Avatar
          showFallback
          name={member.user.name || "Unknown"}
          src={member.user.image || undefined}
          isBordered
        />

        <div className="flex flex-col grow-0 shrink">
          <div className="truncate">{member.user.name || "Unknown"}</div>
          <div className="truncate text-zinc-400 text-xs">
            {member.user.email || "Unknown Email"}
          </div>
        </div>
      </div>

      <div>
        {isCardMember ? (
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onClick={() => onRemoveClick(member.user.id)}
          >
            <IconMinus size={18} /> {/* Change to minus icon */}
          </Button>
        ) : (
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onClick={() => onAddClick(member.user.id)}
          >
            <IconPlus size={18} />
          </Button>
        )}
      </div>
    </li>
  );
}
