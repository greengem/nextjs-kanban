'use client'
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { IconArrowLeft, IconWand, IconX } from "@tabler/icons-react";

export default function ColourPicker() {
    const [mounted, setMounted] = useState(false)
    const { theme: activeTheme, setTheme } = useTheme();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const closePopover = () => {
        setIsPopoverOpen(false);
    };
  
    const themes = [
        { name: 'red', colorClass: 'bg-red-500' },
        { name: 'orange', colorClass: 'bg-orange-500' },
        { name: 'amber', colorClass: 'bg-amber-500' },
        { name: 'yellow', colorClass: 'bg-yellow-500' },
        { name: 'lime', colorClass: 'bg-lime-500' },
        { name: 'green', colorClass: 'bg-green-500' },
        { name: 'emerald', colorClass: 'bg-emerald-500' },
        { name: 'teal', colorClass: 'bg-teal-500' },
        { name: 'cyan', colorClass: 'bg-cyan-500' },
        { name: 'sky', colorClass: 'bg-sky-500' },
        { name: 'blue', colorClass: 'bg-blue-500' },
        { name: 'indigo', colorClass: 'bg-indigo-500' },
        { name: 'violet', colorClass: 'bg-violet-500' },
        { name: 'purple', colorClass: 'bg-purple-500' },
        { name: 'fuchsia', colorClass: 'bg-fuchsia-500' },
        { name: 'pink', colorClass: 'bg-pink-500' },
        { name: 'rose', colorClass: 'bg-rose-500' },
    ];

    useEffect(() => {
      setMounted(true)
    }, [])
  
    if(!mounted) return null

    return (
        <Popover isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen} placement="left-start">

            <PopoverTrigger>
                <button>
                    <IconWand size={24} />
                </button>
            </PopoverTrigger>

            <PopoverContent>
                <div className="py-3 px-2">
                    <div className='flex justify-between items-center mb-3'>
                    <div className='opacity-0'>
                        <IconArrowLeft size={20} />
                    </div>
                    <h4 className="text-center font-semibold">Accent Colour</h4>
                    <button onClick={closePopover}><IconX size={20} /></button>
                </div>
                    <ul className="grid grid-cols-5 gap-3">
                        {themes.map(theme => (
                            <li key={theme.name}>
                                <div 
                                    onClick={() => setTheme(theme.name)} 
                                    className={`rounded-full h-5 w-5 cursor-pointer ${theme.colorClass} ${activeTheme === theme.name ? 'ring-2 ring-offset-2 ring-offset-white ring-primary' : ''}`}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </PopoverContent>

        </Popover>
    )
}