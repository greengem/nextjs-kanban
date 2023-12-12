import { getTask } from "@/lib/FetchData";
interface BoardProps {
  params: { id: string };
}

export default async function TaskPage({ params }: BoardProps) {
  const task = await getTask(params.id);

  return (
    <>
        <pre>{JSON.stringify(task, null, 2)}</pre>
    </>
  );
}
