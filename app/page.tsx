import Link from "next/link";
import { Button } from "@nextui-org/button";
import { IconLayoutKanban } from "@tabler/icons-react";
export default function Home() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-zinc-900">
      <div className="flex-none text-center">
        <h1 className="text-7xl tracking-tighter font-semibold flex items-center">
          <IconLayoutKanban size={80} className="text-primary" /><span className="text-primary">N</span>ext
        </h1>
        <h1 className="text-7xl tracking-tighter font-semibold"><span className="text-primary">K</span>anban</h1>
        <p className="mb-5 text-zinc-500 tracking-tight">Unleash Your Team's Productivity</p>
        <Button variant="ghost" color="primary" size="lg" as={Link} href="/board" isIconOnly>
          🚀
        </Button>
      </div>
    </div>
  );
}
