import TotalBoardsCount from "./ProfileOverviewCards/TotalBoardsCount";
import TotalTasksCount from "./ProfileOverviewCards/TotalTasksCount";
import UpcomingDeadlinesCount from "./ProfileOverviewCards/UpcomingDeadlinesCount";
import OverdueTaskCount from "./ProfileOverviewCards/OverdueTaskCount";
import { IconCalendarDue, IconChecklist, IconExclamationCircle, IconLayoutKanban } from "@tabler/icons-react";
import ProfileCard from "./ProfileOverviewCards/ProfileCard";

export default function ProfileCards() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            <ProfileCard
                icon={<IconLayoutKanban />}
                countComponent={<TotalBoardsCount />}
                label="Boards"
            />
            <ProfileCard
                icon={<IconChecklist />}
                countComponent={<TotalTasksCount />}
                label="Tasks"
            />
            <ProfileCard
                icon={<IconCalendarDue />}
                countComponent={<UpcomingDeadlinesCount />}
                label="Upcoming Deadlines"
            />
            <ProfileCard
                icon={<IconExclamationCircle />}
                countComponent={<OverdueTaskCount />}
                label="Overdue Tasks"
            />
        </div>
    );
}
