"use client";
import { signIn } from "next-auth/react";
import { Button } from "@nextui-org/react";
import { IconBrandGithub } from "@tabler/icons-react";

const SignInGithub = () => {
  return (
    <Button
      onClick={() => signIn("github", { callbackUrl: "/board" })}
      type="button"
      variant="ghost"
    >
      <IconBrandGithub size={20} />Sign In With GitHub
    </Button>
  );
};

export default SignInGithub;