import { ReactNode } from "react";
import { IconGripHorizontal } from '@tabler/icons-react';
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';

export function Card({ children, className = '' }: { children: ReactNode, className?: string }) {
    return (
        <div className={`shadow-md opacity-90 ${className}`}>
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
            className='py-1 text-primary bg-black cursor-grab flex justify-center items-center rounded-t-lg'
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
            <div className={`bg-white px-2 pt-3 ${showGrab ? '' : 'rounded-t-lg'}`}>
                {children}
            </div>
        </div>
    )
}

export function CardBody({ 
    children, 
    className = '', 
    style = {}
}: { 
    children: ReactNode, 
    className?: string,
    style?: React.CSSProperties
}) {
    return (
        <div 
            className={`${className} p-2 first:rounded-t-lg no-scrollbar card-body last:rounded-b-lg`}
            style={style}
        >
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
        <div className={`bg-white px-3 pb-3 rounded-b-lg ${className}`}>
            {children}
        </div>
    )
}
