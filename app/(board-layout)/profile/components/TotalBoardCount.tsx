import { getBoardCount } from "@/lib/FetchData"
export default async function TotalBoardCount() {
    const boardCount = await getBoardCount();
    return boardCount;
}