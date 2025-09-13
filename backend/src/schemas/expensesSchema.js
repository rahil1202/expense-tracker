import { z } from 'zod'

const idNum = z.number().int().positive()
const idStrNum = z.string().regex(/^\d+$/).transform(Number)

export const expenseCreateSchema = z.object({
  body: z.object({
    user_id: z.union([idNum, idStrNum]),
    category: z.union([idNum, idStrNum]),
    amount: z.union([z.number(), z.string().transform(Number)]).refine(v => !Number.isNaN(v) && v >= 0, 'amount must be >= 0'),
    date: z.string().min(1), //YYYY-MM-DD
    description: z.string().max(255).optional().nullable()
  })
})

export const expenseUpdateSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/).transform(Number) }),
  body: z.object({
    user_id: z.union([idNum, idStrNum]).optional(),
    category: z.union([idNum, idStrNum]).optional(),
    amount: z.union([z.number(), z.string().transform(Number)]).optional()
      .refine(v => v === undefined || (!Number.isNaN(v) && v >= 0), 'amount must be >= 0'),
    date: z.string().min(1).optional(),
    description: z.string().max(255).optional().nullable()
  }).refine(obj => Object.keys(obj).length > 0, { message: 'Provide at least one field' })
})

export const expenseIdSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/).transform(Number) })
})

export const expenseListQuerySchema = z.object({
  query: z.object({
    user_id: z.string().regex(/^\d+$/).optional(),
    category: z.string().regex(/^\d+$/).optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    limit: z.string().regex(/^\d+$/).optional(),
    offset: z.string().regex(/^\d+$/).optional()
  })
})
