import { ReactNode } from "react";

export function Card({ children, className = '' }: { children: ReactNode, className?: string }) {
    return (
        <div className={`
            w-full
            flex-none
            bg-white 
            rounded-lg 
            shadow-md
            ${className}
        `}>
            {children}
        </div>
    )
}

export function CardHeader({ children, className = '' }: { children: ReactNode, className?: string }) {
    return (
        <div className={`
            py-2 px-2
            ${className}
        `}>
            {children}
        </div>
    )
}

export function CardBody({ children, className = '' }: { children: ReactNode, className?: string }) {
    return (
        <div className={`
            p-3
            ${className}
        `}>
            {children}
        </div>
    )
}

export function CardFooter({ children, className = '' }: { children: ReactNode, className?: string }) {
    return (
        <div className={`
            p-3
            ${className}
        `}>
            {children}
        </div>
    )
}
