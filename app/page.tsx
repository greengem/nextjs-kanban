import Link from "next/link";
import { IconBrandGithub, IconLayoutKanban, IconHeartHandshake, IconWand, IconChartBar, IconRocket, IconBook, IconBook2 } from "@tabler/icons-react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
export default function Home() {

  const cardData = [
    {
      icon: IconLayoutKanban,
      title: "Organize Projects Effortlessly",
      body: "Create custom boards, lists, and cards to organize everything from daily tasks to complex projects. Drag and drop to prioritize and adjust plans on the fly."
    },
    {
      icon: IconHeartHandshake,
      title: "Collaborate Anywhere, Anytime",
      body: "Invite team members to collaborate in real-time. Share feedback, assign tasks, and stay updated with seamless notifications and activity logs."
    },
    {
      icon: IconWand,
      title: "Customize Your Workflow",
      body: "Tailor your boards with custom labels, checklists, due dates, and more. Automate repetitive tasks with built-in workflow automation tools to save time and stay focused."
    },
    {
      icon: IconChartBar,
      title: "Access Insights & Analytics",
      body: "Visualize your project's progress with powerful analytics and reporting tools. Make informed decisions with at-a-glance dashboards and detailed reports."
    }
  ];

  return (
    <main className="min-h-dvh text-white bg-gradient-to-br from-black to-zinc-900 dark">
      <nav className="px-3 md:px-10 py-3 mb-5 flex justify-between items-center">
        <h4 className="flex items-center text-lg gap-3 font-semibold tracking-tight"><IconLayoutKanban className="text-purple-500" /> NextBoard</h4>
        <Link href='https://github.com/greengem/nextjs-kanban'><IconBrandGithub /></Link>
      </nav>

      <section className="mb-10 py-5 px-3 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex flex-col justify-center">
            <h4 className="text-lg font-semibold mb-5 text-zinc-500 flex items-center gap-1">Project Management</h4>
            <h1 className="text-4xl md:text-6xl xl:text-8xl tracking-tighter font-bold mb-5">Plan, Track, and <span className="from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent bg-gradient-to-b">Achieve</span></h1>
            <p className="text-lg text-zinc-500 mb-5">The perfect <strong>solution</strong> to all of your task management needs, <span className="text-purple-500">powered by AI</span></p>
            <div className="flex gap-5">
              <Button color="secondary"  as={Link} href="/board"><IconRocket />Get Started</Button>
              <Button as={Link} href="/board"><IconBook />Docs</Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <Image src="/ss.webp" alt="Screenshot of NextBoard" width={2000} height={1250} className="w-full h-auto rounded-xl shadow-xl" />
          </div>
        </div>
      </section>

      <section className="mb-10 py-5 px-3 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cardData.map((card, index) => (
            <Card key={index} className="text-zinc-200 bg-zinc-900/50 backdrop-blur-md shadow-xl" shadow="none">
              <CardHeader className="font-bold gap-3">
                <span className="flex items-center justify-center bg-purple-500 rounded-full h-8 w-8 shrink-0 text-black">
                  <card.icon size={20} />
                </span>
                {card.title}
              </CardHeader>
              <CardBody>{card.body}</CardBody>
            </Card>
          ))}
        </div>
      </section>

    </main>
  );
}
