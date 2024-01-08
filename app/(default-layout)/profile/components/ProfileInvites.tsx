import { auth } from "@/auth";
import prisma from '@/db/prisma';
import { Button } from "@nextui-org/button";
import { IconCheck, IconX } from "@tabler/icons-react";

export default async function ProfileInvites() {
    const session = await auth();
    const userId = session?.user?.id;

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { email: true }
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
                role: 'owner'
              }
            }
          }
        },
        include: {
          board: true
        }
      });

      const receivedInvitations = await prisma.invitation.findMany({
        where: {
          email: user.email
        },
        include: {
          board: true
        }
      });

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
                <h4 className="font-semibold">Sent Invitations</h4>
                {sentInvitations.length > 0 ? (
                    <ul className="mb-2">
                        {sentInvitations.map(invite => (
                            <li key={invite.id} className="flex gap-1 items-center border-b-1 last:border-b-0 border-zinc-300 py-1">
                                <button><IconX className="text-danger" size={16} /></button>
                                <p>Sent to: {invite.email} for Board: {invite.board.title}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No sent invitations.</p>
                )}
            </div>
            
            <div>
                <h4 className="font-semibold">Received Invitations</h4>
                {receivedInvitations.length > 0 ? (
                    <ul>
                        {receivedInvitations.map(invite => (
                            <li key={invite.id} className="border-b-1 last:border-b-0 border-zinc-300 py-1">
                                <p>From Board: {invite.board.title}</p>
                                <div className="flex gap-2">
                                    <Button size="sm"><IconCheck className="text-success" size={16} />Accept</Button>
                                    <Button size="sm"><IconX className="text-danger" size={16} />Reject</Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No received invitations.</p>
                )}
            </div>
        </div>
    );
    
}
