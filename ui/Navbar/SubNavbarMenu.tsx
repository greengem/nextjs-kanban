'use client'
import { useRef } from 'react';
import { usePathname } from 'next/navigation'
import Link from "next/link";
import { IconChevronLeft, IconChevronRight, IconLayoutKanban } from '@tabler/icons-react';

interface Board {
    id: string;
    title: string;
}

export default function SubNavbarMenu({ boards }: { boards: Board[] }) {
    const pathname = usePathname();
    const scrollRef = useRef<HTMLDivElement>(null);
  
    const scrollLeft = () => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({ left: -100, behavior: 'smooth' }); // Scroll left smoothly
        }
      };
      
      const scrollRight = () => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({ left: 100, behavior: 'smooth' }); // Scroll right smoothly
        }
      };      

    return (
        <nav className="flex px-2 py-2 bg-zinc-800 items-center opacity-80">
            <button className='px-2' onClick={scrollLeft}><IconChevronLeft /></button>
            <div ref={scrollRef} className="flex overflow-x-scroll no-scrollbar w-full">
                <ul className="flex items-center text-xs space-x-2 text-white">
                    <li className='px-3 py-1 flex-none rounded-xl bg-primary'>
                        <Link href='/board'>
                            <IconLayoutKanban size={16} />
                        </Link>
                    </li>
                    {boards.map((board) => (
                        <li 
                            key={board.id} 
                            className={`px-3 py-1 rounded-xl flex-none ${pathname === `/board/${board.id}` ? 'bg-primary' : 'bg-zinc-900'} hover:bg-primary`}
                        >

                            <Link href={`/board/${board.id}`}>
                                {board.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <button className='px-2' onClick={scrollRight}><IconChevronRight /></button>
        </nav>
    );
}
