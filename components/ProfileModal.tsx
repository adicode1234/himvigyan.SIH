'use client';

import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  ShieldCheck, 
  MapPin, 
  Compass, 
  FileText, 
  Database, 
  Sparkles,
  LogOut,
  ExternalLink,
  Download,
  Eye,
  Check,
  Copy,
  BookOpen,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  Award,
  Film,
  Quote,
  Plus,
  Trash2,
  UploadCloud,
  Camera,
  Phone
} from 'lucide-react';
import { AuthUser } from './AuthModals';
import { UserContribution, INITIAL_USER_CONTRIBUTIONS } from '@/data/userContributions';
import { triggerScientificDownload } from '@/utils/downloadHelper';
import ThemeToggle from './ThemeToggle';

interface ProfileModalProps {
  isOpen: boolean;
  user: AuthUser | null;
  userContributions?: UserContribution[];
  onClose: () => void;
  onLogout: () => void;
  onLaunchAI?: (title: string, summary: string) => void;
  onOpenContribute?: () => void;
  onDeleteContribution?: (id: string) => void;
  onUpdateUser?: (updated: AuthUser) => void;
}

export default function ProfileModal({ 
  isOpen, 
  user, 
  userContributions = INITIAL_USER_CONTRIBUTIONS,
  onClose, 
  onLogout,
  onLaunchAI,
  onOpenContribute,
  onDeleteContribution,
  onUpdateUser
}: ProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'contributions' | 'profile'>('contributions');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [inspectingItem, setInspectingItem] = useState<UserContribution | null>(null);
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);
  const [liveContributions, setLiveContributions] = useState<UserContribution[]>(userContributions);

  React.useEffect(() => {
    setLiveContributions(userContributions);
  }, [userContributions]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (inspectingItem) {
          setInspectingItem(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, inspectingItem, onClose]);

  if (!isOpen || !user) return null;

  // Aggregate stats
  const totalPosts = liveContributions.length;
  const totalDownloads = liveContributions.reduce((acc, curr) => acc + curr.downloads, 0);
  const totalViews = liveContributions.reduce((acc, curr) => acc + curr.views, 0);
  const totalCitations = liveContributions.reduce((acc, curr) => acc + (curr.citations || 0), 0);

  const filteredContributions = liveContributions.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.type === selectedCategory;
  });

  const handleDownload = (item: UserContribution) => {
    setDownloadSuccessId(item.id);
    setLiveContributions(prev => prev.map(c => c.id === item.id ? { ...c, downloads: c.downloads + 1 } : c));
    if (inspectingItem && inspectingItem.id === item.id) {
      setInspectingItem(prev => prev ? { ...prev, downloads: prev.downloads + 1 } : null);
    }

    // Trigger real file download (PDF for reports/papers, CSV for datasets, or image/video)
    triggerScientificDownload({
      id: item.id,
      title: item.title,
      authorsOrLead: item.leadScientist || user.name,
      doi: item.doi,
      expedition: item.expedition,
      station: item.station,
      format: item.format,
      type: item.type,
      summary: item.summary,
      fullAbstract: item.fullAbstract,
      mediaUrl: item.mediaUrl,
      date: item.date,
      fileSize: item.fileSize
    });

    setTimeout(() => {
      setDownloadSuccessId(null);
    }, 2500);
  };

  const copyCitation = (item: UserContribution) => {
    const citation = `${user.name} (${item.date.split(' ').pop() || '2024'}). "${item.title}". National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences. DOI: ${item.doi}`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'Publication': return <BookOpen className="w-3.5 h-3.5" />;
      case 'Dataset': return <Database className="w-3.5 h-3.5" />;
      case 'Report': return <FileText className="w-3.5 h-3.5" />;
      case 'Media': return <Film className="w-3.5 h-3.5" />;
      default: return <Layers className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 flex flex-col max-h-[92vh]"
      >
        
        {/* Top Header Card */}
        <div className="relative bg-gradient-to-r from-sky-900 via-slate-900 to-sky-950 p-5 sm:p-6 text-white overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
          
          {/* Top-right action controls: Theme toggle + Close button */}
          <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
            <ThemeToggle className="bg-white/10 hover:bg-white/20 border-white/20 text-white" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer shadow-sm"
              aria-label="Close Profile"
            >
              <X className="w-5 h-5 pointer-events-none" />
            </button>
          </div>

          <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Avatar */}
            <div className="relative shrink-0 group">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/avatars/polar_scientist_profile.jpg';
                  }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-xl border-2 border-white/40 group-hover:brightness-95 transition-all"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-2xl font-black shadow-xl border-2 border-white/40">
                  {user.name === 'Demo' ? 'DEMO' : (user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'M')}
                </div>
              )}

              {/* Change/Upload Photo Overlay */}
              <label 
                className="absolute inset-0 rounded-2xl bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[10px] font-bold cursor-pointer transition-opacity backdrop-blur-xs gap-1"
                title="Change Profile Photo"
              >
                <Camera className="w-4 h-4 text-cyan-300" />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && onUpdateUser) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const base64Url = event.target?.result as string;
                        if (base64Url) {
                          onUpdateUser({ ...user, avatarUrl: base64Url });
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>

              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-white text-[10px] font-bold" title="MoES Verified Scientist">
                ✓
              </div>
            </div>

            {/* User Meta */}
            <div className="text-center sm:text-left space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  {user.role}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/10 text-slate-300 border border-white/15">
                  ID: {user.scientistId}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5">
                  <img src="/polar-logo.png" alt="MoES" className="w-3.5 h-3.5 object-contain" />
                  <span>MoES Verified</span>
                </span>
              </div>

              {/* Quick Avatar Presets */}
              <div className="flex items-center justify-center sm:justify-start gap-2 pt-0.5">
                <span className="text-[10px] text-slate-300 font-semibold">Avatar Presets:</span>
                {[
                  { label: 'MoES Official', url: '/avatars/polar_scientist_profile.jpg' },
                  { label: 'Polar Parka', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
                  { label: 'Field Leader', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
                  { label: 'Oceanographer', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' }
                ].map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => {
                      if (onUpdateUser) {
                        onUpdateUser({ ...user, avatarUrl: preset.url });
                      }
                    }}
                    className={`w-6 h-6 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                      user.avatarUrl === preset.url ? 'border-sky-400 scale-110 ring-2 ring-sky-400/50' : 'border-white/40 hover:border-white opacity-80 hover:opacity-100'
                    }`}
                    title={preset.label}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {user.name}
              </h2>
              <p className="text-xs text-sky-200 font-medium">
                {user.designation}
              </p>
              <p className="text-[11px] text-slate-300">
                National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, Govt. of India
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('contributions')}
              className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'contributions'
                  ? 'border-sky-600 text-sky-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>My Uploads & Works ({totalPosts})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'profile'
                  ? 'border-sky-600 text-sky-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Official Dossier & Deployments</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{totalDownloads.toLocaleString()} Downloads Tracked</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: CONTRIBUTIONS & DOWNLOAD TRACKER */}
          {activeTab === 'contributions' && (
            <div className="space-y-5">
              
              {/* Clean Top Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-sky-600 mb-1">
                    <FileText className="w-4 h-4" />
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">My Posts</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900">{totalPosts}</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Published Assets</p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
                  <div className="flex items-center gap-2 text-emerald-600 mb-1">
                    <Download className="w-4 h-4" />
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Total Downloads</span>
                  </div>
                  <div className="text-2xl font-black text-emerald-700">{totalDownloads.toLocaleString()}</div>
                  <p className="text-[11px] text-emerald-600/80 mt-0.5">Public Downloads</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-indigo-600 mb-1">
                    <Eye className="w-4 h-4" />
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Views</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900">{totalViews.toLocaleString()}</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Portal Impressions</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-amber-600 mb-1">
                    <Award className="w-4 h-4" />
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Citations</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900">{totalCitations}</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Academic Citations</p>
                </div>
              </div>

              {/* Category Filter Pills Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100">
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {[
                    { id: 'All', label: 'All Uploads', count: totalPosts },
                    { id: 'Publication', label: 'Articles & Papers', count: liveContributions.filter(c => c.type === 'Publication').length },
                    { id: 'Dataset', label: 'Datasets', count: liveContributions.filter(c => c.type === 'Dataset').length },
                    { id: 'Report', label: 'Field Reports', count: liveContributions.filter(c => c.type === 'Report').length },
                    { id: 'Media', label: 'Media Assets', count: liveContributions.filter(c => c.type === 'Media').length },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedCategory(tab.id)}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                        selectedCategory === tab.id
                          ? 'bg-sky-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        selectedCategory === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

                <span className="text-xs text-slate-400 hidden sm:inline">
                  Showing {filteredContributions.length} of {totalPosts} posts
                </span>
              </div>

              {filteredContributions.length === 0 ? (
                <div className="py-14 px-6 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-3.5 my-2 animate-fadeIn">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-100 text-sky-600 flex items-center justify-center mx-auto border border-sky-200/80 shadow-xs">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-800">
                      No Published Posts Yet
                    </h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                      Aapne abhi tak koi research post upload nahi kiya hai. Jab aap &quot;Contribute Content&quot; se koi dataset ya publication upload karenge, tabhi yahan live stats aur post show honge.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        onClose();
                        if (onOpenContribute) onOpenContribute();
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 shadow-md shadow-sky-600/20 transition-all active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Upload Your First Research Post</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Ultra Clean & Organized Post Cards */
                <div className="space-y-4">
                  {filteredContributions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setInspectingItem(item)}
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-sky-300 transition-all cursor-pointer group space-y-3"
                    >
                      {/* Header Row: Category Badge + Expedition + Download Pill */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                            item.type === 'Publication' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                            item.type === 'Dataset' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            item.type === 'Report' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            'bg-purple-50 text-purple-700 border border-purple-200'
                          }`}>
                            {getCategoryIcon(item.type)}
                            <span>{item.categoryBadge}</span>
                          </span>

                          <span className="text-xs text-slate-500 font-medium">
                            {item.expedition.split('(')[0].trim()}
                          </span>

                          <span className="text-slate-300 text-xs hidden sm:inline">•</span>

                          <span className="text-xs text-slate-400">
                            {item.date}
                          </span>
                        </div>

                        {/* Download & View Pill */}
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold">
                            <Download className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{item.downloads.toLocaleString()} Downloads</span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                            {item.views.toLocaleString()} views
                          </span>
                        </div>
                      </div>

                      {/* Middle: Title & Summary */}
                      <div>
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                          {item.summary}
                        </p>
                      </div>

                      {/* Bottom Row: File Format + DOI on left, Clean Actions on right */}
                      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                            {item.format.split('/')[0].trim()}
                          </span>
                          <span>{item.fileSize}</span>
                          <span className="text-slate-300">•</span>
                          <span className="font-mono text-[11px] text-slate-400">DOI: {item.doi}</span>
                        </div>

                        {/* Fixed Right Action Buttons (Never Wraps) */}
                        <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleDownload(item)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                              downloadSuccessId === item.id
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-slate-100 hover:bg-sky-600 text-slate-700 hover:text-white border border-slate-200 hover:border-sky-600'
                            }`}
                          >
                            {downloadSuccessId === item.id ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Downloaded</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5" />
                                <span>Download</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => setInspectingItem(item)}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 transition-all flex items-center gap-1 shadow-sm"
                          >
                            <span>Open Post</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          {onDeleteContribution && (
                            <button
                              onClick={() => {
                                if (confirm('Are you sure you want to remove this published record?')) {
                                  onDeleteContribution(item.id);
                                  setLiveContributions(prev => prev.filter(c => c.id !== item.id));
                                }
                              }}
                              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors"
                              title="Delete / Remove Post"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PROFILE & CREDENTIALS */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              
              {/* Quick Metrics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-lg font-bold text-sky-600">8</div>
                  <div className="text-[11px] text-slate-500 font-medium">Expeditions</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-lg font-bold text-indigo-600">{totalPosts}</div>
                  <div className="text-[11px] text-slate-500 font-medium">Published Posts</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-lg font-bold text-emerald-600">{totalDownloads.toLocaleString()}</div>
                  <div className="text-[11px] text-slate-500 font-medium">Total Downloads</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-lg font-bold text-amber-600">Tier-1</div>
                  <div className="text-[11px] text-slate-500 font-medium">MoES Clearance</div>
                </div>
              </div>

              {/* Credentials & Contact Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Official Identity & Clearance
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] text-slate-400 block font-semibold">Institutional Email</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5 truncate">
                      <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>{user.email}</span>
                    </span>
                  </div>
                  {user.phone && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] text-slate-400 block font-semibold">Official Phone (Mobile)</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1.5 truncate">
                        <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{user.phone}</span>
                      </span>
                    </div>
                  )}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] text-slate-400 block font-semibold">Base Laboratory</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>NCPOR Head Office, Vasco da Gama, Goa</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Active Polar Deployments */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Key Polar Field Deployments
                </h4>
                <div className="space-y-2">
                  <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-xs">
                        43
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900">43rd Indian Scientific Expedition to Antarctica (43-IAE)</h5>
                        <p className="text-[11px] text-slate-500">Larsemann Hills & Maitri Traverse • Mission Leader</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-100 text-sky-700">
                      Completed
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-cyan-700 text-white flex items-center justify-center font-bold text-xs">
                        AR
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900">Himadri Arctic Summer Mission</h5>
                        <p className="text-[11px] text-slate-500">Ny-Ålesund, Svalbard, Norway • Atmospheric Aerosol Survey</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                      Archived
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Authenticated via MoES Single Sign-On (SSO)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors shadow-sm"
            >
              Done
            </button>
          </div>
        </div>

      </div>

      {/* FULL ARTICLE / POST DETAIL INSPECTOR MODAL ("Click karne pe wo khule") */}
      {inspectingItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 flex flex-col max-h-[92vh]">
            
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/70 flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
                    inspectingItem.type === 'Publication' ? 'bg-indigo-100 text-indigo-700' :
                    inspectingItem.type === 'Dataset' ? 'bg-emerald-100 text-emerald-700' :
                    inspectingItem.type === 'Report' ? 'bg-amber-100 text-amber-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {getCategoryIcon(inspectingItem.type)}
                    <span>{inspectingItem.categoryBadge}</span>
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Published: {inspectingItem.date}
                  </span>
                  {inspectingItem.peerReviewed && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Peer-Reviewed
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {inspectingItem.title}
                </h3>

                <p className="text-xs text-sky-700 font-medium flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Expedition: {inspectingItem.expedition}</span>
                </p>
              </div>

              <button
                onClick={() => setInspectingItem(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
              
              {/* Live Download & Performance Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200">
                  <div className="text-lg font-black text-emerald-700">{inspectingItem.downloads.toLocaleString()}</div>
                  <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Total Downloads</div>
                </div>
                <div className="p-3 rounded-xl bg-sky-50/80 border border-sky-200">
                  <div className="text-lg font-black text-sky-700">{inspectingItem.views.toLocaleString()}</div>
                  <div className="text-[10px] font-bold text-sky-800 uppercase tracking-wider">Portal Views</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-lg font-black text-slate-800 font-mono">{inspectingItem.format.split('/')[0]}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Format ({inspectingItem.fileSize})</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-lg font-black text-slate-800 font-mono">CC-BY 4.0</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">License Policy</div>
                </div>
              </div>

              {/* Author & Identifier Details */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Primary Investigator</span>
                  <p className="font-bold text-slate-900">{user.name} ({user.designation})</p>
                  <p className="text-[11px] text-slate-500">{user.email}</p>
                </div>
                <div className="space-y-0.5 sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Persistent Identifier (DOI)</span>
                  <p className="font-mono text-sky-600 font-semibold">{inspectingItem.doi}</p>
                  <p className="text-[11px] text-slate-500">Indexed in MoES / NCPOR FAIR Registry</p>
                </div>
              </div>

              {/* Station, Co-Authors & Equipment if present */}
              {(inspectingItem.station || inspectingItem.coAuthors || inspectingItem.equipment) && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  {inspectingItem.station && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Operating Station / Facility</span>
                      <p className="font-semibold text-slate-800 mt-0.5">{inspectingItem.station}</p>
                    </div>
                  )}
                  {inspectingItem.coAuthors && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Co-Authors & Collaborators</span>
                      <p className="font-semibold text-slate-800 mt-0.5">{inspectingItem.coAuthors}</p>
                    </div>
                  )}
                  {inspectingItem.equipment && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Equipment / Sensor Used</span>
                      <p className="font-semibold text-slate-800 mt-0.5">{inspectingItem.equipment}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Comprehensive Scientific Abstract */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500">
                  Comprehensive Scientific Abstract & Methodology
                </h4>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                  <p>{inspectingItem.fullAbstract}</p>
                  {inspectingItem.journal && (
                    <p className="text-xs font-semibold text-slate-800 pt-2 border-t border-slate-200">
                      Published in Journal: <span className="text-sky-700">{inspectingItem.journal}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Subject Tags */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Indexed Subject Tags
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {inspectingItem.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-100 font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Official Academic Reference & Citation */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Quote className="w-4 h-4 text-sky-600" />
                    <h4 className="text-xs uppercase font-bold tracking-wider text-slate-700">
                      Official Academic Citation (APA)
                    </h4>
                  </div>
                  <button
                    onClick={() => copyCitation(inspectingItem)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
                      copiedCitation
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white hover:bg-sky-600 text-slate-700 hover:text-white border border-slate-200 hover:border-sky-600'
                    }`}
                  >
                    {copiedCitation ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Citation</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs text-slate-800 leading-relaxed italic">
                    &ldquo;{user.name} ({inspectingItem.date.split(' ').pop() || '2024'}). &quot;{inspectingItem.title}&quot;. National Centre for Polar and Ocean Research, Ministry of Earth Sciences, Govt. of India. DOI: {inspectingItem.doi}&rdquo;
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Actions inside Inspector */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => {
                  if (onLaunchAI) {
                    onLaunchAI(inspectingItem.title, inspectingItem.summary);
                    setInspectingItem(null);
                    onClose();
                  }
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-md shadow-sky-500/20 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch in AI Media Studio</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInspectingItem(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200"
                >
                  Back to List
                </button>

                <button
                  onClick={() => handleDownload(inspectingItem)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-sm ${
                    downloadSuccessId === inspectingItem.id
                      ? 'bg-emerald-600'
                      : 'bg-sky-600 hover:bg-sky-700'
                  }`}
                >
                  {downloadSuccessId === inspectingItem.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Download Ready ({inspectingItem.fileSize})</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download Full File ({inspectingItem.fileSize})</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
