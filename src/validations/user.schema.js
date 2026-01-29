import z from "zod";

export const createUserSchema = z.object({
    email: z.email().transform(v => v.toLowerCase()),
    name: z.string().min(1)
})

export const updateUserSchema = createUserSchema.partial();
