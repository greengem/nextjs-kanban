'use client'
import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'

export default function NavbarAvatar({ 
    session
}: {
    session: Session
}) {
    const router = useRouter()

    const handleAction = async (action: 'profile' | 'signout') => {
        if (action === 'profile') {
            toast.error('Profile coming soon');
        } else if (action === 'signout') {
            signOut({ callbackUrl: '/' });
        }
    }

    return (
        <Dropdown backdrop="blur">
            <DropdownTrigger>
                <Avatar 
                    showFallback 
                    isBordered 
                    color="primary" 
                    name={session.user?.name ?? ''} 
                    src={session.user?.image ?? ''} 
                    size="sm" 
                    className="cursor-pointer" 
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" onAction={(key) => handleAction(key as 'profile' | 'signout')}>
                <DropdownItem key="profile" startContent={<IconUser size={18} />}>Profile</DropdownItem>
                <DropdownItem key="signout" startContent={<IconLogout size={18} />}>Sign out</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
