"use client"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@radix-ui/react-context-menu'
import { api } from '../../../../../convex/_generated/api'
import { useMutation } from 'convex/react'
import { FC } from 'react'
import Image from 'next/image'

type MoodboardListItemType = {
    message: any
}

const MoodboardListItem: FC<MoodboardListItemType> = ({ message }) => {
    const deleteImage = useMutation(api.moodboard.deleteImage)
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <Image className='rounded-lg' alt="added image" src={message.url} height={300} width={300} />
            </ContextMenuTrigger>

            <ContextMenuContent>
                <ContextMenuItem>Back</ContextMenuItem>
                <ContextMenuItem onClick={() => deleteImage({ storageId: message.body, _id: message._id })}>Delete</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}

export default MoodboardListItem