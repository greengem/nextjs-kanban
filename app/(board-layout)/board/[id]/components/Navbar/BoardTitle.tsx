"use client";
import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";
import { handleEditBoard } from "@/server-actions/BoardServerActions";
import { IconX } from "@tabler/icons-react";

export default function BoardTitle({
  boardId,
  boardTitle,
}: {
  boardId: string;
  boardTitle: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(boardTitle);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setTitle(boardTitle);
      setIsInvalid(false);
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsInvalid(false);
    setErrorMessage("");

    if (title.trim().length < 3) {
      setIsInvalid(true);
      setErrorMessage("Title must be at least 3 characters long");
      return;
    }

    setIsSubmitting(true);
    const response = await handleEditBoard({ boardId, title });
    setIsSubmitting(false);

    if (response.success) {
      toast.success("Board Edited");
      setIsEditing(false);
    } else {
      if (response.message) {
        setIsInvalid(true);
        setErrorMessage(response.message);
      }
      toast.error(response.message);
    }
  };

  return (
    <>
      {!isEditing && (
        <h2
          onClick={toggleEdit}
          className="cursor-pointer whitespace-nowrap overflow-ellipsis block overflow-x-hidden max-w-32 md:max-w-64"
        >
          {boardTitle}
        </h2>
      )}
      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap md:flex-nowrap gap-2"
        >
          <Input
            autoComplete="off"
            value={title}
            size="sm"
            labelPlacement="outside"
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            className="grow shrink"
            isInvalid={isInvalid}
            errorMessage={errorMessage}
          />
          <Button
            type="submit"
            color="primary"
            size="sm"
            isDisabled={isSubmitting}
          >
            Save
          </Button>
          <Button onClick={toggleEdit} size="sm" isIconOnly>
            <IconX size={18} />
          </Button>
        </form>
      )}
    </>
  );
}
