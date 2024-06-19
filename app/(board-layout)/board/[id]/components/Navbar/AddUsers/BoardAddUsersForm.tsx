import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { toast } from "sonner";
import { handleSendBoardInvitation } from "@/server-actions/InvitationServerActions";

export default function BoardAddUsersForm({
  boardId,
  isOwner,
  onInvitationLinkChange,
}: {
  boardId: string;
  isOwner: boolean;
  onInvitationLinkChange: (link: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInvite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      const response = await handleSendBoardInvitation({
        boardId,
        userEmail: email,
      });

      if (response.success && response.invitationLink) {
        onInvitationLinkChange(response.invitationLink);
        toast.success(response.message);
        setEmail("");
      } else {
        setError(response.message);
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error creating invitation:", error);
      toast.error("An error occurred while creating the invitation.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isOwner) {
    return (
      <form className="space-y-2" onSubmit={handleInvite}>
        <Input
          autoComplete="off"
          variant="bordered"
          size="sm"
          label="Email"
          placeholder="Invite by email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isInvalid={!!error}
          errorMessage={error}
        />
        <Button
          className="w-full"
          size="sm"
          type="submit"
          color="primary"
          isLoading={isLoading}
        >
          Send invite
        </Button>
      </form>
    );
  } else {
    return (
      <p className="text-danger">Only board owners can invite new users.</p>
    );
  }
}
