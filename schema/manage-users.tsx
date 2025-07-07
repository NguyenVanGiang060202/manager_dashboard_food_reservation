import { z } from 'zod'

export const userSchema = z.object({
  _id: z.string(),
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must not exceed 50 characters')
    .regex(/^[a-zA-Z0-9_ ]+$/, 'Name can only contain letters, numbers, spaces, and underscores'),
  email: z
    .string()
    .email('Invalid email')
    .min(3, 'Email must be at least 3 characters')
    .max(50, 'Email must not exceed 50 characters'),
  dateOfBirth: z.date().refine((date) => date <= new Date(), {
    message: 'Invalid date of birth',
  }),
  phone: z.string().regex(/^(0|\+84)(\d{9,10})$/, 'Invalid phone number'),

  role: z.enum(['ADMIN', 'STAFF', 'USER']),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  isActive: z.boolean(),
  isDeleted: z.boolean(),
  deleted: z.boolean(),

  createdAt: z.preprocess(
    (arg) => {
      if (typeof arg === 'string' || arg instanceof Date) return new Date(arg)
    },
    z.date()
  ),
  updatedAt: z.preprocess(
    (arg) => {
      if (typeof arg === 'string' || arg instanceof Date) return new Date(arg)
    },
    z.date()
  ),
})


export const addUserSchema = userSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
  isActive: true,
  isDeleted: true,
  deleted: true,
})