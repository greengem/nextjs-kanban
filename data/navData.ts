import React from "react";
import {
  IconCalendar,
  IconLayoutKanban,
  IconLayoutBoard,
  IconUser,
  IconLayoutAlignMiddle,
} from "@tabler/icons-react";

interface NavItem {
  path: string;
  title: string;
  icon: React.ReactNode;
}

const navData: NavItem[] = [
  {
    path: "/profile",
    title: "Profile",
    icon: React.createElement(IconUser, { stroke: 1.5, size: 24 }),
  },
  {
    path: "/board",
    title: "All Boards",
    icon: React.createElement(IconLayoutKanban, { stroke: 1.5, size: 24 }),
  },
];

export default navData;
