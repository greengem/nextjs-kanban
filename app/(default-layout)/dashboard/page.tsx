import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PageHeading from "@/ui/PageHeading";

export default async function Dashboard() {
    const session = await auth();
    if (!session) {
      redirect("/api/auth/signin");
    }

    return (
        <PageHeading title="Dashboard" />
    )
}