import { Suspense } from "react";
import ProfileHeader from "./components/ProfileHeader";
import ProfileCards from "./components/ProfileCards";
import ProfileActivity from "./components/ProfileActivity";
import ProfileBoards from "./components/ProfileBoards";
import ProfileActions from "./components/ProfileActions";
import ProfileInvites from "./components/ProfileInvites";

export default function ProfilePage() {

    return (
        <>
            <Suspense fallback={<div>Loading User Data...</div>}>
                <ProfileHeader />
            </Suspense>

            <ProfileCards />

            <h2 className="text-large font-semibold mb-3">Recent Activity</h2>
            <ul className="mb-10">
                <Suspense fallback={<li className="border-b-1 last:border-b-0 border-zinc-300 py-1">Loading activity...</li>}>
                    <ProfileActivity />
                </Suspense>
            </ul>

            <h2 className="text-large font-semibold mb-3">Favorite Boards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-10">
                <Suspense fallback={
                    <div className="h-28 flex flex-col justify-end relative bg-white hover:bg-zinc-300 border-2 border-primary shadow-xl rounded-xl p-2">
                        <span className="whitespace-nowrap overflow-ellipsis block overflow-x-hidden">Loading boards...</span>
                    </div>
                }>
                    <ProfileBoards />
                </Suspense>
            </div>

            <h2 className="text-large font-semibold mb-3">Invites</h2>
            <ul className="mb-10">
                <Suspense fallback={<li className="border-b-1 last:border-b-0 border-zinc-300 py-1">Loading invites...</li>}>
                    <ProfileInvites />
                </Suspense>
            </ul>
            <ProfileActions />
        </>
    );
}
