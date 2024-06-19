"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { handleCreateBoard } from "@/server-actions/BoardServerActions";
import { IconLoader2, IconPlus } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export default function CreateBoardForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsInvalid(false);
    setErrorMessage("");

    setIsSubmitting(true);
    const response = await handleCreateBoard({ title });
    setIsSubmitting(false);

    if (response.success && response.boardId) {
      router.push(`/board/${response.boardId}`);
      toast.success("Board Created!");
    } else {
      if (response.message) {
        setIsInvalid(true);
        setErrorMessage(response.message);
      }
      toast.error(response.message);
    }
  };

  return (
    <div className="p-3 bg-zinc-950 rounded-xl shadow-xl h-32">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-full justify-between"
      >
        <Input
          autoComplete="off"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Create a new board"
          placeholder="Enter board name"
          size="sm"
          isClearable
          isRequired
          isInvalid={isInvalid}
          errorMessage={errorMessage}
        />
        <div>
          <Button
            type="submit"
            size="sm"
            variant="flat"
            className="gap-1"
            isLoading={isSubmitting}
          >
            <IconPlus size={16} className="shrink-0" />
            Create Board
          </Button>
        </div>
      </form>
    </div>
  );
}
