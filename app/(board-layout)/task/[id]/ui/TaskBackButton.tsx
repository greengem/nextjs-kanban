import Link from "next/link";
import { Button } from "@nextui-org/button";
import { IconArrowLeft } from "@tabler/icons-react";

export default function TaskBackButton({ boardId }: { boardId: string }) {
  return (
    <div>
      <Button
        as={Link}
        className="inline-flex"
        href={`/board/${boardId}`}
        startContent={<IconArrowLeft size={18} />}
        variant="flat"
        color="primary"
      >
        Back to board
      </Button>
    </div>
  );
}
