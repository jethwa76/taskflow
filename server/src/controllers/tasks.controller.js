import mongoose from 'mongoose'
import { z } from 'zod'
import { Task } from '../models/Task.js'

const taskSchema = z.object({ title: z.string().trim().min(1).max(140), description: z.string().max(1000).optional().default(''), category: z.string().max(40).default('Product'), priority: z.enum(['Low', 'Medium', 'High']).default('Medium'), status: z.enum(['Pending', 'In Progress', 'Completed']).default('Pending'), dueDate: z.coerce.date() })
const ownedTask = (req, id) => mongoose.isValidObjectId(id) ? Task.findOne({ _id: id, userId: req.user._id }) : null

export async function listTasks(req, res) { const filters = { userId: req.user._id }; if (req.query.status) filters.status = req.query.status; if (req.query.priority) filters.priority = req.query.priority; if (req.query.search) filters.title = { $regex: req.query.search, $options: 'i' }; const tasks = await Task.find(filters).sort({ updatedAt: -1 }); res.json({ tasks }) }
export async function getTask(req, res) { const task = await ownedTask(req, req.params.id); if (!task) return res.status(404).json({ message: 'Task not found' }); res.json({ task: await task }) }
export async function createTask(req, res) { const data = taskSchema.parse(req.body); const task = await Task.create({ ...data, userId: req.user._id }); res.status(201).json({ task }) }
export async function updateTask(req, res) { const data = taskSchema.partial().parse(req.body); const task = await ownedTask(req, req.params.id); if (!task) return res.status(404).json({ message: 'Task not found' }); Object.assign(await task, data); await task.save(); res.json({ task }) }
export async function deleteTask(req, res) { const task = await ownedTask(req, req.params.id); if (!task) return res.status(404).json({ message: 'Task not found' }); await task.deleteOne(); res.json({ message: 'Task deleted' }) }
