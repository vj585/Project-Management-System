import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Loader2 } from 'lucide-react';
import { cn } from '../utils/cn';
import api from '../api/axios';

const taskSchema = z.object({
  projectId: z.string().min(1, 'Project is required'),
  name: z.string().min(1, 'Task name is required'),
  description: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).default('PENDING'),
});

const TaskModal = ({ isOpen, onClose, onSubmit, task = null, loading = false }) => {
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: { projectId: '', name: '', description: '', priority: 'MEDIUM', status: 'PENDING' }
  });

  useEffect(() => {
    if (isOpen) {
      const fetchProjects = async () => {
        setProjectsLoading(true);
        try {
          const res = await api.get('/projects');
          if (res.data.success) setProjects(res.data.data);
        } catch (e) {
          console.error(e);
        } finally {
          setProjectsLoading(false);
        }
      };
      fetchProjects();
    }
  }, [isOpen]);

  useEffect(() => {
    if (task) {
      reset({ projectId: task.projectId, name: task.name, description: task.description || '', priority: task.priority, status: task.status });
    } else {
      reset({ projectId: projects.length > 0 ? projects[0].id : '', name: '', description: '', priority: 'MEDIUM', status: 'PENDING' });
    }
  }, [task, reset, isOpen, projects]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass-panel w-full max-w-md relative z-10 animate-scale-in">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h2 className="text-lg font-bold">{task ? 'Edit Task' : 'New Task'}</h2>
          <button onClick={onClose} className="text-muted hover:text-text transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-text">Project</label>
            <select 
              {...register('projectId')} 
              className={cn("input-field", errors.projectId && "border-danger focus:ring-danger/20")}
              disabled={projectsLoading}
            >
              <option value="">Select Project</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            {errors.projectId && <p className="mt-1.5 text-xs text-danger">{errors.projectId.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-text">Name</label>
            <input
              {...register('name')}
              type="text"
              className={cn("input-field", errors.name && "border-danger focus:ring-danger/20")}
              placeholder="Task Name"
            />
            {errors.name && <p className="mt-1.5 text-xs text-danger">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-text">Description</label>
            <textarea
              {...register('description')}
              className="input-field min-h-[80px] resize-none"
              placeholder="Optional description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-text">Priority</label>
              <select {...register('priority')} className="input-field">
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-text">Status</label>
              <select {...register('status')} className="input-field">
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-border mt-6">
            <button type="button" onClick={onClose} className="btn-secondary text-sm">Cancel</button>
            <button type="submit" disabled={loading || projects.length === 0} className="btn-primary text-sm min-w-[100px]">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
