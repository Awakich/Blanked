"use client"

import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { NoteType } from '@/utils/types'
import { BoldIcon, EditIcon, ItalicIcon, UnderlineIcon, XIcon } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ChangeEvent, FC, memo, useCallback, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { styles } from '@/utils/consts'

const NoteListItem: FC<NoteType> = memo(({ _id, text }) => {
    const updateNote = useMutation(api.notes.updateNote)
    const deleteNote = useMutation(api.notes.deleteNote)
    const [pickedStyle, setPickedStyle] = useState<string | null>(null)
    const [userInput, setUserInput] = useState<string>(text)

    const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => setUserInput(e.target.value)
    const updateNoteHandler = () => updateNote({ _id, text: userInput })
    const deleteNoteHandler = () => deleteNote({ _id })

    return (
        <div className='p-5 border-2 rounded-md'>
            <div className='flex justify-between items-center'>
                <ToggleGroup type='single' className='space-x-2'>
                    <ToggleGroupItem className='border' onClick={useCallback(() => setPickedStyle('bold'), [pickedStyle])} value='Toggle Bold'>
                        <BoldIcon className='w-4 h-4 ' />
                    </ToggleGroupItem>

                    <ToggleGroupItem className='border' onClick={useCallback(() => setPickedStyle('italic'), [pickedStyle])} value='Toggle Italic'>
                        <ItalicIcon className='w-4 h-4 ' />
                    </ToggleGroupItem>

                    <ToggleGroupItem className='border' onClick={useCallback(() => setPickedStyle('undeline'), [pickedStyle])} value='Toggle Underline'>
                        <UnderlineIcon className='w-4 h-4 ' />
                    </ToggleGroupItem>
                </ToggleGroup>

                <div className='flex space-x-4'>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant={"outline"} size={'icon'}>
                                <EditIcon className='w-4 h-4' />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action will change your note in real time.
                                </AlertDialogDescription>

                                <Textarea value={userInput} onChange={changeHandler} />

                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className={`${styles}`}>
                                    <Button onClick={updateNoteHandler}>Change</Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant={"outline"} size={'icon'} onClick={() => console.log(_id)}>
                                <XIcon className='w-4 h-4' />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action will delete your note in real time.
                                </AlertDialogDescription>

                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className={`${styles}`}>
                                    <Button variant={"destructive"} onClick={deleteNoteHandler}>Delete</Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <p className={`font-mono ${pickedStyle === "italic" ? "italic" : ""} ${pickedStyle === 'undeline' ? "underline" : ""}  font-${pickedStyle} text-xl md:text-lg mt-4`}>{text}</p>
        </div >
    )
})

export default NoteListItem