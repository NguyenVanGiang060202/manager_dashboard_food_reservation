import { z } from 'zod'


export const loginFormSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});


export const signupFormSchema = z.object({
    name: z
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(50, 'Username must not exceed 50 characters')
        .regex(/^[a-zA-Z0-9_ ]+$/, 'Username can only contain letters, numbers, spaces, and underscores'),
    email: z
        .string()
        .email('Invalid email')
        .min(3, 'Email must be at least 3 characters')
        .max(50, 'Email must not exceed 50 characters'),
    phone: z.string().regex(/^(0|\+84)(\d{9,10})$/, 'Invalid phone number (must start with 0 or +84 and have 9 to 10 digits)'),
    dateOfBirth: z.date().refine((date) => date <= new Date(), {
        message: 'Invalid date of birth',
    }),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(50, 'Password must not exceed 50 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
    confirmPassword: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(50, 'Password must not exceed 50 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Confirm password does not match',
    path: ['confirmPassword'],
})
