import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Loader2, Plus, Search, FolderKanban, Edit2, Trash2, Calendar, Target } from 'lucide-react';
import { cn } from '../utils/cn';
import ProjectModal from '../components/ProjectModal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      let query = '/projects?';
      if (search) query += `search=${search}&`;
      if (filter) query += `status=${filter}&`;
      
      const response = await api.get(query);
      if (response.data.success) {
        setProjects(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch projects', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProjects();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, filter]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error('Failed to delete', error);
    }
  };

  const handleModalSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject.id}`, data);
      } else {
        await api.post('/projects', data);
      }
      setIsModalOpen(false);
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      console.error('Failed to save project', error);
    } finally {
      setSubmitting(false);
    }
  };

  const statusConfig = {
    NOT_STARTED: { label: 'Not Started', color: 'text-zinc-400', bg: 'bg-zinc-800/50', border: 'border-zinc-700' },
    IN_PROGRESS: { label: 'In Progress', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
    COMPLETED: { label: 'Completed', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' }
  };

  return (
    <div className="animate-fade-in h-full flex flex-col max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 relative z-10">
        <div>
          <div className="inline-flex items-center px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-3">
            <Target className="w-3 h-3 mr-2 text-blue-400" /> Workspace
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">Projects</h1>
        </div>
        <button onClick={() => { setEditingProject(null); setIsModalOpen(true); }} className="btn-primary shadow-lg shadow-blue-500/20">
          <Plus className="w-5 h-5 mr-2" /> Create Project
        </button>
      </div>

      {/* Filters (Glass Bar) */}
      <div className="glass-panel p-2 flex flex-col sm:flex-row gap-2 sticky top-0 z-20">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/20 border border-transparent rounded-xl pl-12 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:bg-black/40 focus:border-white/10 transition-all font-medium"
          />
        </div>
        <div className="w-px bg-white/10 hidden sm:block mx-1" />
        <select 
          className="bg-black/20 border border-transparent rounded-xl px-4 py-3 text-white focus:outline-none focus:bg-black/40 focus:border-white/10 transition-all font-medium sm:w-48 appearance-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a1a1aa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em', paddingRight: '2.5rem' }}
        >
          <option value="" className="bg-zinc-900">All Statuses</option>
          <option value="NOT_STARTED" className="bg-zinc-900">Not Started</option>
          <option value="IN_PROGRESS" className="bg-zinc-900">In Progress</option>
          <option value="COMPLETED" className="bg-zinc-900">Completed</option>
        </select>
      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="flex-1 glass-panel flex flex-col items-center justify-center text-center p-16 border-dashed border-white/20">
          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
            <FolderKanban className="w-10 h-10 text-zinc-600" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No projects yet</h3>
          <p className="text-zinc-400 max-w-sm mb-8 text-lg">Create your first project to start organizing tasks and collaborating.</p>
          <button onClick={() => { setEditingProject(null); setIsModalOpen(true); }} className="btn-primary">
            <Plus className="w-5 h-5 mr-2" /> Create Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
          {projects.map((project, idx) => {
            const status = statusConfig[project.status];
            return (
              <div key={project.id} className="glass-panel-hover p-6 group flex flex-col h-full animate-fade-in" style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}>
                
                {/* Glow accent matching status */}
                <div className={cn("absolute -top-10 -right-10 w-32 h-32 blur-[50px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity", 
                  project.status === 'COMPLETED' ? 'bg-emerald-500' : project.status === 'IN_PROGRESS' ? 'bg-blue-500' : 'bg-transparent'
                )} />

                <div className="flex justify-between items-start mb-5 relative z-10">
                  <div className={cn("px-3 py-1 rounded-full text-xs font-bold border", status.bg, status.color, status.border)}>
                    {status.label}
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditingProject(project); setIsModalOpen(true); }} className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="p-2 bg-pink-500/10 hover:bg-pink-500/20 text-pink-500 rounded-lg transition-colors border border-pink-500/20">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 relative z-10" title={project.name}>
                  {project.name}
                </h3>
                <p className="text-zinc-400 text-sm line-clamp-2 mb-6 flex-1 relative z-10 leading-relaxed">
                  {project.description || "No description provided for this project."}
                </p>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-zinc-500 relative z-10 mt-auto">
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ProjectModal 
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingProject(null); }}
        onSubmit={handleModalSubmit}
        project={editingProject}
        loading={submitting}
      />
    </div>
  );
};

export default Projects;
