import { Suspense } from "react";
import ProfileHeader from "./components/ProfileHeader";
import ProfileCards from "./components/ProfileCards";
import ProfileActivity from "./components/ProfileActivity";
import ProfileBoards from "./components/ProfileBoards";
import ProfileActions from "./components/ProfileActions";

export default function ProfilePage() {

    return (
        <main className="grow p-5 bg-zinc-200">
            <Suspense fallback={<div>Loading User Data...</div>}>
                <ProfileHeader />
            </Suspense>
            <ProfileCards />
            <Suspense fallback={<div>Loading Activity...</div>}>
                <ProfileActivity />
            </Suspense>
            <Suspense fallback={<div>Loading Favorite Boards...</div>}>
                <ProfileBoards />
            </Suspense>
            <ProfileActions />
        </main>
    );
}
