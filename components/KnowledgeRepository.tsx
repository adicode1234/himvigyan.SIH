'use client';

import React, { useState } from 'react';
import { REPOSITORY_DATA, RepositoryItem } from '@/data/polarData';
import { 
  Search, 
  Download, 
  Sparkles, 
  FileText, 
  Database, 
  BookMarked, 
  Camera, 
  Copy, 
  Check, 
  X, 
  ExternalLink, 
  User, 
  Calendar, 
  Layers, 
  ArrowRight, 
  Eye, 
  Film, 
  Play, 
  Share2, 
  ShieldCheck, 
  Quote,
  Compass,
  Trash2
} from 'lucide-react';
import ReportDetailModal from '@/components/ReportDetailModal';
import { UserContribution, contributionToRepositoryItem } from '@/data/userContributions';
import { triggerScientificDownload } from '@/utils/downloadHelper';

interface KnowledgeRepositoryProps {
  onSelectForAI: (item: RepositoryItem) => void;
  filterStationQuery?: string;
  initialCategory?: string;
  userContributions?: UserContribution[];
  onDeleteContribution?: (id: string) => void;
}

export default function KnowledgeRepository({ 
  onSelectForAI, 
  filterStationQuery, 
  initialCategory,
  userContributions = [],
  onDeleteContribution
}: KnowledgeRepositoryProps) {
  const [selectedType, setSelectedType] = useState<string>(() => {
    if (initialCategory === 'Datasets') return 'Dataset';
    if (initialCategory === 'Reports') return 'Report';
    if (initialCategory === 'Publications') return 'Publication';
    if (initialCategory === 'Media' || initialCategory === 'Photos & Videos') return 'Media';
    return 'All';
  });
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>(filterStationQuery || '');
  const [activeModalItem, setActiveModalItem] = useState<RepositoryItem | null>(null);
  const [citationFormat, setCitationFormat] = useState<'APA' | 'IEEE' | 'BibTeX'>('APA');
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialCategory === 'Datasets') setSelectedType('Dataset');
    else if (initialCategory === 'Reports') setSelectedType('Report');
    else if (initialCategory === 'Publications') setSelectedType('Publication');
    else if (initialCategory === 'Media' || initialCategory === 'Photos & Videos') setSelectedType('Media');
    else if (initialCategory === 'Research') setSelectedType('All');
  }, [initialCategory]);

  // Merge real user contributions (at the top) with baseline repository data
  const allItems = React.useMemo(() => {
    const userItems = (userContributions || []).map(contributionToRepositoryItem);
    return [...userItems, ...REPOSITORY_DATA];
  }, [userContributions]);

  // Filter items
  const filteredItems = allItems.filter((item) => {
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesRegion = selectedRegion === 'All' || item.region === selectedRegion;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.authorsOrLead.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesType && matchesRegion && matchesSearch;
  });

  const handleDownload = (id: string, format: string) => {
    setDownloadSuccessId(id);
    const target = allItems.find(i => i.id === id);
    if (target) {
      triggerScientificDownload({
        id: target.id,
        title: target.title,
        authorsOrLead: target.authorsOrLead,
        doi: target.doi,
        expedition: target.region,
        format: target.format || format,
        type: target.type,
        summary: target.summary,
        fullAbstract: target.fullAbstract,
        mediaUrl: target.mediaUrl,
        pdfUrl: target.pdfUrl,
        fileUrl: target.fileUrl,
        date: target.date,
        fileSize: target.fileSize
      });
    }
    setTimeout(() => {
      setDownloadSuccessId(null);
    }, 2500);
  };

  const handleShare = async (item: RepositoryItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: `${item.title} - NCPOR / MoES Knowledge Repository`,
          url: window.location.href,
        });
        return;
      } catch (err) {}
    }
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getCitationText = (item: RepositoryItem, format: 'APA' | 'IEEE' | 'BibTeX') => {
    if (format === 'APA') {
      return `${item.authorsOrLead} (${item.year}). "${item.title}". National Centre for Polar and Ocean Research, Ministry of Earth Sciences, Govt. of India. DOI: ${item.doi || 'N/A'}`;
    }
    if (format === 'IEEE') {
      return `${item.authorsOrLead}, "${item.title}," National Centre for Polar and Ocean Research (MoES), ${item.year}, doi: ${item.doi || 'N/A'}.`;
    }
    return `@article{ncpor_${item.id},\n  title={${item.title}},\n  author={${item.authorsOrLead}},\n  year={${item.year}},\n  institution={National Centre for Polar and Ocean Research},\n  doi={${item.doi || 'N/A'}}\n}`;
  };

  const copyCitation = (item: RepositoryItem) => {
    navigator.clipboard.writeText(getCitationText(item, citationFormat));
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <div className="bg-[#070e1b] min-h-screen text-slate-100 font-sans pb-16">
      
      {/* 1. TOP HERO BANNER (Dynamic Polar Research Video Background) */}
      <div className="relative w-full overflow-hidden border-b border-slate-800/80 mb-8 hero-banner">
        {/* Background video of polar research frontiers */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2000&q=85"
            className="w-full h-full object-cover object-center scale-105"
          >
            <source src="https://pixabay.com/videos/download/x-259350_medium.mp4" type="video/mp4" />
            <source src="/videos/hero-polar.mp4" type="video/mp4" />
            <img
              src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2000&q=85"
              alt="Polar Frontiers"
              className="w-full h-full object-cover object-center scale-105"
            />
          </video>
          {/* Deep Navy Gradient Overlays matching screenshot */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070e1b] via-[#070e1b]/80 to-[#070e1b]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e1b] via-transparent to-black/40" />
        </div>

        {/* Content Box */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-12 sm:pb-16 flex flex-col justify-between min-h-[300px] sm:min-h-[340px]">
          <div className="space-y-3 max-w-2xl">
            {/* Breadcrumb with Logo */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-sky-400 uppercase">
              <img src="/himvigyan-crest.png" alt="HimVigyan Crest" className="w-5 h-5 object-contain drop-shadow" />
              <span>HimVigyan</span>
              <span className="text-slate-500">/</span>
              <span>KNOWLEDGE REPOSITORY</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Integrated Polar <br className="hidden sm:inline" />
              <span className="text-sky-400">Knowledge Repository</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Official digital archive of scientific datasets, expedition reports, research publications, and open polar data from India&apos;s polar expeditions.
            </p>

            {/* Stats Pills Row */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-3 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold leading-none">5,230+</div>
                  <div className="text-[11px] text-slate-400">Datasets</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold leading-none">1,840+</div>
                  <div className="text-[11px] text-slate-400">Reports</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold leading-none">40+ Yrs</div>
                  <div className="text-[11px] text-slate-400">Expeditions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Category Navigation Bar (Pills matching Moments from Polar Frontiers) */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'All', label: 'All Records', icon: Layers },
              { id: 'Dataset', label: 'Datasets', icon: Database },
              { id: 'Report', label: 'Expedition Reports', icon: FileText },
              { id: 'Publication', label: 'Publications', icon: BookMarked },
              { id: 'Media', label: 'Media Vault', icon: Camera },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedType === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedType(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Showing <strong className="text-sky-400 font-bold">{filteredItems.length}</strong> polar archives
          </div>
        </div>

        {/* Region & Search Filters Bar */}
        <div className="bg-[#0c182a] p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search datasets, reports, authors..."
              className="w-full pl-10 pr-12 py-2 bg-[#08101d] border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Region Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {['All', 'Antarctica', 'Arctic', 'Himalayas', 'Southern Ocean'].map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  selectedRegion === reg
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Repository Items (Dark Polar Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isMedia = item.type === 'Media';
            return (
              <div
                key={item.id}
                onClick={() => setActiveModalItem(item)}
                className="bg-[#0c182a] rounded-2xl border border-slate-800/80 shadow-md hover:shadow-xl hover:border-sky-500/50 hover:-translate-y-1 transition-all overflow-hidden flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Media or custom thumbnail preview banner */}
                  {(item.thumbnailUrl || item.bannerImage || (item.mediaUrl && !item.mediaUrl.endsWith('.mp4'))) ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                      <img
                        src={item.thumbnailUrl || item.bannerImage || item.mediaUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/about/hero-banner.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c182a] via-transparent to-black/30"></div>

                      {/* Top Right Format Badge */}
                      <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-black/70 text-white backdrop-blur-md border border-white/20 font-mono">
                        {item.format}
                      </div>

                      {/* Play Icon Overlay if video */}
                      {(item.mediaType === 'video' || (item.format.includes('MP4') && !item.format.includes('JPG') && !item.format.includes('PNG') && !item.format.includes('Image'))) && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md border border-white/30 group-hover:scale-110 group-hover:bg-sky-500 transition-all shadow-lg shadow-black/50">
                            <Play className="w-5 h-5 ml-0.5" />
                          </div>
                        </div>
                      )}

                      {/* Bottom Region / Category Tag */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm ${
                          item.type === 'Dataset' ? 'bg-emerald-600' :
                          item.type === 'Report' ? 'bg-amber-600' :
                          item.type === 'Publication' ? 'bg-indigo-600' :
                          'bg-purple-600'
                        }`}>
                          {item.type}
                        </span>
                        {item.isUserUploaded && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-400 text-slate-950 shadow-sm animate-pulse">
                            ⚡ Uploaded by You
                          </span>
                        )}
                        <span className="text-[11px] font-medium text-white/90 drop-shadow">
                          {item.region} • {item.year}
                        </span>
                      </div>
                    </div>
                  ) : null}

                  <div className="p-5">
                    {/* If no thumbnail preview banner, show top category badges row */}
                    {!(item.thumbnailUrl || item.bannerImage || (item.mediaUrl && !item.mediaUrl.endsWith('.mp4'))) && (
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                            item.type === 'Dataset' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                            item.type === 'Report' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                            item.type === 'Publication' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                            'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          }`}>
                            {item.type}
                          </span>
                          {item.isUserUploaded && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 flex items-center gap-1 animate-pulse shadow-sm shadow-cyan-500/20">
                              ⚡ Uploaded by You (Live)
                            </span>
                          )}
                        </div>

                        <span className="text-[11px] font-semibold text-slate-400">
                          {item.region} • {item.year}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-sky-400 transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Author / Lead */}
                    <p className="text-xs text-sky-400 mt-1.5 line-clamp-1 flex items-center gap-1.5 font-medium">
                      <User className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">{item.authorsOrLead}</span>
                    </p>

                    {/* Summary */}
                    <p className="text-xs text-slate-300 mt-2.5 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {item.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] text-slate-400 bg-slate-900 border border-slate-800 group-hover:border-sky-500/40 group-hover:text-sky-300 px-2 py-0.5 rounded-md transition-colors"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-3.5 bg-[#08101d] border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-400 font-medium">
                    <span className="font-semibold text-slate-300">{item.fileSize}</span>
                    <span className="mx-1">•</span>
                    <span>{item.downloads.toLocaleString()} DLs</span>
                  </div>

                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    {/* Delete button if uploaded by user */}
                    {item.isUserUploaded && onDeleteContribution && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Delete your contribution "${item.title}"?`)) {
                            onDeleteContribution(item.id);
                          }
                        }}
                        className="p-1.5 rounded-xl text-rose-400 hover:text-white bg-slate-900 hover:bg-rose-600 border border-slate-700 hover:border-rose-500 transition-all shadow-xs"
                        title="Delete your uploaded contribution"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    {/* Send to AI Studio CTA */}
                    <button
                      onClick={() => onSelectForAI(item)}
                      className="p-1.5 rounded-xl text-sky-400 hover:text-white bg-slate-900 hover:bg-sky-600 border border-slate-700 hover:border-sky-500 transition-all shadow-xs"
                      title="Generate Social Media & Outreach with AI"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>

                    {/* Download Action */}
                    <button
                      onClick={() => handleDownload(item.id, item.format)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border shadow-xs ${
                        downloadSuccessId === item.id
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-900 hover:bg-sky-600 text-slate-200 hover:text-white border-slate-700 hover:border-sky-500'
                      }`}
                    >
                      {downloadSuccessId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Ready</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                          <span>{item.format.split('/')[0]}</span>
                        </>
                      )}
                    </button>

                    {/* View Details modal button */}
                    <button
                      onClick={() => setActiveModalItem(item)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-900 hover:bg-sky-600 border border-slate-700 hover:border-sky-500 transition-all shadow-xs"
                      title="Open full record details"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Report Detail Modal (Comprehensive In-Browser PDF Reader & Expedition Ecosystem) */}
        {activeModalItem && activeModalItem.type === 'Report' ? (
          <ReportDetailModal
            item={activeModalItem}
            onClose={() => setActiveModalItem(null)}
            onSelectForAI={(item) => {
              onSelectForAI(item);
              setActiveModalItem(null);
            }}
            onSelectRelatedItem={(item) => setActiveModalItem(item)}
          />
        ) : activeModalItem ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col text-slate-100">
              
              {/* Media Preview Banner if Media Item or has thumbnail */}
              {(activeModalItem.mediaUrl || activeModalItem.thumbnailUrl || activeModalItem.bannerImage) && (
                <div className="relative aspect-video w-full overflow-hidden bg-black shrink-0">
                  {(activeModalItem.mediaType === 'video' || activeModalItem.format.includes('MP4')) && activeModalItem.mediaUrl ? (
                    <video
                      controls
                      autoPlay
                      playsInline
                      loop
                      poster={activeModalItem.thumbnailUrl || activeModalItem.bannerImage}
                      className="w-full h-full object-cover"
                      src={activeModalItem.mediaUrl}
                    />
                  ) : (
                    <img
                      src={activeModalItem.thumbnailUrl || activeModalItem.bannerImage || activeModalItem.mediaUrl}
                      alt={activeModalItem.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/about/hero-banner.jpg';
                      }}
                    />
                  )}
                  <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/70 text-white backdrop-blur-md border border-white/20">
                      {activeModalItem.format}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-600 text-white shadow-sm">
                      {activeModalItem.region}
                    </span>
                  </div>
                </div>
              )}

              {/* Modal Content Header */}
              <div className="p-6 sm:p-8 space-y-4">
                {/* Close Button */}
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    activeModalItem.type === 'Publication' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                    activeModalItem.type === 'Dataset' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    activeModalItem.type === 'Report' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}>
                    {activeModalItem.type}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                    {activeModalItem.region}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Published: {activeModalItem.date}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>FAIR Verified Open Data</span>
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                  {activeModalItem.title}
                </h2>

                <p className="text-sm text-sky-400 font-semibold flex items-center gap-2">
                  <User className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Principal Investigator / Authors: {activeModalItem.authorsOrLead}</span>
                </p>

                {activeModalItem.doi && (
                  <p className="text-xs font-mono text-slate-400">
                    Persistent Identifier: <span className="text-sky-400 font-bold">{activeModalItem.doi}</span>
                  </p>
                )}

                {/* Metrics Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">File Format</span>
                    <span className="font-bold text-white font-mono text-sm">{activeModalItem.format}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Archive Size</span>
                    <span className="font-bold text-white font-mono text-sm">{activeModalItem.fileSize}</span>
                  </div>
                  <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40">
                    <span className="text-emerald-400 block text-[10px] uppercase font-bold">Public Downloads</span>
                    <span className="font-black text-emerald-300 font-mono text-sm">{activeModalItem.downloads.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Access Policy</span>
                    <span className="font-bold text-emerald-400 text-sm">CC-BY 4.0 Open</span>
                  </div>
                </div>

                {/* Full Abstract */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
                    Comprehensive Scientific Abstract &amp; Methodology
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                    {activeModalItem.fullAbstract}
                  </p>
                </div>

                {/* Subject Tags */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Subject Taxonomy Tags
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalItem.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-sky-950/60 text-sky-300 border border-sky-800/60"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* How to Cite this Work */}
                <div className="space-y-2 pt-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <Quote className="w-4 h-4 text-sky-400" />
                      <h4 className="text-xs uppercase font-bold tracking-wider text-white">
                        How to Cite this Work (Academic Reference)
                      </h4>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                      {(['APA', 'IEEE', 'BibTeX'] as const).map(fmt => (
                        <button
                          key={fmt}
                          onClick={() => setCitationFormat(fmt)}
                          className={`px-2.5 py-0.5 rounded-md font-semibold transition-all ${
                            citationFormat === fmt
                              ? 'bg-sky-600 text-white shadow-xs'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="flex-1 text-slate-200 leading-relaxed font-sans">
                      {citationFormat === 'BibTeX' ? (
                        <pre className="font-mono text-[11px] text-slate-200 whitespace-pre-wrap bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                          {getCitationText(activeModalItem, 'BibTeX')}
                        </pre>
                      ) : (
                        <p className="italic text-slate-200">
                          &ldquo;{getCitationText(activeModalItem, citationFormat)}&rdquo;
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => copyCitation(activeModalItem)}
                      className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
                        copiedCitation
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 hover:bg-sky-600 text-slate-200 hover:text-white border border-slate-700 hover:border-sky-600'
                      }`}
                    >
                      {copiedCitation ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>Copied Citation!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Citation</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Bottom Actions inside modal */}
                <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-3 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShare(activeModalItem)}
                      className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-1.5 text-xs font-semibold"
                    >
                      {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                      <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                    </button>

                    <button
                      onClick={() => {
                        onSelectForAI(activeModalItem);
                        setActiveModalItem(null);
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-md shadow-sky-500/20 transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Launch in AI Media Studio</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {activeModalItem.pdfUrl && (
                      <a
                        href={activeModalItem.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-sky-300 hover:text-white bg-slate-800 hover:bg-sky-600 border border-slate-700 hover:border-sky-500 transition-all shadow-xs"
                      >
                        <FileText className="w-4 h-4 text-sky-400" />
                        <span>View PDF</span>
                      </a>
                    )}

                    <button
                      onClick={() => handleDownload(activeModalItem.id, activeModalItem.format)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-sm ${
                        downloadSuccessId === activeModalItem.id
                          ? 'bg-emerald-600'
                          : 'bg-sky-600 hover:bg-sky-500'
                      }`}
                    >
                      {downloadSuccessId === activeModalItem.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Download Ready</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Download {activeModalItem.type === 'Publication' ? 'Paper' : 'Archive'} ({activeModalItem.fileSize})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
