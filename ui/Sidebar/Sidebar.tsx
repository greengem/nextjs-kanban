import { auth } from "@/auth";
import { getBoardsSummary } from "@/lib/FetchData";
import { BoardSummary } from "@/types/types";
import SidebarWrapper from "./SidebarWrapper";

export default async function SidebarNav() {
    const session = await auth();

    if (!session) {
        return null;
    }
    
    const boards: BoardSummary[] = await getBoardsSummary();

    return (<SidebarWrapper boards={boards} />);
}