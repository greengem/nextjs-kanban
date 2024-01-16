import Link from "next/link";
import { IconBrandGithub, IconLayoutKanban } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
export default function Home() {
  return (
    <main className="h-dvh bg-black text-white flex flex-col justify-center">

      <h1 className="text-7xl tracking-tight font-bold flex flex-wrap items-center justify-center mb-5">
        <span><IconLayoutKanban size={80} className="text-primary" /></span>
        <span className="mr-2">
          <span className="text-primary">N</span>ext
        </span> 
        <span>
          <span className="text-primary">K</span>anban
        </span>
      </h1>

      <div className="text-center mb-10 mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter">Revolutionizing Task Management With <span className="text-primary">AI</span></h1>
      </div>

      <div className="flex items-center justify-center gap-2 text-center dark">
        <Button variant="ghost" as={Link} href="/board">🚀 Get Started</Button>
        <Button variant="ghost" as={Link} href='https://github.com/greengem/nextjs-kanban'><IconBrandGithub size={16} />Github</Button>
      </div>

    </main>
  );
}
