import React from "react";
import {
  IconLayoutKanban,
  IconUser,
  IconInbox,
  IconMessage,
} from "@tabler/icons-react";

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
  // {
  //   path: "/inbox",
  //   title: "Inbox",
  //   icon: <IconInbox stroke={1.5} size={24} />,
  //   badgeContent: 5,
  // },
  // {
  //   path: "/chat",
  //   title: "Chat",
  //   icon: <IconMessage stroke={1.5} size={24} />,
  //   badgeContent: 2,
  // },
];

export default navData;