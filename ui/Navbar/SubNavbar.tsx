import { getBoardsSummary } from "@/lib/FetchData";
import SubNavbarMenu from "./SubNavbarMenu";

export default async function SubNavbar () {
    const boards = await getBoardsSummary();
    return <SubNavbarMenu boards={boards} />;
}
