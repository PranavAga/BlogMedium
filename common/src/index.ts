import { z } from 'zod'

export const signupInput = z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3)
});

export type SignupInput = z.infer<typeof signupInput>;

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string()
});

export type SigninInput = z.infer<typeof signinInput>;

export const blogInput = z.object({
	title: z.string(),
    content: z.string(),
});

export type BlogInput = z.infer<typeof blogInput>;