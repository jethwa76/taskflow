import type { Task, User } from '../types'

export const demoUser: User = {
  name: 'Alex Morgan',
  email: 'alex.morgan@acme.co',
  role: 'Product Designer',
  initials: 'AM',
}

const daysFromNow = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}

export const demoTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Finalize onboarding flow',
    description: 'Review the first-run experience and prepare the final handoff for engineering.',
    category: 'Product',
    priority: 'High',
    status: 'In Progress',
    dueDate: daysFromNow(1),
    createdAt: daysFromNow(-4),
    updatedAt: daysFromNow(-1),
  },
  {
    id: 'task-2',
    title: 'Prepare Q3 campaign brief',
    description: 'Turn the customer insights into a concise campaign brief for the growth team.',
    category: 'Marketing',
    priority: 'Medium',
    status: 'Pending',
    dueDate: daysFromNow(3),
    createdAt: daysFromNow(-3),
    updatedAt: daysFromNow(-2),
  },
  {
    id: 'task-3',
    title: 'Audit design system tokens',
    description: 'Check spacing, type, and color tokens against the latest component library.',
    category: 'Design',
    priority: 'Low',
    status: 'Completed',
    dueDate: daysFromNow(-2),
    createdAt: daysFromNow(-9),
    updatedAt: daysFromNow(-1),
  },
  {
    id: 'task-4',
    title: 'Schedule user research sessions',
    description: 'Recruit five participants and set up the interview calendar for next sprint.',
    category: 'Research',
    priority: 'High',
    status: 'Pending',
    dueDate: daysFromNow(5),
    createdAt: daysFromNow(-2),
    updatedAt: daysFromNow(-2),
  },
  {
    id: 'task-5',
    title: 'Write release notes',
    description: 'Summarize this sprint’s improvements and polish the customer-facing copy.',
    category: 'Operations',
    priority: 'Medium',
    status: 'Completed',
    dueDate: daysFromNow(-1),
    createdAt: daysFromNow(-6),
    updatedAt: daysFromNow(-1),
  },
  {
    id: 'task-6',
    title: 'Map the mobile navigation',
    description: 'Create a lightweight navigation map for the upcoming responsive refresh.',
    category: 'Design',
    priority: 'Low',
    status: 'In Progress',
    dueDate: daysFromNow(7),
    createdAt: daysFromNow(-1),
    updatedAt: daysFromNow(0),
  },
]
