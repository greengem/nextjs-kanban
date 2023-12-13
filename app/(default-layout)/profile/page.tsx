import { auth } from "@/auth";
export default async function ProfilePage() {
    const session = await auth();
    return(
        <pre>{JSON.stringify(session, null, 2)}</pre>
    )
}