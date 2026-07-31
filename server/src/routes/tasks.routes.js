import { Router } from 'express'
import { createTask, deleteTask, getTask, listTasks, updateTask } from '../controllers/tasks.controller.js'
import { requireAuth } from '../middleware/auth.js'

export const tasksRouter = Router()
tasksRouter.use(requireAuth)
tasksRouter.get('/', listTasks)
tasksRouter.post('/', createTask)
tasksRouter.get('/:id', getTask)
tasksRouter.put('/:id', updateTask)
tasksRouter.delete('/:id', deleteTask)
