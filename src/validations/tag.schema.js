import z from 'zod';

export const createTagSchema = z.object({
    name: z.string().nonempty().trim()
})

export const updateTagSchema = createTagSchema