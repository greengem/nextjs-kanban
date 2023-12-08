import { Avatar } from "@nextui-org/avatar";

export default function NavbarAvatar({ 
    userAvatar, 
    userName
}: {
    userAvatar: string | null | undefined; 
    userName: string | null | undefined;
}) {
    return <Avatar showFallback isBordered color="primary" name={userName ?? ''} src={userAvatar ?? ''} size="sm" />;
}
