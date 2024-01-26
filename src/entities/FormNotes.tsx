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

const FormNotes: FC = () => {
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
        console.log(data)
        form.resetField('note')
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:block space-y-4">
                <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your note</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Write your note or everything what you want and try to redact this"
                                    className="resize-y"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                You can format your note(bold, underline, italic)
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