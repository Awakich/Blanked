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
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

import { useMutation } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { useToast } from '@/components/ui/use-toast'


const FormNotes: FC = () => {
    const createNote = useMutation(api.notes.createNote)
    const { toast } = useToast()
    const FormSchema = z.object({
        note: z
            .string()
            .min(5, {
                message: "note must be at least 5 characters.",
            })
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        const { note } = data;
        createNote({ text: note })
        form.setValue("note", "")
        toast({
            title: "Success creation",
            description: "Your note was created!",
        })
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col max-w-xl space-y-4">
                <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='font-semibold text-lg'>Your note</FormLabel>

                            <FormControl>
                                <Textarea
                                    placeholder="Write your note or everything what you want and try to redact this"
                                    className='resize-y'
                                    {...field}
                                />
                            </FormControl>

                            <FormDescription>
                                You can format your note and add styles then
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

export default FormNotes