import { z } from 'zod'

export const categoryCreateSchema = z.object({
  body: z.object({
    name: z.string().min(1)
  })
})

export const categoryUpdateSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
  body: z.object({
    name: z.string().min(1)
  })
})

export const categoryIdSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) })
})
