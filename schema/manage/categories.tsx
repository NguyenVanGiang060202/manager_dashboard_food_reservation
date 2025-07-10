import { z } from "zod";


export const categorySchema = z.object({
    _id: z.string(),
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must not exceed 50 characters'),
    description: z.string().max(500, 'Description must not exceed 500 characters').optional(),
    isActive: z.boolean(),
    deleted: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
})