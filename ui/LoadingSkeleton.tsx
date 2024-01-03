import { IconLoader2 } from "@tabler/icons-react";

export default function LoadingSkeleton() {
    return(
        <div className="flex flex-col grow min-w-0 justify-center pt-20">
            <IconLoader2 size={32} className="animate-spin mr-2 text-primary" />
        </div>
    )
}