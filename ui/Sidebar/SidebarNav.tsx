import Link from "next/link";
import { getBoardsSummary } from "@/lib/FetchData";
import { BoardSummary } from "@/types/types";
import SidebarNavItem from "./SidebarNavItem";
import { IconFolder } from "@tabler/icons-react";

export default async function SidebarNav() {
    const boards: BoardSummary[] = await getBoardsSummary();

    return (
        <div className="px-5 pt-5">
            <h4 className="uppercase text-xs font-semibold  mb-1">
                <Link className="text-zinc-500 hover:text-primary flex items-center gap-1" href="/board"><IconFolder size={16} />Boards</Link>
            </h4>
            <ul className="space-y-1 text-sm ml-2">
                {boards.map((board) => (
                    <SidebarNavItem key={board.id} boardId={board.id} boardTitle={board.title} />
                ))}
            </ul>
        </div>
    );
}
