"use client"
import { api } from '../../../../../convex/_generated/api'
import { useMutation } from 'convex/react'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'
import { PicturesType } from '@/utils/types'
import { FC } from 'react'
import Image from 'next/image'

const PictureListItem: FC<PicturesType> = ({ _id, url }) => {
    const deletePicture = useMutation(api.pictures.deletePicture)

    const deletePictureHandler = () => deletePicture({ _id })

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <Image className='rounded-md border-2' alt="picture image" src={url} width={400} height={400} />
            </ContextMenuTrigger>

            <ContextMenuContent>
                <ContextMenuItem>Back</ContextMenuItem>
                <ContextMenuItem onClick={deletePictureHandler}>Delete</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>

    )
}

export default PictureListItem