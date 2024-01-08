import { getLabelsForBoard } from "@/lib/FetchData";
import { LabelSummary } from "@/types/types";
import BoardFilter from "./BoardFilter.client";

export default async function BoardFilterFetch({ boardId } : { boardId: string }) {
    const labels: LabelSummary[] = await getLabelsForBoard(boardId);
    return (
        <BoardFilter labels={labels} />
    );
}
