import { SignOutButton } from "@/ui/AuthButtons.client";
import ProfileDeleteAllData from "./ProfileDeleteAllData.client";

export default function ProfileActions() {
    return (
        <>
            <h2 className="text-large font-semibold mb-3">Actions</h2>
            <div className="flex gap-3">
                <SignOutButton />
                <ProfileDeleteAllData />
            </div>
        </>
    )
}