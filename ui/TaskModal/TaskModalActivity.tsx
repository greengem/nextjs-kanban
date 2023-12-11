'use client'
import { IconActivity } from "@tabler/icons-react"
import TaskModalActivityItem from "./TaskModalActivityItem"
import { Avatar } from "@nextui-org/avatar"
import { Textarea } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
export default function TaskModalActivity() {

    return (
        <>
        <div className='flex gap-2 w-full'>
            <IconActivity size={20} className='mt-1 w-5' />
            <h4 className='text-large font-semibold'>Activity</h4>
        </div>
                <div className="flex gap-3 mb-3">
                    <Avatar 
                        showFallback 
                        name='Chris Waitt' 
                        src='https://images.unsplash.com/broken' 
                    />
                    <div className="w-full" >
                        <Textarea
                            size="sm"
                            className="mb-2"
                        />
                        <div className="flex gap-2">
                            <Button size="sm" color="primary">Save</Button>
                            <Button size="sm">Cancel</Button>
                        </div>
                    </div>
                </div>
                <ul>
                    <TaskModalActivityItem />
                </ul>
        </>
    )
}
