import CreateBoardForm from "@/ui/Forms/CreateBoardForm";
import PageHeading from "@/ui/PageHeading";
import FetchBoards from "./components/FetchBoards";
import { Suspense } from "react";

export default function Boards() {

  return (
    <main className="flex flex-col grow min-w-0 p-5 bg-zinc-200">
      <PageHeading title='Boards' />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
        <Suspense fallback={<p>Loading Boards</p>}>
          <FetchBoards />
        </Suspense>
        <CreateBoardForm />
      </div>
    </main>
  );
}