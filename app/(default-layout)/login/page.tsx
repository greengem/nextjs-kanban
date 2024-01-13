import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import SignInGithub from "./SignInGithub";
import { IconLayoutKanban, IconMail } from "@tabler/icons-react";
import SignInGoogle from "./SignInGoogle";

export default async function CustomSignInPage() {
    const session = await auth();
    if (session) {
        redirect("/dashboard");
      } else {
        return (
            <div className="flex justify-center items-center h-full">
                <Card className="max-w-96 shadow-xl bg-white border-3 border-primary" shadow="none">
                    <CardHeader className="px-5 py-3 flex items-center">
                      <IconLayoutKanban className="text-primary w-8 h-8 md:w-14 md:h-14" />
                      <h3 className="text-3xl md:text-5xl tracking-tighter text-center w-full font-bold">Next Kanban</h3>  
                    </CardHeader>
                    <CardBody className="space-y-4 p-5 pt-0">
                        <p className="uppercase text-xs text-center text-primary">- OAuth- </p>
                        <SignInGithub />
                        <SignInGoogle />
                        {/*
                        <Divider />
                        <p className="uppercase text-xs text-center text-primary">- Email- </p>
                        <form className="flex flex-col space-y-2">
                            <Input size="sm" label="Enter your email" type="email" placeholder="Email" />
                            <Input size="sm" label="Enter a Password" type="password" placeholder="Password" />
                            <Button variant="ghost">
                                <IconMail />Sign In With Email
                            </Button>
                        </form>
                        */}
                    </CardBody>
                </Card>
            </div>
        );
      }
}
