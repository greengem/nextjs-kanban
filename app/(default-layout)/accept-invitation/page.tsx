import prisma from "@/prisma/prisma";
import { auth } from "@/auth";
import InvitationButtons from "./components/InvitationButtons";
import Link from "next/link";

export default async function AcceptInvitation({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const session = await auth();
  const token = searchParams.token;

  if (!token) {
    return <p>Invalid or missing token.</p>;
  }

  if (!session || !session.user || !session.user.email || !session.user.id) {
    return (
      <p>
        <Link className="text-primary" href="/api/auth/signin">
          Login or create an account
        </Link>{" "}
        to view this invitation.
      </p>
    );
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
      },
    });

    if (!foundInvitation) {
      return (
        <p>
          Invitation not found, already processed, or you're not the intended
          recipient.
        </p>
      );
    }

    return (
      <div className="flex flex-col grow justify-center items-center">
        <div className="shadow-md rounded-2xl bg-zinc-950 max-w-96 mx-auto w-full text-center">
          <div className="my-5">
            <h1 className="text-5xl font-semibold tracking-tighter mb-3">
              You're Invited!
            </h1>
            <p className="text-zinc-400 text-xs">
              A new opportunity to collaborate awaits ✨
            </p>
          </div>

          <div className=" flex flex-col gap-y-2">
            <h2>
              <span>Invited by: </span>
              <span className="text-primary">
                {foundInvitation.inviter.name}
              </span>
            </h2>
            <h2>
              <span>Board: </span>
              <span className="text-primary">
                {foundInvitation.board.title}
              </span>
            </h2>
          </div>

          <InvitationButtons
            token={token}
            userId={session.user.id}
            boardId={foundInvitation.board.id}
          />
        </div>
      </div>
    );
  } catch (error) {
    return <p>An error occurred while verifying the token.</p>;
  }
}
