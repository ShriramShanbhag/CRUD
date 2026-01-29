import z from 'zod';

const PLATFORMS = ["chatgpt", "gemini", "perplexity"]

export const createChatSchema = z.object({
    title: z.string().length(100).nonempty().trim(),
    url: z.url().nonempty().trim(),
    user_id: z.int().nonnegative(),
    platform: z.string().enum(PLATFORMS)
})

export const addTagToChatSchema = z.object({
    tagName: z.string().optional(),
    tagId: z.string(20).optional()
}).refine((data) => data.tagName || data.tagId, {
    message: "Either tagname or tag id should be present"
})

