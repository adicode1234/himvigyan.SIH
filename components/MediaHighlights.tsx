'use client';

import React, { useState } from 'react';
import { ArrowRight, Image as ImageIcon, Play, Sparkles, Download, X, Maximize2, Volume2, Film } from 'lucide-react';

export interface MediaItem {
  id: string;
  title: string;
  year: string;
  type: 'image' | 'video';
  imageUrl: string;
  videoUrl?: string;
  location: string;
  duration?: string;
  resolution: string;
  description: string;
  photographerOrLead: string;
}

interface MediaHighlightsProps {
  onSelectMedia?: (item: MediaItem) => void;
  onViewAllMedia: () => void;
  onLaunchAI?: (title: string, summary: string) => void;
}

export default function MediaHighlights({ onSelectMedia, onViewAllMedia, onLaunchAI }: MediaHighlightsProps) {
  const [activeMediaModal, setActiveMediaModal] = useState<MediaItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const mediaItems: MediaItem[] = [
    {
      id: 'm1',
      title: 'Emperor Penguins - Antarctica',
      year: '2024',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=1000&q=85',
      location: 'Larsemann Hills Coastal Ice, East Antarctica',
      resolution: '4K Ultra-HD (3840x2160)',
      photographerOrLead: 'Dr. Aniruddha Roy, 43rd ISEA Wildlife Team',
      description: 'Close-up capture of an Emperor penguin traversing the sea-ice pack near Bharati Station. Indian biological surveys monitor fledging rates and population dynamics as key indicators of marine cryospheric health.'
    },
    {
      id: 'm2',
      title: 'Research Camp - Maitri',
      year: '2024',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1000&q=85',
      location: 'Schirmacher Oasis, Queen Maud Land, Antarctica',
      resolution: '4K Ultra-HD (4000x2660)',
      photographerOrLead: 'Geological Field Unit, Maitri Base',
      description: 'Field research expedition camp set up during continuous summer daylight for bedrock sampling and ice-core extraction in the permafrost oasis.'
    },
    {
      id: 'm3',
      title: 'Indian Antarctic Expedition 2024',
      year: '2024',
      type: 'video',
      imageUrl: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=1000&q=85',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      location: 'Prydz Bay & Larsemann Hills, Antarctica',
      duration: '03:42',
      resolution: '4K UHD • 60 FPS',
      photographerOrLead: 'NCPOR Media & Logistics Unit',
      description: 'Official 4K documentary video footage capturing the arrival of the Indian Antarctic voyage, heavy icebreaker navigation through pack ice, helicopter deployment, and scientific equipment installation at Bharati Station.'
    },
    {
      id: 'm4',
      title: 'Aurora Australis',
      year: '2024',
      type: 'video',
      imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1000&q=85',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
      location: 'Maitri Station All-Sky Geomagnetic Observatory',
      duration: '02:15',
      resolution: '4K UHD Time-Lapse',
      photographerOrLead: 'Geospace Sciences Division, NCPOR',
      description: 'Mesmerizing high-resolution time-lapse recording of Aurora Australis (Southern Lights) ribboning across the polar sky during the 60-day Antarctic winter night, triggered by a geomagnetic coronal solar storm.'
    }
  ];

  const handleCardClick = (item: MediaItem) => {
    setActiveMediaModal(item);
    setIsPlaying(true);
    if (onSelectMedia) {
      onSelectMedia(item);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">Photo & Video Highlights</h3>
        <button
          onClick={onViewAllMedia}
          className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 Cards Grid matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {mediaItems.map((item) => {
          const isVideo = item.type === 'video';

          return (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="bg-white border border-slate-200/90 rounded-2xl p-2.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group flex flex-col justify-between"
            >
              {/* Media Thumbnail with Video Play Overlay */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Video Play Button Overlay */}
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                    <div className="w-11 h-11 rounded-full bg-black/65 border-2 border-white/80 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 shadow-lg transition-transform">
                      <Play className="w-4 h-4 fill-white ml-0.5 text-white" />
                    </div>
                  </div>
                )}

                {/* Resolution Badge in top corner */}
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-mono backdrop-blur-sm">
                  {isVideo ? '4K VIDEO' : '4K PHOTO'}
                </div>
              </div>

              {/* Title & Metadata matching screenshot */}
              <div className="p-2 pt-3">
                <div className="flex items-center gap-1.5 text-slate-800 group-hover:text-sky-600 transition-colors">
                  {isVideo ? (
                    <Play className="w-3.5 h-3.5 text-sky-600 fill-sky-600 shrink-0" />
                  ) : (
                    <ImageIcon className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  )}
                  <h4 className="font-semibold text-xs text-slate-900 group-hover:text-sky-600 transition-colors truncate">
                    {item.title}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 ml-5">
                  {item.year}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE VIDEO & PHOTO PLAYER MODAL (Opens when clicking any media!) */}
      {/* ========================================================================= */}
      {activeMediaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0b1528] text-white rounded-2xl border border-cyan-500/40 shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 sm:px-6 bg-[#070e1b] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  {activeMediaModal.type === 'video' ? <Film className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                    <span>{activeMediaModal.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                      {activeMediaModal.resolution}
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {activeMediaModal.location} • {activeMediaModal.year}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setActiveMediaModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player or High-Res Photo View */}
            <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
              {activeMediaModal.type === 'video' ? (
                /* Native HTML5 Video Player with Controls */
                <video
                  key={activeMediaModal.id}
                  src={activeMediaModal.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
                  poster={activeMediaModal.imageUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                /* High-Res Photo Lightbox */
                <img
                  src={activeMediaModal.imageUrl}
                  alt={activeMediaModal.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Media Information & Action Controls */}
            <div className="p-4 sm:p-6 space-y-4 bg-[#09152a]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">
                    Scientific Archive Media Description
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                    {activeMediaModal.description}
                  </p>
                </div>
              </div>

              {/* Metadata details row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Credit / Contributor</span>
                  <span className="font-semibold text-white truncate block">{activeMediaModal.photographerOrLead}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Format / Specs</span>
                  <span className="font-semibold text-cyan-300 font-mono block">{activeMediaModal.resolution}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Archive Access</span>
                  <span className="font-semibold text-emerald-400 block">MoES Open Media Vault</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Licensing</span>
                  <span className="font-semibold text-slate-200 block">Govt. Public Domain (CC-BY)</span>
                </div>
              </div>

              {/* Bottom CTAs */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                {onLaunchAI && (
                  <button
                    onClick={() => {
                      onLaunchAI(activeMediaModal.title, activeMediaModal.description);
                      setActiveMediaModal(null);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-md shadow-sky-500/20"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Viral Social Media Captions (AI Studio)</span>
                  </button>
                )}

                <div className="flex items-center gap-2">
                  <a
                    href={activeMediaModal.videoUrl || activeMediaModal.imageUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download 4K Master Asset</span>
                  </a>
                  <button
                    onClick={() => setActiveMediaModal(null)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700"
                  >
                    Close
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
