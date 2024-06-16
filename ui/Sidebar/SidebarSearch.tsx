"use client";
import { Input } from "@nextui-org/input";
import { IconSearch } from "@tabler/icons-react";

export default function SidebarSearch() {
  return (
    <div className="px-5 pt-2">
      <Input
        placeholder="Search..."
        radius="sm"
        size="sm"
        isClearable
        startContent={
          <IconSearch
            size={16}
            className="text-default-400 pointer-events-none flex-shrink-0"
          />
        }
      />
    </div>
  );
}
