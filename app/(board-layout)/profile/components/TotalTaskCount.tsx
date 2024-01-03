import { getTaskCount } from "@/lib/FetchData";
export default async function TotalTaskCount() {
    const taskCount = await getTaskCount();
    return taskCount;
}