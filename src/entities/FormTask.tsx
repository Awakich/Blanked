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

const FormTask: FC = () => {
    const FormSchema = z.object({
        name: z.string().trim().min(2, {
            message: "Name is required"
        }),

        description: z.string({}).optional(),

        level: z.string(),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            description: "",
            level: ""
        },
    })

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log(data)
        form.resetField("name")
        form.resetField("description")
        form.resetField("level")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col md:block space-y-4'>

                <FormField control={form.control} name='name' render={({ field }) => (
                    <div className='space-y-2'>
                        <Label htmlFor="name">Name</Label>
                        <Input {...field} id="name" placeholder='Write name of your task' />
                    </div>
                )} />

                <FormField control={form.control} name='description' render={({ field }) => (
                    <div className='space-y-2'>
                        <Label htmlFor="description">Description</Label>
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

                            <FormDescription>
                                Select level of your task
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