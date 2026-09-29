'use client';

import React, { useState } from 'react';
import { X, Download, Sparkles, ExternalLink, Copy, Check, Calendar, MapPin, User, FileText, Compass } from 'lucide-react';
import ReportDetailModal from '@/components/ReportDetailModal';
import { triggerScientificDownload } from '@/utils/downloadHelper';

interface DetailsModalProps {
  item: any | null;
  onClose: () => void;
  onLaunchAI: (item: any) => void;
}

export default function DetailsModal({ item, onClose, onLaunchAI }: DetailsModalProps) {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!item) return null;

  if (item.type === 'Report') {
    return (
      <ReportDetailModal
        item={item}
        onClose={onClose}
        onSelectForAI={onLaunchAI}
      />
    );
  }

  const handleCopyCitation = () => {
    const citation = `${item.authors || item.author || 'NCPOR Scientist'} (${item.year || '2025'}). ${item.title}. National Centre for Polar and Ocean Research, Ministry of Earth Sciences.`;
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setDownloaded(true);
    triggerScientificDownload({
      id: item.id,
      title: item.title,
      authorsOrLead: item.authors || item.author || item.authorsOrLead,
      doi: item.doi,
      expedition: item.expedition || item.region,
      station: item.station,
      format: item.format,
      type: item.type,
      summary: item.summary || item.description,
      fullAbstract: item.fullAbstract,
      mediaUrl: item.mediaUrl,
      date: item.date,
      fileSize: item.fileSize
    });
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200"
      >
        
        {/* Close Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 z-30 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-4 h-4 pointer-events-none" />
        </button>

        {/* Badge & Date */}
        <div className="flex items-center gap-2 mb-2">
          {item.badge && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-700">
              {item.badge}
            </span>
          )}
          {item.category && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
              {item.category}
            </span>
          )}
          <span className="text-xs text-slate-500 font-medium">
            {item.year || '2025'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 leading-snug">
          {item.title}
        </h3>

        {/* Metadata info */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 my-3">
          {(item.author || item.authors) && (
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>{item.author || item.authors}</span>
            </span>
          )}
          {item.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{item.location}</span>
            </span>
          )}
          {item.agency && (
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>{item.agency}</span>
            </span>
          )}
        </div>

        {/* Relational Interconnection Banner */}
        <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-between text-xs mb-3">
          <div className="flex items-center gap-2 text-sky-800">
            <Compass className="w-4 h-4 text-sky-600 shrink-0" />
            <span>
              Connected Mission: <strong>{item.expedition || (item.title?.includes('42') ? '42nd Indian Antarctic Expedition (42-IAE)' : item.title?.includes('Arctic') ? 'Indian Arctic Summer Scientific Mission (ARCTIC-24)' : item.title?.includes('Southern Ocean') ? '12th Indian Southern Ocean Expedition (12-ISOE)' : '43rd Indian Scientific Expedition to Antarctica (43-IAE)')}</strong>
            </span>
          </div>
          <span className="text-[9px] font-bold text-sky-700 uppercase tracking-wider bg-white px-2 py-0.5 rounded-md border border-sky-200">
            Relational Link
          </span>
        </div>

        {/* Media Preview: Video Player or Image */}
        {(item.videoUrl || item.type === 'video' || item.mediaType === 'video') ? (
          <div className="rounded-xl overflow-hidden aspect-[16/9] w-full my-4 bg-black">
            <video
              src={item.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
              poster={item.image || item.imageUrl || item.mediaUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (item.image || item.imageUrl || item.mediaUrl) ? (
          <div className="rounded-xl overflow-hidden aspect-[16/9] w-full my-4 bg-slate-900 border border-slate-700/60 shadow-inner">
            <img src={item.image || item.imageUrl || item.mediaUrl} alt={item.title} className="w-full h-full object-contain bg-black/40" />
          </div>
        ) : null}

        {/* Abstract / Summary */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
          <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500">
            Scientific Overview / Abstract
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {item.abstract || item.description || 'This polar research documentation captures vital measurements from Indian scientific stations and expeditions.'}
          </p>
        </div>

        {/* Citation Box */}
        <div className="mt-4 p-3 rounded-xl bg-slate-100/70 border border-slate-200/80 flex items-center justify-between text-xs">
          <div className="truncate mr-2">
            <span className="font-semibold text-slate-700">Citation: </span>
            <span className="text-slate-500 italic">
              {item.authors || item.author || 'NCPOR'} ({item.year || '2025'}). {item.title}.
            </span>
          </div>
          <button
            onClick={handleCopyCitation}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-slate-700 hover:text-sky-600 transition-colors shrink-0"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onLaunchAI(item);
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Social Media Posts (AI Studio)</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            {downloaded ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5" />}
            <span>{downloaded ? 'Downloaded PDF' : 'Download Document'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
