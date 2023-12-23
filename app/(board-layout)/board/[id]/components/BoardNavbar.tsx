import BoardMenu from "../components/BoardMenu";
import BoardFavourite from "../components/BoardFavourite";
import BoardTitle from "../components/BoardTitle";

export default function BoardNavbar({
    board
} : {
    board: any;
}) {
    return (
        <div className="flex justify-between items-center bg-zinc-700 opacity-80 px-5 py-2 mb-5">

            <div className="flex gap-5 items-center">
                <BoardTitle boardTitle={board.title} boardId={board.id} />
                <BoardFavourite board={board} />
                <div>Filters</div>
            </div>

            <BoardMenu boardId={board.id} />

        </div>
    )
}
