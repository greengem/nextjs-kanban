import { Suspense } from "react";
import BoardMenu from "./BoardMenu";
import BoardFavourite from "./BoardFavourite";
import BoardTitle from "./BoardTitle";
import BoardFilterFetch from "./BoardFilter";
import BoardBackgroundImage from "../Wallpaper/BoardBackgroundImage";
import BoardBackgroundImageButton from "../Wallpaper/BoardBackgroundImageButton";
import BoardUsers from "./AddUsers/BoardUsers";
import { IconLoader2 } from "@tabler/icons-react";

export default async function BoardNavbar({
  boardId,
  boardTitle,
}: {
  boardId: string;
  boardTitle: string;
}) {
  return (
    <div className="mb-5 z-10">
      <div className="flex justify-between items-center bg-zinc-950 px-5 py-2 overflow-x-auto no-scrollbar gap-2">
        <div className="flex gap-2 items-center">
          <BoardTitle boardTitle={boardTitle} boardId={boardId} />
          <Suspense
            fallback={<IconLoader2 className="animate-spin mx-3" size={18} />}
          >
            <BoardFavourite boardId={boardId} />
          </Suspense>
          <Suspense
            fallback={<IconLoader2 className="animate-spin" size={16} />}
          >
            <BoardFilterFetch boardId={boardId} />
          </Suspense>
          <BoardBackgroundImageButton />
        </div>
        <div className="flex gap-2 items-center">
          <Suspense
            fallback={<IconLoader2 className="animate-spin" size={16} />}
          >
            <BoardUsers boardId={boardId} />
          </Suspense>
          <BoardMenu boardId={boardId} />
        </div>
      </div>
      <BoardBackgroundImage boardId={boardId} />
    </div>
  );
}
