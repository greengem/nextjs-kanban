interface TaskDetailItemHeadingProps {
    icon: React.ReactNode;
    title: string;
    endContent?: React.ReactNode
}

export default function TaskDetailItemHeading({
    icon, title, endContent
}: TaskDetailItemHeadingProps) {
    return (
        <div className="flex w-full items-center justify-between mb-1">
            <div className="flex items-center">
                <div className='w-[40px] grow-0 shrink-0 justify-center'>{icon}</div>
                <h4 className='text-xl font-semibold'>{title}</h4>
            </div>
            {endContent && (
                <div>
                    {endContent}
                </div>
            )}
        </div>
    );
}
