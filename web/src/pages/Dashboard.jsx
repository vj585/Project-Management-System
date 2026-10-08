import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Loader2, FolderKanban, CheckSquare, Clock, CheckCircle2, ArrowRight, Activity } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, glowColor, delay }) => (
  <div 
    className="glass-panel-hover p-6 relative group animate-fade-in"
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
  >
    <div className={`absolute top-0 right-0 w-32 h-32 bg-${glowColor}/10 rounded-bl-full blur-2xl group-hover:bg-${glowColor}/20 transition-all duration-500`} />
    
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center shadow-lg group-hover:border-${glowColor}/30 transition-all duration-300`}>
          <Icon className={`w-6 h-6 text-${glowColor} group-hover:scale-110 transition-transform`} />
        </div>
        <div className={`px-3 py-1 rounded-full bg-${glowColor}/10 border border-${glowColor}/20 flex items-center`}>
          <Activity className={`w-3 h-3 text-${glowColor} mr-1 animate-pulse`} />
          <span className={`text-[10px] font-bold text-${glowColor} uppercase tracking-wider`}>Live</span>
        </div>
      </div>
      
      <div className="mt-auto">
        <h3 className="text-4xl font-black text-white mb-1 tracking-tight">{value}</h3>
        <p className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">{title}</p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard');
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 blur-xl opacity-50 animate-pulse" />
          <Loader2 className="w-10 h-10 text-white animate-spin relative z-10" />
        </div>
      </div>
    );
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="animate-fade-in flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
            Overview
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-zinc-400 tracking-tight mb-2">
            {greeting}, <span className="text-blue-500">{user?.fullName?.split(' ')[0]}</span>
          </h1>
          <p className="text-zinc-400 text-base md:text-lg">Track your team's progress and stay productive.</p>
        </div>
        
        <Link to="/projects" className="btn-primary group">
          <span>Create Project</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Projects" 
          value={stats?.totalProjects || 0} 
          icon={FolderKanban} 
          glowColor="blue-500"
          delay={0}
        />
        <StatCard 
          title="Tasks" 
          value={stats?.totalTasks || 0} 
          icon={CheckSquare} 
          glowColor="indigo-500"
          delay={100}
        />
        <StatCard 
          title="Pending" 
          value={stats?.pendingTasks || 0} 
          icon={Clock} 
          glowColor="amber-500"
          delay={200}
        />
        <StatCard 
          title="Completed" 
          value={stats?.completedTasks || 0} 
          icon={CheckCircle2} 
          glowColor="emerald-500"
          delay={300}
        />
      </div>

      <div className="glass-panel p-8 md:p-12 mt-8 animate-fade-in relative overflow-hidden" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
        {/* Banner Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-3">Sync anywhere.</h2>
            <p className="text-zinc-400 max-w-xl text-lg">
              Any projects or tasks you create here will instantly sync with your mobile app. Stay connected to your work, seamlessly.
            </p>
          </div>
          <div className="flex gap-4">
            <Link to="/tasks" className="btn-secondary">
              View Tasks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
