"use client";
import Link from "next/link";
import clsx from "clsx";
import { Badge } from "@nextui-org/badge";
import { usePathname } from "next/navigation";

interface SidebarProps {
  children: React.ReactNode;
}

interface MenuProps {
  children: React.ReactNode;
}

interface MenuItemProps {
  path: string;
  icon?: React.ReactNode;
  title: string;
  active?: boolean;
  badgeContent?: number;
  submenuItems?: Array<{
    id: string;
    title: string;
    path: string;
    icon: React.ReactNode;
  }>;
}

// Sidebar Parent
export function Sidebar({ children }: SidebarProps) {
  return (
    <div className="w-64 fixed left-0 top-0 bottom-0 lg:relative lg:top-0 shrink-0 grow-0 bg-zinc-950 z-50 hidden lg:block border-r-1 border-zinc-900">
      {children}
    </div>
  );
}

// Sidebar Menu, there can be multiple menus in a sidebar
export function Menu({ children }: MenuProps) {
  return (
    <ul className="flex flex-col grow gap-5 px-5 text-zinc-200">{children}</ul>
  );
}

// Menu Items
export function MenuItem({
  title,
  path,
  icon,
  badgeContent,
  submenuItems,
}: MenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname === path;

  const linkContent = (
    <Link
      href={path}
      className={clsx("flex items-center gap-2 text-sm hover:text-primary", {
        "text-primary": isActive,
      })}
    >
      {icon}
      {title}
    </Link>
  );

  return (
    <li className="menu-item group">
      {badgeContent !== undefined ? (
        <Badge content={badgeContent} color="primary">
          {linkContent}
        </Badge>
      ) : (
        linkContent
      )}
      {submenuItems && submenuItems.length > 0 && (
        <ul className="ml-6 mt-4 flex flex-col grow gap-3">
          {submenuItems.map((item) => (
            <MenuItem
              key={item.id}
              path={item.path}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

// Submenu component
interface SubMenuProps {
  children: React.ReactNode;
}

export function SubMenu({ children }: SubMenuProps) {
  return <ul className="flex flex-col gap-5 text-xs">{children}</ul>;
}
