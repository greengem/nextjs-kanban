'use client'

import React, { useState } from 'react';
import NavbarTitle from "./NavbarTitle";
import ColourPicker from "./ColourPicker";
import NavbarAvatar from "./NavbarAvatar";
import { IconPaint } from "@tabler/icons-react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

export default function NavbarWrapper({
    userAvatar, userName,
} : {
    userAvatar: string | null | undefined; userName: string | null | undefined;
}) {
    return (
        <>
        <nav className="flex gap-2 px-5 py-1 bg-zinc-900 items-center justify-between opacity-80">
            <NavbarTitle />
            <div className="flex gap-5 items-center justify-between">
                <Popover placement="left">
                    <PopoverTrigger>
                        <IconPaint size={32} className='cursor-pointer' />
                    </PopoverTrigger>
                    <PopoverContent>
                        <ColourPicker />
                    </PopoverContent>
                </Popover>
                <NavbarAvatar userAvatar={userAvatar} userName={userName} />
            </div>
        </nav>
        </>
    );
}
