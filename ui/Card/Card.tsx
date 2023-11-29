import { ReactNode } from "react";

export function Card({ children, className = '' }: { children: ReactNode, className?: string }) {
    return (
        <div className={`
            w-full
            flex-none
            shadow-md
            text-white
            ${className}
        `}>
            {children}
        </div>
    )
}

export function CardHeaderGrab({ children, className = '' }: { children: ReactNode, className?: string }) {
    return (
        <div className={`
            rounded-t-lg
            py-1
            text-purple-500
            cursor-grab
            bg-zinc-800
            flex justify-center items-center
            ${className}
        `}>
            {children}
        </div>
    )
}

export function CardHeader({ children, className = '' }: { children: ReactNode, className?: string }) {
    return (
        <div className={`
            bg-zinc-900
            px-5 pt-3
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
            bg-zinc-900
            ${className}
        `}>
            {children}
        </div>
    )
}

export function CardFooter({ children, className = '' }: { children: ReactNode, className?: string }) {
    return (
        <div className={`
            p-3 rounded-b-lg
            bg-zinc-900
            ${className}
        `}>
            {children}
        </div>
    )
}
