'use client';

import React, { useState } from 'react';
import { Search, Menu, X, Compass, Sparkles, User, LogOut, ChevronDown, ShieldCheck } from 'lucide-react';
import { AuthUser } from './AuthModals';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onOpenSearch: () => void;
  onOpenAIStudio: () => void;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
  onOpenProfile?: () => void;
}

export default function Navbar({
  activeNav,
  setActiveNav,
  onOpenLogin,
  onOpenRegister,
  onOpenSearch,
  onOpenAIStudio,
  currentUser,
  onLogout,
  onOpenProfile
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const formatDisplayName = (name?: string) => {
    if (!name) return '';
    return name.replace(/^(dr|DR|Dr)([A-Za-z])/i, 'Dr. $2').trim();
  };

  const navLinks = [
    { id: 'Home', label: 'Home' },
    { id: 'Expeditions', label: 'Expeditions' },
    { id: 'Research', label: 'Research' },
    { id: 'Publications', label: 'Publications' },
    { id: 'Reports', label: 'Reports' },
    { id: 'Datasets', label: 'Datasets' },
    { id: 'Media', label: 'Media' },
    { id: 'About', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 transition-colors duration-200 bg-white/95 dark:bg-[#070e1b]/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          
          {/* ZONE 1: Brand Identity */}
          <div className="flex items-center gap-3.5 shrink-0">
            <div 
              onClick={() => setActiveNav('Home')}
              className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
              title="HimVigyan - NCPOR / MoES"
            >
              {/* Official HimVigyan Crest Logo */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 aspect-square flex items-center justify-center group-hover:scale-105 transition-transform">
                <img
                  src="/himvigyan-crest.png?v=4"
                  alt="HimVigyan Crest"
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>

              <div className="flex flex-col justify-center shrink-0">
                <div className="text-lg font-black tracking-tight text-slate-900 dark:text-white leading-tight whitespace-nowrap group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  <span>HimVigyan</span>
                </div>
                <div className="text-[8.5px] font-bold tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase leading-none mt-0.5 whitespace-nowrap">
                  EXPLORE • RESEARCH • PRESERVE
                </div>
              </div>
            </div>

            {/* Subtle Vertical Divider separating Brand and Navigation */}
            <div className="h-7 w-px bg-slate-200/90 dark:bg-slate-800 mx-1 hidden lg:block shrink-0" />
          </div>

          {/* ZONE 2: Primary Navigation Links matching screenshot */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 shrink-0">
            {navLinks.map((link) => {
              const isActive = activeNav === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveNav(link.id)}
                  className={`relative py-1 text-xs xl:text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive 
                      ? 'text-sky-600 dark:text-sky-400 font-semibold' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sky-600 dark:bg-sky-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ZONE 3: Action Tools & Authentication */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-2.5 shrink-0">
            {/* AI Media Studio Premium Emblem & Badge */}
            <button
              onClick={onOpenAIStudio}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-50 via-indigo-50/70 to-purple-50 dark:from-sky-950/70 dark:via-indigo-950/60 dark:to-purple-950/70 hover:from-sky-100 hover:to-indigo-100 dark:hover:from-sky-900/60 dark:hover:to-indigo-900/60 border border-sky-200/90 dark:border-sky-500/40 shadow-xs hover:shadow transition-all group active:scale-95 shrink-0 cursor-pointer"
              title="Launch AI Media & Dissemination Studio"
            >
              {/* Vibrant Gradient AI Icon Emblem */}
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:rotate-12 transition-all">
                <svg className="w-3 h-3 text-white fill-white" viewBox="0 0 24 24">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </div>

              <span className="text-xs font-bold bg-gradient-to-r from-sky-700 via-indigo-700 to-purple-700 dark:from-sky-300 dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent tracking-tight whitespace-nowrap">
                AI Media Studio
              </span>
            </button>

            {/* Profile Dropdown or Login/Register buttons */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 pr-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all select-none group shadow-xs bg-white dark:bg-[#0c182a] cursor-pointer"
                >
                  {/* Avatar Circle with Online indicator */}
                  <div className="relative">
                    {currentUser.avatarUrl ? (
                      <img
                        src={currentUser.avatarUrl}
                        alt={currentUser.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/avatars/polar_scientist_profile.jpg';
                        }}
                        className="w-7 h-7 rounded-full object-cover shadow-xs border border-sky-300/60"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-white font-bold text-[9px] flex items-center justify-center shadow-xs">
                        {currentUser.name === 'Demo' ? 'DEMO' : currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="w-2 h-2 bg-emerald-500 border border-white dark:border-slate-900 rounded-full absolute -bottom-0.5 -right-0.5"></span>
                  </div>

                  <div className="text-left hidden md:block">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {formatDisplayName(currentUser.name)}
                    </div>
                  </div>

                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#0c182a] rounded-2xl shadow-2xl border border-slate-200/90 dark:border-slate-800 py-2 z-50 animate-fadeIn text-xs">
                    
                    {/* Header in Dropdown */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 rounded-t-xl flex items-center gap-3">
                      <div className="relative shrink-0">
                        {currentUser.avatarUrl ? (
                          <img
                            src={currentUser.avatarUrl}
                            alt={currentUser.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/avatars/polar_scientist_profile.jpg';
                            }}
                            className="w-11 h-11 rounded-xl object-cover shadow-sm border border-slate-200 dark:border-slate-700"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                            {currentUser.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <span className="w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full absolute -bottom-0.5 -right-0.5"></span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-slate-900 dark:text-white text-sm truncate">{formatDisplayName(currentUser.name)}</div>
                        <div className="text-slate-500 dark:text-slate-400 text-[11px] truncate">{currentUser.email}</div>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300">
                            {currentUser.scientistId}
                          </span>
                          <span className="px-1.5 py-0.5 rounded-md text-[9px] font-semibold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          if (onOpenProfile) onOpenProfile();
                        }}
                        className="w-full px-4 py-2 text-left font-medium text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-800/80 hover:text-sky-700 dark:hover:text-sky-300 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <User className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                        <span>View Profile & Credentials</span>
                      </button>

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onOpenAIStudio();
                        }}
                        className="w-full px-4 py-2 text-left font-medium text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-800/80 hover:text-sky-700 dark:hover:text-sky-300 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span>My AI Studio Drafts</span>
                      </button>
                    </div>

                    {/* Theme Mode Toggle inside Profile Dropdown */}
                    <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">Theme</span>
                      <ThemeToggle showLabel={true} />
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          if (onLogout) onLogout();
                        }}
                        className="w-full px-4 py-2 text-left font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>

                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ThemeToggle />
                {/* Login button */}
                <button
                  onClick={onOpenLogin}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-xs cursor-pointer"
                >
                  Login
                </button>

                {/* Register button */}
                <button
                  onClick={onOpenRegister}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070e1b] px-4 py-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveNav(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                activeNav === link.id
                  ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            {/* Theme Toggle row in Mobile */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Theme</span>
              <ThemeToggle showLabel />
            </div>

            <button
              onClick={() => {
                onOpenAIStudio();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 rounded-lg border border-sky-200 dark:border-sky-800 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Media Studio</span>
            </button>

            {currentUser ? (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center gap-3">
                  {currentUser.avatarUrl ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/avatars/polar_scientist_profile.jpg';
                      }}
                      className="w-10 h-10 rounded-full object-cover shadow-sm border border-sky-200 dark:border-sky-700"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                      {currentUser.name === 'Demo' ? 'DEMO' : currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-xs">{formatDisplayName(currentUser.name)}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">{currentUser.role} • {currentUser.scientistId}</div>
                  </div>
                </div>

                <div className="flex gap-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenProfile) onOpenProfile();
                    }}
                    className="flex-1 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 text-white text-center cursor-pointer"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onLogout) onLogout();
                    }}
                    className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 text-center cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onOpenLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 rounded-lg text-sm font-medium border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-center cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onOpenRegister();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 rounded-lg text-sm font-medium bg-sky-600 text-white text-center cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
