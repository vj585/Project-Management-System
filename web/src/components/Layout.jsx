import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, FolderKanban, CheckSquare, LogOut, Menu, X, Sparkles } from 'lucide-react';
import { cn } from '../utils/cn';

export const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Projects', path: '/projects', icon: FolderKanban },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
  ];

  const initials = user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="h-screen w-full flex bg-zinc-950 text-slate-50 overflow-hidden relative">
      
      {/* Sidebar Desktop */}
      <aside className="w-72 border-r border-white/5 bg-zinc-900/40 backdrop-blur-3xl hidden md:flex flex-col relative z-20">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
        
        <div className="p-8 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(236,72,153,0.4)] flex items-center justify-center bg-black/20">
            <img src="/logo.png" alt="PMS Pro Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              PMS Pro
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">Workspace</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 text-sm font-semibold relative group overflow-hidden",
                  isActive ? "text-white bg-blue-500/10 border border-blue-500/20 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                )}
                <Icon className={cn("w-5 h-5 transition-colors", isActive ? "text-blue-400" : "group-hover:text-white")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5 bg-black/20">
          <div className="glass-panel p-3 flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-white text-sm font-bold border border-white/10 shadow-inner">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate text-white">{user?.fullName}</p>
              <p className="text-xs text-zinc-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-pink-500 hover:bg-pink-500/10 rounded-xl transition-all text-sm font-bold border border-transparent hover:border-pink-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        
        {/* Dynamic Global Ambient Light */}
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

        {/* Mobile Header */}
        <header className="md:hidden glass-panel rounded-none border-x-0 border-t-0 px-5 py-4 flex items-center justify-between relative z-30">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(236,72,153,0.4)] flex items-center justify-center bg-black/20">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-lg font-bold">PMS Pro</h1>
          </div>
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 bg-white/5 rounded-lg border border-white/10 text-white">
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 relative z-20 custom-scrollbar">
          <Outlet />
        </div>
      </main>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <aside className="absolute right-0 top-0 bottom-0 w-72 bg-zinc-900 border-l border-white/10 flex flex-col animate-fade-in shadow-2xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h1 className="text-lg font-bold">Menu</h1>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-colors text-sm font-semibold",
                      isActive ? "bg-blue-500/20 text-white border border-blue-500/30" : "text-zinc-400 hover:bg-white/5"
                    )}
                  >
                    <Icon className={cn("w-5 h-5", isActive && "text-blue-400")} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="p-6 border-t border-white/10">
              <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full btn-secondary text-pink-500 hover:text-pink-400 hover:border-pink-500/30">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};
