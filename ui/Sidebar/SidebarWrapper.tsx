'use client'
import { useSidebar } from "@/contexts/SidebarContext";
import { usePathname } from 'next/navigation';
import { BoardSummary } from "@/types/types";
import { IconCalendar, IconLayoutKanban, IconTextCaption, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { Sidebar, Menu, MenuItem, SubMenu } from '@ascendtis/react-pro-sidebar';

export default function SidebarWrapper({
    boards
} : {
    boards: BoardSummary[]
}) {
    const pathname = usePathname();
    const { toggled, toggleSidebar } = useSidebar();
    
    // Define the BoardItemSuffix component here or import it if defined elsewhere
    const BoardItemSuffix = ({ tasksCount }: { tasksCount: number }) => (
        <div className="bg-primary text-xs rounded-full h-6 w-6 flex items-center justify-center text-white">
            {tasksCount}
        </div>
    );

    // Function to determine if the link is active
    const isActive = (linkPath: string) => pathname === linkPath;

    const activeStyles = {
        backgroundColor: '#eaabff',
        color: '#9f0099',
        '&:hover': {
          backgroundColor: '#eecef9',
        },
    };

    return (
        <Sidebar 
            onBackdropClick={() => toggleSidebar()}
            toggled={toggled} breakPoint="lg"
            backgroundColor="#ffffff"
        >
            <Menu>
                <SubMenu 
                    label="Boards" 
                    icon={<IconLayoutKanban size={18} />} 
                    defaultOpen
                >
                    {boards.map((board) => (
                        <MenuItem 
                            key={board.id}
                            active={isActive(`/board/${board.id}`)}
                            rootStyles={isActive(`/board/${board.id}`) ? activeStyles : {}}
                            component={<Link href={`/board/${board.id}`} />}
                            suffix={<BoardItemSuffix tasksCount={board.tasksCount} />}
                        >
                                {board.title}
                        </MenuItem>
                    ))}
                </SubMenu>
                <MenuItem 
                    icon={<IconCalendar size={18} />} 
                    component={<Link href="/calendar" />}
                    active={isActive("/calendar")}
                >
                    Calendar
                </MenuItem>
                <MenuItem 
                    icon={<IconTextCaption size={18} />} 
                    component={<Link href="/docs" />}
                    active={isActive("/docs")}
                >
                    Documentation
                </MenuItem>
                <MenuItem 
                    icon={<IconUser size={18} />} 
                    component={<Link href="/profile" />}
                    active={isActive("/profile")}
                >
                    Profile
                </MenuItem>
            </Menu>
        </Sidebar>
    )
}
