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
        _id: v.id("notes")
    },

    handler: async (ctx, args) => {
        await ctx.db.patch(args._id, {
            text: args.text
        })
    },
})

export const deleteNote = mutation({
    args: {
        _id: v.id("notes")
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args._id)
    },
})

export const getNotes = query({
    handler: async (ctx) => {
        return ctx.db.query("notes").collect()
    },
})