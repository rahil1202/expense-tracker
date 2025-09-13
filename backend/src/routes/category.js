import { Router } from 'express'
import { validate } from '../utils/validate.js'
import { categoryCreateSchema, categoryUpdateSchema, categoryIdSchema } from '../schemas/categorySchema.js'
import { listCategories, getCategory, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js'

const router = Router()
router.get('/', listCategories)
router.get('/:id', validate(categoryIdSchema), getCategory)
router.post('/', validate(categoryCreateSchema), createCategory)
router.put('/:id', validate(categoryUpdateSchema), updateCategory)
router.delete('/:id', validate(categoryIdSchema), deleteCategory)
export default router
