'use client';

import React, { useState } from 'react';
import { ArrowRight, Upload, Search, Filter, ChevronDown } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string, category: string) => void;
  onExploreResearch: () => void;
  onExploreExpeditions: () => void;
  onContributeContent: () => void;
}

export default function Hero({
  onSearch,
  onExploreResearch,
  onExploreExpeditions,
  onContributeContent
}: HeroProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const categories = [
    'All Categories',
    'Expeditions',
    'Research',
    'Publications',
    'Reports',
    'Datasets',
    'Media'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, category);
  };

  return (
    <div className="relative pb-16">
      {/* Background Hero Banner with Polar Landscape & Explorer */}
      <div className="relative min-h-[440px] sm:min-h-[480px] w-full overflow-hidden bg-slate-900">
        {/* Background Video: Polar landscape / expedition video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2000&q=85"
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/videos/hero-polar.mp4" type="video/mp4" />
          {/* Fallback image if video not supported */}
          <img
            src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2000&q=85"
            alt="Explore India's Polar Science - Antarctica & Arctic"
            className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
          />
        </video>

        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20 pointer-events-none"></div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-28 z-10">
          <div className="max-w-2xl space-y-4">
            
            {/* Top Subtitle with Official Emblem */}
            <div className="flex items-center gap-2.5">
              <img
                src="/himvigyan-crest.png?v=4"
                alt="HimVigyan Crest"
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-md shrink-0"
              />
              <p className="text-xs sm:text-sm font-semibold tracking-wider text-sky-200 uppercase drop-shadow-sm">
                NATIONAL CENTRE FOR POLAR AND OCEAN RESEARCH (NCPOR)
              </p>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
              Explore India&apos;s<br />
              Polar Science
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-100 max-w-xl leading-relaxed drop-shadow-sm font-normal">
              Discover expeditions, scientific research, publications, datasets and media from India&apos;s journey across the polar regions.
            </p>

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              {/* Primary Vibrant Sky Blue Button */}
              <button
                onClick={onExploreResearch}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-600/35 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Explore</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Secondary Solid Crisp White Button */}
              <button
                onClick={onContributeContent}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 shadow-lg shadow-black/25 border border-white hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Contribute</span>
                <Upload className="w-4 h-4 text-slate-900 stroke-[2.5]" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Search Bar (Anchored and overlapping hero bottom exactly as in screenshot) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-9 relative z-20">
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200/80 p-2 sm:p-2.5 flex flex-col sm:flex-row items-center gap-2"
        >
          {/* Search Input with Magnifier Icon */}
          <div className="flex-1 flex items-center gap-3 px-3 w-full">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for expeditions, research, publications, datasets, etc..."
              className="w-full py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-3">
            {/* Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 px-2 py-1.5 rounded-md hover:bg-slate-50 transition-colors"
              >
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>{category}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-30">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setCategory(cat);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium ${
                        category === cat ? 'bg-sky-50 text-sky-600' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Blue Search Button */}
            <button
              type="submit"
              className="px-6 py-2 rounded-xl text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 transition-colors shadow-sm"
            >
              Search
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
