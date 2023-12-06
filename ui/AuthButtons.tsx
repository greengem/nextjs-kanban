"use client";
import { signIn, signOut } from "next-auth/react";

export function SignInButton() {
    return <button onClick={() => signIn()}>Sign In</button>;
}

export function SignOutButton() {
    return <button onClick={() => signOut({ callbackUrl: '/'})} className="text-sm">Sign Out</button>;
}