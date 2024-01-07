import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Input } from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";

export default function BoardAddUsers() {
    return (
        <Popover placement="bottom" backdrop="blur">
            <PopoverTrigger>
                <Button size="sm" isIconOnly>
                    <IconPlus size={16} />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2">
                    <h4 className="text-small font-bold mb-2">Invite users to this board</h4>
                    <form className="space-y-2">
                        <Input type="email" size="sm" label="Email" placeholder="Enter an email address" />
                        <Button size="sm" color="primary">Send invite</Button>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    )
}
