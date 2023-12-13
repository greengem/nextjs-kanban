import { IconLayoutKanban, IconStar } from "@tabler/icons-react";
import Link from "next/link";

export default function NavbarTitle() {

    return (
        <div className="flex items-center my-2 gap-5">

            <Link href='/board/' className="flex gap-1 items-center font-semibold text-lg tracking-tight">
                <IconLayoutKanban />Next.Kanban Alpha
            </Link>

        </div>
    )
}
