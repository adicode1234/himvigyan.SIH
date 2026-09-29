'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryPills from '@/components/CategoryPills';
import Footer from '@/components/Footer';

// Interactive modules from our system
import AiDisseminator from '@/components/AiDisseminator';
import ExpeditionsCatalog from '@/components/ExpeditionsCatalog';
import KnowledgeRepository from '@/components/KnowledgeRepository';
import StudentPolarHub from '@/components/StudentPolarHub';
import MediaPortal from '@/components/MediaPortal';
import PolarBot from '@/components/PolarBot';
import AuthModals, { AuthUser } from '@/components/AuthModals';
import ProfileModal from '@/components/ProfileModal';
import DetailsModal from '@/components/DetailsModal';
import ScientistSubmissionModal from '@/components/ScientistSubmissionModal';
import AboutPortal from '@/components/AboutPortal';

import { REPOSITORY_DATA, RepositoryItem } from '@/data/polarData';
import { INITIAL_USER_CONTRIBUTIONS, UserContribution } from '@/data/userContributions';
import { MessageSquare, ArrowLeft, Sparkles, Compass, BookOpen, X, CheckCircle2, Lock, GraduationCap, Award, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function Home() {
  const [activeNav, setActiveNav] = useState<string>('Home');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [userContributions, setUserContributions] = useState<UserContribution[]>([]);
  const [submissionToast, setSubmissionToast] = useState<{ title: string; doi: string; type: string } | null>(null);

  // Check persistent login on mount and sync with Supabase session if configured
  React.useEffect(() => {
    // 1. Check local session cache
    let cachedAvatar: string | null = null;
    try {
      cachedAvatar = localStorage.getItem('polar_custom_avatar');
      const savedUser = localStorage.getItem('polar_auth_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (cachedAvatar) {
          parsed.avatarUrl = cachedAvatar;
        } else if (!parsed.avatarUrl) {
          parsed.avatarUrl = '/avatars/polar_scientist_profile.jpg';
        }
        setCurrentUser(parsed);
      }
    } catch (e) {}

    // 2. If Supabase is configured, check live Supabase session
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const meta = session.user.user_metadata || {};
          const localAvatar = localStorage.getItem('polar_custom_avatar');
          const supaUser: AuthUser = {
            name: meta.name || session.user.email?.split('@')[0] || 'Demo',
            email: session.user.email || 'demo@ncpor.res.in',
            role: meta.role || 'Dr. / Scientist',
            designation: meta.designation || 'Lead Polar Scientist',
            scientistId: meta.scientistId || `NCPOR-SCI-${session.user.id.slice(0, 6).toUpperCase()}`,
            phone: meta.phone || undefined,
            avatarUrl: localAvatar || meta.avatarUrl || '/avatars/polar_scientist_profile.jpg'
          };
          setCurrentUser(supaUser);
          try {
            localStorage.setItem('polar_auth_user', JSON.stringify(supaUser));
          } catch (e) {}
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT') {
          setCurrentUser(null);
          try {
            localStorage.removeItem('polar_auth_user');
          } catch (e) {}
        } else if (session?.user && (event === 'SIGNED_IN' || event === 'USER_UPDATED')) {
          const meta = session.user.user_metadata || {};
          const localAvatar = localStorage.getItem('polar_custom_avatar');
          const supaUser: AuthUser = {
            name: meta.name || session.user.email?.split('@')[0] || 'Demo',
            email: session.user.email || 'demo@ncpor.res.in',
            role: meta.role || 'Dr. / Scientist',
            designation: meta.designation || 'Lead Polar Scientist',
            scientistId: meta.scientistId || `NCPOR-SCI-${session.user.id.slice(0, 6).toUpperCase()}`,
            phone: meta.phone || undefined,
            avatarUrl: localAvatar || meta.avatarUrl || '/avatars/polar_scientist_profile.jpg'
          };
          setCurrentUser(supaUser);
          try {
            localStorage.setItem('polar_auth_user', JSON.stringify(supaUser));
          } catch (e) {}
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const handleLoginSuccess = (user: AuthUser) => {
    const savedCustomAvatar = localStorage.getItem('polar_custom_avatar');
    const finalUser: AuthUser = {
      ...user,
      avatarUrl: savedCustomAvatar || user.avatarUrl || '/avatars/polar_scientist_profile.jpg'
    };
    setCurrentUser(finalUser);
    try {
      localStorage.setItem('polar_auth_user', JSON.stringify(finalUser));
    } catch (e) {}
  };

  const handleUpdateUser = async (updated: AuthUser) => {
    setCurrentUser(updated);
    try {
      localStorage.setItem('polar_auth_user', JSON.stringify(updated));
      if (updated.avatarUrl) {
        localStorage.setItem('polar_custom_avatar', updated.avatarUrl);
      }
    } catch (e) {}

    // Persist changes to Supabase so it never resets back on session reload
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.updateUser({
          data: {
            name: updated.name,
            role: updated.role,
            designation: updated.designation,
            phone: updated.phone,
            avatarUrl: updated.avatarUrl
          }
        });
      } catch (err) {
        console.error('Failed to update user in Supabase:', err);
      }
    }
  };

  const handleLogout = async () => {
    setCurrentUser(null);
    setProfileModalOpen(false);
    try {
      localStorage.removeItem('polar_auth_user');
    } catch (e) {}
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {}
    }
  };

  // Global Click Interceptor: when not logged in, any click opens login modal
  const handleGlobalClickCapture = (e: React.MouseEvent) => {
    if (!currentUser) {
      const target = e.target as HTMLElement;
      // Allow clicks inside AuthModals itself
      if (target.closest('[data-auth-modal]')) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      setAuthModalOpen(true);
    }
  };

  // Auto-dismiss submission toast after 7s
  React.useEffect(() => {
    if (submissionToast) {
      const timer = setTimeout(() => {
        setSubmissionToast(null);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [submissionToast]);

  // Load real contributions from localStorage on mount (starts 100% empty until user submits)
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('polar_real_user_contributions');
      if (saved) {
        setUserContributions(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleAddContribution = (newContrib: UserContribution) => {
    setUserContributions(prev => {
      const updated = [newContrib, ...prev];
      try {
        localStorage.setItem('polar_real_user_contributions', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleDeleteContribution = (id: string) => {
    setUserContributions(prev => {
      const updated = prev.filter(c => c.id !== id);
      try {
        localStorage.setItem('polar_real_user_contributions', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };
  const [botOpen, setBotOpen] = useState<boolean>(false);
  const [contributeOpen, setContributeOpen] = useState<boolean>(false);
  const [detailsItem, setDetailsItem] = useState<any | null>(null);
  const [selectedAIItem, setSelectedAIItem] = useState<RepositoryItem | null>(null);
  const [activeSpecialView, setActiveSpecialView] = useState<'none' | 'ai-studio' | 'stations' | 'repository' | 'students' | 'media' | 'about'>('none');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('All');

  // Handle Search submit from hero
  const handleHeroSearch = (query: string, category: string) => {
    setSearchFilter(query);
    setSelectedCategoryTab(category === 'All Categories' ? 'All' : category);
    setActiveSpecialView('repository');
    setActiveNav('Research');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch AI Studio with selected item
  const handleLaunchAI = (item: any) => {
    // Find matching item or use default
    const matched = REPOSITORY_DATA.find(r => r.title.toLowerCase().includes(item.title?.toLowerCase() || '')) || REPOSITORY_DATA[0];
    setSelectedAIItem(matched);
    setActiveSpecialView('ai-studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Category click from 6-pill icons
  const handleSelectCategory = (cat: string) => {
    if (cat === 'Expeditions') {
      setActiveSpecialView('stations');
      setActiveNav('Expeditions');
    } else if (cat === 'Media' || cat === 'Photos & Videos') {
      setActiveSpecialView('media');
      setActiveNav('Media');
    } else if (cat === 'Smart Education') {
      setActiveSpecialView('students');
      setActiveNav('Smart Education');
    } else {
      setSelectedCategoryTab(cat);
      setActiveSpecialView('repository');
      setActiveNav(cat === 'Research' ? 'Research' : cat);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070e1b] text-slate-100 relative page-container transition-colors duration-200" onClickCapture={handleGlobalClickCapture}>
      
      {/* 1. Header Navigation matching screenshot */}
      <Navbar
        activeNav={activeNav}
        setActiveNav={(nav) => {
          setActiveNav(nav);
          if (nav === 'Home') {
            setActiveSpecialView('none');
          } else if (nav === 'Expeditions') {
            setActiveSpecialView('stations');
          } else if (nav === 'Media') {
            setActiveSpecialView('media');
          } else if (nav === 'Smart Education') {
            setActiveSpecialView('students');
          } else if (nav === 'About') {
            setActiveSpecialView('about');
          } else if (nav === 'Research' || nav === 'Publications' || nav === 'Reports' || nav === 'Datasets') {
            setSelectedCategoryTab(nav);
            setActiveSpecialView('repository');
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLogin={() => {
          setAuthMode('login');
          setAuthModalOpen(true);
        }}
        onOpenRegister={() => {
          setAuthMode('register');
          setAuthModalOpen(true);
        }}
        onOpenSearch={() => {
          setActiveSpecialView('repository');
          setActiveNav('Research');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAIStudio={() => {
          setActiveSpecialView('ai-studio');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenProfile={() => setProfileModalOpen(true)}
      />

      {/* If Special Full-Page View (AI Studio, Stations Explorer, etc.) is active, offer a back banner */}
      {activeSpecialView !== 'none' && (
        <div className="bg-[#0a1424] border-b border-slate-800 px-4 py-3 sticky top-20 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => {
                setActiveSpecialView('none');
                setActiveNav('Home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-white transition-colors bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home Overview</span>
            </button>
            <div className="text-xs text-slate-300 font-medium">
              Viewing:{' '}
              <strong className="uppercase font-bold text-sky-400">
                {activeSpecialView === 'ai-studio' ? 'AI Media Dissemination Studio' :
                 activeSpecialView === 'stations' ? 'Expeditions Catalog' :
                 activeSpecialView === 'media' ? 'Moments from the Polar Frontiers' :
                 activeSpecialView === 'students' ? 'Student & Citizen Hub' :
                 activeSpecialView === 'about' ? 'About HimVigyan' : 'Polar Knowledge Repository'}
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {activeSpecialView === 'none' ? (
        <main className="flex-1">
          {/* 2. Hero Section with Explorer Background and Floating Search Bar */}
          <Hero
            onSearch={handleHeroSearch}
            onExploreResearch={() => {
              setSelectedCategoryTab('Research');
              setActiveSpecialView('repository');
              setActiveNav('Research');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreExpeditions={() => {
              setActiveSpecialView('stations');
              setActiveNav('Expeditions');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onContributeContent={() => setContributeOpen(true)}
          />

          {/* 3. Category Navigation Pills */}
          <CategoryPills
            onSelectCategory={handleSelectCategory}
            activeCategory={selectedCategoryTab}
          />

          {/* 4. Smart Education & Student Hub Spotlight Banner (Problem Statement 26063 Theme) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-[#0b172a] to-[#071324] border-2 border-sky-500/40 p-6 sm:p-8 shadow-2xl shadow-sky-950/60">
              
              {/* Subtle Ambient Radial Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Left side text */}
                <div className="space-y-3 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/15 border border-sky-400/40 text-sky-300 text-xs font-bold tracking-wide uppercase shadow-xs">
                    <GraduationCap className="w-4 h-4 text-sky-400" />
                    <span>Theme: Smart Education • MoES / NCPOR Outreach</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                    Polar Science Student & Citizen Hub
                  </h2>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Designed for schools, colleges, and young scholars across India. Explore cryospheric ice-melt physics, test your polar knowledge in real-time challenges, and earn verified NCPOR student certificates.
                  </p>

                  {/* 3 Feature Pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/80">
                      <Award className="w-4 h-4 text-amber-400 shrink-0" />
                      <div className="text-left">
                        <div className="text-xs font-bold text-white">Polar Quiz Challenge</div>
                        <div className="text-[10px] text-slate-400">10 Science Questions</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/80">
                      <SlidersHorizontal className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div className="text-left">
                        <div className="text-xs font-bold text-white">Glacier Melt Simulator</div>
                        <div className="text-[10px] text-slate-400">Cryosphere Impact</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/80">
                      <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                      <div className="text-left">
                        <div className="text-xs font-bold text-white">Polar Certificate</div>
                        <div className="text-[10px] text-slate-400">Verified MoES Download</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side CTA Button */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-3 shrink-0">
                  <button
                    onClick={() => {
                      setActiveSpecialView('students');
                      setActiveNav('Smart Education');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-xl shadow-sky-600/30 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer uppercase tracking-wider"
                  >
                    <GraduationCap className="w-5 h-5 text-sky-200 stroke-[2.5]" />
                    <span>Launch Smart Education Hub</span>
                    <ArrowRight className="w-4 h-4 ml-1 stroke-[2.5]" />
                  </button>

                  <button
                    onClick={() => setBotOpen(true)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-800 border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                    <span>Ask HimVigyan AI a Question</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSpecialView('about');
                      setActiveNav('About');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-cyan-300 hover:text-white bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-800/80 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5 text-cyan-400" />
                    <span>About HimVigyan Portal</span>
                  </button>
                </div>

              </div>
            </div>
          </section>
        </main>
      ) : activeSpecialView === 'about' ? (
        /* About HimVigyan Portal matching Screenshot Mockup */
        <AboutPortal
          onBackHome={() => {
            setActiveSpecialView('none');
            setActiveNav('Home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateToRepository={(cat) => {
            setSelectedCategoryTab(cat || 'All');
            setActiveSpecialView('repository');
            setActiveNav('Research');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateToExpeditions={(_region) => {
            setActiveSpecialView('stations');
            setActiveNav('Expeditions');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateToAIStudio={() => {
            setActiveSpecialView('ai-studio');
            setActiveNav('AI Media Studio');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateToStudents={() => {
            setActiveSpecialView('students');
            setActiveNav('Smart Education');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateToMedia={() => {
            setActiveSpecialView('media');
            setActiveNav('Media');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenContribute={() => setContributeOpen(true)}
          onOpenBot={() => setBotOpen(true)}
        />
      ) : activeSpecialView === 'ai-studio' ? (
        /* AI Media Dissemination Engine */
        <div className="bg-[#070e1b] py-8 text-white min-h-[600px]">
          <AiDisseminator 
            initialSelectedItem={selectedAIItem} 
            userContributions={userContributions}
          />
        </div>
      ) : activeSpecialView === 'stations' ? (
        /* Expeditions Catalog (Matching Image 2) */
        <ExpeditionsCatalog
          onLaunchAI={(title, summary) => handleLaunchAI({ title, summary })}
        />
      ) : activeSpecialView === 'media' ? (
        /* Moments from the Polar Frontiers (Matching Image 4) */
        <MediaPortal
          onLaunchAI={(title, summary) => handleLaunchAI({ title, summary })}
          onContribute={() => setContributeOpen(true)}
          userContributions={userContributions}
        />
      ) : activeSpecialView === 'students' ? (
        /* Student Hub & Quiz */
        <div className="bg-[#070e1b] py-8 text-white min-h-[600px]">
          <StudentPolarHub />
        </div>
      ) : (
        /* Knowledge Repository with Search & Filters */
        <KnowledgeRepository
          onSelectForAI={(item) => {
            setSelectedAIItem(item);
            setActiveSpecialView('ai-studio');
          }}
          filterStationQuery={searchFilter}
          initialCategory={selectedCategoryTab}
          userContributions={userContributions}
          onDeleteContribution={handleDeleteContribution}
        />
      )}

      {/* Floating HimVigyan AI Assistant */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setBotOpen(true)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-xl shadow-sky-600/30 hover:scale-105 active:scale-95 transition-all border border-white/20"
        >
          <div className="relative">
            <MessageSquare className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full"></span>
          </div>
          <span>Ask HimVigyan AI</span>
        </button>
      </div>

      {/* Modals */}
      <AuthModals
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      <ProfileModal
        isOpen={profileModalOpen}
        user={currentUser}
        userContributions={userContributions}
        onClose={() => setProfileModalOpen(false)}
        onLogout={handleLogout}
        onLaunchAI={(title, summary) => handleLaunchAI({ title, summary })}
        onOpenContribute={() => setContributeOpen(true)}
        onDeleteContribution={handleDeleteContribution}
        onUpdateUser={handleUpdateUser}
      />

      <DetailsModal
        item={detailsItem}
        onClose={() => setDetailsItem(null)}
        onLaunchAI={handleLaunchAI}
      />

      <ScientistSubmissionModal
        isOpen={contributeOpen}
        onClose={() => setContributeOpen(false)}
        onSubmitted={(data) => {
          const isImageFile = data.fileName ? /\.(jpg|jpeg|png|webp|svg|gif|bmp)$/i.test(data.fileName) : false;
          const isVideoFile = data.fileName ? /\.(mp4|mov|avi|webm|mkv|m4v)$/i.test(data.fileName) : false;

          const isPhoto = data.type === 'Photo' || data.mediaKind === 'photo' || data.fileKind === 'photo' || isImageFile;
          const isVideo = !isPhoto && (data.type === 'Video' || data.mediaKind === 'video' || data.fileKind === 'video' || isVideoFile);

          const resolvedType: 'Publication' | 'Dataset' | 'Report' | 'Media' = 
            (data.type === 'Photo' || data.type === 'Video' || isPhoto || isVideo) ? 'Media' :
            (data.type === 'Dataset' || data.type === 'Report' || data.type === 'Publication') ? data.type : 'Dataset';

          const resolvedFormat = 
            resolvedType === 'Dataset' ? 'NetCDF / CSV' :
            resolvedType === 'Report' ? 'PDF (Compendium)' :
            resolvedType === 'Publication' ? 'PDF (Article)' :
            isPhoto ? 'High-Res JPG / PNG' :
            '4K Ultra-HD MP4';

          const newContrib: UserContribution = {
            id: `uc-${Date.now()}`,
            title: data.title,
            type: resolvedType,
            mediaType: isPhoto ? 'image' : isVideo ? 'video' : undefined,
            mediaKind: isPhoto ? 'photo' : isVideo ? 'video' : undefined,
            region: data.region || 'Antarctica',
            categoryBadge: isPhoto ? 'Research Photograph' :
                           isVideo ? 'Expedition Video' :
                           data.type === 'Publication' ? 'Peer-Reviewed Article' :
                           data.type === 'Dataset' ? 'Open Scientific Dataset' :
                           data.type === 'Report' ? 'MoES Official Report' : 'Research Media Vault',
            expedition: data.expedition || '43rd Indian Scientific Expedition to Antarctica (43-ISEA)',
            station: data.station || 'Bharati Station (Larsemann Hills)',
            leadScientist: data.authorsOrLead || 'Lead Scientist (You)',
            coAuthors: data.coAuthors || '',
            license: data.license || 'CC-BY 4.0 Open Access',
            equipment: data.equipment || '',
            targetAudience: data.targetAudience || [],
            date: 'Just now',
            doi: data.doi || `10.5281/ncpor.${(data.region || 'ant').toLowerCase()}.${new Date().getFullYear()}.${Math.floor(1000 + Math.random() * 9000)}`,
            downloads: 0,
            views: 1,
            citations: 0,
            fileSize: data.fileName ? `${(Math.random() * 15 + 4).toFixed(1)} MB` : (isPhoto ? '8.4 MB' : '14.8 MB'),
            format: resolvedFormat,
            summary: data.summary || (isPhoto ? 'High-resolution scientific photograph captured during polar expedition.' : 'Newly cataloged polar research asset submitted by lead scientist.'),
            fullAbstract: data.summary || 'Full experimental methodology and field observations logged into the NCPOR national repository.',
            tags: data.tags && data.tags.length ? data.tags : (isPhoto ? ['Photography', 'Polar Imagery', 'Cryosphere'] : ['Polar Research', 'MoES Archive', 'Cryosphere']),
            peerReviewed: data.type === 'Publication' || data.license?.includes('Peer-Review'),
            fileName: data.fileName,
            fileUrl: data.fileUrl,
            pdfUrl: data.pdfUrl,
            thumbnailUrl: data.thumbnailUrl || data.mediaUrl,
            mediaUrl: data.thumbnailUrl || data.mediaUrl || (isPhoto ? 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80' : isVideo ? 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80' : undefined),
            images: data.images || (data.thumbnailUrl ? [data.thumbnailUrl] : (data.mediaUrl ? [data.mediaUrl] : undefined))
          };
          handleAddContribution(newContrib);

          setSubmissionToast({
            title: newContrib.title,
            doi: newContrib.doi,
            type: newContrib.type
          });

          // Auto-navigate user to see their upload live immediately!
          if (newContrib.type === 'Media') {
            setActiveSpecialView('media');
            setActiveNav('Media');
          } else {
            setActiveSpecialView('repository');
            setSelectedCategoryTab(
              newContrib.type === 'Dataset' ? 'Datasets' :
              newContrib.type === 'Report' ? 'Reports' :
              newContrib.type === 'Publication' ? 'Publications' : 'All'
            );
            setActiveNav(newContrib.type === 'Dataset' ? 'Datasets' : newContrib.type === 'Report' ? 'Reports' : 'Research');
          }
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }}
      />

      <PolarBot 
        isOpen={botOpen} 
        onClose={() => setBotOpen(false)}
        onOpenReport={(item) => setDetailsItem(item)}
        onOpenContribute={() => setContributeOpen(true)}
        userContributions={userContributions}
      />

      {/* Floating Submission Success Toast */}
      {submissionToast && (
        <div className="fixed bottom-20 right-6 sm:bottom-8 sm:right-8 z-50 max-w-md w-full bg-[#0c192c] border border-cyan-500/50 rounded-2xl p-4 shadow-2xl shadow-cyan-950/80 animate-slideUp text-white backdrop-blur-md">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 text-cyan-400 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live On Portal
                  </span>
                  <span className="text-[11px] text-cyan-400 font-mono font-medium">
                    {submissionToast.doi}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-1 line-clamp-1">
                  {submissionToast.title}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  Your {submissionToast.type} is now publicly visible in the Knowledge Repository with AI tools!
                </p>
              </div>
            </div>
            <button
              onClick={() => setSubmissionToast(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 7. Dark Navy Footer matching screenshot */}
      <Footer
        onNavClick={(link) => {
          setActiveNav(link);
          if (link === 'Home') setActiveSpecialView('none');
          else if (link === 'Expeditions') setActiveSpecialView('stations');
          else if (link === 'Media') setActiveSpecialView('media');
          else if (link === 'Smart Education') setActiveSpecialView('students');
          else if (link === 'About') setActiveSpecialView('about');
          else setActiveSpecialView('repository');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}
