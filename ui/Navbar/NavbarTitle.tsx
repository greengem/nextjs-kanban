import { IconLayoutKanban, IconStar } from "@tabler/icons-react";
import Link from "next/link";

export default function NavbarTitle() {

    return (
        <div className="flex items-center my-2 gap-5">

            <Link href='/board/' className="flex gap-1 items-center text-xl tracking-tight">
                <IconLayoutKanban />Next.Kanban <span className="text-primary">Alpha</span>
            </Link>

        </div>
    )
}
