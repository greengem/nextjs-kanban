import { BoardSummary } from "@/types/types";
import { IconCalendar, IconDashboard, IconLayoutKanban, IconTextCaption, IconUser } from "@tabler/icons-react";
import { Sidebar, Menu, SubMenu, MenuItem } from "./SidebarComponent";

export default function SidebarMenu({ boards } : { boards: BoardSummary[]}) {
    return (
        <Sidebar>
            <Menu>
                <MenuItem path="/profile" title="Profile" icon={<IconUser size={18} />} />
                <SubMenu title="Dashboard" icon={<IconDashboard size={18} />}>
                    <MenuItem path="/board" title="All Boards" />
                </SubMenu>
                <SubMenu title="Boards" defaultOpen icon={<IconLayoutKanban size={18} />}>
                    {boards.map((board) => (
                        <MenuItem key={board.id} path={`/board/${board.id}`} title={board.title} />
                    ))}
                </SubMenu>
                <MenuItem path="/calendars" title="Calendars" icon={<IconCalendar size={18} />} />
                <MenuItem path="/docs" title="Docs" icon={<IconTextCaption size={18} />} />
            </Menu>
        </Sidebar>
    )
}
