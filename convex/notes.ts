import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const createNote = mutation({
    args: {
        text: v.string(),
    },

    handler: async (ctx, args) => {
        await ctx.db.insert('notes', {
            text: args.text
        })
    },
})

export const updateNote = mutation({
    args: {
        text: v.string(),
        id: v.id("notes")
    },

    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            text: args.text
        })
    },
})

export const getNotes = query({
    handler: async (ctx) => {
        return ctx.db.query("notes").collect()
    },
})

export const getNote = query({
    args: {
        id: v.id("notes")
    },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id)
    },
})