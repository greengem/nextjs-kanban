import { auth } from "@/auth";
import {Avatar} from "@nextui-org/avatar";

export default async function ProfileHeader() {
    const session = await auth();

    const userName = session?.user?.name ? session.user.name : 'Default Name';
    const userImage = session?.user?.image ? session.user.image : 'default-image-url.jpg';
    
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
                <p className="text-zinc-800 text-sm">{session?.user?.email}</p>
            </div>
        </div>
    )
}