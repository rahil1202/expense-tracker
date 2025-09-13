import { Router } from 'express'
import { validate } from '../utils/validate.js'
import { expenseCreateSchema, expenseUpdateSchema, expenseIdSchema, expenseListQuerySchema } from '../schemas/expensesSchema.js'
import { listExpenses, getExpense, createExpense, updateExpense, deleteExpense } from '../controllers/expensesController.js'

const router = Router()
router.get('/', validate(expenseListQuerySchema), listExpenses)
router.get('/:id', validate(expenseIdSchema), getExpense)
router.post('/', validate(expenseCreateSchema), createExpense)
router.put('/:id', validate(expenseUpdateSchema), updateExpense)
router.delete('/:id', validate(expenseIdSchema), deleteExpense)
export default router