import { Button } from "@nextui-org/button";
import { SignOutButton } from "@/ui/AuthButtons";

export default function ProfileActions() {
    return (
        <>
            <h2 className="text-large font-semibold mb-3">Actions</h2>
            <div className="flex gap-3">
                <SignOutButton />
                <Button color="danger">Delete account and all data</Button>
            </div>
        </>
    )
}