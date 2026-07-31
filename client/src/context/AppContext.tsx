import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { demoTasks, demoUser } from '../data/demo'
import type { Task, TaskInput, User } from '../types'

type AppContextValue = {
  user: User
  tasks: Task[]
  theme: 'light' | 'dark'
  toast: string | null
  isSidebarOpen: boolean
  login: (email: string, password: string) => void
  register: (name: string, email: string, password: string) => void
  logout: () => void
  addTask: (input: TaskInput) => void
  updateTask: (id: string, input: Partial<TaskInput>) => void
  deleteTask: (id: string) => void
  updateProfile: (input: Pick<User, 'name' | 'email' | 'role'>) => void
  toggleTheme: () => void
  showToast: (message: string) => void
  setSidebarOpen: (open: boolean) => void
}

const AppContext = createContext<AppContextValue | null>(null)

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) as T : fallback
  } catch {
    return fallback
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(() => readStorage('taskflow-user', demoUser))
  const [tasks, setTasks] = useState<Task[]>(() => readStorage('taskflow-tasks', demoTasks))
  const [theme, setTheme] = useState<'light' | 'dark'>(() => readStorage<'light' | 'dark'>('taskflow-theme', 'light'))
  const [toast, setToast] = useState<string | null>(null)
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => { localStorage.setItem('taskflow-user', JSON.stringify(user)) }, [user])
  useEffect(() => { localStorage.setItem('taskflow-tasks', JSON.stringify(tasks)) }, [tasks])
  useEffect(() => {
    localStorage.setItem('taskflow-theme', JSON.stringify(theme))
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])
  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(null), 2800)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const showToast = (message: string) => setToast(message)
  const login = (email: string) => {
    setUser((current) => ({ ...current, email: email || current.email }))
    showToast('Welcome back to your workspace')
  }
  const register = (name: string, email: string) => {
    const initials = name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
    setUser({ name, email, role: 'Product Designer', initials })
    showToast('Your workspace is ready')
  }
  const logout = () => showToast('Demo session ended')
  const addTask = (input: TaskInput) => {
    const now = new Date().toISOString()
    setTasks((current) => [{ ...input, id: `task-${Date.now()}`, createdAt: now, updatedAt: now }, ...current])
    showToast('Task added to your workspace')
  }
  const updateTask = (id: string, input: Partial<TaskInput>) => {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, ...input, updatedAt: new Date().toISOString() } : task))
    showToast('Task updated')
  }
  const deleteTask = (id: string) => {
    setTasks((current) => current.filter((task) => task.id !== id))
    showToast('Task removed')
  }
  const updateProfile = (input: Pick<User, 'name' | 'email' | 'role'>) => {
    const initials = input.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
    setUser((current) => ({ ...current, ...input, initials }))
    showToast('Profile details saved')
  }

  const value = useMemo(() => ({ user, tasks, theme, toast, isSidebarOpen, login, register, logout, addTask, updateTask, deleteTask, updateProfile, toggleTheme: () => setTheme((current) => current === 'light' ? 'dark' : 'light'), showToast, setSidebarOpen }), [user, tasks, theme, toast, isSidebarOpen])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used inside AppProvider')
  return context
}
