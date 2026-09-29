'use client';

import React from 'react';
import { 
  Compass, 
  FileText, 
  BookOpen, 
  Database, 
  Camera, 
  ArrowRight, 
  Send
} from 'lucide-react';

interface StatsAndResearcherCTAProps {
  onContributeContent: () => void;
}

export default function StatsAndResearcherCTA({ onContributeContent }: StatsAndResearcherCTAProps) {
  const stats = [
    { value: '12+', label: 'Expeditions', icon: Compass },
    { value: '150+', label: 'Research Articles', icon: FileText },
    { value: '230+', label: 'Publications', icon: BookOpen },
    { value: '50+', label: 'Datasets', icon: Database },
    { value: '5K+', label: 'Media Files', icon: Camera },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Stats Grid (7 columns on desktop) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm flex items-center justify-around gap-2 flex-wrap sm:flex-nowrap">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex items-center gap-3 py-2 px-1">
                {/* Circular light blue icon badge */}
                <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right "Are you a researcher?" Banner (5 columns on desktop) */}
        <div className="lg:col-span-5 relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 border border-sky-200/80 p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Subtle ice background watermark */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-sky-200/30 rounded-full blur-xl pointer-events-none"></div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Send className="w-4 h-4 ml-0.5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">
                Are you a researcher?
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Share your work with the global scientific community.
              </p>
            </div>
          </div>

          <button
            onClick={onContributeContent}
            className="w-full sm:w-auto relative z-10 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-sm transition-all whitespace-nowrap"
          >
            <span>Contribute Content</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
