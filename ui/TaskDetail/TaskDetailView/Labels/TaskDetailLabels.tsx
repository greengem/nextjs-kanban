import { IconTag } from "@tabler/icons-react";
import TaskDetailItemHeading from "../ui/TaskDetailItemHeading";
import TaskDetailItemContent from "../ui/TaskDetailItemContent";

interface TaskDetailLabelsProps {
    labels: { id: string; color: string; title: string | null }[];
}

export default function TaskDetailLabels({ labels }: TaskDetailLabelsProps) {
    if (!labels || labels.length === 0) {
        return null;
    }

    return (
        <>
            <TaskDetailItemHeading title="Labels" icon={<IconTag size={26} />} />
            <TaskDetailItemContent indented>
                    <div className='flex'>
                        {labels.map(label => (
                            <div key={label.id} className={`bg-${label.color}-500 h-6 min-w-10 rounded-md mr-2 px-2 py-1 text-xs text-white font-semibold`}>{label.title}</div>
                        ))}
                    </div>
            </TaskDetailItemContent>
        </>
    );
}
