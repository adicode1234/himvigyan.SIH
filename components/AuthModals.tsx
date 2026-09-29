'use client';

import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Sparkles, ArrowRight, Loader2, AlertCircle, CheckCircle2, Database, Phone } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export interface AuthUser {
  name: string;
  email: string;
  role: string;
  designation: string;
  scientistId: string;
  phone?: string;
  avatarUrl?: string;
}

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
  onSuccess: (user: AuthUser) => void;
}

export default function AuthModals({ isOpen, initialMode, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<string>('Dr. / Scientist');
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const getDesignation = (selectedRole: string) => {
    if (selectedRole.includes('Dr.') || selectedRole.includes('Scientist')) {
      return 'Lead Polar Scientist & Principal Investigator';
    }
    if (selectedRole.includes('Student')) {
      return 'Research Scholar & Polar Cryosphere Intern';
    }
    if (selectedRole.includes('Working')) {
      return 'Operations & Technical Field Officer';
    }
    if (selectedRole.includes('Doctor')) {
      return 'Polar Medical Support Officer';
    }
    return 'Outreach Coordinator & Science Disseminator';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    // If Supabase credentials are configured in .env.local, use real Supabase Auth
    if (isSupabaseConfigured) {
      setLoading(true);
      try {
        if (mode === 'login') {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });

          if (error) {
            setAuthError(error.message);
            setLoading(false);
            return;
          }

          if (data.user) {
            const meta = data.user.user_metadata || {};
            onSuccess({
              name: meta.name || email.split('@')[0],
              email: data.user.email || email,
              role: meta.role || 'Dr. / Scientist',
              designation: meta.designation || 'Lead Polar Scientist',
              scientistId: meta.scientistId || `NCPOR-SCI-${data.user.id.slice(0, 6).toUpperCase()}`,
              phone: meta.phone || undefined,
              avatarUrl: meta.avatarUrl || '/avatars/polar_scientist_profile.jpg'
            });
            onClose();
          }
        } else {
          // Register
          const generatedId = `NCPOR-${new Date().getFullYear()}-SCI-${Math.floor(100 + Math.random() * 900)}`;
          const designation = getDesignation(role);
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name: name || email.split('@')[0],
                role,
                phone: phone.trim() || undefined,
                designation,
                scientistId: generatedId,
                avatarUrl: '/avatars/polar_scientist_profile.jpg'
              }
            }
          });

          if (error) {
            setAuthError(error.message);
            setLoading(false);
            return;
          }

          if (data.session && data.user) {
            onSuccess({
              name: name || email.split('@')[0],
              email,
              role,
              phone: phone.trim() || undefined,
              designation,
              scientistId: generatedId,
              avatarUrl: '/avatars/polar_scientist_profile.jpg'
            });
            onClose();
          } else {
            setAuthSuccess('Account registered! If confirmation is enabled, check your email inbox to verify.');
          }
        }
      } catch (err: any) {
        setAuthError(err?.message || 'Authentication error. Please check your credentials.');
      } finally {
        setLoading(false);
      }
      return;
    }

    // Graceful Fallback Mode when .env.local keys are not provided yet
    const fallbackId = `NCPOR-${new Date().getFullYear()}-SCI-${Math.floor(100 + Math.random() * 900)}`;
    onSuccess({
      name: name || (email ? email.split('@')[0] : 'Demo'),
      email: email || 'demo@ncpor.res.in',
      role: role,
      phone: phone.trim() || undefined,
      designation: getDesignation(role),
      scientistId: fallbackId,
      avatarUrl: '/avatars/polar_scientist_profile.jpg'
    });
    onClose();
  };

  return (
    <div
      data-auth-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md flex items-center justify-center animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white dark:bg-[#0c182a] rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-slate-200 dark:border-slate-700/80 animate-scaleUp my-auto max-h-[94vh] overflow-y-auto overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer transition-all z-10 border border-slate-200 dark:border-slate-700/60 shadow-xs"
          title="Close"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Header */}
        <div className="text-center mb-3.5">
          <div className="w-16 h-16 mx-auto mb-2 p-1 rounded-full bg-white dark:bg-[#071324] shadow-lg shadow-sky-500/20 border-2 border-sky-400 dark:border-sky-500 flex items-center justify-center">
            <img
              src="/himvigyan-crest.png"
              alt="HimVigyan Official Crest"
              className="w-full h-full object-contain drop-shadow"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-2 border-amber-300 dark:border-amber-700 text-[10px] font-black tracking-wide shadow-xs mb-1.5">
            <Lock className="w-3 h-3 text-amber-700 dark:text-amber-400 stroke-[2.5]" />
            <span>AUTHENTICATION REQUIRED</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            {mode === 'login' ? 'Sign In to HimVigyan' : 'Create Researcher Account'}
          </h3>
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
            Access NCPOR datasets, submit expedition logs, and explore research repositories.
          </p>
        </div>

        {/* Fast 1-Click Demo Login for Judges & Evaluators */}
        <div className="mb-3 p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-sky-50 via-cyan-50 to-indigo-50 dark:from-sky-950/40 dark:via-blue-950/30 dark:to-indigo-950/40 border-2 border-sky-300 dark:border-sky-700 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-sky-900 dark:text-sky-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 stroke-[2.5]" />
              <span>EVALUATOR / DEMO GATEWAY</span>
            </span>
            <span className="text-[9px] font-black text-emerald-800 dark:text-emerald-300 bg-emerald-200/90 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-400 dark:border-emerald-600">
              Instant Access
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              onSuccess({
                name: 'Demo Scientist',
                email: 'demo@ncpor.res.in',
                role: 'Dr. / Scientist',
                designation: 'Lead Polar Scientist / Evaluator',
                scientistId: 'NCPOR-DEMO-2026',
                avatarUrl: '/avatars/polar_scientist_profile.jpg'
              });
              onClose();
            }}
            className="w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black text-white bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 shadow-md shadow-sky-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer tracking-wide uppercase"
          >
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0 stroke-[2.5]" />
            <span>1-Click Demo Login</span>
            <ArrowRight className="w-4 h-4 ml-auto stroke-[2.5]" />
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-3">
          <div className="border-t-2 border-slate-200 dark:border-slate-800 w-full" />
          <span className="bg-white dark:bg-[#0c182a] px-3 text-[10px] uppercase font-black tracking-widest text-slate-500 dark:text-slate-400 shrink-0">
            Or custom credentials
          </span>
          <div className="border-t-2 border-slate-200 dark:border-slate-800 w-full" />
        </div>

        {/* Mode Toggle (Segmented Control - Ultra Bold) */}
        <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-900/90 p-1 mb-3.5 border-2 border-slate-300 dark:border-slate-700 shadow-inner">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-xl font-black text-xs tracking-wide transition-all cursor-pointer ${
              mode === 'login' 
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30 scale-[1.01]' 
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-black'
            }`}
          >
            LOGIN
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-xl font-black text-xs tracking-wide transition-all cursor-pointer ${
              mode === 'register' 
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30 scale-[1.01]' 
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-black'
            }`}
          >
            REGISTER
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'register' && (
            <>
              {/* Full Name */}
              <div>
                <label className="block text-slate-900 dark:text-slate-100 font-black text-[11px] uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 stroke-[2.5]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dr. Rajesh Kumar"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus:border-sky-600 dark:focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 text-slate-950 dark:text-white font-bold text-xs sm:text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-slate-50/70 dark:bg-[#08101d] transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Phone Number Field */}
              <div>
                <label className="block text-slate-900 dark:text-slate-100 font-black text-[11px] uppercase tracking-wider mb-1">
                  Phone Number (Mobile)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 stroke-[2.5]" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus:border-sky-600 dark:focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 text-slate-950 dark:text-white font-bold text-xs sm:text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-slate-50/70 dark:bg-[#08101d] transition-all shadow-xs"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email Address */}
          <div>
            <label className="block text-slate-900 dark:text-slate-100 font-black text-[11px] uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 stroke-[2.5]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="scientist@ncpor.res.in"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus:border-sky-600 dark:focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 text-slate-950 dark:text-white font-bold text-xs sm:text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-slate-50/70 dark:bg-[#08101d] transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-slate-900 dark:text-slate-100 font-black text-[11px] uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 stroke-[2.5]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus:border-sky-600 dark:focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 text-slate-950 dark:text-white font-bold text-xs sm:text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-slate-50/70 dark:bg-[#08101d] transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Role / Affiliation Dropdown */}
          {mode === 'register' && (
            <div>
              <label className="block text-slate-900 dark:text-slate-100 font-black text-[11px] uppercase tracking-wider mb-1">
                Role / Affiliation
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus:border-sky-600 dark:focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 text-slate-950 dark:text-white font-bold text-xs sm:text-sm bg-slate-50/70 dark:bg-[#08101d] cursor-pointer transition-all shadow-xs"
              >
                <option value="Dr. / Scientist">Dr. / Scientist / Senior Researcher</option>
                <option value="Student / Scholar">Student / Research Scholar</option>
                <option value="Working Professional">Working Professional / Technical Officer</option>
                <option value="Doctor / Medical Officer">Doctor / Polar Medical Officer</option>
                <option value="Outreach / Citizen Scientist">Citizen Scientist / Outreach Officer</option>
              </select>
            </div>
          )}

          {authError && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border-2 border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-300 text-xs font-bold flex items-start gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5 stroke-[2.5]" />
              <div className="leading-snug">{authError}</div>
            </div>
          )}

          {authSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border-2 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-start gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 stroke-[2.5]" />
              <div className="leading-snug">{authSuccess}</div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-xs sm:text-sm font-black tracking-wider text-white bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 disabled:opacity-60 shadow-lg shadow-sky-600/35 hover:shadow-xl hover:shadow-sky-600/40 active:scale-[0.98] transition-all mt-3 flex items-center justify-center gap-2 cursor-pointer uppercase"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin stroke-[2.5]" />
                <span>Connecting to Supabase...</span>
              </>
            ) : (
              <span>{mode === 'login' ? 'Sign In to Account' : 'Create Researcher Account'}</span>
            )}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t-2 border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
            <span className="text-slate-900 dark:text-slate-200 font-black">HimVigyan Identity</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono">
            <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            <span className={isSupabaseConfigured ? 'text-emerald-700 dark:text-emerald-400 font-black' : 'text-slate-500 dark:text-slate-400 font-bold'}>
              {isSupabaseConfigured ? '● Supabase Live' : 'Supabase Ready (.env.local)'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
