"use client";
import { Button } from "@nextui-org/button";
import { IconCheck, IconShare, IconX } from "@tabler/icons-react";
import {
  handleRejectInvitation,
  handleAcceptInvitation,
} from "@/server-actions/InvitationActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

  const handleAccept = async (token: string) => {
    try {
      const result = await handleAcceptInvitation({ token, userId });
      if (result.success) {
        toast.success(result.message);
        router.push(`/board/${invite.board.id}`);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Failed to accept invitation:", error);
    }
  };

  const handleReject = async (token: string) => {
    if (window.confirm("Are you sure you want to reject this invitation?")) {
      try {
        const result = await handleRejectInvitation({ token });
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Failed to reject invitation:", error);
      }
    }
  };

  return (
    <li className="border-b-1 last:border-b-0 border-zinc-300 py-1">
      <p>
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
      <div className="flex gap-2">
        <Button size="sm" onClick={() => handleAccept(invite.token)}>
          <IconCheck className="text-success" size={16} />
          Accept
        </Button>
        <Button size="sm" onClick={() => handleReject(invite.token)}>
          <IconX className="text-danger" size={16} />
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
  const handleCancelInvitation = async (token: string) => {
    if (window.confirm("Are you sure you want to cancel this invitation?")) {
      try {
        const result = await handleRejectInvitation({ token });
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Failed to cancel invitation:", error);
        toast.error("Failed to cancel invitation.");
      }
    }
  };

  const invitationLink = `${process.env.NEXT_PUBLIC_AUTH_URL}/accept-invitation?token=${invite.token}`;

  return (
    <div className="flex gap-2 items-center">
      <button onClick={() => handleCancelInvitation(invite.token)}>
        <IconX className="text-danger" size={16} />
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
