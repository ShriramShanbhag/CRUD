import z from "zod";

export const updateUserSchema = z.object({
    id: z.int(),
    email: z.email().transform(v => v.toLowerCase()),
    name: z.string().min(1)
})
