'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  // Until mounted, render a placeholder with fixed dimensions to avoid layout shift
  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className={`w-9 h-9 rounded-full border border-slate-700/60 bg-slate-800/60 flex items-center justify-center opacity-70 ${className}`}
      >
        <span className="w-4 h-4 rounded-full bg-slate-600 animate-pulse" />
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`group relative flex items-center gap-2 p-2 rounded-full border transition-all duration-300 cursor-pointer select-none shadow-sm active:scale-95 ${
        isDark
          ? 'bg-slate-900/90 hover:bg-slate-800 border-slate-700/80 text-amber-400 hover:border-amber-400/50 shadow-slate-950/40'
          : 'bg-white hover:bg-sky-50 border-slate-200 text-sky-700 hover:border-sky-300 shadow-slate-200/50'
      } ${className}`}
      title={isDark ? 'Switch to Light Mode (Polar Day)' : 'Switch to Dark Mode (Polar Night)'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 transition-transform duration-500 rotate-0 group-hover:rotate-90 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
        ) : (
          <Moon className="w-4 h-4 text-sky-600 transition-transform duration-500 rotate-0 group-hover:-rotate-12 group-hover:scale-110" />
        )}
      </div>

      {showLabel && (
        <span className={`text-xs font-semibold pr-1.5 transition-colors ${
          isDark ? 'text-slate-200 group-hover:text-amber-300' : 'text-slate-700 group-hover:text-sky-800'
        }`}>
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </button>
  );
}
