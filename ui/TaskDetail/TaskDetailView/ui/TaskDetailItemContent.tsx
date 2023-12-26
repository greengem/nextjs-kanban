import { ReactNode } from "react";

interface TaskDetailItemContentProps {
    children: ReactNode;
    indented?: boolean;
}

export default function TaskDetailItemContent({
    children,
    indented = false
}: TaskDetailItemContentProps) {
    const marginLeftClass = indented ? "ml-[40px]" : "";

    return (
        <div className={`flex-col ${marginLeftClass} mb-5`}>
            {children}
        </div>
    );
}
