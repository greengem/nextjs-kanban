'use client'

import React, { useState } from 'react';
import NavbarTitle from "./NavbarTitle";
import ColourPicker from "./ColourPicker";
import NavbarAvatar from "./NavbarAvatar";
import { IconPaint } from "@tabler/icons-react";

export default function NavbarWrapper({
    userAvatar, userName,
} : {
    userAvatar: string | null | undefined; userName: string | null | undefined;
}) {
    // State to manage the visibility of the ColourPicker
    const [showColourPicker, setShowColourPicker] = useState(false);

    // Function to toggle the visibility
    const toggleColourPicker = () => {
        setShowColourPicker(!showColourPicker);
    }

    return (
        <>
        <nav className="flex gap-2 px-5 py-2 bg-zinc-900 items-center justify-between opacity-80">
            <NavbarTitle />
            <div className="flex gap-5 items-center justify-between">
                <button onClick={toggleColourPicker}>
                    <IconPaint size={32} />
                </button>
                <NavbarAvatar userAvatar={userAvatar} userName={userName} />
            </div>
        </nav>
        {showColourPicker && (
            <div className=" bg-zinc-900 opacity-80 border-t-1 border-zinc-700">
                <ColourPicker />
            </div>
        )}
        </>
    );
}
