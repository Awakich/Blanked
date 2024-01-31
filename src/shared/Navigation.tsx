"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { SignInButton, UserButton } from '@clerk/clerk-react'
import { useConvexAuth } from 'convex/react'
import { ArrowRightIcon, BarChart2, Brush, ClipboardListIcon, ContainerIcon, HomeIcon, LightbulbIcon, MenuIcon, PenBoxIcon } from 'lucide-react'
import { FC, Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'
import { arrayApps, arrayAppsAuth } from '@/utils/consts'
import Link from 'next/link'


const Navigation: FC = () => {
    const { isAuthenticated, isLoading } = useConvexAuth()
    const navigate = useRouter()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const changeOpen = () => setIsOpen(!isOpen)
    const transferHome = () => navigate.push('/')

    return (
        <Fragment>
            <div className='flex justify-between items-center'>
                <Badge variant={'outline'} onClick={transferHome} className="py-2 mb-4 cursor-pointer flex-shrink gap-2"><HomeIcon className='w-4 h-4' /> New combo solution</Badge>
                <Badge variant={"default"} className="py-2 mb-4 font-mono font-normal flex-shrink gap-2">Project in development mode! <ContainerIcon className='w-4 h-4' /></Badge>
            </div>

            <nav className='flex justify-between items-center'>
                <Sheet onOpenChange={changeOpen} open={isOpen} defaultOpen={false}>
                    <SheetTrigger asChild>
                        <Button variant={'ghost'}><MenuIcon className='cursor-pointer' /></Button>
                    </SheetTrigger>

                    <SheetContent className='w-5/6' side={'left'}>
                        <SheetHeader>
                            <SheetTitle className=''>What will you choose?</SheetTitle>
                            <SheetDescription>
                                {`That's apps picker. You will choose one of applications and solve your problems.`}
                            </SheetDescription>
                        </SheetHeader>


                        <div className='my-4 space-y-4'>
                            <Separator />
                            {(isAuthenticated ? arrayAppsAuth : arrayApps).map(({ title, description }, index) => (
                                <Link onClick={() => setIsOpen(false)} href={`/${title}`} key={index} className='flex gap-3 items-center p-2 hover:bg-neutral-100 cursor-pointer border rounded-md'>
                                    {index === 0 ? <LightbulbIcon className='w-6 h-6' /> : index === 1 ? <ClipboardListIcon className='w-6 h-6' /> : index === 2 ? <PenBoxIcon className='w-6 h-6' /> : index === 3 ? <Brush className='w-6 h-6' /> : <BarChart2 className='w-6 h-6' />}

                                    <div className='w-full'>
                                        <div className='flex justify-between items-center'>
                                            <p className='text-lg font-semibold'>{title}</p>
                                            <ArrowRightIcon className='w-4 h-4' />
                                        </div>

                                        <p className='text-sm text-muted-foreground'>{description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>

                <div className='mr-4'>
                    {!isAuthenticated && !isLoading && (
                        <SignInButton afterSignInUrl='/' mode='modal'>
                            <Button variant={"outline"} size={"sm"}>Get Blanked for Free</Button>
                        </SignInButton>
                    )}
                    {isAuthenticated && !isLoading && (
                        <UserButton afterSignOutUrl="/" />
                    )}
                </div>
            </nav>
        </Fragment>
    )
}

export default Navigation