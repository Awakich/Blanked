"use client"

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

import Image from 'next/image';
import { ChangeEvent, FC, memo, useCallback, useState } from 'react'
import { getInsertedImage } from '@/utils/getInsertedImage';

const MoodBoard: FC = memo(() => {
    const [images, setImages] = useState([])

    console.log(images)

    return (
        <section className='flex flex-col space-y-4 py-20 px-10'>

            <div className="grid w-full max-w-sm items-center gap-1.5 ">
                <Label htmlFor="picture" className='cursor-pointer'>
                    <div className='space-y-4'>
                        <p className='font-semibold text-xl '>Add your image</p>
                        <div className='bg-gray-300 rounded-md animate-in animate-out flex flex-col justify-center items-center py-20 hover:bg-gray-200'>
                            <p className='font-medium text-xs text-muted-foreground'>Upload image</p>
                        </div>
                    </div>
                </Label>

                <Input onChange={useCallback((e: ChangeEvent<HTMLInputElement>) => getInsertedImage(e, setImages), [setImages])} accept='image/*' className='hidden' id="picture" type="file" />

                {images.map((image) => <Image alt="image added" src={image} width={100} height={100} />)}

                {/* <ResizablePanelGroup direction="horizontal" className="max-w-md rounded-lg border">
                    <ResizablePanel defaultSize={25}>
                        <div className="flex h-[200px] items-center justify-center p-6">
                            <span className="font-semibold">One</span>
                        </div>
                    </ResizablePanel>

                    <ResizableHandle withHandle />



                    <ResizablePanel defaultSize={25}>
                        <div className="flex h-full items-center justify-center p-6">
                            <span className="font-semibold">Two</span>
                        </div>
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    <ResizablePanel defaultSize={25}>
                        <div className="flex h-full items-center justify-center p-6">
                            <span className="font-semibold">Three</span>
                        </div>
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    <ResizablePanel defaultSize={25}>
                        <div className="flex h-full items-center justify-center p-6">
                            <span className="font-semibold">Four</span>
                        </div>
                    </ResizablePanel>

                </ResizablePanelGroup> */}
            </div>
        </section>
    )
})

export default MoodBoard;