'use client';

import React from 'react';

interface FooterProps {
  onNavClick: (nav: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const navLinks = [
    'Home',
    'Expeditions',
    'Research',
    'Publications',
    'Reports',
    'Datasets',
    'Media',
    'About'
  ];

  return (
    <footer className="mt-auto bg-[#0b1528] text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 shrink-0 aspect-square flex items-center justify-center">
              <img
                src="/himvigyan-crest.png?v=4"
                alt="HimVigyan Emblem"
                className="w-full h-full object-contain drop-shadow"
              />
            </div>
            <div className="shrink-0 flex flex-col justify-center">
              <div className="text-base font-black tracking-tight text-white leading-tight whitespace-nowrap">
                HimVigyan
              </div>
              <div className="text-[8px] font-bold tracking-[0.2em] text-slate-400 uppercase leading-none mt-0.5 whitespace-nowrap">
                EXPLORE • RESEARCH • PRESERVE
              </div>
            </div>
          </div>

          {/* Center: Nav links with vertical separators */}
          <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-slate-300">
            {navLinks.map((link, idx) => (
              <React.Fragment key={link}>
                <button
                  onClick={() => onNavClick(link)}
                  className="hover:text-white transition-colors"
                >
                  {link}
                </button>
                {idx < navLinks.length - 1 && (
                  <span className="text-slate-600 select-none">|</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Right: Social Media Icons matching screenshot */}
          <div className="flex items-center gap-3 text-slate-300">
            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center hover:text-white transition-colors"
              title="YouTube"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center hover:text-white transition-colors"
              title="X (Twitter)"
            >
              <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center hover:text-white transition-colors"
              title="LinkedIn"
            >
              <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.05 1.53 1.53 0 0 0 0 3.05m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
              </svg>
            </a>

            {/* Globe / Web */}
            <a
              href="https://ncpor.res.in"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center hover:text-white transition-colors"
              title="NCPOR Official Website"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </a>
          </div>

        </div>

        {/* Bottom Bar: Copyright on left, MoES / NCPOR on right */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-[11px] text-slate-500">
          <div>
            © 2025 HimVigyan. All rights reserved.
          </div>
          <div>
            Ministry of Earth Sciences (MoES) | NCPOR
          </div>
        </div>

      </div>
    </footer>
  );
}
