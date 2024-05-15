import Link from "next/link";

export default function NavbarTitle() {

    return (
        <div className="flex items-center gap-5">
            <Link href='/' className="text-xl tracking-tight font-light">
                NextBoard <span className="text-primary">Beta</span>
            </Link>
        </div>
    )
}
