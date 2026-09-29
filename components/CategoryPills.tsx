'use client';

import React from 'react';
import { Compass, FlaskConical, BookOpen, FileText, Database, Image, GraduationCap } from 'lucide-react';

interface CategoryPillsProps {
  onSelectCategory: (category: string) => void;
  activeCategory?: string;
}

export default function CategoryPills({ onSelectCategory, activeCategory }: CategoryPillsProps) {
  const categories = [
    { id: 'Expeditions', label: 'Expeditions', icon: Compass },
    { id: 'Research', label: 'Research', icon: FlaskConical },
    { id: 'Publications', label: 'Publications', icon: BookOpen },
    { id: 'Reports', label: 'Reports', icon: FileText },
    { id: 'Datasets', label: 'Datasets', icon: Database },
    { id: 'Media', label: 'Photos & Videos', icon: Image },
    { id: 'Smart Education', label: 'Smart Education', icon: GraduationCap },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`p-5 rounded-2xl bg-[#0c182a] border transition-all flex flex-col items-center justify-center gap-3 group text-center ${
                isActive
                  ? 'border-sky-500 shadow-lg shadow-sky-500/20 ring-2 ring-sky-500/30'
                  : 'border-slate-800 hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/10 hover:-translate-y-0.5'
              }`}
            >
              {/* Circular cyan/sky icon badge */}
              <div className="w-12 h-12 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-200">
                <Icon className="w-6 h-6" />
              </div>

              {/* Label */}
              <span className="text-sm font-semibold text-slate-200 group-hover:text-sky-400 transition-colors">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
