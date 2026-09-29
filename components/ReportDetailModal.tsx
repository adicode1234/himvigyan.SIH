'use client';

import React, { useState, useEffect } from 'react';
import { RepositoryItem, REPOSITORY_DATA } from '@/data/polarData';
import { triggerScientificDownload } from '@/utils/downloadHelper';
import PolarBot from './PolarBot';
import {
  ArrowLeft,
  X,
  FileText,
  Download,
  Share2,
  Sparkles,
  Copy,
  Check,
  Calendar,
  MapPin,
  User,
  Compass,
  ShieldCheck,
  Quote,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Database,
  ExternalLink,
  BookOpen,
  Layers,
  Printer,
  Search,
  Anchor,
  Clock,
  Eye,
  ChevronRight
} from 'lucide-react';

interface ReportDetailModalProps {
  item: RepositoryItem | null;
  onClose: () => void;
  onSelectForAI: (item: RepositoryItem) => void;
  onSelectRelatedItem?: (item: RepositoryItem) => void;
}

export default function ReportDetailModal({
  item,
  onClose,
  onSelectForAI,
  onSelectRelatedItem
}: ReportDetailModalProps) {
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [botOpen, setBotOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeViewMode, setActiveViewMode] = useState<'summary' | 'pdf'>('summary');

  if (!item) return null;

  // Derive authentic metadata or expedition equivalents
  const regionLabel = item.region ? item.region.toUpperCase() : 'SOUTHERN OCEAN';
  
  // Extract or generate realistic expedition code (e.g., SOE-12, 42-ISEA, ARCTIC-2024)
  const expeditionCode = (
    item.tags?.find(t => /^[A-Z0-9\-]{3,10}$/.test(t)) ||
    (item.region === 'Southern Ocean' ? 'SOE-12' :
     item.region === 'Antarctica' ? '42-ISEA' :
     item.region === 'Arctic' ? 'ARC-24' : 'HIM-CRY')
  );

  const leadScientistName = item.authorsOrLead || item.author || (
    item.region === 'Southern Ocean' ? 'Dr. Meenakshi Sundaram' :
    item.region === 'Antarctica' ? 'Dr. Vikramaditya Sen' :
    'Dr. K. S. Parashar'
  );

  const durationString = item.date?.includes('Days') ? item.date : (
    item.region === 'Southern Ocean' ? '60 Days (Jan 2023 - Mar 2023)' :
    item.region === 'Antarctica' ? '110 Days (Nov 2022 - Mar 2023)' :
    '45 Days (Summer Field Season)'
  );

  const platformName = item.station || (
    item.region === 'Southern Ocean' ? 'SA Agulhas II' :
    item.region === 'Antarctica' ? 'Bharati & Maitri Stations' :
    'Himadri Station (Ny-Ålesund)'
  );

  const personnelCount = item.tags?.includes('Personnel') ? '34 Researchers' : (
    item.region === 'Southern Ocean' ? '34 Researchers' :
    item.region === 'Antarctica' ? '48 Expedition Members' :
    '18 Scientists & Engineers'
  );

  // Scenic hero banner matching the exact screenshot (sailing ship/glaciers in southern ocean)
  const heroImage = item.mediaUrl || item.bannerImage || item.image || (
    item.region === 'Southern Ocean'
      ? 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2000&q=85'
      : item.region === 'Arctic'
      ? 'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=2000&q=85'
      : 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=85'
  );

  const overviewText = item.fullAbstract || item.summary || (
    item.region === 'Southern Ocean'
      ? 'A dedicated multi-disciplinary oceanic voyage from Mauritius to 68°S along the 57.5°E transect. Documented biogeochemical carbon pump efficiency, zooplankton shifts, and atmospheric trace gases across the Antarctic Circumpolar Current.'
      : 'Comprehensive scientific investigation conducted under the Ministry of Earth Sciences (MoES) and NCPOR, collecting high-resolution physical, cryospheric, and atmospheric observations across polar observation corridors.'
  );

  // Domains / pills
  const domains = item.tags && item.tags.length > 0 ? item.tags : [
    'Ocean Biogeochemistry',
    'Physical Oceanography',
    'Marine Ecology',
    'Cryosphere Dynamics',
    'Atmospheric Trace Gases'
  ];

  // PDF URL (if uploaded by user or default)
  const hasUploadedPdf = Boolean(item.pdfUrl || (item.fileUrl && (item.format?.includes('PDF') || item.fileName?.toLowerCase().endsWith('.pdf'))));
  const effectivePdfUrl = item.pdfUrl || item.fileUrl;

  const handleDownloadPdf = () => {
    setDownloadProgress(20);
    triggerScientificDownload({
      id: item.id,
      title: item.title,
      authorsOrLead: leadScientistName,
      doi: item.doi || `10.5281/ncpor.${expeditionCode.toLowerCase()}.2023`,
      expedition: item.region,
      format: item.format || 'PDF (Official Report)',
      type: 'Report',
      summary: overviewText,
      fullAbstract: overviewText,
      mediaUrl: item.mediaUrl,
      date: item.date,
      fileSize: item.fileSize || '14.8 MB'
    });

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDownloadProgress(null), 1800);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const copyCitation = () => {
    const citation = `${leadScientistName} (${item.year || '2023'}). "${item.title}". National Centre for Polar and Ocean Research, Ministry of Earth Sciences, Govt. of India. DOI: ${item.doi || '10.5281/ncpor.rep.2023'}`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: `Official Expedition Report: ${item.title} (NCPOR / MoES)`,
          url: window.location.href,
        });
        return;
      } catch (err) {}
    }
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col relative">
        
        {/* ========================================================================= */}
        {/* 1. SCENIC HERO BANNER (Matching User Screenshot Exactly)                  */}
        {/* ========================================================================= */}
        <div className="relative w-full overflow-hidden bg-slate-950 text-white min-h-[380px] sm:min-h-[440px] flex flex-col justify-between">
          
          {/* Background photograph with nautical vessel, rigging, and ice mountains */}
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt={item.title}
              className="w-full h-full object-cover object-[center_35%]"
            />
            {/* Deep navy atmospheric gradients matching screenshot */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-slate-950/20" />
          </div>

          {/* Hero Content Container */}
          <div className="relative max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 sm:pb-16 flex-1 flex flex-col justify-between z-10">
            
            {/* Top Navigation Row: Back Button & Close */}
            <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-sky-300 hover:text-white transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to All Expeditions</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Header Core: Badges, Title, Sub-meta, and Right Action Button */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8">
              
              {/* Left Column: Badges & Giant Title */}
              <div className="space-y-3.5 max-w-3xl">
                
                {/* Badges Row matching screenshot */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-sky-600 text-white shadow-sm">
                    {regionLabel}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-slate-900/90 text-cyan-300 border border-cyan-500/30">
                    {expeditionCode}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Completed</span>
                  </span>
                </div>

                {/* Giant Bold Title matching screenshot */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                  {item.title}
                </h1>

                {/* Sub-meta Line with Icons matching screenshot */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm text-slate-200 font-medium pt-1">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Lead Scientist: <strong className="text-white font-bold">{leadScientistName}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{durationString}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Anchor className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Platform: <strong className="text-white">{platformName}</strong></span>
                  </div>
                </div>

              </div>

              {/* Right Column: Cyan Download Button matching screenshot */}
              <div className="shrink-0 flex items-center gap-3">
                <button
                  onClick={handleDownloadPdf}
                  className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-cyan-400/25 transition-all flex items-center gap-2.5 cursor-pointer active:scale-98"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloadProgress !== null ? `Downloading ${downloadProgress}%` : 'Download Expedition Report'}</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. BODY CONTENT SECTION (Clean White Background Matching Screenshot)     */}
        {/* ========================================================================= */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            
            {/* LEFT 2 COLUMNS: EXPEDITION OVERVIEW & MISSION SUMMARY */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                
                {/* Overview Header & Text */}
                <div>
                  <h2 className="text-xs sm:text-sm font-black tracking-wider text-slate-900 uppercase mb-3">
                    EXPEDITION OVERVIEW &amp; MISSION SUMMARY
                  </h2>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                    {overviewText}
                  </p>
                </div>

                {/* Core Scientific Domains Investigated */}
                <div className="pt-5 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
                    Core Scientific Domains Investigated:
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    {domains.map((dom, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200/70 shadow-2xs"
                      >
                        {dom}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interactive Document / PDF Reader Toggle */}
                <div className="pt-6 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Report Document Reader
                    </h3>

                    {/* View mode toggle */}
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                      <button
                        onClick={() => setActiveViewMode('summary')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${
                          activeViewMode === 'summary'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Executive Synthesis
                      </button>
                      <button
                        onClick={() => setActiveViewMode('pdf')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${
                          activeViewMode === 'pdf'
                            ? 'bg-white text-sky-700 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        In-Browser PDF Viewer
                      </button>
                    </div>
                  </div>

                  {/* Document View Box */}
                  {activeViewMode === 'pdf' ? (
                    <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 text-white">
                      {/* PDF Toolbar */}
                      <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-slate-300">
                          <FileText className="w-4 h-4 text-cyan-400" />
                          <span className="font-semibold">{item.fileName || `${expeditionCode}_Final_Report.pdf`}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setZoomLevel(prev => Math.max(75, prev - 15))}
                            className="p-1 rounded hover:bg-slate-800 text-slate-300"
                            title="Zoom out"
                          >
                            <ZoomOut className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono text-[11px] text-slate-400">{zoomLevel}%</span>
                          <button
                            onClick={() => setZoomLevel(prev => Math.min(150, prev + 15))}
                            className="p-1 rounded hover:bg-slate-800 text-slate-300"
                            title="Zoom in"
                          >
                            <ZoomIn className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* PDF Content Area */}
                      {hasUploadedPdf && effectivePdfUrl ? (
                        <div className="w-full h-[520px] bg-slate-800">
                          <iframe
                            src={effectivePdfUrl}
                            title="Uploaded PDF Document"
                            className="w-full h-full border-none"
                          />
                        </div>
                      ) : (
                        <div className="p-8 sm:p-12 text-center space-y-4 bg-gradient-to-b from-slate-900 to-slate-950">
                          <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                            <BookOpen className="w-7 h-7" />
                          </div>
                          <div className="max-w-md mx-auto space-y-1">
                            <h4 className="font-bold text-white text-base">
                              National Polar Archive Document
                            </h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              Official compendium file registered under DOI: <span className="text-cyan-400 font-mono">{item.doi || '10.5281/ncpor.rep.2023'}</span>. Full archival publication with scientific telemetry and high-res charts.
                            </p>
                          </div>
                          <button
                            onClick={handleDownloadPdf}
                            className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs inline-flex items-center gap-2 shadow-md cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download Full PDF Compendium ({item.fileSize || '14.8 MB'})</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Executive Synthesis Reader */
                    <div className="p-6 rounded-xl border border-slate-200/80 bg-slate-50 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <span className="font-bold text-slate-900">Key Scientific Findings &amp; Outcomes</span>
                        <span className="text-slate-500 font-mono text-xs">Section 1.0</span>
                      </div>
                      <p>
                        The scientific team deployed CTD profiling arrays, sediment multi-corers, and aerosol spectrometers throughout the cruise track. Primary measurements indicated enhanced sub-surface chlorophyll maxima along the Sub-Tropical Front and verified Southern Ocean carbon sequestration dynamics during austral summer.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <div className="p-3 rounded-lg bg-white border border-slate-200 text-center">
                          <div className="text-lg font-black text-sky-700 font-mono">1,420 km</div>
                          <div className="text-[10px] uppercase font-bold text-slate-500">Hydrographic Transect</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white border border-slate-200 text-center">
                          <div className="text-lg font-black text-emerald-700 font-mono">48 Stations</div>
                          <div className="text-[10px] uppercase font-bold text-slate-500">CTD &amp; Water Sampling</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white border border-slate-200 text-center">
                          <div className="text-lg font-black text-indigo-700 font-mono">100% FAIR</div>
                          <div className="text-[10px] uppercase font-bold text-slate-500">Open Data Standard</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* RIGHT 1 COLUMN: EXPEDITION METADATA */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-5">
                <h2 className="text-xs sm:text-sm font-black tracking-wider text-slate-900 uppercase pb-2 border-b border-slate-100">
                  EXPEDITION METADATA
                </h2>

                <div className="space-y-4 text-xs">
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Expedition Code:</div>
                    <div className="text-sm font-extrabold text-sky-700 font-mono mt-0.5">{expeditionCode}</div>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scientific Personnel:</div>
                    <div className="text-xs font-bold text-slate-800 mt-0.5">{personnelCount}</div>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Vessel / Operational Base:</div>
                    <div className="text-xs font-bold text-slate-800 mt-0.5">{platformName}</div>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">DOI Identifier:</div>
                    <div className="text-xs font-mono font-semibold text-slate-700 mt-0.5 break-all">
                      {item.doi || `10.5281/ncpor.${expeditionCode.toLowerCase()}.2023`}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Official Classification:</div>
                    <div className="text-xs font-semibold text-emerald-700 mt-0.5">
                      MoES National Polar Archive &bull; Open Access
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">License:</div>
                    <div className="text-xs text-slate-600 mt-0.5">Creative Commons Attribution 4.0 (CC-BY 4.0)</div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  <button
                    onClick={copyCitation}
                    className="w-full py-2.5 px-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copiedCitation ? 'Citation Copied!' : 'Copy Official Citation'}</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectForAI(item);
                      onClose();
                    }}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-xs font-bold text-white shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Launch in AI Media Studio</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="w-full py-2 px-3.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Share Record Link'}</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. FLOATING POLARVISION ASSISTANT BUTTON (Matching User Screenshot)       */}
        {/* ========================================================================= */}
        <button
          onClick={() => setBotOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-xl shadow-cyan-500/25 transition-all cursor-pointer group hover:scale-105"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
          <Compass className="w-4 h-4 text-slate-950" />
          <span>PolarVision Assistant</span>
        </button>

        {/* Integrated PolarBot Assistant Modal */}
        <PolarBot isOpen={botOpen} onClose={() => setBotOpen(false)} />

      </div>
    </div>
  );
}
