import { Board as BoardType, Column, Task } from '@prisma/client';
import { Suspense } from "react";
import BoardMenu from "../components/BoardMenu";
import BoardFavourite from "../components/BoardFavourite";
import BoardTitle from "../components/BoardTitle";
import BoardFilterFetch from "./BoardFilter";
import BoardBackgroundImage from "./BoardBackgroundImage";
import BoardBackgroundImageButton from "./BoardBackgroundImageButton";
import BoardUsers from "./BoardUsers";
import { IconLoader2 } from "@tabler/icons-react";

type ExtendedColumn = Column & {
    tasks: Task[];
};
  
type ExtendedBoard = BoardType & {
    columns: ExtendedColumn[];
};

export default async function BoardNavbar({ board } : { board: ExtendedBoard }) {
    return (
        <div className="mb-5 z-10">
            <div className="flex justify-between items-center bg-white/60 backdrop-blur-md px-5 py-2 overflow-x-auto no-scrollbar gap-2">
                <div className="flex gap-2 items-center">
                    <BoardTitle boardTitle={board.title} boardId={board.id} />
                    <Suspense fallback={<IconLoader2 className="animate-spin mx-3" size={18} />}>
                        <BoardFavourite boardId={board.id} />
                    </Suspense>
                    <Suspense fallback={<IconLoader2 className="animate-spin" size={16} />}>
                        <BoardFilterFetch boardId={board.id} />
                    </Suspense>
                    <BoardBackgroundImageButton />
                </div>
                <div className="flex gap-2 items-center">
                    <Suspense fallback={<IconLoader2 className="animate-spin" size={16} />}>
                        <BoardUsers boardId={board.id} />
                    </Suspense>
                    <BoardMenu boardId={board.id} />
                </div>
            </div>
            <BoardBackgroundImage boardId={board.id} />
        </div>
    )
}
