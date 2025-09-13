import { Router } from 'express'
import { validate } from '../utils/validate.js'
import { statsQuerySchema } from '../schemas/statsSchema.js'
import { getTopDays, getMonthlyChange, getPrediction, getStatsSummary } from '../controllers/statsController.js'

const router = Router()

router.get('/top-days', validate(statsQuerySchema), getTopDays)
router.get('/monthly-change', validate(statsQuerySchema), getMonthlyChange)
router.get('/prediction', validate(statsQuerySchema), getPrediction)
router.get('/summary', validate(statsQuerySchema), getStatsSummary)

export default router
