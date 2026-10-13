import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
});

export const updateUserSchema = z.object({
    firstName: z.string().min(1, "First Name is required").optional(),
    lastName: z.string().min(1, "Last Name is required").optional(),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email format').toLowerCase().trim(),
    password: z.string().min(1, 'Password is required'),
});