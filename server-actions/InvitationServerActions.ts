"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { z } from "zod";
import crypto from "crypto";
import { MESSAGES } from "@/utils/messages";

// Send board invitation
export async function handleSendBoardInvitation({
  boardId,
  userEmail,
}: {
  boardId: string;
  userEmail: string;
}) {
  const session = await auth();
  const loggedInUserId = session?.user?.id;

  if (!loggedInUserId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const SendBoardInvitationSchema = z.object({
    boardId: z.string().min(1, MESSAGES.COMMON.BOARD_ID_REQUIRED),
    userEmail: z.string().email(MESSAGES.INVITATION.USER_EMAIL_REQUIRED),
  });

  const data = { boardId, userEmail };
  const parse = SendBoardInvitationSchema.safeParse(data);

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    // Check for an existing invitation
    const existingInvitation = await prisma.invitation.findFirst({
      where: {
        boardId: parse.data.boardId,
        email: parse.data.userEmail,
      },
    });

    if (existingInvitation) {
      return {
        success: false,
        message: MESSAGES.INVITATION.INVITATION_ALREADY_SENT,
      };
    }

    // Generate a unique token
    const token = generateUniqueToken();

    // Create a new invitation record
    await prisma.invitation.create({
      data: {
        boardId: parse.data.boardId,
        email: parse.data.userEmail,
        token: token,
        inviterId: loggedInUserId,
      },
    });

    // Generate the invitation link
    const baseUrl = process.env.AUTH_URL;
    const invitationLink = `${baseUrl}/accept-invitation?token=${token}`;

    revalidatePath(`/profile/`);

    return {
      success: true,
      message: MESSAGES.INVITATION.CREATE_SUCCESS,
      invitationLink,
    };
  } catch (error) {
    console.error("Failed to create invitation:", error);
    return { success: false, message: MESSAGES.INVITATION.CREATE_FAILURE };
  }

  // Utility function to generate a unique token
  function generateUniqueToken() {
    return crypto.randomBytes(16).toString("hex");
  }
}

// Accept board invitation
export async function handleAcceptInvitation({
  token,
  userId,
}: {
  token: string;
  userId: string;
}) {
  const session = await auth();
  const loggedInUserId = session?.user?.id;

  if (!loggedInUserId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const AcceptInvitationSchema = z.object({
    token: z.string().min(1, MESSAGES.INVITATION.TOKEN_REQUIRED),
    userId: z.string().min(1, MESSAGES.INVITATION.USER_ID_REQUIRED),
  });

  const data = { token, userId };
  const parse = AcceptInvitationSchema.safeParse(data);

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    // Find the invitation by token
    const invitation = await prisma.invitation.findUnique({
      where: { token: parse.data.token },
    });

    if (!invitation) {
      return {
        success: false,
        message: MESSAGES.INVITATION.INVALID_OR_PROCESSED,
      };
    }

    // Add user to the board members
    await prisma.boardMember.create({
      data: {
        boardId: invitation.boardId,
        userId: parse.data.userId,
        role: "member",
      },
    });

    // Delete the invitation record
    await prisma.invitation.delete({ where: { id: invitation.id } });

    revalidatePath(`/profile/`);

    return { success: true, message: MESSAGES.INVITATION.ACCEPT_SUCCESS };
  } catch (error) {
    console.error("Failed to accept invitation:", error);
    return { success: false, message: MESSAGES.INVITATION.ACCEPT_FAILURE };
  }
}

export async function handleRejectInvitation({ token }: { token: string }) {
  const session = await auth();
  const loggedInUserId = session?.user?.id;

  if (!loggedInUserId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const RejectInvitationSchema = z.object({
    token: z.string().min(1, MESSAGES.INVITATION.TOKEN_REQUIRED),
  });

  const parse = RejectInvitationSchema.safeParse({ token });

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    // Find the invitation by token
    const invitation = await prisma.invitation.findUnique({
      where: { token: parse.data.token },
    });

    if (!invitation) {
      return {
        success: false,
        message: MESSAGES.INVITATION.INVALID_OR_PROCESSED,
      };
    }

    // Delete the invitation record
    await prisma.invitation.delete({ where: { id: invitation.id } });

    revalidatePath(`/profile/`);
    return { success: true, message: MESSAGES.INVITATION.REJECT_SUCCESS };
  } catch (error) {
    console.error("Failed to reject invitation:", error);
    return { success: false, message: MESSAGES.INVITATION.REJECT_FAILURE };
  }
}

// Remove user from board
export async function handleRemoveUserFromBoard({
  boardId,
  userId,
}: {
  boardId: string;
  userId: string;
}) {
  const session = await auth();
  const loggedInUserId = session?.user?.id;

  if (!loggedInUserId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const RemoveUserFromBoardSchema = z.object({
    boardId: z.string().min(1, MESSAGES.COMMON.BOARD_ID_REQUIRED),
    userId: z.string().min(1, MESSAGES.INVITATION.USER_ID_REQUIRED),
  });

  const data = { boardId, userId };
  const parse = RemoveUserFromBoardSchema.safeParse(data);

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    await prisma.boardMember.delete({
      where: {
        userId_boardId: {
          userId: parse.data.userId,
          boardId: parse.data.boardId,
        },
      },
    });

    revalidatePath(`/board/${parse.data.boardId}`);

    return { success: true, message: MESSAGES.BOARD.USER_REMOVE_SUCCESS };
  } catch (error) {
    console.error("Failed to remove user from board:", error);
    return { success: false, message: MESSAGES.BOARD.USER_REMOVE_FAILURE };
  }
}
