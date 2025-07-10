import { z } from 'zod'

export const tableSchema = z.object({
  _id: z.string(),
  tableNumber: z.string(),
  capacity: z.number().min(2, 'Capacity must be at least 2').max(15, 'Capacity must be at most 15'),
  status: z.enum(['AVAILABLE', 'OCCUPIED', 'RESERVED', 'MAINTENANCE']),
  location: z.enum(['INSIDE', 'OUTSIDE', 'BALCONY']),
  deleted: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

