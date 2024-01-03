import { getFavoriteBoards } from "@/lib/FetchData"
import { Card, CardBody } from "@/ui/Card/Card";
import Link from "next/link";

export default async function ProfileBoards() {
    const favBoards = await getFavoriteBoards();
    return (
        <>
            <h2 className="text-large font-semibold mb-3">Favorite Boards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-10">
                {favBoards.map((board) => (
                    <Link key={board.id} href={`/board/${board.id}`}>
                        <Card>
                            <CardBody className="h-28 flex flex-col justify-end relative bg-white hover:bg-zinc-300 border-2 border-primary">
                                <span className="whitespace-nowrap overflow-ellipsis block overflow-x-hidden">{board.title}</span>
                            </CardBody>
                        </Card>
                    </Link>
                ))}
            </div>
        </>
    )
}