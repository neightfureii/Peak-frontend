import { USER_ROLES } from '@/types';
import * as z from 'zod';

export const sportSchema = z.object({
    bannerUrl: z.string().min(1, "Banner image is required"),
    bannerCldPubId: z.string().min(1, "Banner image is required"),
    code: z.string().trim().min(1, "Code is required").max(10),
    name: z.string().trim().min(1, "Name is required").max(100),
    description: z.string().max(255).optional(),
    categoryId: z.string().min(1, "Category is required"),
});

export const sportsCategorySchema = z.object({
    name: z.string().trim().min(1, "Name is required").max(100),
    description: z.string().max(255).optional(),
});

export const userSchema = z.object({
    image: z.string().min(1, "User image is required"),
    imageCldPubId: z.string().min(1, "User image is required"),
    name: z.string().trim().min(1, "Name is required").max(100),
    email: z.string().trim().min(1, "Email is required").email("Invalid email format").max(255),
    role: z.enum(USER_ROLES, { message: "Role must be one of 'admin', 'student', or 'ped_incharge'" }),
});