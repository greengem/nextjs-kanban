import Link from "next/link";
import { IconBrandGithub, IconLayoutKanban, IconSparkles } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
export default function Home() {
  return (
    <main className="h-dvh">

      <div className="flex justify-center py-5 mt-20">
        <div className="bg-zinc-200 px-3 py-1 rounded-full text-sm inline-flex items-center gap-2 tracking-tight font-semibold"><IconSparkles size={16} /> Under construction</div>
      </div>

      <h1 className="text-7xl tracking-tighter font-bold flex items-center justify-center">
        <span><IconLayoutKanban size={80} className="text-primary" /></span>
        <span className="mr-2">
          <span className="text-primary">N</span>ext
        </span> 
        <span>
          <span className="text-primary">K</span>anban
        </span>
      </h1>

      <div className="text-center mb-10">
        <h1 className="text-7xl font-bold tracking-tighter mb-2">Elevate your efficiency</h1>
        <p className="text-large text-zinc-700">Lorem ipsum bla bla bla</p>
      </div>

      <div className="flex items-center justify-center gap-2 text-center">
        <Button as={Link} color="primary" href="/board">🚀 Get Started</Button>
        <Button as={Link} href='https://github.com/greengem/nextjs-kanban'><IconBrandGithub size={16} />Github</Button>
      </div>

    </main>
  );
}
