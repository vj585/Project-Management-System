import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Loader2 } from 'lucide-react';
import { cn } from '../utils/cn';

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']).default('NOT_STARTED'),
});

const ProjectModal = ({ isOpen, onClose, onSubmit, project = null, loading = false }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: { name: '', description: '', status: 'NOT_STARTED' }
  });

  useEffect(() => {
    if (project) {
      reset({ name: project.name, description: project.description || '', status: project.status });
    } else {
      reset({ name: '', description: '', status: 'NOT_STARTED' });
    }
  }, [project, reset, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass-panel w-full max-w-md relative z-10 animate-scale-in">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h2 className="text-lg font-bold">{project ? 'Edit Project' : 'New Project'}</h2>
          <button onClick={onClose} className="text-muted hover:text-text transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-text">Name</label>
            <input
              {...register('name')}
              type="text"
              className={cn("input-field", errors.name && "border-danger focus:ring-danger/20")}
              placeholder="Project Name"
            />
            {errors.name && <p className="mt-1.5 text-xs text-danger">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-text">Description</label>
            <textarea
              {...register('description')}
              className="input-field min-h-[100px] resize-none"
              placeholder="Optional description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-text">Status</label>
            <select {...register('status')} className="input-field">
              <option value="NOT_STARTED">Not Started</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-border mt-6">
            <button type="button" onClick={onClose} className="btn-secondary text-sm">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary text-sm min-w-[100px]">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
