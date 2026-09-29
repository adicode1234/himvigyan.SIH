'use client';

import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  Filter, 
  User, 
  Clock, 
  Anchor, 
  ArrowRight, 
  Download, 
  Check, 
  MapPin,
  ExternalLink,
  Layers,
  BookOpen,
  Database,
  FileText,
  Film
} from 'lucide-react';
import { DETAILED_EXPEDITIONS, DetailedExpedition } from '@/data/expeditionsData';
import ExpeditionDetailModal from './ExpeditionDetailModal';
import { triggerScientificDownload } from '@/utils/downloadHelper';

interface ExpeditionsCatalogProps {
  onSelectExpedition?: (expedition: DetailedExpedition) => void;
  onLaunchAI?: (title: string, summary: string) => void;
}

export default function ExpeditionsCatalog({ onSelectExpedition, onLaunchAI }: ExpeditionsCatalogProps) {
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);
  const [selectedExpeditionModal, setSelectedExpeditionModal] = useState<DetailedExpedition | null>(null);
  const [selectedInitialTab, setSelectedInitialTab] = useState<'overview' | 'research' | 'publications' | 'datasets' | 'reports' | 'media' | 'timeline'>('overview');

  const expeditions = DETAILED_EXPEDITIONS;

  const filteredExpeditions = expeditions.filter(exp => {
    const matchesRegion = regionFilter === 'All' || exp.region === regionFilter;
    const matchesSearch = 
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.lead.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesRegion && matchesSearch;
  });

  const handleDownload = (id: string) => {
    setDownloadSuccessId(id);
    const exp = DETAILED_EXPEDITIONS.find(e => e.id === id);
    if (exp) {
      triggerScientificDownload({
        id: exp.id,
        title: `${exp.title} - Official Compendium`,
        authorsOrLead: exp.lead,
        station: exp.vesselOrBase,
        expedition: exp.title,
        type: 'Report',
        summary: exp.description
      });
    }
    setTimeout(() => setDownloadSuccessId(null), 2500);
  };

  const handleOpenExpeditionTab = (exp: DetailedExpedition, tab: 'overview' | 'research' | 'publications' | 'datasets' | 'reports' | 'media' | 'timeline') => {
    setSelectedExpeditionModal(exp);
    setSelectedInitialTab(tab);
    if (onSelectExpedition) {
      onSelectExpedition(exp);
    }
  };

  return (
    <div className="bg-[#070e1b] min-h-screen text-slate-100 font-sans pb-16">
      
      {/* 1. TOP HERO BANNER (Dynamic Polar Expeditions Video Background) */}
      <div className="relative w-full overflow-hidden border-b border-slate-800/80 mb-8 hero-banner">
        {/* Background video of polar expedition frontiers */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2000&q=85"
            className="w-full h-full object-cover object-center scale-105"
          >
            <source src="https://pixabay.com/videos/download/x-327101_medium.mp4" type="video/mp4" />
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
              <span>EXPEDITIONS</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Indian Scientific <br className="hidden sm:inline" />
              <span className="text-sky-400">Expeditions Catalog</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Official catalog of active and historic national scientific expeditions across Antarctica, the Arctic, the Southern Ocean, and the Himalayan Cryosphere.
            </p>

            {/* Stats Pills Row */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-3 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold leading-none">44+</div>
                  <div className="text-[11px] text-slate-400">Antarctic Missions</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                  <Anchor className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold leading-none">16+</div>
                  <div className="text-[11px] text-slate-400">Arctic Expeditions</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold leading-none">1981-Present</div>
                  <div className="text-[11px] text-slate-400">Over 4 Decades</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Region & Search Filters Bar */}
        <div className="bg-[#0c182a] p-4 sm:p-5 rounded-2xl border border-slate-300 dark:border-slate-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input Bar */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-500 dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search expeditions by mission name, leader, code..."
              className="w-full pl-10 pr-12 py-2.5 bg-slate-50 dark:bg-[#08101d] border border-slate-300 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer px-1 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* Region Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {['All', 'Antarctica', 'Arctic', 'Southern Ocean', 'Himalayas'].map((reg) => (
              <button
                key={reg}
                onClick={() => setRegionFilter(reg)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  regionFilter === reg
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                    : 'bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Expeditions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExpeditions.map((exp) => (
            <div
              key={exp.id}
              className="bg-[#0c182a] rounded-2xl border border-slate-800/80 shadow-md hover:shadow-xl hover:border-sky-500/50 hover:-translate-y-1 transition-all overflow-hidden flex flex-col justify-between group"
            >
              {/* Clickable Card Body & Image to Open Overview */}
              <div 
                className="cursor-pointer group/card flex-1 flex flex-col justify-between"
                onClick={() => handleOpenExpeditionTab(exp, 'overview')}
                title={`Click to view details for ${exp.title}`}
              >
                {/* Top Image Container with Overlaid Badges and Title */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  <img
                    src={exp.imageUrl}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c182a] via-black/30 to-black/20 group-hover/card:via-black/20 transition-colors"></div>

                  {/* Top Badges (Region & Status) */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm ${
                        exp.region === 'Antarctica' ? 'bg-sky-600' :
                        exp.region === 'Arctic' ? 'bg-cyan-600' :
                        exp.region === 'Southern Ocean' ? 'bg-blue-600' : 'bg-indigo-600'
                      }`}>
                        {exp.region}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-black/50 text-slate-200 backdrop-blur-md border border-white/20">
                        {exp.status}
                      </span>
                    </div>
                  </div>

                  {/* Bottom of Image: Code & Title */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-mono uppercase font-bold text-sky-400 tracking-wider">
                      {exp.code}
                    </span>
                    <h3 className="font-extrabold text-sm sm:text-base leading-snug drop-shadow-sm line-clamp-2 mt-0.5 group-hover:text-sky-300 transition-colors">
                      {exp.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {exp.description}
                    </p>

                    {/* Metadata Rows with Icons */}
                    <div className="space-y-1.5 text-xs text-slate-400 pt-2.5">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span className="truncate">Lead: <strong className="text-slate-200">{exp.lead}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Anchor className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{exp.vesselOrBase}</span>
                      </div>
                    </div>

                    {/* Research Highlights / Focus Area Tags */}
                    <div className="pt-2.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Scientific Focus Areas:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {exp.highlights.map((tag, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenExpeditionTab(exp, 'overview');
                            }}
                            className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-900 text-slate-300 border border-slate-800 hover:border-sky-500/60 hover:text-sky-300 hover:bg-sky-950/40 transition-all cursor-pointer text-left"
                            title={`Click to open info for ${tag}`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Interconnected Relational Buttons */}
                  <div className="pt-2.5 border-t border-slate-800/80 mt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Connected Scientific Content:
                    </span>
                    <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenExpeditionTab(exp, 'research');
                        }}
                        className="p-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/80 hover:scale-[1.03] active:scale-95 text-indigo-300 font-semibold border border-indigo-800/50 hover:border-indigo-500/80 flex items-center justify-between transition-all cursor-pointer shadow-sm"
                        title="Click to view Research Conducted"
                      >
                        <span className="truncate">🔬 Research</span>
                        <span className="bg-indigo-900/80 px-1.5 py-0.2 rounded-full font-bold">
                          {exp.researchProjects.length}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenExpeditionTab(exp, 'publications');
                        }}
                        className="p-1.5 rounded-lg bg-blue-950/60 hover:bg-blue-900/80 hover:scale-[1.03] active:scale-95 text-blue-300 font-semibold border border-blue-800/50 hover:border-blue-500/80 flex items-center justify-between transition-all cursor-pointer shadow-sm"
                        title="Click to view Publications"
                      >
                        <span className="truncate">📄 Papers</span>
                        <span className="bg-blue-900/80 px-1.5 py-0.2 rounded-full font-bold">
                          {exp.publications.length}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenExpeditionTab(exp, 'datasets');
                        }}
                        className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 hover:scale-[1.03] active:scale-95 text-emerald-300 font-semibold border border-emerald-800/50 hover:border-emerald-500/80 flex items-center justify-between transition-all cursor-pointer shadow-sm"
                        title="Click to view Collected Datasets"
                      >
                        <span className="truncate">📊 Data</span>
                        <span className="bg-emerald-900/80 px-1.5 py-0.2 rounded-full font-bold">
                          {exp.datasets.length}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenExpeditionTab(exp, 'reports');
                        }}
                        className="p-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 hover:scale-[1.03] active:scale-95 text-amber-300 font-semibold border border-amber-800/50 hover:border-amber-500/80 flex items-center justify-between transition-all cursor-pointer shadow-sm"
                        title="Click to view Cruise & Expedition Reports"
                      >
                        <span className="truncate">📑 Reports</span>
                        <span className="bg-amber-900/80 px-1.5 py-0.2 rounded-full font-bold">
                          {exp.reports.length}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenExpeditionTab(exp, 'media');
                        }}
                        className="p-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900/80 hover:scale-[1.03] active:scale-95 text-purple-300 font-semibold border border-purple-800/50 hover:border-purple-500/80 flex items-center justify-between transition-all cursor-pointer shadow-sm"
                        title="Click to view Expedition Media & Gallery"
                      >
                        <span className="truncate">🎬 Media</span>
                        <span className="bg-purple-900/80 px-1.5 py-0.2 rounded-full font-bold">
                          {exp.media.length}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenExpeditionTab(exp, 'timeline');
                        }}
                        className="p-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 hover:scale-[1.03] active:scale-95 text-cyan-300 font-semibold border border-cyan-800/50 hover:border-cyan-500/80 flex items-center justify-between transition-all cursor-pointer shadow-sm"
                        title="Click to view Mission Timeline & Milestones"
                      >
                        <span className="truncate">⏱️ Timeline</span>
                        <span className="bg-cyan-900/80 px-1.5 py-0.2 rounded-full font-bold">
                          {exp.timeline.length}
                        </span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Card Footer: Explore Expedition & Download Report Buttons */}
              <div className="p-3 bg-[#08101d] border-t border-slate-800/80 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenExpeditionTab(exp, 'overview');
                  }}
                  className="group/btn flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-sky-600 hover:text-white border border-slate-700 hover:border-sky-500 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] cursor-pointer"
                >
                  <span>Explore Expedition</span>
                  <ArrowRight className="w-3.5 h-3.5 text-sky-400 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all duration-200" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(exp.id);
                  }}
                  className={`p-2 rounded-xl border transition-all duration-200 shadow-sm active:scale-95 cursor-pointer ${
                    downloadSuccessId === exp.id
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-900 text-slate-400 hover:bg-sky-600 hover:text-white border-slate-700 hover:border-sky-500'
                  }`}
                  title="Download Scientific Compendium / Cruise Report"
                >
                  {downloadSuccessId === exp.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Download className="w-4 h-4 transition-transform group-hover:scale-110" />
                  )}
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* 7-SECTION INTERCONNECTED EXPEDITION DETAIL MODAL */}
      {selectedExpeditionModal && (
        <ExpeditionDetailModal
          expedition={selectedExpeditionModal}
          initialTab={selectedInitialTab}
          onClose={() => setSelectedExpeditionModal(null)}
          onLaunchAI={onLaunchAI}
        />
      )}

    </div>
  );
}
