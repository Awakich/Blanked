"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '../../../../../convex/_generated/api'
import { useMutation } from 'convex/react'
import { useToast } from '@/components/ui/use-toast'
import { handleSendImage } from '@/utils/sendImage'
import { Dispatch, FC, FormEvent, SetStateAction } from 'react'

type MoodboardFormType = {
    selectedImage: File | null
    eventActive: boolean
    setSelectedImage: (e: File | null) => void
    setEventActive: Dispatch<SetStateAction<boolean>>
}

const MoodboardForm: FC<MoodboardFormType> = ({ selectedImage, eventActive, setSelectedImage, setEventActive }) => {
    const generateUploadUrl = useMutation(api.moodboard.generateUploadUrl)
    const sendImage = useMutation(api.moodboard.sendImage);
    const { toast } = useToast()

    const sendImageHandler = (e: FormEvent) =>
        handleSendImage(
            e,
            setEventActive,
            selectedImage,
            setSelectedImage,
            sendImage,
            generateUploadUrl,
            toast
        )

    return (
        <form className='flex flex-col space-y-4 mb-8'>

            <div className='flex justify-between items-center'>
                <p className='font-semibold text-xl'>Add your image</p>
                <Button onClick={sendImageHandler} type='submit' disabled={selectedImage === null || eventActive}>Send image</Button>
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
    )
}

export default MoodboardForm