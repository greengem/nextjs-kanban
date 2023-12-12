import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";

export default function Sidebar() {

  return (
    <aside className='bg-zinc-900 opacity-80 fixed left-0 top-0 bottom-0 w-16 hidden md:block'>
      <SidebarNav />
    </aside>
  );
}
