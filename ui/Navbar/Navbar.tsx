import { Suspense } from "react";
import NavbarTitle from "./NavbarTitle";
import ColourPicker from "./ColourPicker";
import NavbarAvatar from "./NavbarAvatar";
import NavbarSidebarToggle from "./NavbarSidebarToggle";
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";

export default function NavbarWrapper({} : { userName: string, userImage: string }) {
    return (
        <nav className="flex gap-2 items-center justify-between px-5 py-2 bg-black text-white">
            <div className="flex items-center">
                <NavbarSidebarToggle />
                <NavbarTitle />
            </div>
            
            <div className="flex gap-5 items-center justify-between">
                <ColourPicker />
                <Suspense fallback={<Avatar showFallback isBordered size="sm" className="dark" />}>
                    <NavbarAvatar />
                </Suspense>
            </div>
        </nav>
    );
}
