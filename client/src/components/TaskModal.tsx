import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
import type { Task, TaskInput } from '../types'

type Props = { task?: Task | null; onClose: () => void; onSave: (input: TaskInput) => void }

export function TaskModal({ task, onClose, onSave }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskInput>({
    defaultValues: task || { title: '', description: '', category: 'Product', priority: 'Medium', status: 'Pending', dueDate: new Date().toISOString().slice(0, 10) },
  })
  useEffect(() => { reset(task || { title: '', description: '', category: 'Product', priority: 'Medium', status: 'Pending', dueDate: new Date().toISOString().slice(0, 10) }) }, [task, reset])
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-panel">
        <div className="modal-heading">
          <div><span className="eyebrow">Workspace</span><h2>{task ? 'Edit task' : 'Create a task'}</h2></div>
          <button className="icon-button" onClick={onClose} aria-label="Close modal"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit(onSave)} className="form-stack">
          <label>Task title<input {...register('title', { required: 'Add a clear title' })} placeholder="e.g. Prepare sprint review" autoFocus />{errors.title && <small className="field-error">{errors.title.message}</small>}</label>
          <label>Description<textarea {...register('description')} placeholder="What does done look like?" rows={3} /></label>
          <div className="form-grid">
            <label>Category<select {...register('category')}><option>Product</option><option>Design</option><option>Marketing</option><option>Research</option><option>Operations</option></select></label>
            <label>Due date<input type="date" {...register('dueDate', { required: true })} /></label>
          </div>
          <div className="form-grid">
            <label>Priority<select {...register('priority')}><option>Low</option><option>Medium</option><option>High</option></select></label>
            <label>Status<select {...register('status')}><option>Pending</option><option>In Progress</option><option>Completed</option></select></label>
          </div>
          <div className="modal-actions"><button type="button" className="button button-ghost" onClick={onClose}>Cancel</button><button className="button button-primary" type="submit">{task ? 'Save changes' : 'Add task'}</button></div>
        </form>
      </div>
    </div>
  )
}
