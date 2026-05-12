import * as z from 'zod';

export const sportSchema = z.object({
    code: z.string().trim().min(1, "Code is required").max(10),
    name: z.string().trim().min(1, "Name is required").max(100),
    description: z.string().max(255).optional(),
    category: z.string().trim().min(1, "Category is required").max(100),
    status: z.enum(['active', 'inactive']),
});

export const sportsCategorySchema = z.object({
    name: z.string().trim().min(1, "Name is required").max(100),
    description: z.string().max(255).optional(),
});