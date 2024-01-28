import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const sendImage = mutation({
    args: { storageId: v.id("_storage") },
    handler: async (ctx, args) => {
        await ctx.db.insert("moodboard", {
            body: args.storageId,
            format: "image"
        });
    },
});

export const getImages = query({
    args: {},
    handler: async (ctx) => {
        const messages = await ctx.db.query("moodboard").collect();
        return Promise.all(
            messages.map(async (message) => ({
                ...message,

                ...(message.format === "image"
                    ? { url: await ctx.storage.getUrl(message.body) }
                    : {}),
            }))
        );
    },
});

export const deleteImage = mutation({
    args: {
        storageId: v.id("_storage"),
        _id: v.id("moodboard"),
    },

    handler: async (ctx, { _id, storageId }) => {
        await ctx.db.delete(_id)
        await ctx.storage.delete(storageId)
    },
})