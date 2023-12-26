import { IconTag } from "@tabler/icons-react";
import TaskDetailItemHeading from "../ui/TaskDetailItemHeading";
import TaskDetailItemContent from "../ui/TaskDetailItemContent";

interface TaskDetailLabelsProps {
    labels: { id: string; color: string; }[];
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
                            <div key={label.id} className={`bg-${label.color}-500 h-6 w-10 rounded-md mr-2`}></div>
                        ))}
                    </div>
            </TaskDetailItemContent>
        </>
    );
}
