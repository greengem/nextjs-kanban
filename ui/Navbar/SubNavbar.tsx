import { getBoardsSummary } from "@/lib/FetchData";
import SubNavbarMenu from "./SubNavbarMenu";
import Link from "next/link";

export default async function SubNavbar () {
    const boards = await getBoardsSummary();
    return (
        <nav className="flex px-5 py-2 bg-blue-400 items-center justify-between">
            <SubNavbarMenu boards={boards} />
        </nav>
    )
}
