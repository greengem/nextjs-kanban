"use client";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@nextui-org/button";

export function SignInButton() {
    return <button onClick={() => signIn()}>Sign In</button>;
}

export function SignOutButton() {
    return <Button onClick={() => signOut({ callbackUrl: '/'})}>Sign Out</Button>;
}