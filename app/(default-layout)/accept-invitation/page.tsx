import prisma from '@/db/prisma';
import { auth } from "@/auth";
import InvitationButtons from './components/InvitationButtons';
import Link from 'next/link';
import { Card } from '@/ui/Card/Card';

export default async function AcceptInvitation({ searchParams }: { searchParams: { token?: string } }) {
    const session = await auth();
    const token = searchParams.token;

    if (!token) {
        return <p>Invalid or missing token.</p>;
    }

    if (!session || !session.user || !session.user.email || !session.user.id) {
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
                inviter: true,
            }
        });
        

        if (!foundInvitation) {
            return <p>Invitation not found, already processed, or you're not the intended recipient.</p>;
        }

        return (
            <div className='flex flex-col grow justify-center items-center'>
                <div className='shadow-xl rounded-xl bg-white p-3 max-w-96 mx-auto w-full text-center'>
                    <div className="my-5">
                        <h1 className='text-4xl font-semibold tracking-tight'>You're Invited!</h1>
                        <p className="text-zinc-800 text-sm">A new opportunity to collaborate awaits you ✨</p>
                    </div>

                    <div className='my-5'>
                        <h2><strong>Invited by:</strong> {foundInvitation.inviter.name}</h2>
                        <h2><strong>Board:</strong> {foundInvitation.board.title}</h2>
                    </div>
                    
                    <InvitationButtons token={token} userId={session.user.id} boardId={foundInvitation.board.id} />
                </div>
            </div>
        );
    } catch (error) {
        return <p>An error occurred while verifying the token.</p>;
    }
}
