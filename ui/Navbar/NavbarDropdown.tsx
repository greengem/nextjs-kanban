"use client";
import { useState } from "react";
import { IconMenu2 } from "@tabler/icons-react";

export default function NavbarDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleDropdown} className="mr-3 block lg:hidden">
        <IconMenu2 size={24} />
      </button>
      {isOpen && (
        <div>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Menu Item 1</a>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Menu Item 2</a>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Menu Item 3</a>
        </div>
      )}
    </div>
  );
}
