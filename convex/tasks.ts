import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createTask = mutation({
    args: {
        name: v.string(),
        description: v.optional(v.string()),
        level: v.union(
            v.literal("Easy"),
            v.literal("Medium"),
            v.literal("Hard")
        ),
    },

    handler: async (ctx, args) => {
        await ctx.db.insert("tasks", {
            name: args.name,
            description: args.description,
            level: args.level
        })
    },
})

export const getTasks = query({
    handler: async (ctx) => {
        return ctx.db.query("tasks").collect()
    },
})

export const getTask = query({
    args: {
        id: v.id("tasks")
    },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id)
    },
})