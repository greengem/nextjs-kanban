// SidebarMenu.tsx
import { Sidebar, Menu, MenuItem } from "./SidebarComponent";
import navData from "@/data/navData";

export default function SidebarMenu() {
  return (
    <Sidebar>
      <Menu>
        {navData.map((item, index) => (
          <MenuItem
            key={index}
            path={item.path}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </Menu>
    </Sidebar>
  );
}
