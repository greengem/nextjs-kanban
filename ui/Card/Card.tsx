import { ReactNode } from "react";
import { IconGripHorizontal } from '@tabler/icons-react';
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';

export function Card({ children, className = '' }: { children: ReactNode, className?: string }) {
    return (
        <div className={`shadow-md text-white ${className}`}>
            {children}
        </div>
    )
}

export function CardHeaderGrab({ 
    dragHandleProps 
} : {
    dragHandleProps?: DraggableProvidedDragHandleProps
}) {
    return (
        <div 
            {...dragHandleProps}
            className='py-1 text-purple-500 bg-zinc-800 cursor-grab flex justify-center items-center rounded-t-lg'
        >
            <IconGripHorizontal size={26} />
        </div>
    )
}

export function CardHeader({ 
    children, 
    className = '', 
    showGrab = false, 
    dragHandleProps 
} : { 
    children: ReactNode, 
    className?: string, 
    showGrab?: boolean, 
    dragHandleProps?: DraggableProvidedDragHandleProps
}) {
    return (
        <div className={`${showGrab ? '' : 'rounded-t-lg'} ${className}`}>
            {showGrab && <CardHeaderGrab dragHandleProps={dragHandleProps} />}
            <div className={`px-5 pt-3 bg-zinc-900 ${showGrab ? '' : 'rounded-t-lg'}`}>
                {children}
            </div>
        </div>
    )
}

export function CardBody({ 
    children, className = '' 
} : { 
    children: ReactNode, className?: string 
}) {
    return (
        // Apply 'rounded-t-lg' if first child and 'rounded-b-lg' if last child
        <div className={`p-3 bg-zinc-900 first:rounded-t-lg last:rounded-b-lg ${className}`}>
            {children}
        </div>
    );
}

export function CardFooter({ 
    children, className = '' 
} : { 
    children: ReactNode, className?: string 
}) {
    return (
        <div className={`p-3 bg-zinc-900 rounded-b-lg ${className}`}>
            {children}
        </div>
    )
}
