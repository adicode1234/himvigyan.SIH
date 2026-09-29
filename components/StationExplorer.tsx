'use client';

import React, { useState } from 'react';
import { POLAR_STATIONS, Station } from '@/data/polarData';
import { 
  Thermometer, 
  Wind, 
  Gauge, 
  MapPin, 
  Layers, 
  Compass, 
  Calendar, 
  CheckCircle2, 
  Eye, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface StationExplorerProps {
  onSelectStationForRepo?: (stationName: string) => void;
}

export default function StationExplorer({ onSelectStationForRepo }: StationExplorerProps) {
  const [selectedStation, setSelectedStation] = useState<Station>(POLAR_STATIONS[0]);
  const [regionFilter, setRegionFilter] = useState<'All' | 'Antarctica' | 'Arctic' | 'Himalayas' | 'Ocean'>('All');
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'science' | 'tour'>('overview');

  const filteredStations = regionFilter === 'All' 
    ? POLAR_STATIONS 
    : POLAR_STATIONS.filter(s => s.region === regionFilter);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4" />
            <span>Interactive Polar Stations & Vessels</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            India&apos;s Polar & Ocean Outposts
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Real-time simulated telemetry, scientific research priorities, and spatial infrastructure across Antarctica, the Arctic, and the Himalayan Third Pole.
          </p>
        </div>

        {/* Region Filters */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800">
          {(['All', 'Antarctica', 'Arctic', 'Himalayas', 'Ocean'] as const).map((reg) => (
            <button
              key={reg}
              onClick={() => setRegionFilter(reg)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                regionFilter === reg
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      {/* Station Selector Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {filteredStations.map((station) => {
          const isSelected = selectedStation.id === station.id;
          return (
            <button
              key={station.id}
              onClick={() => setSelectedStation(station)}
              className={`text-left p-3 rounded-xl transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'polar-glass border-2 border-cyan-400 shadow-lg shadow-cyan-950/60 scale-[1.02]'
                  : 'bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  station.region === 'Antarctica' ? 'bg-blue-500/20 text-blue-300' :
                  station.region === 'Arctic' ? 'bg-cyan-500/20 text-cyan-300' :
                  station.region === 'Himalayas' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {station.region}
                </span>
                <h3 className="font-bold text-sm text-white mt-2 leading-tight">
                  {station.name.replace(' Station', '')}
                </h3>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono text-cyan-300">{station.temperature}</span>
                <span className="text-[10px]">Est. {station.established}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Station Deep-Dive Dashboard */}
      <div className="rounded-2xl polar-glass border border-cyan-500/30 overflow-hidden shadow-2xl">
        {/* Banner with Hero Overlay */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={selectedStation.bannerImage}
            alt={selectedStation.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e1b] via-[#070e1b]/60 to-transparent"></div>

          {/* Banner Overlaid Content */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-500 text-slate-950">
                  {selectedStation.region}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-800/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                  {selectedStation.status}
                </span>
                <span className="text-xs text-slate-300 font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Commissioned {selectedStation.established}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {selectedStation.name}
              </h2>
              <p className="text-sm text-slate-300 flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{selectedStation.location}</span>
                <span className="text-slate-500">•</span>
                <span className="font-mono text-xs text-cyan-300">{selectedStation.coordinates}</span>
              </p>
            </div>

            {/* Quick action: View datasets */}
            {onSelectStationForRepo && (
              <button
                onClick={() => onSelectStationForRepo(selectedStation.name)}
                className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 text-xs font-semibold flex items-center gap-2 transition-colors self-start sm:self-auto"
              >
                <span>Browse Station Datasets</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Live Telemetry Sensors Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-cyan-900/20 border-y border-cyan-900/40 text-xs">
          <div className="bg-[#091322]/90 p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-cyan-400 border border-cyan-500/20">
              <Thermometer className="w-5 h-5" />
            </div>
            <div>
              <p className="text-slate-400 text-[11px]">Air Temperature</p>
              <p className="text-base font-bold font-mono text-white">{selectedStation.temperature}</p>
            </div>
          </div>

          <div className="bg-[#091322]/90 p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <p className="text-slate-400 text-[11px]">Wind & Blizzard</p>
              <p className="text-base font-bold font-mono text-white">{selectedStation.windSpeed}</p>
            </div>
          </div>

          <div className="bg-[#091322]/90 p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <p className="text-slate-400 text-[11px]">Barometric Pressure</p>
              <p className="text-base font-bold font-mono text-white">{selectedStation.pressure}</p>
            </div>
          </div>

          <div className="bg-[#091322]/90 p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-slate-400 text-[11px]">Elevation / Terrain</p>
              <p className="text-base font-bold font-mono text-white">{selectedStation.elevation}</p>
            </div>
          </div>
        </div>

        {/* Detailed Tabs Header */}
        <div className="p-6">
          <div className="flex border-b border-slate-800 gap-6 mb-6">
            <button
              onClick={() => setActiveSubTab('overview')}
              className={`pb-3 text-sm font-semibold transition-all border-b-2 ${
                activeSubTab === 'overview'
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Architecture & Mission
            </button>
            <button
              onClick={() => setActiveSubTab('science')}
              className={`pb-3 text-sm font-semibold transition-all border-b-2 ${
                activeSubTab === 'science'
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Scientific Focus & Experiments
            </button>
            <button
              onClick={() => setActiveSubTab('tour')}
              className={`pb-3 text-sm font-semibold transition-all border-b-2 ${
                activeSubTab === 'tour'
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Virtual Station Tour (360°)
            </button>
          </div>

          {/* Subtab 1: Architecture & Mission */}
          {activeSubTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                <h4 className="text-base font-bold text-white">Facility Profile & Operational Role</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedStation.description}
                </p>

                <div className="pt-2">
                  <h5 className="text-xs uppercase font-bold tracking-wider text-cyan-400 mb-3">
                    Key Technological Highlights
                  </h5>
                  <div className="space-y-2">
                    {selectedStation.keyHighlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Current Deployment Status
                </h4>
                <div className="text-sm font-semibold text-white">
                  {selectedStation.currentExpedition}
                </div>

                <div className="space-y-2 pt-2 text-xs border-t border-slate-800">
                  <div className="flex justify-between text-slate-400">
                    <span>Power Generation:</span>
                    <span className="text-slate-200 font-mono">Combined Solar & Eco-Fuel Turbines</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Environmental Standard:</span>
                    <span className="text-emerald-400 font-semibold">Madrid Protocol Compliant</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Satellite Link:</span>
                    <span className="text-cyan-400 font-mono">ISRO Ground Terminal</span>
                  </div>
                  {selectedStation.iceThickness && (
                    <div className="flex justify-between text-slate-400">
                      <span>Cryosphere / Ice Metric:</span>
                      <span className="text-amber-300 font-mono">{selectedStation.iceThickness}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Subtab 2: Science Focus */}
          {activeSubTab === 'science' && (
            <div className="space-y-6">
              <p className="text-sm text-slate-300">
                Primary research domains conducted under NCPOR at {selectedStation.name}, supporting global climate modeling and Earth system science:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedStation.scientificFocus.map((focus, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20 flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 border border-cyan-500/30">
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{focus}</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Continuous observation data relayed directly to NCPOR headquarters in Vasco da Gama, Goa.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subtab 3: 360 Virtual View */}
          {activeSubTab === 'tour' && (
            <div className="relative rounded-xl overflow-hidden aspect-video bg-black/60 border border-cyan-500/30 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center mb-4 animate-pulse">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                360° Virtual Panoramic Immersion: {selectedStation.name}
              </h3>
              <p className="text-xs text-slate-300 max-w-md mt-2">
                Simulated 360° spherical view across the station perimeter, laboratory modules, and surrounding glaciers. Interactive mouse pan enabled.
              </p>
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 rounded bg-slate-800 text-cyan-300 text-xs font-mono">
                  Coordinates: {selectedStation.coordinates}
                </span>
                <span className="px-3 py-1 rounded bg-slate-800 text-emerald-300 text-xs font-mono">
                  Elevation: {selectedStation.elevation}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
