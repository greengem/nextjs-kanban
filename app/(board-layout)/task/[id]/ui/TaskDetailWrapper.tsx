import { Card, CardBody } from "@nextui-org/card";
export default function TaskDetailWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card className="z-10">
      <CardBody className="bg-zinc-950">{children}</CardBody>
    </Card>
  );
}
