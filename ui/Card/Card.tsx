import { ReactNode } from "react";
import { IconGripHorizontal } from '@tabler/icons-react';

export function Card({ children, className = '' }: { children: ReactNode, className?: string }) {
    return (
        <div className={`flex-none shadow-md text-white rounded-lg ${className}`}>
            {children}
        </div>
    )
}

export function CardHeaderGrab() {
    return (
        <div className='py-1 text-purple-500 bg-zinc-800 cursor-grab flex justify-center items-center rounded-t-lg'>
            <IconGripHorizontal />
        </div>
    )
}


export function CardHeader({ children, className = '', showGrab = false }: { children: ReactNode, className?: string, showGrab?: boolean }) {
    return (
        <div className={`${showGrab ? '' : 'rounded-t-lg'} ${className}`}>
            {showGrab && <CardHeaderGrab />}
            <div className={`px-5 pt-3 bg-zinc-900 ${showGrab ? '' : 'rounded-t-lg'}`}>
                {children}
            </div>
        </div>
    )
}


export function CardBody({ children, className = '' }: { children: ReactNode, className?: string }) {
    return (
        <div className={`p-3 bg-zinc-900 ${className}`}>
            {children}
        </div>
    )
}

export function CardFooter({ children, className = '' }: { children: ReactNode, className?: string }) {
    return (
        <div className={`p-3 bg-zinc-900 rounded-b-lg ${className}`}>
            {children}
        </div>
    )
}
