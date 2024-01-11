'use client'
import { handleDeleteAccount } from "@/actions/UserServerActions";
import { Button } from "@nextui-org/button";
import { IconExclamationCircle } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";

export default function ProfileDeleteAllData() {
    const deleteAccount = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account and all associated data? This action cannot be undone.");

        if (confirmDelete) {
            const response = await handleDeleteAccount();
            if (response.success) {
                toast.success(response.message);
                signOut({ callbackUrl: '/'});
            } else {
                toast.error(response.message);
            }
        } else {
            toast("Account deletion cancelled.");
        }
    };

    return (
        <Button color="danger" onClick={deleteAccount}>
            <IconExclamationCircle size={16} />
            Delete account and all data
        </Button>
    );
}
