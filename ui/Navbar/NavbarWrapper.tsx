'use client'

import React from 'react';
import NavbarTitle from "./NavbarTitle";
import ColourPicker from "./ColourPicker";
import NavbarAvatar from "./NavbarAvatar";
import { IconPaint } from "@tabler/icons-react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Session } from 'next-auth';

export default function NavbarWrapper({
    session
} : {
    session: Session
}) {
    return (
        <>
        <nav className="flex gap-2 px-5 py-1 bg-zinc-900 items-center justify-between border-b-1 border-zinc-950">
            <NavbarTitle />
            <div className="flex gap-5 items-center justify-between">
                <Popover placement="left-start" backdrop='blur'>
                    <PopoverTrigger>
                        <IconPaint size={26} className='cursor-pointer' />
                    </PopoverTrigger>
                    <PopoverContent>
                        <ColourPicker />
                    </PopoverContent>
                </Popover>
                <NavbarAvatar session={session} />
            </div>
        </nav>
        </>
    );
}
