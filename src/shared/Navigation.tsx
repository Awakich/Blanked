"use client"

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { SignInButton, UserButton } from '@clerk/clerk-react'
import { useConvexAuth } from 'convex/react'
import { ArrowRightIcon, ClipboardListIcon, LightbulbIcon, MenuIcon, PenBoxIcon } from 'lucide-react'
import { FC } from 'react'

const arrayApps = [
    { title: "Moodboard", description: "Create your design's inspiration", },
    { title: "Tasks", description: "Create your tasks on every day" },
    { title: "Notes", description: "Create your notes", }
]

const Navigation: FC = () => {
    const { isAuthenticated, isLoading } = useConvexAuth()
    return (
        <nav className='flex justify-between items-center'>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant={'ghost'}><MenuIcon className='cursor-pointer' /></Button>
                </SheetTrigger>

                <SheetContent className='w-5/6' side={'left'}>
                    <SheetHeader>
                        <SheetTitle className=''>What will you choose?</SheetTitle>
                        <SheetDescription>
                            That's apps picker. You will choose one of applications and solve your problems.
                        </SheetDescription>
                    </SheetHeader>


                    <div className='my-4 space-y-4'>
                        <Separator />
                        {arrayApps.map(({ title, description }, index) => (
                            <div key={index} className='flex gap-3 items-center p-2 hover:bg-neutral-100 cursor-pointer border rounded-md'>
                                {index === 0 ? <LightbulbIcon className='w-6 h-6' /> : index === 1 ? <ClipboardListIcon className='w-6 h-6' /> : <PenBoxIcon className='w-6 h-6' />}

                                <div className='w-full'>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-lg font-semibold'>{title}</p>
                                        <ArrowRightIcon className='w-4 h-4' />
                                    </div>

                                    <p className='text-sm text-muted-foreground'>{description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>

            <div className='mr-4'>
                {!isAuthenticated && !isLoading && (
                    <SignInButton>
                        <Button variant={"outline"} size={"sm"}>Get Blanked for Free</Button>
                    </SignInButton>
                )}
                {isAuthenticated && !isLoading && (
                    <UserButton afterSignOutUrl="/" />
                )}
            </div>
        </nav>
    )
}

export default Navigation