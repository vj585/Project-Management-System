import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';

const loginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(1, 'Password is required'),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const expired = searchParams.get('expired');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      setError('');
      setIsLoading(true);
      await login(data.email, data.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Lighting */}
      <div className="ambient-light-primary top-1/4 left-1/4 animate-pulse-glow" />
      <div className="ambient-light-secondary bottom-1/4 right-1/4 animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        
        {/* Logo/Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(236,72,153,0.4)] mb-6 relative group animate-float bg-black/20">
            <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover relative z-10" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">Welcome back.</h1>
          <p className="text-zinc-400 font-medium">Enter your details to access your workspace.</p>
        </div>

        {/* Form Card */}
        <div className="glass-panel p-8 shadow-2xl">
          {expired && (
            <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500 text-sm font-semibold flex items-center">
              Session expired. Please log in again.
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl text-pink-500 text-sm font-semibold flex items-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="you@example.com"
                  className={cn("input-field pl-12 h-14", errors.email && "border-pink-500/50 focus:ring-pink-500/20 focus:border-pink-500")}
                />
              </div>
              {errors.email && <p className="mt-2 text-xs font-semibold text-pink-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={cn("input-field pl-12 pr-12 h-14", errors.password && "border-pink-500/50 focus:ring-pink-500/20 focus:border-pink-500")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="w-full btn-primary h-14 mt-6 group text-lg">
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-zinc-400 font-medium">
          New to PMS Pro?{' '}
          <Link to="/register" className="text-white hover:text-blue-400 font-bold transition-colors underline decoration-white/30 underline-offset-4">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
