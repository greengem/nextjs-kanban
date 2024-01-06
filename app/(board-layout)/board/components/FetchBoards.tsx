import { getBoardsSummary } from "@/lib/FetchData";
import { BoardSummary } from "@/types/types";
import Link from "next/link";
import { Card, CardBody, CardFooter } from '@/ui/Card/Card';
import { IconList, IconStarFilled  } from "@tabler/icons-react";

export default async function FetchBoards() {
    const boards: BoardSummary[] = await getBoardsSummary();

    return (
        <>
            {boards.map((board) => (
                <Link key={board.id} href={`/board/${board.id}`}>
                    <Card>
                        <CardBody 
                            className="h-28 flex flex-col justify-end relative bg-gradient-to-t from-white to-primary bg-cover bg-center"
                            style={{ backgroundImage: board.backgroundUrl ? `url(${board.backgroundUrl})` : undefined, backgroundSize: 'cover' }}
                        >
                            {board.isFavorited && (
                                <span className="absolute text-xs top-2 left-2 text-primary bg-white p-1 rounded-md">
                                    <IconStarFilled size={16} />
                                </span>
                            )}
                            <span className="absolute text-xs top-2 right-2 flex items-center justify-center text-primary gap-1 bg-white p-1 rounded-md">
                                <IconList size={16} /><span>{board.tasksCount}</span>
                            </span>
                            
                        </CardBody>
                        <CardFooter className="pt-2 pb-2">
                        <p className="whitespace-nowrap overflow-ellipsis block overflow-x-hidden text-sm">{board.title}</p>
                        </CardFooter>
                    </Card>
                </Link>
            ))}
        </>  
    )
}