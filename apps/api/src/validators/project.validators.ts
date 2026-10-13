import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  targetUrl: z.string().url("Must be a valid URL"), // Crucial for a security testing platform!
});