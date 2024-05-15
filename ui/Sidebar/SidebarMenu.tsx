import { BoardSummarySidebar } from "@/types/types";
import { IconCalendar, IconDashboard, IconLayoutKanban, IconTextCaption, IconUser } from "@tabler/icons-react";
import { Sidebar, Menu, MenuItem } from "./SidebarComponent";

export default function SidebarMenu({ boards }: { boards: BoardSummarySidebar[] }) {
    return (
        <Sidebar>
            <Menu>
                <MenuItem path="/profile" title="Profile" icon={<IconUser stroke={1.5} size={24} />} />
                <MenuItem path="/board" title="All Boards" icon={<IconLayoutKanban stroke={1.5} size={24} />} />
                <MenuItem path="/calendar" title="Calendar" icon={<IconCalendar stroke={1.5} size={24} />} />
                <MenuItem path="/docs" title="Docs" icon={<IconTextCaption stroke={1.5} size={24} />} />
            </Menu>
        </Sidebar>
    );
}
