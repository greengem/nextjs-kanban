import { getBoardsSummary } from "@/lib/FetchData";
import SubNavbarMenu from "./SubNavbarMenu";
import Link from "next/link";

export default async function SubNavbar () {
    const boards = await getBoardsSummary();
    return (
        <nav className="flex px-5 py-1 bg-white items-center justify-between border-b-2 border-blue-300">
            <SubNavbarMenu boards={boards} />
        </nav>
    )
}
