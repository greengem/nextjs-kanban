import Link from "next/link";
export default function Home() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
        <Link 
          className="bg-purple-500 rounded-xl text-white text-lg px-8 py-3 "
          href='/board'
        >
            Get Started</Link>
    </div>
  );
}
