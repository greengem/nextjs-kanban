import { Button } from "@nextui-org/button";
import { IconArrowLeft } from "@tabler/icons-react";

export default function BackButton() {
    return (
        <Button size="sm" className="mt-5 ml-5">
            <IconArrowLeft size={18} />Back
        </Button>
    )
}