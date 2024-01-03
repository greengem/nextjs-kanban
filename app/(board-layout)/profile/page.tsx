import { auth } from "@/auth";
import { Suspense } from "react";
import ProfileHeader from "./components/ProfileHeader";
import ProfileCards from "./components/ProfileCards";
import ProfileActivity from "./components/ProfileActivity";

export default async function ProfilePage() {
    const session = await auth();

    const userName = session?.user?.name ? session.user.name : 'Default Name';
    const userImage = session?.user?.image ? session.user.image : 'default-image-url.jpg';

    return (
        <main className="grow p-5">
            <ProfileHeader userName={userName} userImage={userImage} />
            <ProfileCards />
            <Suspense fallback={<div>Loading Activity...</div>}>
                <ProfileActivity />
            </Suspense>
        </main>
    );
}
