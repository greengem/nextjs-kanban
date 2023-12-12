import Link from "next/link";

export default function NavbarTitle() {

    return (
        <div className="flex items-center my-2 w-15 shrink-0 grow-0">
            <p className="font-semibold text-lg tracking-tight">
                <Link href='/dashboard/'>Next.Kanban</Link>
            </p>
        </div>
    )
}
