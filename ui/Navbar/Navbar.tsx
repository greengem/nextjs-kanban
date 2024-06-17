"use client";
import { useState } from "react";
import NavbarTitle from "./NavbarTitle";
import ColourPicker from "./ColourPicker";
import { IconMenu2, IconLayoutKanban, IconUser, IconInbox, IconMessage } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

interface NavItem {
  path: string;
  title: string;
  icon: React.ReactNode;
  badgeContent?: number;
}

const navData: NavItem[] = [
  {
    path: "/profile",
    title: "Profile",
    icon: <IconUser stroke={1.5} size={24} />,
  },
  {
    path: "/board",
    title: "All Boards",
    icon: <IconLayoutKanban stroke={1.5} size={24} />,
  },
];

export default function NavbarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex flex-col">
      <div className="flex gap-2 items-center justify-between px-5 py-2 bg-zinc-950 text-zinc-200 border-b-1 border-zinc-900 h-14">
        <div className="flex items-center">
          <button onClick={toggleDropdown} className="mr-3 block lg:hidden">
            <IconMenu2 size={24} />
          </button>

          <NavbarTitle />
        </div>

        <div className="flex gap-5 items-center justify-between">
          <ColourPicker />
          {children}
        </div>
      </div>

      {isOpen && (
        <div className="bg-zinc-950 text-zinc-200 border-t border-zinc-700 block lg:hidden">
          <ul className="flex flex-col">
            {navData.map((item, index) => (
              <li key={index} className="px-5 py-2 hover:bg-zinc-800">
                <Link
                  href={item.path}
                  className="flex items-center gap-2 text-sm"
                >
                  {item.icon}
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
