'use client';

import React, { useState } from 'react';
import { 
  X, 
  Compass, 
  Calendar, 
  MapPin, 
  User, 
  Anchor, 
  Users, 
  CheckCircle2, 
  FileText, 
  BookOpen, 
  Database, 
  Film, 
  Clock, 
  Download, 
  ArrowRight, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  Layers, 
  Play, 
  Filter
} from 'lucide-react';
import { 
  DetailedExpedition, 
  ResearchProject, 
  RelatedPublication, 
  RelatedDataset, 
  ExpeditionReport, 
  ExpeditionMedia 
} from '@/data/expeditionsData';
import { triggerScientificDownload } from '@/utils/downloadHelper';
import ReportDetailModal from '@/components/ReportDetailModal';
import { RepositoryItem } from '@/data/polarData';

interface ExpeditionDetailModalProps {
  expedition: DetailedExpedition | null;
  initialTab?: 'overview' | 'research' | 'publications' | 'datasets' | 'reports' | 'media' | 'timeline';
  onClose: () => void;
  onLaunchAI?: (title: string, summary: string) => void;
}

export default function ExpeditionDetailModal({
  expedition,
  initialTab = 'overview',
  onClose,
  onLaunchAI
}: ExpeditionDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'research' | 'publications' | 'datasets' | 'reports' | 'media' | 'timeline'>(initialTab);
  const [selectedResearchProject, setSelectedResearchProject] = useState<ResearchProject | null>(null);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, expedition?.id]);
  const [mediaFilter, setMediaFilter] = useState<'all' | 'photo' | 'video'>('all');
  const [copiedCitationId, setCopiedCitationId] = useState<string | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);
  const [activeMediaItem, setActiveMediaItem] = useState<ExpeditionMedia | null>(null);
  const [selectedReportItem, setSelectedReportItem] = useState<RepositoryItem | null>(null);

  if (!expedition) return null;

  const handleCopyCitation = (id: string, citationText: string) => {
    navigator.clipboard.writeText(citationText);
    setCopiedCitationId(id);
    setTimeout(() => setCopiedCitationId(null), 2500);
  };

  const handleDownloadFile = (id: string, filename: string, type: string = 'Dataset') => {
    setDownloadSuccessId(id);
    triggerScientificDownload({
      id,
      title: filename,
      expedition: expedition.title,
      station: expedition.vesselOrBase,
      authorsOrLead: expedition.lead,
      type: type,
      summary: `Scientific dataset and research asset for ${expedition.title} archived at NCPOR.`
    });
    setTimeout(() => setDownloadSuccessId(null), 2500);
  };

  const openReportModal = (rep: ExpeditionReport) => {
    setSelectedReportItem({
      id: rep.id,
      title: rep.title,
      type: 'Report',
      region: expedition.region,
      year: parseInt(expedition.dates?.split(' ')[0]) || 2024,
      date: expedition.duration || expedition.dates || '2024',
      authorsOrLead: rep.author,
      doi: rep.docCode,
      fileSize: rep.fileSize,
      format: 'PDF',
      downloads: 1420,
      tags: [expedition.code, expedition.region, rep.type],
      summary: `Official ${rep.type} document for expedition ${expedition.code} (${expedition.title}).`,
      fullAbstract: `Official scientific document ${rep.docCode} prepared by ${rep.author}. Approved by MoES and archived at NCPOR for ${expedition.title}. Detailed coverage of expedition observations, scientific telemetry, environmental compliance, and methodology.`,
      station: expedition.vesselOrBase,
      bannerImage: expedition.imageUrl,
      aiDissemination: {
        twitterThread: [`📄 Official expedition report released: ${rep.title}`],
        instagramPost: {
          caption: `Polar Expedition Report: ${rep.title}`,
          slides: [`Expedition ${expedition.code}`, rep.title, rep.author],
          hashtags: ['#PolarScience', '#NCPOR', '#MoES', '#Antarctica']
        },
        linkedInPost: `Excited to read the official technical publication: ${rep.title}`,
        pressRelease: {
          headline: rep.title,
          dateline: 'NCPOR Goa',
          body: `Report ${rep.docCode} published for ${expedition.title}.`,
          quote: 'Advancing Indian scientific frontiers across extreme polar domains.',
          notesToEditors: 'Published by NCPOR / MoES.'
        },
        hindiTranslation: {
          headline: rep.title,
          summary: `ध्रुवीय मिशन रिपोर्ट: ${expedition.title}`,
          socialSnippet: `एनसीपीओआर आधिकारिक रिपोर्ट: ${rep.title}`
        }
      }
    });
  };

  // Filtered media inside expedition
  const filteredMedia = expedition.media.filter(m => {
    if (mediaFilter === 'all') return true;
    if (mediaFilter === 'photo') return m.type === 'Photo';
    if (mediaFilter === 'video') return m.type === 'Video';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 flex flex-col max-h-[94vh]">
        
        {/* ========================================================================= */}
        {/* TOP MODAL HEADER: Title, Code, Region & Close Button */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white border-b border-slate-800 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-10"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2 pr-10">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              expedition.region === 'Antarctica' ? 'bg-sky-600 text-white' :
              expedition.region === 'Arctic' ? 'bg-cyan-600 text-white' :
              expedition.region === 'Southern Ocean' ? 'bg-blue-600 text-white' : 'bg-indigo-600 text-white'
            }`}>
              {expedition.region}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/15 text-slate-200 border border-white/20">
              {expedition.status}
            </span>
            <span className="text-xs font-mono font-bold text-sky-400">
              MISSION CODE: {expedition.code}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
            {expedition.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center gap-3">
            <span>Leader: <strong className="text-white">{expedition.lead}</strong></span>
            <span>•</span>
            <span>{expedition.duration}</span>
          </p>
        </div>

        {/* ========================================================================= */}
        {/* TAB NAVIGATION BAR (7 Dedicated Relational Sections) */}
        {/* ========================================================================= */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-3 sm:px-6 py-2 overflow-x-auto shrink-0 flex items-center gap-1.5 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-white text-sky-700 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-sky-600" />
            <span>1. Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('research')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'research'
                ? 'bg-white text-sky-700 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>2. Research Conducted</span>
            <span className="px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-800 text-[10px]">
              {expedition.researchProjects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('publications')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'publications'
                ? 'bg-white text-sky-700 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>3. Publications</span>
            <span className="px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 text-[10px]">
              {expedition.publications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('datasets')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'datasets'
                ? 'bg-white text-sky-700 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span>4. Datasets</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
              {expedition.datasets.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'reports'
                ? 'bg-white text-sky-700 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-600" />
            <span>5. Reports</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[10px]">
              {expedition.reports.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'media'
                ? 'bg-white text-sky-700 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Film className="w-3.5 h-3.5 text-purple-600" />
            <span>6. Media</span>
            <span className="px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-800 text-[10px]">
              {expedition.media.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'timeline'
                ? 'bg-white text-sky-700 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-cyan-600" />
            <span>7. Timeline</span>
            <span className="px-1.5 py-0.2 rounded-full bg-cyan-100 text-cyan-800 text-[10px]">
              {expedition.timeline.length}
            </span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* MODAL MAIN CONTENT SCROLLABLE BODY */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-[#fbfcfd]">
          
          {/* ------------------------------------------------------------- */}
          {/* TAB 1: OVERVIEW */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Hero Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/8] w-full bg-slate-900 shadow-md">
                <img
                  src={expedition.imageUrl}
                  alt={expedition.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-mono text-sky-300 uppercase tracking-widest block">
                    Deployment Platform
                  </span>
                  <div className="font-bold text-sm sm:text-base mt-0.5 flex items-center gap-2">
                    <Anchor className="w-4 h-4 text-sky-400" />
                    <span>{expedition.vesselOrBase}</span>
                  </div>
                </div>
              </div>

              {/* Description Box */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500">
                  Mission Summary & Scientific Mandate
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {expedition.description}
                </p>
              </div>

              {/* Logistics & Leadership Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Expedition Leader</span>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-sky-600 shrink-0" />
                    <span className="truncate">{expedition.lead}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 truncate">{expedition.leadDesignation}</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Mission Duration</span>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{expedition.duration}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">{expedition.dates}</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Total Personnel</span>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{expedition.teamSize}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Multi-Agency Contingent</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Operating Base</span>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="truncate">{expedition.region}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 truncate">{expedition.code} Archive</p>
                </div>
              </div>

              {/* Team Composition Breakdown */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 flex items-center gap-2">
                  <Users className="w-4 h-4 text-sky-600" />
                  <span>Team & Inter-Institutional Composition</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {expedition.teamBreakdown.map((memberGroup, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0" />
                      <span className="text-slate-700">{memberGroup}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Scientific Objectives */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Primary Scientific & Logistics Objectives</span>
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {expedition.objectives.map((obj, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Relational Quick Jumper Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                <button
                  onClick={() => setActiveTab('research')}
                  className="p-3 rounded-xl bg-indigo-50/80 border border-indigo-200 text-indigo-900 hover:bg-indigo-100 transition-colors text-center"
                >
                  <div className="text-lg font-bold">{expedition.researchProjects.length}</div>
                  <div className="text-[10px] font-semibold uppercase">Research Studies →</div>
                </button>

                <button
                  onClick={() => setActiveTab('publications')}
                  className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-900 hover:bg-blue-100 transition-colors text-center"
                >
                  <div className="text-lg font-bold">{expedition.publications.length}</div>
                  <div className="text-[10px] font-semibold uppercase">Publications →</div>
                </button>

                <button
                  onClick={() => setActiveTab('datasets')}
                  className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 hover:bg-emerald-100 transition-colors text-center"
                >
                  <div className="text-lg font-bold">{expedition.datasets.length}</div>
                  <div className="text-[10px] font-semibold uppercase">Datasets →</div>
                </button>

                <button
                  onClick={() => setActiveTab('reports')}
                  className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 hover:bg-amber-100 transition-colors text-center"
                >
                  <div className="text-lg font-bold">{expedition.reports.length}</div>
                  <div className="text-[10px] font-semibold uppercase">Reports →</div>
                </button>

                <button
                  onClick={() => setActiveTab('media')}
                  className="p-3 rounded-xl bg-purple-50/80 border border-purple-200 text-purple-900 hover:bg-purple-100 transition-colors text-center col-span-2 sm:col-span-1"
                >
                  <div className="text-lg font-bold">{expedition.media.length}</div>
                  <div className="text-[10px] font-semibold uppercase">Media Assets →</div>
                </button>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 2: RESEARCH CONDUCTED */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'research' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Scientific Research Projects Conducted
                  </h3>
                  <p className="text-xs text-slate-500">
                    Studies conducted in the field during {expedition.code} ({expedition.researchProjects.length} Research Programs)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {expedition.researchProjects.map((res) => (
                  <div
                    key={res.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-sky-400 hover:shadow-md transition-all space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {res.domain}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                          {res.status}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        PROGRAM ID: {res.id.toUpperCase()}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 leading-snug">
                      {res.title}
                    </h4>

                    <div className="text-xs text-slate-600 flex flex-wrap items-center gap-3">
                      <span>Principal Investigator: <strong className="text-slate-800">{res.leadScientist}</strong></span>
                      <span>•</span>
                      <span className="text-slate-500">{res.institution}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {res.summary}
                    </p>

                    <div className="text-xs text-slate-700 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Field Methodology:</span>
                      <p className="text-[11px] text-slate-600">{res.methodology}</p>
                    </div>

                    {/* Relational connections to Publications & Datasets */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => setActiveTab('publications')}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold transition-colors flex items-center gap-1.5"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>View Generated Publication</span>
                        </button>

                        <button
                          onClick={() => setActiveTab('datasets')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold transition-colors flex items-center gap-1.5"
                        >
                          <Database className="w-3.5 h-3.5" />
                          <span>View Collected Dataset</span>
                        </button>
                      </div>

                      {onLaunchAI && (
                        <button
                          onClick={() => {
                            onLaunchAI(res.title, res.summary);
                            onClose();
                          }}
                          className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Create Media Pitch</span>
                        </button>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 3: RELATED PUBLICATIONS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'publications' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Peer-Reviewed Scientific Publications
                  </h3>
                  <p className="text-xs text-slate-500">
                    Articles published in international peer-reviewed journals resulting from {expedition.code} data.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {expedition.publications.map((pub) => {
                  const isCopied = copiedCitationId === pub.id;
                  return (
                    <div
                      key={pub.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3 hover:border-blue-400 transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                          {pub.journal}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          Year: {pub.year}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 leading-snug">
                        {pub.title}
                      </h4>

                      <div className="text-xs text-slate-600">
                        <strong className="text-slate-800">Authors:</strong> {pub.authors}
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                        {pub.abstract}
                      </p>

                      {/* Relational connection: Generated from Research Study */}
                      {pub.researchTitle && (
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                          <span>Generated from Research Project:</span>
                          <button
                            onClick={() => setActiveTab('research')}
                            className="font-bold text-indigo-600 hover:underline"
                          >
                            {pub.researchTitle}
                          </button>
                        </div>
                      )}

                      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-sky-600 hover:text-sky-800 flex items-center gap-1 font-semibold"
                        >
                          <span>DOI: {pub.doi}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <button
                          onClick={() => handleCopyCitation(pub.id, pub.citation)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600">Citation Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-400" />
                              <span>Copy Citation</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 4: RELATED DATASETS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'datasets' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Scientific Data Repositories & Sensor Records
                  </h3>
                  <p className="text-xs text-slate-500">
                    Open-access datasets generated during {expedition.code} available under Open Government Data License (OGDL).
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {expedition.datasets.map((ds) => {
                  const isDownloaded = downloadSuccessId === ds.id;
                  return (
                    <div
                      key={ds.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3 hover:border-emerald-400 transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {ds.fileFormat}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            Size: {ds.fileSize}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {ds.downloads} Downloads
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 leading-snug">
                        {ds.title}
                      </h4>

                      {/* Measured Parameters Tags */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Measured Parameters:</span>
                        <div className="flex flex-wrap gap-1">
                          {ds.parameters.map((param, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
                            >
                              {param}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Relational connection: Collected by Research Study */}
                      {ds.researchTitle && (
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                          <span>Collected by Research Project:</span>
                          <button
                            onClick={() => setActiveTab('research')}
                            className="font-bold text-indigo-600 hover:underline"
                          >
                            {ds.researchTitle}
                          </button>
                        </div>
                      )}

                      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <span className="font-mono text-slate-500 text-[11px]">
                          DOI: {ds.doi}
                        </span>

                        <button
                          onClick={() => handleDownloadFile(ds.id, ds.title)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                          {isDownloaded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Downloaded</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5" />
                              <span>Download Open Data</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 5: EXPEDITION REPORTS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'reports' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Official Documentation & Technical Compendiums
                  </h3>
                  <p className="text-xs text-slate-500">
                    Official reports approved by MoES and archived at NCPOR for {expedition.code}.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {expedition.reports.map((rep) => {
                  const isDownloaded = downloadSuccessId === rep.id;
                  return (
                    <div
                      key={rep.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4 hover:border-amber-400 transition-all"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            {rep.type}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {rep.docCode}
                          </span>
                        </div>

                        <h4 
                          onClick={() => openReportModal(rep)}
                          className="text-sm font-bold text-slate-900 leading-snug hover:text-sky-600 cursor-pointer transition-colors"
                        >
                          {rep.title}
                        </h4>

                        <div className="text-xs text-slate-500 space-y-0.5">
                          <p>Author: <strong className="text-slate-700">{rep.author}</strong></p>
                          <p>{rep.pages} Pages • File Size: {rep.fileSize}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => openReportModal(rep)}
                          className="px-3 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-sky-200"
                        >
                          <FileText className="w-3.5 h-3.5 text-sky-600" />
                          <span>Read Report</span>
                        </button>

                        <button
                          onClick={() => handleDownloadFile(rep.id, rep.title, 'Report')}
                          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                          {isDownloaded ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Downloaded</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5" />
                              <span>PDF</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 6: MEDIA GALLERY */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'media' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Expedition Media & Archival Visuals
                  </h3>
                  <p className="text-xs text-slate-500">
                    High-resolution photographs and 4K videos documented during {expedition.code}.
                  </p>
                </div>

                {/* Media Type Filter */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
                  <button
                    onClick={() => setMediaFilter('all')}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                      mediaFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All Media
                  </button>
                  <button
                    onClick={() => setMediaFilter('photo')}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                      mediaFilter === 'photo' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Photos
                  </button>
                  <button
                    onClick={() => setMediaFilter('video')}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                      mediaFilter === 'video' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Videos
                  </button>
                </div>
              </div>

              {/* Media Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredMedia.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setActiveMediaItem(m)}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-purple-400 transition-all cursor-pointer group"
                  >
                    <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                      <img
                        src={m.imageUrl}
                        alt={m.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          m.type === 'Video' ? 'bg-indigo-600' : 'bg-sky-600'
                        }`}>
                          {m.type}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] font-mono">
                          {m.resolution}
                        </span>
                      </div>

                      {m.type === 'Video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-purple-600 transition-all shadow-xl">
                            <Play className="w-5 h-5 fill-white ml-0.5" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-1.5">
                      <h4 className="font-bold text-sm text-slate-900 group-hover:text-purple-600 transition-colors">
                        {m.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {m.caption}
                      </p>
                      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
                        <span>Credit: {m.credit}</span>
                        {m.duration && <span>Duration: {m.duration}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 7: TIMELINE / MISSION ACTIVITIES */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'timeline' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="pb-2 border-b border-slate-200">
                <h3 className="text-base font-bold text-slate-900">
                  Mission Chronology & Milestone Activities
                </h3>
                <p className="text-xs text-slate-500">
                  Chronological timeline of deployments, port calls, traverse stages, and recoveries for {expedition.code}.
                </p>
              </div>

              <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {expedition.timeline.map((event, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline Node Icon */}
                    <div className="absolute -left-6 sm:-left-8 top-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white border-2 border-sky-600 shadow-sm group-hover:scale-125 transition-transform flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5 group-hover:border-sky-300 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold text-sky-600 font-mono">
                          {event.date}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                          {event.location}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900">
                        {event.title}
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* MODAL FOOTER: AI Studio Action & Compendium Download */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 hidden sm:block">
            Archived by <strong>NCPOR Polar Science Repository</strong> • MoES Government of India
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            {onLaunchAI && (
              <button
                onClick={() => {
                  onLaunchAI(expedition.title, expedition.description);
                  onClose();
                }}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Launch in AI Media Studio</span>
              </button>
            )}

            <button
              onClick={() => handleDownloadFile('compendium-' + expedition.id, expedition.title)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Compendium (PDF)</span>
            </button>
          </div>
        </div>

      </div>

      {/* Embedded Cinema Video Lightbox if video clicked */}
      {activeMediaItem && activeMediaItem.type === 'Video' && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
            <button
              onClick={() => setActiveMediaItem(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black z-20"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full aspect-video bg-black">
              <video
                src={activeMediaItem.videoUrl || 'https://pixabay.com/videos/download/x-327101_medium.mp4'}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 bg-slate-900 text-white">
              <h4 className="font-bold text-base">{activeMediaItem.title}</h4>
              <p className="text-xs text-slate-300 mt-1">{activeMediaItem.caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Report Detail Modal matching scenic hero view */}
      {selectedReportItem && (
        <ReportDetailModal
          item={selectedReportItem}
          onClose={() => setSelectedReportItem(null)}
          onSelectForAI={(item) => {
            if (onLaunchAI) onLaunchAI(item.title, item.summary);
            setSelectedReportItem(null);
          }}
        />
      )}

    </div>
  );
}
