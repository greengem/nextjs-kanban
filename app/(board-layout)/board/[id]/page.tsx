import { auth } from "@/auth";
import { getBoard } from "@/lib/FetchData";
import { BoardDetails } from "@/types/types";
import Board from "./components/Board";
import BoardNavbar from "./components/BoardNavbar";

export default async function BoardPage({ 
  params, searchParams 
} : {
  params: { id: string }, searchParams: { labels?: string }
}) {
  const session = await auth();
  const userId = session?.user?.id;
  //console.log('search param: ' + searchParams.labels);

  if (!userId) {
    return null;
  }

  const labelIds = searchParams.labels ? searchParams.labels.split(',') : [];

  const board: BoardDetails | null = await getBoard(params.id, userId, labelIds);

  if (!board) {
    return <div>Board not found</div>;
  }

  const backgroundStyle = board.backgroundUrl 
    ? { backgroundImage: `url(${board.backgroundUrl})` }
    : {};

  return (
    <main 
      className={`flex flex-col grow min-w-0 bg-cover bg-center bg-gradient-to-tl from-zinc-100 to-primary`}
      style={backgroundStyle}
    >
      <BoardNavbar board={board} />
      <Board board={board} session={session} />
    </main>
  );
}
