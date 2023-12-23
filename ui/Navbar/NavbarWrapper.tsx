'use client'

import React from 'react';
import NavbarTitle from "./NavbarTitle";
import ColourPicker from "./ColourPicker";
import NavbarAvatar from "./NavbarAvatar";
import { IconPaint } from "@tabler/icons-react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";

export default function NavbarWrapper({
    userName, userImage
} : {
    userName: string, userImage: string
}) {
    return (
        <>
        <nav className="flex gap-2 px-5 bg-zinc-900 items-center justify-between border-b-1 border-zinc-950 h-1/4">
            <NavbarTitle />
            <div className="flex gap-5 items-center justify-between">
                <ColourPicker />
                <NavbarAvatar userName={userName} userImage={userImage} />
            </div>
        </nav>
        </>
    );
}
