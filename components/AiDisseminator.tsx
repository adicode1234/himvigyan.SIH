'use client';

import React, { useState, useEffect } from 'react';
import { REPOSITORY_DATA, RepositoryItem } from '@/data/polarData';
import { UserContribution, contributionToRepositoryItem } from '@/data/userContributions';
import { 
  Sparkles, 
  FileText, 
  Languages, 
  Copy, 
  Check, 
  RefreshCw, 
  Sliders, 
  ExternalLink,
  Share2,
  Send
} from 'lucide-react';

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.05 1.53 1.53 0 0 0 0 3.05m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
  </svg>
);

interface AiDisseminatorProps {
  initialSelectedItem?: RepositoryItem | null;
  userContributions?: UserContribution[];
}

export default function AiDisseminator({ initialSelectedItem, userContributions = [] }: AiDisseminatorProps) {
  const allSourceItems = React.useMemo(() => {
    const userItems = (userContributions || []).map(contributionToRepositoryItem);
    return [...userItems, ...REPOSITORY_DATA];
  }, [userContributions]);

  const [selectedItem, setSelectedItem] = useState<RepositoryItem>(initialSelectedItem || allSourceItems[0] || REPOSITORY_DATA[0]);
  const [activeFormat, setActiveFormat] = useState<'twitter' | 'instagram' | 'linkedin' | 'press' | 'hindi'>('twitter');
  const [tone, setTone] = useState<'Youth & Engaging' | 'Official MoES' | 'Academic Summary'>('Youth & Engaging');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (initialSelectedItem) {
      setSelectedItem(initialSelectedItem);
    }
  }, [initialSelectedItem]);

  const handleSimulateRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 700);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentPack = selectedItem.aiDissemination;

  const getCopyableContent = () => {
    switch (activeFormat) {
      case 'twitter':
        return currentPack.twitterThread.join('\n\n---\n\n');
      case 'instagram':
        return `${currentPack.instagramPost.caption}\n\nSLIDES:\n${currentPack.instagramPost.slides.join('\n')}\n\n${currentPack.instagramPost.hashtags.join(' ')}`;
      case 'linkedin':
        return currentPack.linkedInPost;
      case 'press':
        return `${currentPack.pressRelease.headline}\n${currentPack.pressRelease.dateline}\n\n${currentPack.pressRelease.body}\n\n${currentPack.pressRelease.quote}\n\nNotes: ${currentPack.pressRelease.notesToEditors}`;
      case 'hindi':
        return `${currentPack.hindiTranslation.headline}\n\n${currentPack.hindiTranslation.summary}\n\nसोशल मीडिया पोस्ट:\n${currentPack.hindiTranslation.socialSnippet}`;
    }
  };

  return (
    <div className="bg-[#070e1b] min-h-screen text-slate-100 font-sans pb-16">
      
      {/* 1. TOP HERO BANNER (Matching Moments from Polar Frontiers) */}
      <div className="relative w-full overflow-hidden border-b border-slate-800/80 mb-8">
        {/* Background photo of ice mountains & ship */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2000&q=85"
            alt="Polar Frontiers"
            className="w-full h-full object-cover object-center scale-105"
          />
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
              <span>AI MEDIA STUDIO</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              AI Media &amp; <br className="hidden sm:inline" />
              <span className="text-sky-400">Outreach Studio</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Automatically transform dense polar research papers, expedition reports, and datasets into ready-to-publish social threads, Instagram carousels, and PIB press communiqués.
            </p>

            {/* Stats Pills Row */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-3 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold leading-none">Automated</div>
                  <div className="text-[11px] text-slate-400">Content Engine</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <Languages className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold leading-none">Bilingual</div>
                  <div className="text-[11px] text-slate-400">Hindi &amp; English</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold leading-none">5 Platforms</div>
                  <div className="text-[11px] text-slate-400">Direct Publishing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Tone Selector & Control Bar */}
        <div className="bg-[#0c182a] p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-sky-400 font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Problem Statement Feature: Autonomous AI Dissemination</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-sky-400" />
              <span>Target Tone:</span>
            </span>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as any)}
              className="text-xs bg-[#08101d] border border-slate-700 text-sky-300 font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-sky-500 shadow-xs cursor-pointer hover:bg-slate-900 transition-colors"
            >
              <option value="Youth & Engaging">Youth &amp; Engaging (Social)</option>
              <option value="Official MoES">Official MoES / Government</option>
              <option value="Academic Summary">Academic / Peer-Reviewed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Left Column: Source Document Selector */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0c182a] border border-slate-800/80 shadow-md">
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-300 mb-3 flex items-center justify-between">
                <span>1. Choose Source Document</span>
                <span className="text-[10px] text-sky-400 font-bold bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60">
                  NCPOR Archive
                </span>
              </h3>

              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {allSourceItems.map((item) => {
                  const isSelected = selectedItem.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedItem(item);
                        handleSimulateRegenerate();
                      }}
                      className={`w-full text-left p-3.5 rounded-xl transition-all border ${
                        isSelected
                          ? 'bg-sky-950/70 border-sky-400 text-white shadow-md shadow-sky-950 ring-1 ring-sky-400/50'
                          : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            item.type === 'Dataset' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                            item.type === 'Report' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                            item.type === 'Publication' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                            'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          }`}>
                            {item.type}
                          </span>
                          {item.isUserUploaded && (
                            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/25 text-cyan-300 border border-cyan-400/50 animate-pulse">
                              🌟 My Upload
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {item.region}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white line-clamp-2 leading-snug">
                        {item.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats on selected file */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#08101d] border border-slate-800/80 shadow-md text-xs space-y-2.5">
              <div className="text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                Selected Item Summary
              </div>
              <p className="text-slate-300 text-xs leading-relaxed italic line-clamp-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                &quot;{selectedItem.summary}&quot;
              </p>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
                <span className="truncate max-w-[200px]">Lead: <strong className="text-slate-200">{selectedItem.authorsOrLead.split(',')[0]}</strong></span>
                <span className="font-mono text-sky-400 font-bold">{selectedItem.year}</span>
              </div>
            </div>
          </div>

          {/* Right Column: AI Generation & Social Mockup Previews */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Format Tabs Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl bg-[#0c182a] border border-slate-800/80 shadow-md">
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'twitter', label: 'Twitter / X Thread', icon: TwitterIcon, color: 'text-sky-400' },
                  { id: 'instagram', label: 'Instagram Carousel', icon: InstagramIcon, color: 'text-pink-400' },
                  { id: 'linkedin', label: 'LinkedIn Post', icon: LinkedinIcon, color: 'text-blue-400' },
                  { id: 'press', label: 'MoES Press Release', icon: FileText, color: 'text-amber-400' },
                  { id: 'hindi', label: 'हिन्दी (Bilingual)', icon: Languages, color: 'text-emerald-400' },
                ].map((fmt) => {
                  const Icon = fmt.icon;
                  const isActive = activeFormat === fmt.id;
                  return (
                    <button
                      key={fmt.id}
                      onClick={() => setActiveFormat(fmt.id as any)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                        isActive
                          ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30 border-sky-400 font-bold'
                          : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : fmt.color}`} />
                      <span>{fmt.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Actions: Copy and Regenerate */}
              <div className="flex items-center gap-2 pr-1">
                <button
                  onClick={handleSimulateRegenerate}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700 transition-colors shadow-xs"
                  title="Regenerate with AI"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin text-sky-400' : ''}`} />
                </button>

                <button
                  onClick={() => handleCopy(getCopyableContent())}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-sky-500/25'
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-slate-950" />}
                  <span>{copied ? 'Copied Content!' : 'Copy Content'}</span>
                </button>
              </div>
            </div>

            {/* AI Content Preview Container (Dark Polar Container) */}
            <div className="rounded-2xl bg-[#0c182a] border border-slate-800/80 shadow-md p-6 min-h-[480px]">
              {isGenerating ? (
                <div className="h-96 flex flex-col items-center justify-center space-y-3">
                  <Sparkles className="w-8 h-8 text-sky-400 animate-spin" />
                  <p className="text-sm font-bold text-white">
                    Synthesizing polar research for {activeFormat.toUpperCase()}...
                  </p>
                  <p className="text-xs text-slate-400">
                    Applying tone: &quot;{tone}&quot; with FAIR open metadata integration
                  </p>
                </div>
              ) : (
                <div>
                  
                  {/* 1. Twitter / X Thread Preview */}
                  {activeFormat === 'twitter' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                        <span className="font-bold text-sky-400 flex items-center gap-1.5">
                          <TwitterIcon className="w-4 h-4 text-sky-400" />
                          Generated 5-Part X Thread
                        </span>
                        <span className="text-slate-400">Ready to schedule via NCPOR Handle</span>
                      </div>

                      <div className="space-y-3">
                        {currentPack.twitterThread.map((tweet, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-sky-500/40 transition-all flex gap-3 shadow-xs"
                          >
                            {/* Avatar */}
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-xs">
                              N
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-1.5 text-xs">
                                <span className="font-bold text-white">NCPOR India</span>
                                <span className="text-sky-400 font-bold">☑</span>
                                <span className="text-slate-400 text-[11px]">@ncpor_goi &bull; Tweet {idx + 1}/5</span>
                              </div>
                              <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                                {tweet}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2. Instagram Carousel Preview */}
                  {activeFormat === 'instagram' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                        <span className="font-bold text-pink-400 flex items-center gap-1.5">
                          <InstagramIcon className="w-4 h-4 text-pink-400" />
                          Instagram Carousel Script &amp; Visual Prompts
                        </span>
                        <span className="text-slate-400">Recommended 1:1 Square Format</span>
                      </div>

                      {/* Caption Box */}
                      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                        <h4 className="text-xs uppercase font-bold tracking-wider text-pink-400 mb-2">
                          Post Caption
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {currentPack.instagramPost.caption}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {currentPack.instagramPost.hashtags.map((h, i) => (
                            <span key={i} className="text-xs font-semibold text-sky-400">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Slides Visual Blueprint */}
                      <div>
                        <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3">
                          Carousel Slide Deck Breakdown (5 Slides)
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {currentPack.instagramPost.slides.map((slide, i) => (
                            <div
                              key={i}
                              className="p-3.5 rounded-xl bg-[#08101d] border border-slate-800 text-xs flex flex-col justify-between"
                            >
                              <span className="font-bold text-pink-400 mb-2">
                                Slide {i + 1}
                              </span>
                              <p className="text-slate-300 leading-snug">
                                {slide.replace(/Slide \d+: /, '')}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. LinkedIn Update Preview */}
                  {activeFormat === 'linkedin' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                        <span className="font-bold text-blue-400 flex items-center gap-1.5">
                          <LinkedinIcon className="w-4 h-4 text-blue-400" />
                          Professional / Academic Institutional Announcement
                        </span>
                        <span className="text-slate-400">Target: Scientific Community &amp; Policy Leaders</span>
                      </div>

                      <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-700 flex items-center justify-center font-bold text-white text-sm shadow-xs">
                            MoES
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">
                              National Centre for Polar and Ocean Research (NCPOR)
                            </p>
                            <p className="text-xs text-slate-400">
                              Autonomous R&amp;D Institute &bull; Ministry of Earth Sciences &bull; 45,000 followers
                            </p>
                          </div>
                        </div>

                        <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line border-t border-slate-800/80 pt-3">
                          {currentPack.linkedInPost}
                        </div>

                        <div className="p-3 rounded-lg bg-[#08101d] border border-slate-800 flex items-center justify-between text-xs">
                          <div>
                            <p className="font-semibold text-white">{selectedItem.title}</p>
                            <p className="text-slate-400 text-[11px]">ncpor.res.in &bull; Open Access Publication</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. MoES Official Press Release */}
                  {activeFormat === 'press' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                        <span className="font-bold text-amber-400 flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-amber-400" />
                          PIB / MoES Official Press Communiqué
                        </span>
                        <span className="text-slate-400">Government Standard Release Format</span>
                      </div>

                      <div className="p-6 rounded-xl bg-slate-950/80 border border-amber-500/20 space-y-4 text-slate-200">
                        {/* Government Letterhead */}
                        <div className="text-center pb-4 border-b border-slate-800">
                          <p className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
                            GOVERNMENT OF INDIA &bull; PRESS INFORMATION BUREAU
                          </p>
                          <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                            MINISTRY OF EARTH SCIENCES (MoES)
                          </p>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-white text-center">
                          {currentPack.pressRelease.headline}
                        </h3>

                        <p className="text-xs font-mono text-sky-400 font-bold text-center">
                          {currentPack.pressRelease.dateline}
                        </p>

                        <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-300">
                          {currentPack.pressRelease.body}
                        </p>

                        {/* Official Quote */}
                        <blockquote className="p-4 rounded-lg bg-sky-950/40 border-l-4 border-sky-400 text-xs sm:text-sm text-sky-200 italic my-4">
                          {currentPack.pressRelease.quote}
                        </blockquote>

                        <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
                          <strong className="text-slate-300">Notes to Editors: </strong>
                          {currentPack.pressRelease.notesToEditors}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 5. Hindi Bilingual Outreach */}
                  {activeFormat === 'hindi' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                        <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                          <Languages className="w-4 h-4 text-emerald-400" />
                          द्विभाषी प्रसार (Bilingual Hindi Outreach)
                        </span>
                        <span className="text-slate-400">Bhashini &amp; AI Assisted Translation</span>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                          <h4 className="text-xs uppercase font-bold tracking-wider text-emerald-400 mb-1">
                            मुख्य शीर्षक (Hindi Headline)
                          </h4>
                          <p className="text-base font-bold text-white">
                            {currentPack.hindiTranslation.headline}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                          <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
                            विस्तृत सारांश (Executive Summary)
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                            {currentPack.hindiTranslation.summary}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                          <h4 className="text-xs uppercase font-bold tracking-wider text-emerald-300 mb-2">
                            सोशल मीडिया पोस्ट (Social Snippet)
                          </h4>
                          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-medium">
                            {currentPack.hindiTranslation.socialSnippet}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
