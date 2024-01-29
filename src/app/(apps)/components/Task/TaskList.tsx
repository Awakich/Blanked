"use client"
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { FC } from 'react'
import TaskListItem from './TaskListItem'
import { Skeleton } from '@/components/ui/skeleton'

const TaskList: FC = () => {
    const tasks = useQuery(api.tasks.getTasks)

    return (
        <div className='mt-8 gap-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-start'>
            {!tasks && <>
                <Skeleton className='h-[120px] w-[350px] md:w-[300px] md:h-[100px] bg-gray-300  rounded-md' />
                <Skeleton className='h-[120px] w-[350px] md:w-[300px] md:h-[100px] bg-gray-300  rounded-md' />
                <Skeleton className='h-[120px] w-[350px] md:w-[300px] md:h-[100px] bg-gray-300  rounded-md' />
                <Skeleton className='h-[120px] w-[350px] md:w-[300px] md:h-[100px] bg-gray-300  rounded-md' />
            </>}

            {tasks && tasks.map(({ _id, name, description, level, isComplete }) => (
                <TaskListItem isComplete={isComplete} _id={_id} name={name} description={description} level={level} key={_id} />
            ))}
        </div>
    )
}

export default TaskList