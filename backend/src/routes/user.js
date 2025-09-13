import { Router } from 'express'
import { validate } from '../utils/validate.js'
import { userCreateSchema, userUpdateSchema, userIdSchema } from '../schemas/userSchema.js'
import { listUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/userController.js'

const router = Router()
router.get('/', listUsers)
router.post('/', validate(userCreateSchema), createUser)
router.put('/:id', validate(userUpdateSchema), updateUser)
router.delete('/:id', validate(userIdSchema), deleteUser)
router.get('/:id', validate(userIdSchema), getUser)
export default router
