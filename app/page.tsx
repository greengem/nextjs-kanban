import Link from "next/link";
import { Button } from "@nextui-org/react";
import { IconLayoutKanban } from "@tabler/icons-react";
export default function Home() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-zinc-900">
      <div className="flex-none text-center">
        <h1 className="text-7xl tracking-tighter font-semibold mb-1 flex items-center gap-2">
          <IconLayoutKanban size={80} className="text-purple-500" />Next.Kanban
        </h1>
        <p className="mb-5">Unleash Your Team's Productivity</p>
        <Button variant="ghost" color="secondary" size="lg" as={Link} href="/board">
          Get Started
        </Button>
      </div>
    </div>
  );
}
