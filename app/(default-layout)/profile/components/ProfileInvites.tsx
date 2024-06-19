import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import {
  ProfileInviteReceivedActions,
  ProfileInviteSentActions,
} from "./ProfileInviteActions";

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

export default async function ProfileInvites() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return <div>User is not authenticated or user ID is not available.</div>;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true },
  });

  if (!user || !user.email) {
    return <div>No invitations found.</div>;
  }

  const sentInvitations = await prisma.invitation.findMany({
    where: {
      board: {
        members: {
          some: {
            userId: userId,
            role: "owner",
          },
        },
      },
    },
    include: {
      board: true,
    },
  });

  const receivedInvitations = await prisma.invitation.findMany({
    where: {
      email: user.email,
    },
    include: {
      board: true,
      inviter: true,
    },
  });

  return (
    <div className="grid grid-cols-1">
      <div>
        <h4 className="font-semibold">Sent Invitations</h4>
        {sentInvitations.length > 0 ? (
          <ul className="mb-2">
            {sentInvitations.map((invite: SentInvitation) => (
              <li
                key={invite.id}
                className="flex gap-1 items-center border-b-1 last:border-b-0 border-zinc-700 py-1 text-zinc-300"
              >
                <ProfileInviteSentActions invite={invite} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-zinc-300">No sent invitations.</p>
        )}
      </div>

      <div>
        <h4 className="font-semibold">Received Invitations</h4>
        {receivedInvitations.length > 0 ? (
          <ul>
            {receivedInvitations.map((invite: Invitation) => (
              <ProfileInviteReceivedActions
                key={invite.id}
                invite={invite}
                userId={userId}
              />
            ))}
          </ul>
        ) : (
          <p>No received invitations.</p>
        )}
      </div>
    </div>
  );
}
