import { IconLoader2 } from "@tabler/icons-react";

export default function LoadingSkeleton() {
    return(
        <main className="flex flex-col grow p-5 justify-center items-center bg-zinc-200">
            <IconLoader2 size={64} className="animate-spin text-primary" />
        </main>
    )
}