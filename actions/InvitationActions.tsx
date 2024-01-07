import prisma from '@/db/prisma';
import crypto from 'crypto';
import { Resend } from 'resend';

export async function handleSendBoardInvitation({ boardId, userEmail } : { boardId: string; userEmail: string }) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const token = generateUniqueToken();

    // Create an invitation record
    const invitation = await prisma.invitation.create({
      data: {
        boardId: boardId,
        email: userEmail,
        token: token,
        status: 'pending',
      },
    });

    // Send an email with the invitation link
    const invitationLink = `https://nextjs-kanban-psi.vercel.app/accept-invitation?token=${token}`;
    await resend.emails.send({
      from: 'nextboardapp@gmail.com',
      to: userEmail,
      subject: 'You are invited to join a board',
      html: `<p>You have been invited to join a board. Click <a href="${invitationLink}">here</a> to accept the invitation.</p>`,
    });

    return { success: true, message: 'Invitation sent' };
  } catch (error) {
    console.error('Failed to send invitation:', error);
    return { success: false, message: 'Failed to send invitation' };
  }
}

// Utility function to generate a unique token
function generateUniqueToken() {
  return crypto.randomBytes(16).toString('hex');
}
