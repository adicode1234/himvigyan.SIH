'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  User, 
  FileDown, 
  FileText,
  Sparkles
} from 'lucide-react';

interface FourColumnGridProps {
  onViewDetails: (item: any) => void;
  onViewAll: (section: string) => void;
  onLaunchAI: (title: string, summary: string) => void;
}

export default function FourColumnGrid({
  onViewDetails,
  onViewAll,
  onLaunchAI
}: FourColumnGridProps) {
  // Expedition carousel state
  const [expeditionIndex, setExpeditionIndex] = useState(0);

  const expeditions = [
    {
      id: 'isea-2025',
      title: 'Indian Antarctic Expedition 2025',
      badge: 'Antarctica',
      year: '2025',
      location: 'Antarctica',
      description: 'Scientific research and environmental monitoring in the Antarctic region.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'arctic-2024',
      title: 'Indian Arctic Winter Expedition 2024',
      badge: 'Arctic',
      year: '2024',
      location: 'Svalbard, Norway',
      description: 'Long-term atmospheric and fjord monitoring at Himadri Station during polar night.',
      image: 'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'himansh-2024',
      title: 'Himalayan Cryosphere Mission 2024',
      badge: 'Himalayas',
      year: '2024',
      location: 'Spiti Valley',
      description: 'Glacial mass balance and discharge analysis in the Western Himalayas.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    }
  ];

  const currentExp = expeditions[expeditionIndex];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* 1. Featured Expeditions */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-slate-900">Featured Expeditions</h3>
            <button
              onClick={() => onViewAll('Expeditions')}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card with Left/Right carousel navigation */}
          <div className="relative flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            {/* Carousel Arrow Buttons */}
            <button
              onClick={() => setExpeditionIndex((prev) => (prev === 0 ? expeditions.length - 1 : prev - 1))}
              className="absolute -left-3 top-28 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:text-sky-600 hover:scale-105 z-10 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setExpeditionIndex((prev) => (prev === expeditions.length - 1 ? 0 : prev + 1))}
              className="absolute -right-3 top-28 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:text-sky-600 hover:scale-105 z-10 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div>
              {/* Image */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-3.5 bg-slate-100">
                <img
                  src={currentExp.image}
                  alt={currentExp.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Badge */}
              <div className="mb-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold text-white bg-sky-600">
                  {currentExp.badge}
                </span>
              </div>

              {/* Title */}
              <h4 className="font-bold text-sm text-slate-900 leading-snug">
                {currentExp.title}
              </h4>

              {/* Metadata */}
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {currentExp.year}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {currentExp.location}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">
                {currentExp.description}
              </p>
            </div>

            <div className="pt-4 mt-2">
              <button
                onClick={() => onViewDetails(currentExp)}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-sky-600 bg-sky-50 hover:bg-sky-100 border border-sky-100 transition-colors flex items-center justify-center gap-1"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Dots indicator */}
              <div className="flex items-center justify-center gap-1.5 mt-3">
                {expeditions.map((_, i) => (
                  <span
                    key={i}
                    onClick={() => setExpeditionIndex(i)}
                    className={`h-1.5 rounded-full cursor-pointer transition-all ${
                      expeditionIndex === i ? 'w-4 bg-sky-600' : 'w-1.5 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Latest Research */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-slate-900">Latest Research</h3>
            <button
              onClick={() => onViewAll('Research')}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              {/* Image */}
              <div className="aspect-[16/10] w-full rounded-xl overflow-hidden mb-3.5 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=800&q=80"
                  alt="Impact of Polar Ice Melt"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Badge */}
              <div className="mb-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold text-sky-700 bg-sky-100">
                  Climate Science
                </span>
              </div>

              {/* Title */}
              <h4 className="font-bold text-sm text-slate-900 leading-snug">
                Impact of Polar Ice Melt on Global Sea Level Rise
              </h4>

              {/* Author & Date */}
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Dr. Priya Sharma
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  2025
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-sky-50 text-sky-700 border border-sky-100">
                  Climate Change
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-sky-50 text-sky-700 border border-sky-100">
                  Ice Melt
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-sky-50 text-sky-700 border border-sky-100">
                  Sea Level
                </span>
              </div>
            </div>

            <div className="pt-4 mt-2">
              <button
                onClick={() => onViewDetails({
                  title: 'Impact of Polar Ice Melt on Global Sea Level Rise',
                  author: 'Dr. Priya Sharma',
                  year: '2025',
                  category: 'Climate Science',
                  abstract: 'Comprehensive multi-satellite evaluation of Antarctic and Greenland ice-sheet mass loss and its contribution to steric and eustatic sea-level changes in the Indian Ocean basin.'
                })}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-sky-600 bg-sky-50 hover:bg-sky-100 border border-sky-100 transition-colors flex items-center justify-center gap-1"
              >
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Latest Publications */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-slate-900">Latest Publications</h3>
            <button
              onClick={() => onViewAll('Publications')}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              {/* Paper graphic icon card matching screenshot */}
              <div className="w-full aspect-[16/10] rounded-xl bg-slate-50 border border-slate-200/70 p-3 mb-3.5 flex items-center justify-center relative overflow-hidden">
                <div className="w-14 h-18 rounded bg-white border border-slate-200 shadow-sm p-2 flex flex-col items-center justify-center space-y-1">
                  <div className="w-7 h-7 rounded bg-sky-100 text-sky-600 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="w-8 h-1 bg-slate-200 rounded"></div>
                  <div className="w-6 h-1 bg-slate-200 rounded"></div>
                </div>
              </div>

              {/* Title */}
              <h4 className="font-bold text-sm text-slate-900 leading-snug">
                Variability of Antarctic Surface Mass Balance
              </h4>

              {/* Authors */}
              <p className="text-xs text-slate-600 mt-1.5 font-medium">
                R. Kumar, A. Singh, et al.
              </p>

              {/* Metadata */}
              <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  2025
                </span>
                <span>|</span>
                <span className="italic">Journal of Polar Research</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-sky-50 text-sky-700 border border-sky-100">
                  Glaciology
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-sky-50 text-sky-700 border border-sky-100">
                  Climate Science
                </span>
              </div>
            </div>

            <div className="pt-4 mt-2">
              <button
                onClick={() => onViewDetails({
                  title: 'Variability of Antarctic Surface Mass Balance',
                  authors: 'R. Kumar, A. Singh, et al.',
                  journal: 'Journal of Polar Research (2025)',
                  abstract: 'Evaluation of accumulation precipitation and katabatic wind sublimation rates over the Dronning Maud Land ice sheet using stake networks and Regional Atmospheric Climate Models.'
                })}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <FileDown className="w-3.5 h-3.5 text-sky-600" />
                <span>View PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4. Recent Reports */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-slate-900">Recent Reports</h3>
            <button
              onClick={() => onViewAll('Reports')}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              {/* Thumbnail matching screenshot with glacier / mountain cover */}
              <div className="aspect-[16/10] w-full rounded-xl overflow-hidden mb-3.5 bg-slate-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=800&q=80"
                  alt="Indian Scientific Expedition to Antarctica - 2024"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              {/* Title */}
              <h4 className="font-bold text-sm text-slate-900 leading-snug">
                Indian Scientific Expedition to Antarctica - 2024
              </h4>

              {/* Agency */}
              <p className="text-xs font-semibold text-slate-600 mt-1.5">
                NCPOR
              </p>

              {/* Date */}
              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1.5">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>2024</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-sky-50 text-sky-700 border border-sky-100">
                  Expedition Report
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-sky-50 text-sky-700 border border-sky-100">
                  Antarctica
                </span>
              </div>
            </div>

            <div className="pt-4 mt-2">
              <button
                onClick={() => onViewDetails({
                  title: 'Indian Scientific Expedition to Antarctica - 2024',
                  agency: 'NCPOR / MoES',
                  year: '2024',
                  abstract: 'Official technical and operational report detailing logistics, scientific programs, and environmental monitoring carried out during the 43rd Indian Scientific Expedition to Antarctica.'
                })}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-sky-600" />
                <span>View Report</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
