import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createPicture = mutation({
    args: {
        imageUrl: v.string()
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("pictures", {
            url: args.imageUrl
        })
    },
})

export const deletePicture = mutation({
    args: {
        _id: v.id("pictures")
    },

    handler: async (ctx, args) => {
        await ctx.db.delete(args._id)
    },
})

export const getPictures = query({
    handler: async (ctx) => {
        return await ctx.db.query('pictures').collect()
    }
})