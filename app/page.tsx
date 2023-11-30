import Link from "next/link";
export default function Home() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex-none text-center">
        <h1 className="text-7xl tracking-tighter font-semibold mb-2">Kanban</h1>
        <h1 className="text-7xl tracking-tighter font-semibold mb-20 text-purple-500">Reimagined</h1>
        <Link 
          className="bg-purple-500 rounded-xl text-white text-lg px-8 py-3 "
          href='/board'
        >
            Get Started</Link>
      </div>
    </div>
  );
}
