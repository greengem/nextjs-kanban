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
            <NavbarTitle />
            <div className="flex gap-5 items-center justify-between">
                <ColourPicker />
                <NavbarAvatar userName={userName} userImage={userImage} />
            </div>
        </>
    );
}
