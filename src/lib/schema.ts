import * as z from 'zod';

export const sportSchema = z.object({
    code: z.string().max(10),
    name: z.string().max(100),
    description: z.string().max(255).optional(),
    category: z.string().max(100),
    status: z.enum(['active', 'inactive']),
});

export const sportsCategorySchema = z.object({
    name: z.string().max(100),
    description: z.string().max(255).optional(),
});