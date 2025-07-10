import { z } from "zod";

export const menuSchema = z.object({
    _id: z.string(),
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must not exceed 50 characters'),
    price: z.number().min(0, 'Price must be at least 0'),
    description: z.string().max(500, 'Description must not exceed 500 characters').optional(),
    category: z.string().min(2, 'Category must be at least 2 characters').max(50, 'Category must not exceed 50 characters'),
    image_url: z.string().optional(),
    deleted: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
})