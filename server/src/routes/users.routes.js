import { Router } from 'express'
import { getProfile, updateProfile } from '../controllers/users.controller.js'
import { requireAuth } from '../middleware/auth.js'

export const usersRouter = Router()
usersRouter.use(requireAuth)
usersRouter.get('/profile', getProfile)
usersRouter.put('/profile', updateProfile)
