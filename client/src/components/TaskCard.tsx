import { CalendarDays, Check, Circle, Clock3, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { Task } from '../types'

type Props = { task: Task; onEdit: () => void; onDelete: () => void; onStatusChange: (status: Task['status']) => void; compact?: boolean }

const priorityClass = { High: 'priority-high', Medium: 'priority-medium', Low: 'priority-low' }
const statusIcon = { Pending: <Circle size={14} />, 'In Progress': <Clock3 size={14} />, Completed: <Check size={14} /> }

export function TaskCard({ task, onEdit, onDelete, onStatusChange, compact }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Completed'
  return (
    <article className={`task-card ${compact ? 'task-card-compact' : ''}`}>
      <div className="task-card-top"><span className={`priority-dot ${priorityClass[task.priority]}`}></span><span className="task-category">{task.category}</span><div className="task-menu-wrap"><button className="more-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Task actions"><MoreHorizontal size={17} /></button>{menuOpen && <div className="task-menu"><button onClick={onEdit}><Pencil size={14} /> Edit</button><button onClick={onDelete} className="danger-text"><Trash2 size={14} /> Delete</button></div>}</div></div>
      <h3>{task.title}</h3>
      {!compact && <p>{task.description}</p>}
      <div className="task-card-bottom"><span className={`status-pill status-${task.status.toLowerCase().replace(' ', '-')}`}><span>{statusIcon[task.status]}</span>{task.status}</span><span className={`due-date ${isOverdue ? 'overdue' : ''}`}><CalendarDays size={13} />{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></div>
      {compact && <select className="task-status-select" value={task.status} onChange={(event) => onStatusChange(event.target.value as Task['status'])} aria-label={`Status for ${task.title}`}><option>Pending</option><option>In Progress</option><option>Completed</option></select>}
    </article>
  )
}
