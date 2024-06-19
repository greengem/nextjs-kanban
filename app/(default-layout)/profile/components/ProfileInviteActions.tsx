"use client";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { IconCheck, IconShare, IconX } from "@tabler/icons-react";
import {
  handleRejectInvitation,
  handleAcceptInvitation,
} from "@/server-actions/InvitationServerActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Spinner } from "@nextui-org/react";

interface Invitation {
  id: string;
  token: string;
  board: {
    title: string;
    id: string;
  };
  inviter: {
    name: string | null;
    email: string | null;
  };
}

interface SentInvitation {
  id: string;
  email: string;
  token: string;
  board: {
    title: string;
    id: string;
  };
}

export function ProfileInviteReceivedActions({
  invite,
  userId,
}: {
  invite: Invitation;
  userId: string;
}) {
  const router = useRouter();
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const handleAccept = async (token: string) => {
    setIsAccepting(true);
    try {
      const result = await handleAcceptInvitation({ token, userId });
      if (result.success) {
        toast.success(result.message);
        router.push(`/board/${invite.board.id}`);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred while accepting the invitation.");
    } finally {
      setIsAccepting(false);
    }
  };

  const handleReject = async (token: string) => {
    if (window.confirm("Are you sure you want to reject this invitation?")) {
      setIsRejecting(true);
      try {
        const result = await handleRejectInvitation({ token });
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("An error occurred while rejecting the invitation.");
      } finally {
        setIsRejecting(false);
      }
    }
  };

  return (
    <li className="border-b-1 last:border-b-0 border-zinc-700 py-1">
      <p className="mb-1">
        Invited to Board <strong>{invite.board.title}</strong> by{" "}
        <strong>{invite.inviter.name ?? "Unknown"}</strong> (
        {invite.inviter.email ?? "No Email"}) -{" "}
        <Link
          className="text-primary"
          href={`/accept-invitation/?token=${invite.token}`}
        >
          View
        </Link>
      </p>
      <div className="flex gap-3">
        <Button
          size="sm"
          onClick={() => handleAccept(invite.token)}
          isLoading={isAccepting}
          className="flex items-center"
        >
          <IconCheck size={16} />
          Accept
        </Button>
        <Button
          size="sm"
          onClick={() => handleReject(invite.token)}
          isLoading={isRejecting}
          className="flex items-center"
        >
          <IconX size={16} />
          Reject
        </Button>
      </div>
    </li>
  );
}

export function ProfileInviteSentActions({
  invite,
}: {
  invite: SentInvitation;
}) {
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelInvitation = async (token: string) => {
    if (window.confirm("Are you sure you want to cancel this invitation?")) {
      setIsCancelling(true);
      try {
        const result = await handleRejectInvitation({ token });
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Failed to cancel invitation.");
      } finally {
        setIsCancelling(false);
      }
    }
  };

  const invitationLink = `${process.env.NEXT_PUBLIC_AUTH_URL}/accept-invitation?token=${invite.token}`;

  return (
    <div className="flex gap-1 items-center">
      <button
        className="text-danger"
        onClick={() => handleCancelInvitation(invite.token)}
      >
        {isCancelling ? (
          <Spinner size="sm" color="danger" />
        ) : (
          <IconX size={22} />
        )}
      </button>
      <p>
        Sent to <strong>{invite.email}</strong> for Board{" "}
        <strong>{invite.board.title}</strong>
      </p>
      <span>
        <Link href={invitationLink} className="text-blue-500 underline">
          <IconShare size={16} />
        </Link>
      </span>
    </div>
  );
}
