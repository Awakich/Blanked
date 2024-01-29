"use client"
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { FC } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { NoteType } from '@/utils/types'
import NoteListItem from './NoteListItem'

const NoteList: FC = () => {
    const notes: NoteType[] | undefined = useQuery(api.notes.getNotes)
    return (
        <div className='mt-8 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center'>
            {!notes && <>
                <Skeleton className='h-[120px] w-[350px] md:w-[200px] md:h-[100px] bg-gray-300  rounded-md' />
                <Skeleton className='h-[120px] w-[350px] md:w-[200px] md:h-[100px] bg-gray-300  rounded-md' />
                <Skeleton className='h-[120px] w-[350px] md:w-[200px] md:h-[100px] bg-gray-300  rounded-md' />
                <Skeleton className='h-[120px] w-[350px] md:w-[200px] md:h-[100px] bg-gray-300  rounded-md' />
            </>}

            {notes && notes?.map(({ _id, text }) => (
                <NoteListItem _id={_id} text={text} key={_id} />
            ))}
        </div>
    )
}

export default NoteList