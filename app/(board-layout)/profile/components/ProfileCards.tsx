import { Card, CardBody, CardHeader } from "@/ui/Card/Card";
import { IconCheck, IconLayoutKanban, IconTimeDuration45 } from "@tabler/icons-react";

const cardData = [
    {
        icon: <IconLayoutKanban />, 
        count: 23, 
        label: "Boards"
    },
    {
        icon: <IconCheck />, 
        count: 10, 
        label: "Tasks Completed"
    },
    {
        icon: <IconTimeDuration45 />, 
        count: 5, 
        label: "Tasks in Progress"
    }
];

export default function ProfileCards() {
    return (
        <div className="grid grid-cols-3 gap-5 mb-10">
            {cardData.map((card, index) => (
                <Card key={index} className="w-full">
                    <CardBody className="text-center space-y-2 bg-white p-5  border-2 border-primary">
                        <div className="flex justify-center">{card.icon}</div>
                        <div className="font-semibold text-xl">{card.count}</div>
                        <div>{card.label}</div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );

}