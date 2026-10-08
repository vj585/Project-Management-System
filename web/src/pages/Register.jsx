import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../utils/cn';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data) => {
    try {
      setError('');
      setIsLoading(true);
      await registerUser(data.fullName, data.email, data.password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Lighting */}
      <div className="ambient-light-secondary top-1/4 left-1/4 animate-pulse-glow" />
      <div className="ambient-light-primary bottom-1/4 right-1/4 animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        
        {/* Logo/Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(236,72,153,0.4)] mb-6 relative group animate-float bg-black/20">
            <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover relative z-10" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">Join PMS Pro.</h1>
          <p className="text-zinc-400 font-medium">Create an account to start managing projects.</p>
        </div>

        {/* Form Card */}
        <div className="glass-panel p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl text-pink-500 text-sm font-semibold flex items-center">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Account created! Redirecting to login...
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  {...register('fullName')}
                  type="text"
                  placeholder="John Doe"
                  className={cn("input-field pl-12 h-14", errors.fullName && "border-pink-500/50 focus:ring-pink-500/20 focus:border-pink-500")}
                />
              </div>
              {errors.fullName && <p className="mt-2 text-xs font-semibold text-pink-500">{errors.fullName.message}</p>}
            </div>

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
              {errors.password && <p className="mt-2 text-xs font-semibold text-pink-500">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isLoading || success} className="w-full btn-primary h-14 mt-6 group text-lg">
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-zinc-400 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-white hover:text-blue-400 font-bold transition-colors underline decoration-white/30 underline-offset-4">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
