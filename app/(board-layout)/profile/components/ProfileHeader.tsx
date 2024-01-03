import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";

export default function ProfileHeader({
    userName, userImage
} : {
    userName: string, userImage: string;
}) {
    return (
        <div className="flex items-center gap-5 mb-10">
            <Avatar 
                src={userImage} 
                size="lg" 
                showFallback 
                name={userName}
                className="shrink-0 grow-0" 
            />
            <div>
                <h1 className="text-3xl font-semibold tracking-tight">{userName}</h1>
                <p className="text-zinc-500">Some information about the user</p>
            </div>
        </div>
    )
}