'use client'
import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation'

export default function NavbarAvatarClient({ 
    userName, userImage
}: {
    userName: string, userImage: string
}) {
    const router = useRouter()

    const handleAction = async (action: 'profile' | 'signout') => {
        if (action === 'profile') {
            router.push('/profile');
        } else if (action === 'signout') {
            signOut({ callbackUrl: '/' });
        }
    }

    return (
        <Dropdown>
            <DropdownTrigger>
                <Avatar 
                    showFallback 
                    isBordered 
                    as="button"
                    name={userName}
                    src={userImage}
                    size="sm" 
                    className="cursor-pointer transition-transform dark" 
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" onAction={(key) => handleAction(key as 'profile' | 'signout')}>
                <DropdownItem key="profile" startContent={<IconUser size={18} />}>Profile</DropdownItem>
                <DropdownItem key="signout" startContent={<IconLogout size={18} />}>Sign out</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
