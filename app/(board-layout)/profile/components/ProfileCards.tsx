import { Suspense } from "react";
import TotalBoardsCount from "./ProfileOverviewCards/TotalBoardsCount";
import TotalTasksCount from "./ProfileOverviewCards/TotalTasksCount";
import UpcomingDeadlinesCount from "./ProfileOverviewCards/UpcomingDeadlinesCount";
import OverdueTaskCount from "./ProfileOverviewCards/OverdueTaskCount";
import { IconCalendarDue, IconChecklist, IconExclamationCircle, IconLayoutKanban, IconLoader2 } from "@tabler/icons-react";

export default function ProfileCards() {
    return (
        <div className="grid grid-cols-4 gap-5 mb-10">
            <div className="text-center space-y-2 bg-white p-5  border-2 border-primary shadow-xl rounded-xl">
                <div className="flex justify-center"><IconLayoutKanban /></div>
                <div className="font-semibold text-xl flex flex-col items-center">
                    <Suspense fallback={<IconLoader2 size={28} className="animate-spin" />}>
                        <TotalBoardsCount />
                    </Suspense>
                </div>
                <div>Boards</div>
            </div>

            <div className="text-center space-y-2 bg-white p-5  border-2 border-primary shadow-xl rounded-xl">
                <div className="flex justify-center"><IconChecklist /></div>
                <div className="font-semibold text-xl flex flex-col items-center">
                    <Suspense fallback={<IconLoader2 size={28} className="animate-spin" />}>
                        <TotalTasksCount />
                    </Suspense>
                </div>
                <div>Tasks</div>
            </div>

            <div className="text-center space-y-2 bg-white p-5  border-2 border-primary shadow-xl rounded-xl">
                <div className="flex justify-center"><IconCalendarDue /></div>
                <div className="font-semibold text-xl flex flex-col items-center">
                    <Suspense fallback={<IconLoader2 size={28} className="animate-spin" />}>
                        <UpcomingDeadlinesCount />
                    </Suspense>
                </div>
                <div>Upcoming Deadlines</div>
            </div>

            <div className="text-center space-y-2 bg-white p-5  border-2 border-primary shadow-xl rounded-xl">
                <div className="flex justify-center"><IconExclamationCircle /></div>
                <div className="font-semibold text-xl flex flex-col items-center">
                    <Suspense fallback={<IconLoader2 size={28} className="animate-spin" />}>
                        <OverdueTaskCount />
                    </Suspense>
                </div>
                <div>Overdue Tasks</div>
            </div>

        </div>
    );
}
