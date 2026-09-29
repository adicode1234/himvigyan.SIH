'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight,
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Database, 
  Search, 
  Filter, 
  FileText, 
  BookOpen, 
  Film, 
  Image as ImageIcon,
  Compass, 
  User, 
  Shield, 
  Layers, 
  Lock, 
  ExternalLink,
  Cpu,
  RefreshCw,
  Send,
  Eye,
  Check
} from 'lucide-react';

export default function WorkflowPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'public' | 'contributor' | 'moderation' | 'tech'>('all');

  return (
    <div className="min-h-screen bg-[#060d19] text-slate-100 antialiased selection:bg-cyan-500 selection:text-white p-3 sm:p-6 lg:p-8 font-sans">
      
      {/* Outer Presentation Canvas (16:9 Ratio Friendly) */}
      <div className="max-w-[1560px] mx-auto space-y-6">

        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-cyan-500/20 text-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-cyan-300 bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-700/50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to HimVigyan Portal</span>
          </Link>

          {/* Quick Filter Tabs for Presentation Focus */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${activeTab === 'all' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              Full Master Workflow
            </button>
            <button
              onClick={() => setActiveTab('public')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${activeTab === 'public' ? 'bg-sky-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              Zone 1: Public Discovery
            </button>
            <button
              onClick={() => setActiveTab('contributor')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${activeTab === 'contributor' ? 'bg-blue-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              Zone 2: Researcher
            </button>
            <button
              onClick={() => setActiveTab('moderation')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${activeTab === 'moderation' ? 'bg-purple-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              Zone 3: Moderation & Admin
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${activeTab === 'tech' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              Zone 4: Tech & Storage
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SIH 2026 Presentation Slide (16:9)</span>
          </div>
        </div>

        {/* HEADER: Title & Subtitle */}
        <header className="text-center relative py-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-[11px] font-semibold tracking-wider uppercase mb-2">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ministry of Earth Sciences (MoES) • National Centre for Polar and Ocean Research (NCPOR)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            HimVigyan — <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">End-to-End Website Workflow</span>
          </h1>

          <p className="text-xs sm:text-sm font-semibold tracking-wider text-cyan-400 uppercase mt-1.5 font-mono">
            Explore → Contribute → AI Assist → Review → Approve → Publish → Discover
          </p>
        </header>

        {/* CENTRAL PLATFORM ANCHOR BOX */}
        <div className="relative rounded-2xl bg-gradient-to-r from-[#0a182d] via-[#0e274a] to-[#0a182d] border-2 border-cyan-400/50 p-4 shadow-xl text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2.5">
            <span className="text-2xl">🌐</span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-wide">HimVigyan</h2>
              <p className="text-xs text-cyan-300 font-semibold">Centralized Polar Science Knowledge Portal</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-300 mt-1 max-w-xl mx-auto">
            Connects public discovery, authorized scientific contributors, AI assistance microservices, and institutional review boards.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* FOUR VISUAL ZONES CONTAINER */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* ======================================================= */}
          {/* ZONE 1: 🌐 PUBLIC USER — DISCOVER KNOWLEDGE (Left 4 cols) */}
          {/* ======================================================= */}
          <div className={`lg:col-span-4 rounded-2xl bg-[#091527] border border-sky-500/30 p-5 shadow-lg flex flex-col justify-between space-y-4 ${activeTab !== 'all' && activeTab !== 'public' ? 'opacity-35' : ''}`}>
            
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-sky-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-sky-400">ZONE 1</span>
                    <h3 className="font-bold text-sm text-white leading-tight">PUBLIC USER — DISCOVER</h3>
                  </div>
                </div>
                <span className="text-xs text-sky-300 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">Public Flow</span>
              </div>

              {/* Step 1: Public Entry */}
              <div className="mt-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-center">
                <p className="text-xs font-bold text-white">PUBLIC USER → HOME PAGE</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Zero Login Required for Open Access Exploration</p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center text-sky-400 text-xs font-bold my-1.5">↓ Choose / Click Section</div>

              {/* Six Clickable Cards */}
              <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-semibold">
                <div className="p-2 rounded-lg bg-slate-950 border border-sky-500/30 text-sky-200">🔬 RESEARCH</div>
                <div className="p-2 rounded-lg bg-slate-950 border border-sky-500/30 text-sky-200">📚 PUBLICATIONS</div>
                <div className="p-2 rounded-lg bg-slate-950 border border-sky-500/30 text-sky-200">📄 REPORTS</div>
                <div className="p-2 rounded-lg bg-slate-950 border border-sky-500/30 text-sky-200">🗄 DATASETS</div>
                <div className="p-2 rounded-lg bg-slate-950 border border-sky-500/30 text-sky-200">🧊 EXPEDITIONS</div>
                <div className="p-2 rounded-lg bg-slate-950 border border-sky-500/30 text-sky-200">📸 MEDIA</div>
              </div>

              {/* Global Search */}
              <div className="mt-2 p-2 rounded-lg bg-[#07111e] border border-slate-700 flex items-center justify-between text-[11px] text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-sky-400" />
                  <strong>GLOBAL SEARCH</strong>
                </span>
                <span className="text-[10px] font-mono text-slate-400">&quot;Antarctica climate&quot; • &quot;Ice core&quot;</span>
              </div>

              {/* Arrow */}
              <div className="flex justify-center text-sky-400 text-xs font-bold my-1.5">↓ User Clicks Any Section</div>

              {/* Section List & Filters */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>SECTION LIST PAGE</span>
                  <span className="text-[10px] text-sky-400 font-mono">SEARCH / FILTER</span>
                </div>
                <div className="flex flex-wrap gap-1 text-[9px] text-slate-300">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">• Year</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">• Category</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">• Expedition</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">• Research Area</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">• Author</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center text-sky-400 text-xs font-bold my-1.5">↓ Click Content Card → View Details</div>

              {/* Content Detail Page */}
              <div className="p-3 rounded-xl bg-gradient-to-b from-sky-950/60 to-slate-900 border border-sky-500/40 space-y-1.5">
                <p className="text-xs font-extrabold text-sky-300 uppercase tracking-wide">
                  CONTENT DETAIL PAGE (BY TYPE)
                </p>
                <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-200">
                  <div>• Research → <strong className="text-white">Read Article</strong></div>
                  <div>• Publication → <strong className="text-white">View PDF</strong></div>
                  <div>• Report → <strong className="text-white">Download PDF</strong></div>
                  <div>• Dataset → <strong className="text-white">Metadata / CSV</strong></div>
                  <div>• Expedition → <strong className="text-white">Station 360°</strong></div>
                  <div>• Media → <strong className="text-white">Watch 4K Video</strong></div>
                </div>
              </div>
            </div>

            {/* Related Content Matrix */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">
                ↔ RELATED CONTENT GRAPH (FAIR LINKED)
              </span>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Research ↔ Publication ↔ Report ↔ Dataset ↔ Expedition ↔ Media
              </p>
            </div>

          </div>

          {/* ======================================================= */}
          {/* ZONE 2: 👨‍🔬 RESEARCHER — CREATE KNOWLEDGE (Mid-Left 4 cols) */}
          {/* ======================================================= */}
          <div className={`lg:col-span-4 rounded-2xl bg-[#091527] border border-blue-500/30 p-5 shadow-lg flex flex-col justify-between space-y-4 ${activeTab !== 'all' && activeTab !== 'contributor' ? 'opacity-35' : ''}`}>
            
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-blue-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-blue-400">ZONE 2</span>
                    <h3 className="font-bold text-sm text-white leading-tight">RESEARCHER / CONTRIBUTOR</h3>
                  </div>
                </div>
                <span className="text-xs text-blue-300 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">Scientist Flow</span>
              </div>

              {/* Step 1: Login */}
              <div className="mt-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-center">
                <p className="text-xs font-bold text-white">LOGIN / REGISTER</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Institutional Scientist / Contributor Portal</p>
              </div>

              <div className="flex justify-center text-blue-400 text-xs font-bold my-1">↓</div>

              {/* Contributor Dashboard */}
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80">
                <p className="text-xs font-bold text-white mb-1.5 flex items-center justify-between">
                  <span>CONTRIBUTOR DASHBOARD</span>
                  <span className="text-[10px] text-blue-400">5 Metrics</span>
                </p>
                <div className="grid grid-cols-5 gap-1 text-[9px] font-mono text-center">
                  <div className="p-1 rounded bg-slate-800 text-slate-200">Total</div>
                  <div className="p-1 rounded bg-slate-800 text-slate-200">Drafts</div>
                  <div className="p-1 rounded bg-amber-950 text-amber-300">Pending</div>
                  <div className="p-1 rounded bg-emerald-950 text-emerald-300">Approved</div>
                  <div className="p-1 rounded bg-rose-950 text-rose-300">Rejected</div>
                </div>
              </div>

              <div className="flex justify-center text-blue-400 text-xs font-bold my-1">↓ Click &quot;+ CREATE / UPLOAD CONTENT&quot;</div>

              {/* Content Form */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>CONTENT INPUT FORM</span>
                  <span className="text-[10px] text-slate-400 font-mono">7 Types Supported</span>
                </div>
                <div className="flex flex-wrap gap-1 text-[9px] text-slate-300">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">• Title</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">• Description</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">• Author</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">• Year</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">• Category</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">• Keywords</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">• Expedition</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">• File / URL</span>
                </div>
              </div>

              <div className="flex justify-center text-cyan-400 text-xs font-bold my-1">↓</div>

              {/* HIGHLIGHTED AI ASSISTANCE BOX */}
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-950/80 via-[#0a233f] to-slate-900 border-2 border-cyan-400/80 shadow-md space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>🤖 &quot;GENERATE WITH AI&quot;</span>
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-400 text-slate-950">
                    Gemini / LLM
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-1 text-[10px] text-slate-200">
                  <div>→ <strong>Generate Summary:</strong> Auto-condense dense reports</div>
                  <div>→ <strong>Generate Keywords:</strong> Auto-tag cryogenic terms</div>
                  <div>→ <strong>Suggest Category:</strong> Classify by domain (Glaciology, etc.)</div>
                  <div>→ <strong>Website Description:</strong> Public-accessible summary</div>
                  <div>→ <strong>Generate Social Caption:</strong> X/Twitter, Instagram, LinkedIn</div>
                </div>
              </div>

              <div className="flex justify-center text-blue-400 text-xs font-bold my-1">↓</div>

              {/* Human Verification Step */}
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-center space-y-1">
                <p className="text-xs font-bold text-white">RESEARCHER REVIEWS &amp; EDITS AI OUTPUT</p>
                <div className="flex gap-2 pt-1 text-[10px] font-semibold">
                  <span className="flex-1 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">SAVE DRAFT</span>
                  <span className="flex-1 py-1 rounded bg-blue-600 text-white shadow-sm">SUBMIT FOR REVIEW →</span>
                </div>
              </div>
            </div>

            {/* Verification Note */}
            <div className="p-2 rounded-xl bg-blue-950/80 border border-blue-500/40 text-center">
              <span className="text-[10px] font-bold text-cyan-300 italic">
                🛡️ &quot;AI assists — Human verifies before submission&quot;
              </span>
            </div>

          </div>

          {/* ======================================================= */}
          {/* ZONE 3: 👨‍💼 ADMIN & CONTENT MODERATION (Right 4 cols) */}
          {/* ======================================================= */}
          <div className={`lg:col-span-4 rounded-2xl bg-[#091527] border-2 border-purple-500/40 p-5 shadow-xl flex flex-col justify-between space-y-4 ${activeTab !== 'all' && activeTab !== 'moderation' ? 'opacity-35' : ''}`}>
            
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-purple-400">ZONE 3</span>
                    <h3 className="font-bold text-sm text-white leading-tight">ADMIN REVIEW &amp; APPROVAL</h3>
                  </div>
                </div>
                <span className="text-xs text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">Governance Gate</span>
              </div>

              {/* Admin Login */}
              <div className="mt-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-center">
                <p className="text-xs font-bold text-white">ADMIN LOGIN → ADMIN DASHBOARD</p>
                <div className="flex flex-wrap justify-center gap-1 text-[9px] font-mono text-slate-300 mt-1">
                  <span>Users</span> • <span>Articles</span> • <span>Publications</span> • <span>Reports</span> • <span>Datasets</span> • <span>Photos</span> • <span>Videos</span>
                </div>
              </div>

              <div className="flex justify-center text-purple-400 text-xs font-bold my-1">↓</div>

              {/* Pending Submissions Queue */}
              <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-500/40 text-center">
                <span className="text-xs font-extrabold text-amber-300 uppercase">
                  ⏳ PENDING SUBMISSIONS QUEUE
                </span>
                <p className="text-[10px] text-slate-300 mt-0.5">Admin selects item → Previews content &amp; metadata</p>
              </div>

              <div className="flex justify-center text-purple-400 text-xs font-bold my-1">↓ Check Metadata, File, Content, AI Output</div>

              {/* Audit Checklist */}
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-[10px] text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5"><Check className="w-3 h-3 text-purple-400" /> Verify scientific accuracy &amp; Madrid Protocol accords</div>
                <div className="flex items-center gap-1.5"><Check className="w-3 h-3 text-purple-400" /> Audit author credentials, DOI &amp; expedition linkage</div>
                <div className="flex items-center gap-1.5"><Check className="w-3 h-3 text-purple-400" /> Ensure AI summary matches technical facts</div>
              </div>

              <div className="flex justify-center text-purple-400 text-xs font-bold my-1.5">↓ DECISION POINT (SPLIT PATH)</div>

              {/* DECISION SPLIT PATHS (Approve vs Reject) */}
              <div className="grid grid-cols-2 gap-2 text-left">
                
                {/* GREEN APPROVAL PATH */}
                <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/60 space-y-1.5">
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> APPROVE
                  </span>
                  <div className="text-[9px] font-mono text-emerald-200">STATUS = APPROVED</div>
                  <div className="text-[9px] text-slate-300">↓ Publish Content</div>
                  <div className="p-1 rounded bg-emerald-600 text-slate-950 font-black text-[9px] text-center">
                    PUBLIC KNOWLEDGE PORTAL
                  </div>
                  <div className="text-[8px] text-emerald-300 font-mono text-center">Searchable &amp; Discoverable</div>
                </div>

                {/* RED REJECTION PATH */}
                <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/60 space-y-1.5">
                  <span className="text-[10px] font-bold text-rose-400 flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> REJECT
                  </span>
                  <div className="text-[9px] font-mono text-rose-200">Enter Rejection Reason</div>
                  <div className="text-[9px] text-slate-300">↓ STATUS = REJECTED</div>
                  <div className="p-1 rounded bg-rose-950 border border-rose-700 text-rose-200 text-[9px] text-center">
                    Researcher Notified
                  </div>
                  <div className="text-[8px] text-amber-300 font-mono text-center">Edit Content → Resubmit ↺</div>
                </div>

              </div>
            </div>

            {/* Mandatory Security Note */}
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-center">
              <span className="text-[10px] font-extrabold text-amber-300 uppercase flex items-center justify-center gap-1">
                <AlertTriangle className="w-3 h-3" /> NO USER CONTENT IS AUTOMATICALLY PUBLISHED
              </span>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* ZONE 4: ⚙️ DATABASE + STORAGE + AI BACKEND (Technical Infrastructure) */}
        {/* ========================================================================= */}
        <div className={`rounded-2xl bg-[#081222] border border-slate-700 p-5 shadow-lg space-y-4 ${activeTab !== 'all' && activeTab !== 'tech' ? 'opacity-35' : ''}`}>
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                04
              </div>
              <span className="text-[10px] font-mono uppercase font-bold text-emerald-400">ZONE 4</span>
              <h3 className="font-bold text-sm text-white">TECHNICAL INFRASTRUCTURE &amp; DATA LAYER</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Frontend → FastAPI → Supabase Cloud &amp; AI</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            
            {/* Tech Pipeline Flow */}
            <div className="md:col-span-3 p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs font-mono">
              <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-wide">Application Stack</p>
              <div className="p-2 rounded bg-slate-950 border border-slate-700 text-cyan-200">
                FRONTEND: React + Vite + Tailwind
              </div>
              <div className="text-center text-slate-500 text-[10px] font-bold">↓ REST / JSON Async</div>
              <div className="p-2 rounded bg-slate-950 border border-slate-700 text-emerald-200">
                BACKEND: FastAPI + Python
              </div>
              <div className="text-center text-slate-500 text-[10px] font-bold">↓ Storage &amp; AI ORM</div>
              <div className="p-2 rounded bg-slate-950 border border-emerald-500/40 text-white font-bold">
                DATA &amp; SERVICES PLATFORM
              </div>
            </div>

            {/* Database & Storage */}
            <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SUPABASE POSTGRESQL</span>
                </span>
                <p className="text-[10px] text-slate-400">Structured Relational Records:</p>
                <div className="flex flex-wrap gap-1 text-[9px] font-mono text-slate-300">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">Users</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">Content</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">Articles</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">Reports</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">Publications</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">Datasets</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">Expeditions</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800">Categories</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300">Submission Status</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SUPABASE STORAGE</span>
                </span>
                <p className="text-[10px] text-slate-400">Secure Object Storage Buckets:</p>
                <div className="space-y-1 text-[10px] font-mono text-slate-300">
                  <div className="p-1 rounded bg-slate-950 border border-slate-800">• PDF Compendiums &amp; Manuscripts</div>
                  <div className="p-1 rounded bg-slate-950 border border-slate-800">• 4K Images &amp; High-Res Drone Assets</div>
                  <div className="p-1 rounded bg-slate-950 border border-slate-800">• Raw Dataset Files (NetCDF / CSV)</div>
                  <div className="p-1 rounded bg-slate-950 border border-slate-800">• Video Previews &amp; Thumbnails</div>
                </div>
              </div>
            </div>

            {/* AI Service */}
            <div className="md:col-span-3 p-3 rounded-xl bg-gradient-to-br from-[#0c2448] to-[#07162c] border border-cyan-500/40 space-y-1.5 text-xs">
              <span className="font-bold text-cyan-300 flex items-center justify-between">
                <span>AI SERVICE ENGINE</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                  Gemini / OpenRouter
                </span>
              </span>
              <p className="text-[10px] text-slate-300">Connected Microservices:</p>
              <div className="space-y-1 text-[10px] text-slate-200">
                <div>✓ <strong>Summarization</strong> of raw texts</div>
                <div>✓ <strong>Keywords</strong> &amp; ontology extraction</div>
                <div>✓ <strong>Categorization</strong> by domain</div>
                <div>✓ <strong>Description</strong> for public discovery</div>
                <div>✓ <strong>Social Caption</strong> (X, Insta, LinkedIn)</div>
              </div>
            </div>

          </div>

          {/* Thin Data Flow Linkage Indicators */}
          <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-4 gap-2 text-[10px] font-mono text-slate-400 text-center">
            <span className="p-1.5 rounded bg-slate-950">Researcher → Frontend → FastAPI → DB/Storage</span>
            <span className="p-1.5 rounded bg-slate-950">Admin → Frontend → FastAPI → Verification DB</span>
            <span className="p-1.5 rounded bg-slate-950">Public User → Frontend → FastAPI → Published Content</span>
            <span className="p-1.5 rounded bg-cyan-950/60 border border-cyan-800/40 text-cyan-300">AI Service → FastAPI → Content Processing</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COMPLETE USER JOURNEY (Single Bold Simplified Ribbon) */}
        {/* ========================================================================= */}
        <div className="rounded-2xl bg-gradient-to-r from-[#061224] via-[#092244] to-[#061224] border-2 border-cyan-500/40 p-4 shadow-xl text-center space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
            <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white">👨‍🔬 RESEARCHER</span>
            <span className="text-cyan-400">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">CREATE</span>
            <span className="text-cyan-400">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-cyan-950 border border-cyan-500 text-cyan-300">✨ AI ASSIST</span>
            <span className="text-cyan-400">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">VERIFY</span>
            <span className="text-cyan-400">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-blue-700 text-white">SUBMIT</span>
            
            <span className="text-slate-500 font-bold mx-1">|</span>

            <span className="px-2.5 py-1 rounded-lg bg-purple-600 text-white">👨‍💼 ADMIN</span>
            <span className="text-cyan-400">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-purple-950 border border-purple-500 text-purple-300">REVIEW</span>
            <span className="text-cyan-400">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-slate-950 font-black">APPROVE</span>

            <span className="text-slate-500 font-bold mx-1">|</span>

            <span className="px-2.5 py-1 rounded-lg bg-cyan-500 text-slate-950 font-black">🌐 PUBLIC</span>
            <span className="text-cyan-400">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">SEARCH</span>
            <span className="text-cyan-400">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">EXPLORE</span>
            <span className="text-cyan-400">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-sky-900 border border-sky-400 text-sky-200">DISCOVER</span>
          </div>

          <p className="text-xs font-extrabold tracking-widest text-cyan-300 uppercase font-mono">
            &quot;From Scientific Contribution to Public Knowledge&quot;
          </p>
        </div>

        {/* ========================================================================= */}
        {/* DEMO SCENARIO: SIH DEMO — 60 SECOND FLOW (01 → 10 Steps) */}
        {/* ========================================================================= */}
        <div className="rounded-2xl bg-[#091527] border border-amber-500/40 p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
            <span className="text-xs font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>⏱️</span> SIH DEMO — 60 SECOND FLOW
            </span>
            <span className="text-[10px] font-mono text-slate-400">Judge Pitch Roadmap (01 → 10)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-amber-400 font-bold block text-[10px]">01</span>
              <p className="text-[11px] text-slate-200 mt-0.5">Researcher Login</p>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-amber-400 font-bold block text-[10px]">02</span>
              <p className="text-[11px] text-slate-200 mt-0.5">Create Article</p>
            </div>
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/40">
              <span className="text-cyan-400 font-bold block text-[10px]">03</span>
              <p className="text-[11px] text-cyan-200 mt-0.5">Generate with AI</p>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-amber-400 font-bold block text-[10px]">04</span>
              <p className="text-[11px] text-slate-200 mt-0.5">Edit AI Output</p>
            </div>
            <div className="p-2 rounded-lg bg-blue-950 border border-blue-500/40">
              <span className="text-blue-400 font-bold block text-[10px]">05</span>
              <p className="text-[11px] text-blue-200 mt-0.5">Submit for Review</p>
            </div>
            <div className="p-2 rounded-lg bg-purple-950 border border-purple-500/40">
              <span className="text-purple-400 font-bold block text-[10px]">06</span>
              <p className="text-[11px] text-purple-200 mt-0.5">Admin Opens Dashboard</p>
            </div>
            <div className="p-2 rounded-lg bg-purple-950 border border-purple-500/40">
              <span className="text-purple-400 font-bold block text-[10px]">07</span>
              <p className="text-[11px] text-purple-200 mt-0.5">Admin Reviews</p>
            </div>
            <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-500/40">
              <span className="text-emerald-400 font-bold block text-[10px]">08</span>
              <p className="text-[11px] text-emerald-200 mt-0.5">Admin Approves</p>
            </div>
            <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-500/40">
              <span className="text-emerald-400 font-bold block text-[10px]">09</span>
              <p className="text-[11px] text-emerald-200 mt-0.5">Article Becomes Public</p>
            </div>
            <div className="p-2 rounded-lg bg-cyan-500 text-slate-950 font-bold">
              <span className="font-black block text-[10px]">10</span>
              <p className="text-[11px] font-black leading-tight mt-0.5">Public Searches &amp; Reads</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
