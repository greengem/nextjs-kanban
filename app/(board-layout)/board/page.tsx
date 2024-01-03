import CreateBoardForm from "@/ui/Forms/CreateBoardForm";
import PageHeading from "@/ui/PageHeading";
import FetchBoards from "./components/FetchBoards";
import { Suspense } from "react";

export default function Boards() {

  return (
    <main className="flex flex-col grow min-w-0 p-5 bg-gradient-to-tl from-zinc-100 to-primary">
      <PageHeading title='Boards' />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        <Suspense fallback={<p>Loading Boards</p>}>
          <FetchBoards />
        </Suspense>
        <CreateBoardForm />
      </div>
    </main>
  );
}