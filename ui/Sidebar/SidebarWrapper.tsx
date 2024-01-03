'use client'
import { BoardSummary } from "@/types/types";
import { IconCalendar, IconLayoutKanban, IconTag, IconTextCaption, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

export default function SidebarWrapper({
    boards
} : {
    boards: BoardSummary[]
}) {
    return (
        <Sidebar>
            <Menu>
                <SubMenu 
                    label="Boards" 
                    icon={<IconLayoutKanban size={18} />} 
                    defaultOpen
                >
                    {boards.map((board) => (
                        <MenuItem key={board.id}
                            suffix={
                                <div className="bg-primary text-xs rounded-full h-6 w-6 flex items-center justify-center text-white">
                                    {board.tasksCount}
                                </div>
                            }
                            component={<Link href={`/board/${board.id}`} />}
                        >
                                {board.title}
                        </MenuItem>
                    ))}
                </SubMenu>
                <SubMenu label="Labels" icon={<IconTag size={18} />}>
                    <MenuItem>Labels</MenuItem>
                </SubMenu>
                <MenuItem icon={<IconTextCaption size={18} />}>Documentation</MenuItem>
                <MenuItem icon={<IconCalendar size={18} />}>Calendar</MenuItem>
                <MenuItem icon={<IconUser size={18} />} component={<Link href="/profile" />}>Profile</MenuItem>
            </Menu>
        </Sidebar>
    )
}