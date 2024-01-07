'use server';
import prisma from '@/db/prisma';
import crypto from 'crypto';

export async function handleSendBoardInvitation({ boardId, userEmail }: { boardId: string; userEmail: string }) {
  try {
    // Check for an existing invitation
    const existingInvitation = await prisma.invitation.findFirst({
      where: {
        boardId: boardId,
        email: userEmail,
      },
    });

    if (existingInvitation) {
      return { success: false, message: 'An invitation has already been sent to this email.' };
    }

    // Generate a unique token
    const token = generateUniqueToken();

    // Create a new invitation record
    await prisma.invitation.create({
      data: {
        boardId: boardId,
        email: userEmail,
        token: token,
        status: 'pending',
      },
    });

    // Generate the invitation link
    const baseUrl = process.env.NEXTAUTH_URL;
    const invitationLink = `${baseUrl}/accept-invitation?token=${token}`;

    return { success: true, message: 'Invitation created', invitationLink };
  } catch (error) {
    console.error('Failed to create invitation:', error);
    return { success: false, message: 'Failed to create invitation' };
  }
}

// Utility function to generate a unique token
function generateUniqueToken() {
  return crypto.randomBytes(16).toString('hex');
}


export async function handleAcceptInvitation({ token, userId }: { token: string; userId: string }) {
  try {
    // Find the invitation by token
    const invitation = await prisma.invitation.findUnique({
      where: { token },
    });

    if (!invitation || invitation.status !== 'pending') {
      return { success: false, message: 'Invitation not valid or already processed.' };
    }

    // Add user to the board members
    await prisma.boardMember.create({
      data: {
        boardId: invitation.boardId,
        userId: userId,
        role: 'member',
      },
    });

    // Delete the invitation record
    await prisma.invitation.delete({ where: { id: invitation.id } });

    return { success: true, message: 'Invitation accepted successfully.' };
  } catch (error) {
    console.error('Failed to accept invitation:', error);
    return { success: false, message: 'Failed to accept invitation.' };
  }
}


export async function handleRejectInvitation({ token }: { token: string }) {
  try {
    // Find the invitation by token
    const invitation = await prisma.invitation.findUnique({
      where: { token },
    });

    if (!invitation || invitation.status !== 'pending') {
      return { success: false, message: 'Invitation not valid or already processed.' };
    }

    // Delete the invitation record
    await prisma.invitation.delete({ where: { id: invitation.id } });

    return { success: true, message: 'Invitation rejected successfully.' };
  } catch (error) {
    console.error('Failed to reject invitation:', error);
    return { success: false, message: 'Failed to reject invitation.' };
  }
}
