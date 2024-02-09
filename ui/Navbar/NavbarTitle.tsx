import Link from "next/link";

export default function NavbarTitle() {

    return (
        <div className="flex items-center my-2 gap-5">
            <Link href='/' className="text-xl tracking-tight">
                NextBoard <span className="text-primary">Alpha</span>
            </Link>
        </div>
    )
}
