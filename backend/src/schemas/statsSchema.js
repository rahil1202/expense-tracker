import { z } from 'zod'

// Optional ?months=N; allow 1..36, if undefined( then take all)
export const statsQuerySchema = z.object({
  query: z.object({
    months: z.string().regex(/^\d+$/).transform(Number)
      .refine(n => n >= 1 && n <= 36, 'months must be between 1 and 36')
      .optional()
  })
})
