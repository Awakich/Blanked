"use client"

import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Skeleton } from '@/components/ui/skeleton';
import { FC, useEffect, useState } from 'react'
import MoodboardList from '../components/Moodboard/MoodboardList';
import MoodboardForm from '../components/Moodboard/MoodboardForm';

const MoodBoard: FC = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [eventActive, setEventActive] = useState<boolean>(false)
    
    const messages = useQuery(api.moodboard.getImages) || [];
   
    useEffect(() => {
        if (messages) setIsLoading(false)
    }, [messages])

    return (
        <section className='flex flex-col space-y-4 py-20 px-10'>
            <div className="grid w-full items-center gap-1.5 ">

                <MoodboardForm eventActive={eventActive} selectedImage={selectedImage} setSelectedImage={setSelectedImage} setEventActive={setEventActive} />

                <ul className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center'>
                    {isLoading &&
                        <>
                            <Skeleton className='bg-gray-300 w-[360px] md:w-[300px] h-[200px]' />
                            <Skeleton className='bg-gray-300 w-[360px] md:w-[300px] h-[200px]' />
                            <Skeleton className='bg-gray-300 w-[360px] md:w-[300px] h-[200px]' />
                        </>
                    }

                    <MoodboardList messages={messages} />

                    {eventActive && <Skeleton className='bg-gray-300 md:w-[300px] lg:w-[400px] w-[360px] h-[200px]' />}
                </ul>
            </div>
        </section >
    )
}

export default MoodBoard;