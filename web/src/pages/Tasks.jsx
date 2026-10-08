import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Loader2, Plus, Search, CheckSquare, Edit2, Trash2, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';
import TaskModal from '../components/TaskModal';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      let query = '/tasks?';
      if (search) query += `search=${search}&`;
      if (statusFilter) query += `status=${statusFilter}&`;
      if (priorityFilter) query += `priority=${priorityFilter}&`;
      
      const response = await api.get(query);
      if (response.data.success) {
        setTasks(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTasks();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, statusFilter, priorityFilter]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete', error);
    }
  };

  const handleModalSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask.id}`, data);
      } else {
        await api.post('/tasks', data);
      }
      setIsModalOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Failed to save task', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusToggle = async (task) => {
    const newStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    try {
      await api.put(`/tasks/${task.id}`, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  const priorityConfig = {
    LOW: { label: 'Low', classes: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    MEDIUM: { label: 'Med', classes: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
    HIGH: { label: 'High', classes: 'bg-pink-500/10 text-pink-500 border-pink-500/20 shadow-[0_0_10px_rgba(236,72,153,0.2)]' }
  };

  const statusConfig = {
    PENDING: 'Pending',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed'
  };

  return (
    <div className="animate-fade-in h-full flex flex-col max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 relative z-10">
        <div>
          <div className="inline-flex items-center px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-3">
            <CheckSquare className="w-3 h-3 mr-2 text-indigo-400" /> Action Items
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">Tasks</h1>
        </div>
        <button onClick={() => { setEditingTask(null); setIsModalOpen(true); }} className="btn-primary shadow-lg shadow-blue-500/20">
          <Plus className="w-5 h-5 mr-2" /> Create Task
        </button>
      </div>

      {/* Filters (Glass Bar) */}
      <div className="glass-panel p-2 flex flex-col md:flex-row gap-2 sticky top-0 z-20">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/20 border border-transparent rounded-xl pl-12 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:bg-black/40 focus:border-white/10 transition-all font-medium"
          />
        </div>
        <div className="flex gap-2">
          <select 
            className="bg-black/20 border border-transparent rounded-xl px-4 py-3 text-white focus:outline-none focus:bg-black/40 focus:border-white/10 transition-all font-medium sm:w-48 appearance-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a1a1aa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em', paddingRight: '2.5rem' }}
          >
            <option value="" className="bg-zinc-900">All Statuses</option>
            <option value="PENDING" className="bg-zinc-900">Pending</option>
            <option value="IN_PROGRESS" className="bg-zinc-900">In Progress</option>
            <option value="COMPLETED" className="bg-zinc-900">Completed</option>
          </select>
          <select 
            className="bg-black/20 border border-transparent rounded-xl px-4 py-3 text-white focus:outline-none focus:bg-black/40 focus:border-white/10 transition-all font-medium sm:w-48 appearance-none"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a1a1aa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em', paddingRight: '2.5rem' }}
          >
            <option value="" className="bg-zinc-900">All Priorities</option>
            <option value="LOW" className="bg-zinc-900">Low</option>
            <option value="MEDIUM" className="bg-zinc-900">Medium</option>
            <option value="HIGH" className="bg-zinc-900">High</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex-1 glass-panel flex flex-col items-center justify-center text-center p-16 border-dashed border-white/20">
          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
            <CheckSquare className="w-10 h-10 text-zinc-600" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No tasks found</h3>
          <p className="text-zinc-400 max-w-sm mb-8 text-lg">Create your first task to keep track of what needs to be done.</p>
          <button onClick={() => { setEditingProject(null); setIsModalOpen(true); }} className="btn-primary">
            <Plus className="w-5 h-5 mr-2" /> Create Task
          </button>
        </div>
      ) : (
        <div className="space-y-3 pb-12">
          {tasks.map((task, idx) => {
            const isCompleted = task.status === 'COMPLETED';
            const priority = priorityConfig[task.priority];
            return (
              <div 
                key={task.id} 
                className={cn(
                  "glass-panel-hover p-4 flex flex-col sm:flex-row sm:items-center gap-4 group animate-fade-in relative z-10",
                  isCompleted && "opacity-60 grayscale hover:grayscale-0"
                )}
                style={{ animationDelay: `${idx * 40}ms`, animationFillMode: 'both' }}
              >
                <button onClick={() => handleStatusToggle(task)} className="flex-shrink-0 group/btn mt-1 sm:mt-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-7 h-7 text-emerald-500 transition-transform group-hover/btn:scale-110 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  ) : (
                    <Circle className="w-7 h-7 text-zinc-600 group-hover/btn:text-blue-500 transition-all group-hover/btn:scale-110" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className={cn("text-lg font-bold truncate transition-colors", isCompleted ? "line-through text-zinc-500" : "text-white group-hover:text-blue-400")}>
                      {task.name}
                    </h4>
                    {!isCompleted && task.priority === 'HIGH' && (
                      <AlertCircle className="w-4 h-4 text-pink-500 animate-pulse" />
                    )}
                  </div>
                  {task.description && (
                    <p className="text-sm text-zinc-400 truncate max-w-2xl">{task.description}</p>
                  )}
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-64 flex-shrink-0 border-t border-white/5 sm:border-t-0 pt-3 sm:pt-0 mt-3 sm:mt-0">
                  <span className={cn("badge", priority.classes)}>{priority.label}</span>
                  
                  <span className={cn("text-sm font-semibold", 
                    isCompleted ? "text-emerald-500" : task.status === 'IN_PROGRESS' ? "text-blue-400" : "text-zinc-500"
                  )}>
                    {statusConfig[task.status]}
                  </span>

                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditingProject(task); setIsModalOpen(true); }} className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(task.id)} className="p-2 bg-pink-500/10 hover:bg-pink-500/20 text-pink-500 rounded-lg transition-colors border border-pink-500/20">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingTask(null); }}
        onSubmit={handleModalSubmit}
        task={editingTask}
        loading={submitting}
      />
    </div>
  );
};

export default Tasks;
