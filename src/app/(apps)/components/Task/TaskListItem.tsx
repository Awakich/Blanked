"use client"
import { useMutation } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EditIcon } from 'lucide-react'
import { ChangeEvent, FC, useState } from 'react'
import { TaskType } from '@/utils/types'
import { styles } from '@/utils/consts'

const TaskListItem: FC<TaskType> = ({ _id, description, level, name, isComplete }) => {
    const updateTask = useMutation(api.tasks.updateTask)
    const completeTask = useMutation(api.tasks.completeTask)

    const [nameInput, setNameInput] = useState<string>(name)
    const [descriptionInput, setDescriptionInput] = useState<string>(description)
    const [levelInput, setLevelInput] = useState<"Easy" | "Medium" | "Hard">(level)

    const completeTaskHandler = () => completeTask({ _id, isComplete: !isComplete })
    const updateNoteHandler = () => updateTask({ _id, name: nameInput, description: descriptionInput, level: levelInput })

    const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNameInput(e.target.value)
    const descriptionChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setDescriptionInput(e.target.value)
    const levelChangeHandler = (value: "Easy" | "Medium" | "Hard") => setLevelInput(value)

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div className={`p-5 border-2 ${isComplete ? "border-green-500" : "border-slate-200"} rounded-md h-full`}>
                    <div className='flex items-start justify-between'>
                        <div className='flex flex-col space-y-2'>
                            <div className='flex space-x-2 items-center'>
                                <p className='text-lg'>{name}</p>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <EditIcon className='w-4 h-4 cursor-pointer hover:text-gray-500 hover:animate-in hover:animate-out' />
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action will change your task in real time.
                                            </AlertDialogDescription>

                                            <Input value={nameInput} onChange={nameChangeHandler} />
                                            <Input value={descriptionInput} onChange={descriptionChangeHandler} />

                                            <Select value={levelInput} onValueChange={levelChangeHandler}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choose your level" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="Easy">Easy</SelectItem>
                                                    <SelectItem value="Medium">Medium</SelectItem>
                                                    <SelectItem value="Hard">Hard</SelectItem>
                                                </SelectContent>
                                            </Select>

                                        </AlertDialogHeader>

                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction className={`${styles}`}>
                                                <Button onClick={updateNoteHandler}>Change</Button>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>

                            <p className='font-mono text-sm text-muted-foreground'>{description ? description : "None description"}</p>
                        </div>

                        <div className='flex flex-col space-y-2 items-end'>
                            <p className={`${level === "Medium" ? 'text-amber-600' : level === "Hard" ? 'text-red-500' : "text-emerald-600"} font-bold`}>{level}</p>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="airplane-mode">Complete</Label>
                                <Switch onClick={completeTaskHandler} id="airplane-mode" />
                            </div>
                        </div>
                    </div>
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>Back</ContextMenuItem>
                <ContextMenuItem>Delete</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}

export default TaskListItem