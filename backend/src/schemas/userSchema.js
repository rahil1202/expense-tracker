import { z } from 'zod'

export const userCreateSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE')
  })
})

export const userUpdateSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
  body: z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional()
  }).refine(data => Object.keys(data).length > 0, { message: 'Provide at least one field' })
})

export const userIdSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) })
})
