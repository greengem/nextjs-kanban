import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import SignInGithub from "./SignInGithub";
import { IconLayoutKanban} from "@tabler/icons-react";
import SignInGoogle from "./SignInGoogle";
import SignInDiscord from "./SignInDiscord";

export default async function CustomSignInPage() {
    const session = await auth();
    if (session) {
        redirect("/dashboard");
      } else {
        return (
            <div className="flex justify-center items-center h-full">
                <Card className="min-w-96 shadow-xl bg-white border-2 border-primary" shadow="none">
                    <CardHeader className="px-10 py-5 flex items-center">
                      <IconLayoutKanban className="text-primary w-8 h-8 md:w-14 md:h-14" />
                      <h3 className="text-3xl md:text-5xl tracking-tighter text-center w-full font-bold">Next Kanban</h3>  
                    </CardHeader>
                    <CardBody className="space-y-3 p-10 pt-0">
                        <p className="uppercase text-xs text-center text-primary">- OAuth- </p>
                        <SignInGithub />
                        <SignInGoogle />
                        <SignInDiscord />
                    </CardBody>
                </Card>
            </div>
        );
      }
}
