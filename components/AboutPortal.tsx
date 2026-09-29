'use client';

import React from 'react';
import { 
  Home, 
  ChevronRight, 
  Target, 
  Eye, 
  Database, 
  MapPin, 
  Sparkles, 
  GraduationCap, 
  Image as ImageIcon, 
  Users, 
  MessageSquare, 
  Compass, 
  ShieldCheck, 
  ArrowUpRight
} from 'lucide-react';

interface AboutPortalProps {
  onBackHome: () => void;
  onNavigateToRepository: (category?: string) => void;
  onNavigateToExpeditions: (region?: string) => void;
  onNavigateToAIStudio: () => void;
  onNavigateToStudents: () => void;
  onNavigateToMedia: () => void;
  onOpenContribute: () => void;
  onOpenBot: () => void;
}

export default function AboutPortal({
  onBackHome,
  onNavigateToRepository,
  onNavigateToExpeditions,
  onNavigateToAIStudio,
  onNavigateToStudents,
  onNavigateToMedia,
  onOpenContribute,
  onOpenBot
}: AboutPortalProps) {
  return (
    <div className="min-h-screen bg-[#f1f6fb] dark:bg-[#070e1b] text-slate-800 dark:text-slate-100 transition-colors duration-200 pb-16">
      
      {/* ========================================================================= */}
      {/* 1. HERO BANNER: Panoramic Polar Landscape with Emperor Penguins */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#0d223f] via-[#102d54] to-[#1e426f] text-white">
        
        {/* Background Panoramic Graphic / Ultra-HD Polar Image */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=2400&q=95"
            alt="Emperor Penguins in Antarctica with Polar Mountains"
            className="absolute right-0 top-0 w-full md:w-3/5 lg:w-1/2 h-full object-cover object-center brightness-105 contrast-105"
          />
          {/* Subtle gradient overlay to blend seamlessly with left text */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07152b] via-[#091b35]/95 md:via-[#091b35]/80 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07152b] via-transparent to-black/10" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 sm:pb-16 z-10">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-sky-200/90 font-medium mb-5">
            <button 
              onClick={onBackHome} 
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
            >
              <Home className="w-3.5 h-3.5 text-sky-300 group-hover:scale-110 transition-transform" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-sky-400/60" />
            <span className="text-white font-bold tracking-wide">About</span>
          </nav>

          {/* Header Content */}
          <div className="max-w-2xl space-y-3.5">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-400/30 text-sky-300 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase backdrop-blur-sm shadow-xs">
              <Sparkles className="w-3 h-3 text-cyan-300" />
              <span>Ministry of Earth Sciences (MoES) • NCPOR Official Portal</span>
            </div>

            <div className="flex items-center gap-3.5 pt-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 shadow-xl ring-2 ring-cyan-400/50 bg-[#06152b] p-0.5">
                <img src="/himvigyan-crest.png" alt="HimVigyan Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                  About HimVigyan
                </h1>
                <h2 className="text-sm sm:text-base font-bold text-cyan-300 tracking-wide drop-shadow-sm mt-0.5">
                  Connecting Polar Science, Knowledge and People
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal pt-1">
              <p>
                <strong className="text-white font-semibold italic">HimVigyan</strong> is an integrated digital platform designed to make India&apos;s polar scientific research, expedition history, scientific datasets, publications and educational resources more accessible to researchers, students and the public.
              </p>
              <p className="text-slate-300">
                Developed around the vision of the <strong className="text-white font-semibold">Ministry of Earth Sciences (MoES)</strong> and the <strong className="text-white font-semibold">National Centre for Polar and Ocean Research (NCPOR)</strong>, the portal brings together scientific knowledge and digital innovation to support research discovery, science communication and public awareness of India&apos;s polar missions.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT BODY: Grid Layout Matching Mockup */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20 space-y-6">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ===================================================================== */}
          {/* LEFT COLUMN: Mission & Vision + What We Offer (8 Cols on LG)           */}
          {/* ===================================================================== */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* ROW 1: Our Mission & Our Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: Our Mission */}
              <div className="rounded-2xl p-5 sm:p-6 bg-white dark:bg-[#0c182a] border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)] flex flex-col justify-between hover:border-sky-300 dark:hover:border-sky-500/50 transition-all group">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                      <Target className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Our Mission
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    To bridge the gap between scientific exploration and public understanding by creating a centralized platform for discovering, sharing and communicating polar science. HimVigyan aims to transform complex scientific information into accessible knowledge through digital repositories, interactive learning tools and AI-assisted science communication.
                  </p>
                </div>
              </div>

              {/* Card 2: Our Vision */}
              <div className="rounded-2xl p-5 sm:p-6 bg-white dark:bg-[#0c182a] border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)] flex flex-col justify-between hover:border-purple-300 dark:hover:border-purple-500/50 transition-all group">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                      <Eye className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Our Vision
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    To build an accessible, engaging and knowledge-driven digital gateway to India&apos;s polar research, fostering scientific curiosity, supporting education and strengthening public awareness of the Arctic, Antarctica, the Himalayas and the Southern Ocean.
                  </p>
                </div>
              </div>

            </div>

            {/* ROW 2: What We Offer Header & 7 Feature Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  What We Offer
                </h3>
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Interactive Platform Modules
                </span>
              </div>

              {/* Grid of 7 Cards (4 on top row, 3 on second row on wide screens) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                
                {/* 1. Scientific Knowledge Repository */}
                <div 
                  onClick={() => onNavigateToRepository()}
                  className="rounded-2xl p-4 bg-white dark:bg-[#0c182a] border border-slate-200/90 dark:border-slate-800 hover:border-sky-400 dark:hover:border-sky-500 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between min-h-[175px]"
                >
                  <div className="space-y-2.5">
                    <div className="w-8 h-8 rounded-full bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                      <Database className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors flex items-center justify-between">
                      <span>Scientific Knowledge Repository</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-sky-500" />
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-4 font-normal">
                      Explore expedition reports, research publications, scientific datasets and educational resources related to India&apos;s polar research, organized for convenient access and discovery.
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1">
                    <span>Open Archive</span>
                    <span>→</span>
                  </div>
                </div>

                {/* 2. Polar Expeditions and Research Stations */}
                <div 
                  onClick={() => onNavigateToExpeditions()}
                  className="rounded-2xl p-4 bg-white dark:bg-[#0c182a] border border-slate-200/90 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between min-h-[175px]"
                >
                  <div className="space-y-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <MapPin className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                      <span>Polar Expeditions and Stations</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500" />
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-4 font-normal">
                      Discover India&apos;s scientific presence across Antarctica, the Arctic and the Himalayas, including research stations, oceanographic observatories, expeditions and associated scientific activities.
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span>Explore Bases</span>
                    <span>→</span>
                  </div>
                </div>

                {/* 3. AI-Powered Science Communication */}
                <div 
                  onClick={onNavigateToAIStudio}
                  className="rounded-2xl p-4 bg-white dark:bg-[#0c182a] border border-slate-200/90 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-500 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between min-h-[175px]"
                >
                  <div className="space-y-2.5">
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex items-center justify-between">
                      <span>AI-Powered Science Communication</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-purple-500" />
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-4 font-normal">
                      Transform complex scientific research into accessible summaries, educational explanations, social media content, professional articles and bilingual Hindi outreach materials, with appropriate human review.
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                    <span>Launch AI Studio</span>
                    <span>→</span>
                  </div>
                </div>

                {/* 4. Smart Education and Citizen Science */}
                <div 
                  onClick={onNavigateToStudents}
                  className="rounded-2xl p-4 bg-white dark:bg-[#0c182a] border border-slate-200/90 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between min-h-[175px]"
                >
                  <div className="space-y-2.5">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex items-center justify-between">
                      <span>Smart Education &amp; Citizen Science</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-4 font-normal">
                      Encourage students and curious learners to explore polar environments through interactive quizzes, educational resources, glacier-melt simulations and learning activities.
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <span>Quiz &amp; Badge</span>
                    <span>→</span>
                  </div>
                </div>

              </div>

              {/* Second Row of 3 Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                
                {/* 5. Multimedia Discovery */}
                <div 
                  onClick={onNavigateToMedia}
                  className="rounded-2xl p-4 bg-white dark:bg-[#0c182a] border border-slate-200/90 dark:border-slate-800 hover:border-rose-400 dark:hover:border-rose-500 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between min-h-[170px]"
                >
                  <div className="space-y-2.5">
                    <div className="w-8 h-8 rounded-full bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                      <ImageIcon className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors flex items-center justify-between">
                      <span>Multimedia Discovery</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-rose-500" />
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-4 font-normal">
                      Experience polar research through photographs, documentaries, videos and visual stories that highlight scientific expeditions, fieldwork, polar environments and research infrastructure.
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <span>View 4K Media</span>
                    <span>→</span>
                  </div>
                </div>

                {/* 6. Scientist Contributions and Collaboration */}
                <div 
                  onClick={onOpenContribute}
                  className="rounded-2xl p-4 bg-white dark:bg-[#0c182a] border border-slate-200/90 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between min-h-[170px]"
                >
                  <div className="space-y-2.5">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                      <Users className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                      <span>Scientist Contributions &amp; Collaboration</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-500" />
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-4 font-normal">
                      Provide a digital space for authorized scientific contributors to submit research materials, share knowledge and support the growth of a structured polar science repository.
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                    <span>Submit Research</span>
                    <span>→</span>
                  </div>
                </div>

                {/* 7. Ask HimVigyan AI */}
                <div 
                  onClick={onOpenBot}
                  className="rounded-2xl p-4 bg-white dark:bg-[#0c182a] border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between min-h-[170px]"
                >
                  <div className="space-y-2.5">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center justify-between">
                      <span>Ask HimVigyan AI</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-4 font-normal">
                      Explore polar science through an interactive AI assistant designed to help users find information, understand scientific concepts and navigate available knowledge resources.
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                    <span>Ask AI Question</span>
                    <span>→</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: Polar Ship Photo Card + Focus Areas (4 Cols on LG)     */}
          {/* ===================================================================== */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* 1. SCENIC POLAR SHIP PHOTO CARD: Red Icebreaker in Sea Ice */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 dark:border-slate-800 group aspect-[16/10] bg-slate-900">
              {/* Ultra-Crisp 4K Photo */}
              <img 
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=95"
                alt="Indian Polar Scientific Expedition Vessel in Antarctic pack ice"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 contrast-105"
              />
              
              {/* Subtle top-left gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

              {/* Elegant Text Overlay matching Screenshot */}
              <div className="absolute top-4 left-4 right-4 pointer-events-none">
                <p className="font-serif italic text-white text-base sm:text-lg font-semibold leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  Science today<br />
                  for a sustainable<br />
                  tomorrow
                </p>
              </div>

              {/* Bottom Subtle Badge */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-mono text-cyan-200 border border-white/20 shadow-md">
                ISEA Maritime Logistics
              </div>
            </div>

            {/* 2. OUR FOCUS AREAS CARD */}
            <div className="rounded-2xl p-5 sm:p-6 bg-white dark:bg-[#0c182a] border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)] space-y-4">
              
              {/* Header with Compass Icon */}
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
                <div className="w-7 h-7 rounded-lg bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4 stroke-[2.2]" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Our Focus Areas
                </h3>
              </div>

              {/* 4 Circular Thumbnail Focus Items */}
              <div className="space-y-4 text-xs">
                
                {/* 1. Antarctica */}
                <div 
                  onClick={() => onNavigateToExpeditions('Antarctica')}
                  className="flex items-start gap-3 p-1.5 -mx-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-sky-400/50 shadow-md mt-0.5 group-hover:scale-105 transition-transform">
                    <img 
                      src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=400&q=95" 
                      alt="Antarctica Ice Sheet & Icebergs"
                      className="w-full h-full object-cover contrast-105"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-extrabold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors flex items-center gap-1.5">
                      <span>Antarctica</span>
                      <span className="text-[10px] text-sky-500 font-semibold">(Maitri &amp; Bharati)</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                      Scientific expeditions, polar ecosystems, ice sheets, atmospheric research and climate observations.
                    </p>
                  </div>
                </div>

                {/* 2. Arctic */}
                <div 
                  onClick={() => onNavigateToExpeditions('Arctic')}
                  className="flex items-start gap-3 p-1.5 -mx-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-emerald-400/50 shadow-md mt-0.5 group-hover:scale-105 transition-transform">
                    <img 
                      src="https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=400&q=95" 
                      alt="Arctic Ny-Ålesund IndARC"
                      className="w-full h-full object-cover contrast-105"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                      <span>Arctic</span>
                      <span className="text-[10px] text-emerald-500 font-semibold">(Himadri &amp; IndARC)</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                      High-latitude research, environmental monitoring, oceanography and India&apos;s Arctic scientific activities.
                    </p>
                  </div>
                </div>

                {/* 3. Himalayas */}
                <div 
                  onClick={() => onNavigateToExpeditions('Himalayas')}
                  className="flex items-start gap-3 p-1.5 -mx-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-purple-400/50 shadow-md mt-0.5 group-hover:scale-105 transition-transform">
                    <img 
                      src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=95" 
                      alt="Himalayan Glaciers & Himansh Station"
                      className="w-full h-full object-cover contrast-105"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-extrabold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex items-center gap-1.5">
                      <span>Himalayas</span>
                      <span className="text-[10px] text-purple-500 font-semibold">(Himansh Station)</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                      Glaciers, snow cover, high-altitude environments and cryospheric research.
                    </p>
                  </div>
                </div>

                {/* 4. Southern Ocean */}
                <div 
                  onClick={() => onNavigateToExpeditions('Southern Ocean')}
                  className="flex items-start gap-3 p-1.5 -mx-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-cyan-400/50 shadow-md mt-0.5 group-hover:scale-105 transition-transform">
                    <img 
                      src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=95" 
                      alt="Southern Ocean Pelagic Ecosystems"
                      className="w-full h-full object-cover contrast-105"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-extrabold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                      <span>Southern Ocean</span>
                      <span className="text-[10px] text-cyan-500 font-semibold">(Oceanography)</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                      Oceanographic observations, marine environments and their connections with the global climate system.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. BOTTOM BANNER: Our Commitment & Explore. Learn. Discover.              */}
        {/* ========================================================================= */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0c2340] via-[#0f2c4f] to-[#123661] border border-cyan-500/30 text-white shadow-xl">
          
          {/* Background Mountain Photo on Far Right Edge */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-2/5 md:w-1/3 bg-cover bg-right opacity-80 pointer-events-none select-none mix-blend-screen"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=95')`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }}
          />
          {/* Gradient to smooth out the transition */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c2340] via-[#0f2c4f]/95 to-transparent pointer-events-none" />

          <div className="relative z-10 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left 7 cols: Our Commitment */}
            <div className="md:col-span-7 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 border border-sky-400/30 shadow-xs">
                  <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                </div>
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Our Commitment
                </h3>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed font-normal max-w-2xl">
                HimVigyan is built around the principles of <strong className="text-white font-semibold italic">scientific integrity, accessibility, education, collaboration and responsible dissemination</strong>. The platform emphasizes clear scientific communication, appropriate source attribution, transparent data provenance and respect for dataset licensing and access conditions.
              </p>
            </div>

            {/* Right 5 cols: Explore. Learn. Discover. */}
            <div className="md:col-span-5 space-y-1.5 md:pl-6 md:border-l md:border-sky-500/30">
              <h4 className="font-serif italic text-lg sm:text-2xl text-cyan-200 font-semibold tracking-wide drop-shadow-sm">
                Explore. Learn. Discover.
              </h4>
              <p className="text-xs sm:text-xs text-slate-300 leading-relaxed font-normal max-w-sm">
                From India&apos;s polar expeditions to the future of scientific discovery, HimVigyan brings polar knowledge closer to everyone.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
