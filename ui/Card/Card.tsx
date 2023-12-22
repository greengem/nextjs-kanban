import { ReactNode } from "react";
import { IconGripHorizontal } from '@tabler/icons-react';
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';

export function Card({ children, className = '' }: { children: ReactNode, className?: string }) {
    return (
        <div className={`shadow-xl rounded-lg bg-zinc-900 text-white ${className}`}>
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
            className='py-1 text-primary bg-zinc-800 cursor-grab flex justify-center items-center rounded-t-lg'
        >
            <IconGripHorizontal size={30} />
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
            <div className={`px-3 pt-3 ${showGrab ? '' : 'rounded-t-lg'}`}>
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
        <div className={`p-3 first:rounded-t-lg last:rounded-b-lg ${className}`}>
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
        <div className={`p-3 rounded-b-lg ${className}`}>
            {children}
        </div>
    )
}
