import prisma from '@/db/prisma';
import { auth } from "@/auth";
import InvitationButtons from './components/InvitationButtons';
import Link from 'next/link';

export default async function AcceptInvitation({ searchParams }: { searchParams: { token?: string } }) {
    const session = await auth();
    const token = searchParams.token;

    if (!token) {
        return <p>Invalid or missing token.</p>;
    }

    if (!session || !session.user || !session.user.email) {
        return <p><Link className='text-primary' href='/api/auth/signin'>Login or create an account</Link> to view this invitation.</p>;
    }

    try {
        const foundInvitation = await prisma.invitation.findFirst({
            where: {
                token: token,
                email: session.user.email,
            },
            include: {
                board: true,
            }
        });

        if (!foundInvitation) {
            return <p>Invitation not found, already processed, or you're not the intended recipient.</p>;
        }

        return (
            <>
                <h1 className='text-3xl font-semibold'>Accept Invite Page</h1>
                <p>Token result: {token}</p>
                <p>Invited to join board: {foundInvitation.board.title}</p>
                <InvitationButtons token={token} userId={session.user.id} boardId={foundInvitation.board.id} />
            </>
        );
    } catch (error) {
        return <p>An error occurred while verifying the token.</p>;
    }
}
