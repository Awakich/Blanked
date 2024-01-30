"use client"
import { FC } from 'react'
import PictureListItem from './PictureListItem'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { Skeleton } from '@/components/ui/skeleton'

const PictureList: FC = () => {
    const pictures = useQuery(api.pictures.getPictures)

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>

            {!pictures && <>
                <Skeleton className='h-[250px] w-[350px]  bg-gray-300  rounded-md' />
                <Skeleton className='h-[250px] w-[350px]  bg-gray-300  rounded-md' />
                <Skeleton className='h-[250px] w-[350px]  bg-gray-300  rounded-md' />
                <Skeleton className='h-[250px] w-[350px]  bg-gray-300  rounded-md' />
            </>}

            {pictures && pictures?.map(({ url, _id }) => (
                <PictureListItem key={_id} _id={_id} url={url} />
            ))}
        </div>
    )
}

export default PictureList