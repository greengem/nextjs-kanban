import { Card, CardBody, CardHeader } from "@/ui/Card/Card";
import { IconCheck, IconLayoutKanban, IconTimeDuration45 } from "@tabler/icons-react";
import TotalBoardCount from "./TotalBoardCount";
import TotalTaskCount from "./TotalTaskCount";

export default function ProfileCards() {
    return (
        <div className="grid grid-cols-4 gap-5 mb-10">
            
            <Card className="w-full">
                <CardBody className="text-center space-y-2 bg-white p-5  border-2 border-primary">
                    <div className="flex justify-center"><IconLayoutKanban /></div>
                    <div className="font-semibold text-xl"><TotalBoardCount /></div>
                    <div>Boards</div>
                </CardBody>
            </Card>

            <Card className="w-full">
                <CardBody className="text-center space-y-2 bg-white p-5  border-2 border-primary">
                    <div className="flex justify-center"><IconLayoutKanban /></div>
                    <div className="font-semibold text-xl"><TotalTaskCount /></div>
                    <div>Tasks</div>
                </CardBody>
            </Card>

            <Card className="w-full">
                <CardBody className="text-center space-y-2 bg-white p-5  border-2 border-primary">
                    <div className="flex justify-center"><IconLayoutKanban /></div>
                    <div className="font-semibold text-xl"><TotalBoardCount /></div>
                    <div>Upcoming Deadlines</div>
                </CardBody>
            </Card>

            <Card className="w-full">
                <CardBody className="text-center space-y-2 bg-white p-5  border-2 border-primary">
                    <div className="flex justify-center"><IconLayoutKanban /></div>
                    <div className="font-semibold text-xl"><TotalBoardCount /></div>
                    <div>Overdue Tasks</div>
                </CardBody>
            </Card>

        </div>
    );

}