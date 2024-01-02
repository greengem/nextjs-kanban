import Link from "next/link";
import { IconLayoutKanban } from "@tabler/icons-react";
export default function Home() {
  return (
    <div className="h-dvh w-screen flex justify-center items-center bg-gradient-to-br from-zinc-100 to-primary">
      <div className="flex-none text-center">
        <h1 className="text-7xl tracking-tighter font-semibold flex items-center">
          <IconLayoutKanban size={80} className="text-primary" /><span className="text-primary">N</span>ext
        </h1>
        <h1 className="text-7xl tracking-tighter font-semibold"><span className="text-primary">K</span>anban</h1>
        <p className="mb-5 text-zinc-500 tracking-tight">Unleash Your Team's Productivity</p>
        <Link href="/board" className="hover:bg-primary p-3 rounded-xl border-2 border-primary">
          🚀
        </Link>
      </div>
    </div>
  );
}
