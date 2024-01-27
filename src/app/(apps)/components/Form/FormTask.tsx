"use client"

import { FC } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { useToast } from '@/components/ui/use-toast'

const FormTask: FC = () => {
    const createTask = useMutation(api.tasks.createTask);
    const { toast } = useToast()

    const FormSchema = z.object({
        name: z.string().min(2, {
            message: "Name is required"
        }),

        description: z.string({}).optional(),

        level: z.union([
            z.literal("Easy"),
            z.literal("Medium"),
            z.literal("Hard")
        ]
        )
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            description: "",
            level: "Easy"
        },
    })

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        const { name, description, level } = data;
        createTask({ name, description, level })
        form.resetField("name")
        form.resetField("description")
        toast({
            title: "Success creation!",
            description: "You create your task!"
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col max-w-lg space-y-4'>

                <FormField control={form.control} name='name' render={({ field }) => (
                    <div className='space-y-2'>
                        <Label className='font-semibold' htmlFor="name">Name</Label>
                        <Input {...field} id="name" placeholder='Write name of your task' />
                    </div>
                )} />

                <FormField control={form.control} name='description' render={({ field }) => (
                    <div className='space-y-2'>
                        <Label className='font-semibold' htmlFor="description">Description</Label>
                        <Input {...field} id="description" placeholder='Write your description' />
                    </div>
                )} />

                <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                        <FormItem className='mb-4'>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a level of your task" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    <SelectItem value="Easy">Easy</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="Hard">Hard</SelectItem>
                                </SelectContent>
                            </Select>

                            <FormDescription className='text-sm'>
                                Select a level of your task and it will be marked
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Add</Button>
            </form>
        </Form>
    )
}

export default FormTask