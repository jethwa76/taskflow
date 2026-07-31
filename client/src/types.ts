export type TaskStatus = 'Pending' | 'In Progress' | 'Completed'
export type TaskPriority = 'Low' | 'Medium' | 'High'

export type Task = {
  id: string
  title: string
  description: string
  category: string
  priority: TaskPriority
  status: TaskStatus
  dueDate: string
  createdAt: string
  updatedAt: string
}

export type User = {
  name: string
  email: string
  role: string
  initials: string
}

export type TaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
