import Link from "next/link";
import { getBoardsSummary } from "@/lib/FetchData";
import { BoardSummary } from "@/types/types";
import SidebarNavItem from "./SidebarNavItem";

export default async function SidebarNav() {
    const boards: BoardSummary[] = await getBoardsSummary();

    return (
        <div className="px-5 pt-5">
            <h4 className="uppercase text-xs font-semibold  mb-1">
                <Link className="text-zinc-500 hover:text-primary" href="/board">Boards</Link>
            </h4>
            <ul className="space-y-1 text-sm">
                {boards.map((board) => (
                    <SidebarNavItem key={board.id} boardId={board.id} boardTitle={board.title} />
                ))}
            </ul>
        </div>
    );
}