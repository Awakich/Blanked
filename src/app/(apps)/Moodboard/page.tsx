"use client"

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

import Image from 'next/image';

const MoodBoard: FC = () => {
    const generateUploadUrl = useMutation(api.moodboard.generateUploadUrl)
    const sendImage = useMutation(api.moodboard.sendImage);
    const deleteImage = useMutation(api.moodboard.deleteImage)

    const messages = useQuery(api.moodboard.getImages) || [];

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [eventActive, setEventActive] = useState<boolean>(false)

    const { toast } = useToast()

    useEffect(() => {
        if (messages) setIsLoading(false)
    }, [messages])

    const handleSendImage = async (e: FormEvent) => {
        e.preventDefault()
        setEventActive(true)

        const postUrl = await generateUploadUrl();

        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": selectedImage!.type },
            body: selectedImage,
        });

        setSelectedImage(null)

        const json = await result.json();

        if (!result.ok) {
            toast({
                title: "Upload failed",
                description: "Error with adding of images!",
                variant: "destructive"
            })
        }

        const { storageId } = json;
        await sendImage({ storageId });

        setEventActive(false)

        toast({
            title: "Success added!",
            description: "Your image was added succesfully!"
        })
    }



    return (
        <section className='flex flex-col space-y-4 py-20 px-10'>

            <div className="grid w-full items-center gap-1.5 ">

                <form className='flex flex-col space-y-4 mb-8'>

                    <div className='flex justify-between items-center'>
                        <p className='font-semibold text-xl'>Add your image</p>
                        <Button onClick={handleSendImage} type='submit' disabled={selectedImage === null || eventActive}>Send image</Button>
                    </div>

                    <Label htmlFor='picture' className='w-full cursor-pointer'>
                        <div className='space-y-4'>
                            <div className='bg-gray-300 rounded-md animate-in animate-out flex flex-col justify-center items-center py-20 hover:bg-gray-200'>
                                <p className='font-medium text-xs text-muted-foreground'>Upload image</p>
                            </div>
                        </div>
                    </Label>

                    <Input
                        id='picture'
                        type="file"
                        accept="image/png, image/jpg, image/webp"
                        onChange={(e) => setSelectedImage(e.target.files![0])}
                        className="hidden"
                        disabled={selectedImage !== null}
                    />
                </form>

                <ul className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center'>
                    {isLoading &&
                        <>
                            <Skeleton className='bg-gray-300 w-[360px] md:w-[300px] h-[200px]' />
                            <Skeleton className='bg-gray-300 w-[360px] md:w-[300px] h-[200px]' />
                            <Skeleton className='bg-gray-300 w-[360px] md:w-[300px] h-[200px]' />
                        </>
                    }

                    {messages.map((message) => (
                        <li className='h-full' key={message._id}>
                            {message.format === "image" &&
                                <ContextMenu>
                                    <ContextMenuTrigger>
                                        <Image className='rounded-lg' alt="added image" src={message.url} height={300} width={300} />
                                    </ContextMenuTrigger>

                                    <ContextMenuContent>
                                        <ContextMenuItem>Back</ContextMenuItem>
                                        <ContextMenuItem onClick={() => deleteImage({ storageId: message.body, _id: message._id })}>Delete</ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            }
                        </li>
                    ))}

                    {eventActive && <Skeleton className='bg-gray-300 md:w-[300px] lg:w-[400px] w-[360px] h-[200px]' />}
                </ul>
            </div>
        </section >
    )
}

export default MoodBoard;