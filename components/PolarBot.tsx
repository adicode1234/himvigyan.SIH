'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  FileText, 
  Download, 
  Check, 
  ExternalLink, 
  Compass, 
  MapPin, 
  Calendar,
  Layers,
  Search,
  Building2,
  RefreshCw,
  PlusCircle
} from 'lucide-react';
import { REPOSITORY_DATA, RepositoryItem, POLAR_BOT_KNOWLEDGE } from '@/data/polarData';
import { DETAILED_EXPEDITIONS } from '@/data/expeditionsData';
import { triggerScientificDownload } from '@/utils/downloadHelper';
import ReportDetailModal from '@/components/ReportDetailModal';

interface PolarBotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReport?: (item: RepositoryItem) => void;
  onOpenContribute?: () => void;
  userContributions?: any[];
}

interface AuthorCardInfo {
  name: string;
  role: string;
  stationOrBase: string;
  domain: string;
  totalRecords: number;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  authorProfile?: AuthorCardInfo;
  relatedItems?: RepositoryItem[];
  suggestedAction?: {
    label: string;
    type: 'contribute' | 'repository' | 'expeditions';
  };
}

export default function PolarBot({ 
  isOpen, 
  onClose, 
  onOpenReport, 
  onOpenContribute,
  userContributions = [] 
}: PolarBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: "Namaste! I am HimVigyan AI, your National Polar & Ocean Assistant under MoES / NCPOR. \n\nYou can ask me anything about our stations (Bharati, Maitri, Himadri), expedition logistics, or type any scientist's name (e.g. Dr. Meenakshi, Dr. Vikramaditya) to view and download their official reports!",
      time: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);
  const [viewingReportItem, setViewingReportItem] = useState<RepositoryItem | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const quickQuestions = [
    "Dr. Meenakshi Reports",
    "Dr. Vikramaditya Compendium",
    "Dr. Meloth Ice Core Data",
    "Bharati Station Weather",
    "How to join Indian Expedition?",
    "Arctic link to Indian Monsoon"
  ];

  const findItemsForQuery = (query: string): { items: RepositoryItem[], authorInfo?: AuthorCardInfo } => {
    const q = query.toLowerCase().trim();

    const scientistProfiles: { [key: string]: AuthorCardInfo } = {
      'meenakshi': {
        name: 'Dr. Meenakshi Sundaram',
        role: 'Chief Scientist & Lead Oceanographer',
        stationOrBase: 'SA Agulhas II Vessel / Southern Ocean',
        domain: 'Ocean Biogeochemistry & Carbon Dynamics',
        totalRecords: 2
      },
      'vikramaditya': {
        name: 'Dr. Vikramaditya Sen',
        role: 'Expedition Leader (43rd ISEA)',
        stationOrBase: 'Bharati & Maitri Stations, Antarctica',
        domain: 'Antarctic Cryosphere & Ice Sheet Mass Balance',
        totalRecords: 3
      },
      'sen': {
        name: 'Dr. Vikramaditya Sen',
        role: 'Expedition Leader (43rd ISEA)',
        stationOrBase: 'Bharati & Maitri Stations, Antarctica',
        domain: 'Antarctic Cryosphere & Ice Sheet Mass Balance',
        totalRecords: 3
      },
      'rajesh': {
        name: 'Dr. Rajesh Kumar',
        role: 'Senior Cryosphere Scientist',
        stationOrBase: 'Himansh Station, Chandra Basin (Himalayas)',
        domain: 'Glacial Mass Balance & High-Altitude Glaciology',
        totalRecords: 2
      },
      'meloth': {
        name: 'Dr. Thamban Meloth',
        role: 'Group Director / Senior Scientist',
        stationOrBase: 'Ice Core Laboratory, NCPOR Goa / Maitri',
        domain: 'Ice Core Paleoclimatology & Trace Gas Chemistry',
        totalRecords: 2
      },
      'thamban': {
        name: 'Dr. Thamban Meloth',
        role: 'Group Director / Senior Scientist',
        stationOrBase: 'Ice Core Laboratory, NCPOR Goa / Maitri',
        domain: 'Ice Core Paleoclimatology & Trace Gas Chemistry',
        totalRecords: 2
      },
      'parashar': {
        name: 'Dr. K. S. Parashar',
        role: 'Project Director, Arctic Division',
        stationOrBase: 'Himadri Station, Ny-Ålesund, Svalbard',
        domain: 'Arctic Atmospheric Physics & Permafrost Dynamics',
        totalRecords: 2
      },
      'yogesh': {
        name: 'Dr. Yogesh Ray',
        role: 'Expedition Leader, 42nd ISEA',
        stationOrBase: 'Bharati Station, Antarctica',
        domain: 'Antarctic Logistics & Earth Sciences',
        totalRecords: 1
      },
      'alok': {
        name: 'Er. Alok Sharma',
        role: 'Station Leader & Polar Engineer',
        stationOrBase: 'Maitri Station (Schirmacher Oasis)',
        domain: 'Polar Engineering & Station Telemetry',
        totalRecords: 1
      },
      'krishnan': {
        name: 'Dr. K. P. Krishnan',
        role: 'Senior Scientist, Arctic Marine Ecology',
        stationOrBase: 'Himadri Station, Ny-Ålesund',
        domain: 'Polar Marine Microbiology & Kongsfjorden Genomics',
        totalRecords: 1
      },
      'tripathy': {
        name: 'Dr. S. C. Tripathy',
        role: 'Senior Scientist, Ocean Sciences',
        stationOrBase: 'SA Agulhas II Vessel',
        domain: 'Phytoplankton Ecology & Biological Carbon Pump',
        totalRecords: 1
      },
      'neelu': {
        name: 'Dr. Neelu Singh',
        role: 'Expedition Leader (44th ISEA)',
        stationOrBase: 'Maitri & Bharati Bases',
        domain: 'Antarctic Glaciology & Geophysics',
        totalRecords: 1
      },
      'anand': {
        name: 'Dr. Anand Jain',
        role: 'Mooring Project Scientist',
        stationOrBase: 'IndARC Underwater Mooring (Kongsfjorden)',
        domain: 'Physical Oceanography & Arctic Sub-surface Telemetry',
        totalRecords: 1
      }
    };

    const allRepoItems = [...REPOSITORY_DATA];

    userContributions.forEach(uc => {
      allRepoItems.unshift({
        id: uc.id,
        title: uc.title,
        type: uc.type,
        region: uc.region || 'Antarctica',
        year: new Date().getFullYear(),
        date: uc.date || 'Recent',
        authorsOrLead: uc.leadScientist || uc.authorsOrLead || 'Lead Scientist',
        doi: uc.doi || '10.5281/ncpor.live.2025',
        fileSize: uc.fileSize || '12.4 MB',
        format: uc.format || 'PDF',
        downloads: uc.downloads || 0,
        tags: uc.tags || ['User Upload', 'Polar Research'],
        summary: uc.summary || 'User contributed research asset in MoES central repository.',
        fullAbstract: uc.fullAbstract || uc.summary || '',
        mediaUrl: uc.mediaUrl || uc.thumbnailUrl,
        station: uc.station || 'Bharati Station',
        isUserUploaded: true
      } as any);
    });

    let matchedProfile: AuthorCardInfo | undefined;
    for (const [key, profile] of Object.entries(scientistProfiles)) {
      if (q.includes(key)) {
        matchedProfile = profile;
        break;
      }
    }

    const matches = allRepoItems.filter(item => {
      const auth = (item.authorsOrLead || '').toLowerCase();
      const titl = (item.title || '').toLowerCase();
      const tags = (item.tags || []).join(' ').toLowerCase();
      const summ = (item.summary || '').toLowerCase();
      const stat = (item.station || '').toLowerCase();

      if (matchedProfile) {
        const lastName = matchedProfile.name.split(' ').pop()?.toLowerCase() || '';
        const firstName = matchedProfile.name.split(' ')[1]?.toLowerCase() || '';
        if (auth.includes(lastName) || auth.includes(firstName) || titl.includes(lastName)) {
          return true;
        }
      }

      const tokens = q.split(/\s+/).filter(t => t.length > 2);
      if (tokens.some(t => auth.includes(t))) return true;
      if (tokens.some(t => titl.includes(t))) return true;
      if (tokens.some(t => tags.includes(t))) return true;
      if (tokens.some(t => stat.includes(t))) return true;

      return false;
    });

    if (matches.length === 0 && matchedProfile) {
      DETAILED_EXPEDITIONS.forEach(exp => {
        if (exp.lead.toLowerCase().includes(matchedProfile!.name.split(' ').pop()!.toLowerCase())) {
          exp.reports.forEach(rep => {
            matches.push({
              id: rep.id,
              title: rep.title,
              type: 'Report',
              region: exp.region,
              year: parseInt(exp.dates?.match(/\d{4}/)?.[0] || '2024') || 2024,
              date: exp.dates || '2024',
              authorsOrLead: rep.author,
              doi: rep.docCode,
              fileSize: rep.fileSize,
              format: 'PDF',
              downloads: 1840,
              tags: [exp.code, exp.region, rep.type],
              summary: `Official ${rep.type} document for expedition ${exp.code} (${exp.title}) authored by ${rep.author}.`,
              fullAbstract: `Approved by Ministry of Earth Sciences (MoES) and archived at NCPOR. Document code: ${rep.docCode}.`,
              station: exp.vesselOrBase,
              bannerImage: exp.imageUrl
            } as any);
          });
        }
      });
    }

    return { items: matches.slice(0, 4), authorInfo: matchedProfile };
  };

  const handleDownloadItem = (item: RepositoryItem) => {
    setDownloadSuccessId(item.id);
    triggerScientificDownload({
      id: item.id,
      title: item.title,
      authorsOrLead: item.authorsOrLead,
      doi: item.doi,
      expedition: item.region,
      station: item.station,
      format: item.format,
      type: item.type,
      summary: item.summary,
      fullAbstract: item.fullAbstract,
      mediaUrl: item.mediaUrl,
      date: item.date,
      fileSize: item.fileSize
    });
    setTimeout(() => setDownloadSuccessId(null), 2500);
  };

  const handleViewReport = (item: RepositoryItem) => {
    if (onOpenReport) {
      onOpenReport(item);
    } else {
      setViewingReportItem(item);
    }
  };

  const handleSend = (queryToSend?: string) => {
    const q = queryToSend || inputQuery;
    if (!q.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: q,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryToSend) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = q.toLowerCase().trim();
      const { items: matchedItems, authorInfo } = findItemsForQuery(lower);

      let botResponseText = '';
      let authorProfileToSend: AuthorCardInfo | undefined = authorInfo;
      let itemsToSend: RepositoryItem[] | undefined = matchedItems.length > 0 ? matchedItems : undefined;
      let actionSuggestionToSend: { label: string; type: 'contribute' | 'repository' | 'expeditions' } | undefined = undefined;

      if (authorInfo && matchedItems.length > 0) {
        botResponseText = `Found official records and expedition compendiums for **${authorInfo.name}** in the MoES / NCPOR National Polar Archives.\n\nHere are the archived scientific reports, cruise documentation, and datasets authored/led by this scientist:`;
      } 
      else if (
        (lower.includes('dr.') || lower.includes('dr ') || lower.includes('scientist') || lower.includes('author') || lower.includes('report by') || lower.includes('paper by')) && 
        matchedItems.length === 0
      ) {
        botResponseText = `I searched our National Polar & Ocean Database for the scientist name mentioned, but no archived MoES reports match that exact name in our current index.\n\nIf this is a recent field mission or preprint, you can submit new reports, telemetry datasets, or cruise compendiums using our **Scientist Contribution Portal**!`;
        actionSuggestionToSend = {
          label: 'Submit Document to NCPOR Repository',
          type: 'contribute'
        };
      }
      else if (matchedItems.length > 0) {
        botResponseText = `Here is the relevant scientific documentation and research records found for **"${q}"** from the MoES / NCPOR repository:`;
      }
      else if (lower.includes('weather') || lower.includes('temperature') || lower.includes('cold') || lower.includes('climate')) {
        botResponseText = `📡 **Current Polar Telemetry Feed (MoES / NCPOR Automated Weather Stations):**\n\n` +
          `• **Bharati Station (Larsemann Hills, 69°S):** -18.4°C, Wind: 34 knots (ENE), Surface Pressure: 984 hPa. Status: Normal Operations.\n` +
          `• **Maitri Station (Schirmacher Oasis, 70°S):** -22.1°C, Wind: 22 knots (SE), Low Blizzard Alert.\n` +
          `• **Himadri Station (Ny-Ålesund, Arctic 79°N):** -6.4°C, Calm Fjords, Marine Mooring IndARC logging active.\n` +
          `• **Himansh Station (Chandra Basin, Himalayas 4,000m):** -12.8°C, Clear skies, Glacier ablation sensors transmitting.\n\n` +
          `Telemetry is synchronized via Indian GSAT & Inmarsat satellite relays to NCPOR Headquarters in Goa.`;
      }
      else if (lower.includes('bharati')) {
        botResponseText = `🇮🇳 **Bharati Station (India's 3rd Antarctic Base):**\n\n` +
          `Commissioned in March 2012 at Larsemann Hills (East Antarctica, 69°24'S, 76°11'E), Bharati is a modern, environmentally regulated station built from 134 prefabricated ISO containers.\n\n` +
          `• **Key Research:** Atmospheric chemistry, solar-terrestrial physics, satellite remote sensing (NRSC ground station), and paleoclimatic studies.\n` +
          `• **Capacity:** Accommodates 47 personnel during summer and 25 over-wintering crew.\n` +
          `• **Environmental Compliance:** Regulated strictly under the Antarctic Treaty Environmental Protocol (Madrid Protocol 1991).`;
      }
      else if (lower.includes('maitri')) {
        botResponseText = `🇮🇳 **Maitri Station (India's 2nd Permanent Antarctic Base):**\n\n` +
          `Established in 1989 on the rocky Schirmacher Oasis (70°45'S, 11°44'E), Maitri has supported over 35 years of continuous year-round scientific experiments.\n\n` +
          `• **Key Studies:** High-resolution ice core chemistry, geomagnetism, atmospheric boundary layer physics, and human physiology in extreme cold.\n` +
          `• **Freshwater Source:** Lake Priyadarshini adjacent to the base.\n` +
          `• **Logistics:** Serviced annually by chartered ice-class vessels sailing from Cape Town / Durban.`;
      }
      else if (lower.includes('himadri')) {
        botResponseText = `🇮🇳 **Himadri Station (India's Arctic Base in Ny-Ålesund, Svalbard, 79°N):**\n\n` +
          `Dedicated to the nation in July 2008, Himadri enables Indian researchers to investigate Arctic atmospheric warming, aerosol optical depth, and the Kongsfjorden fjord ecosystem.\n\n` +
          `• **Monsoon Connection:** Changes in Arctic sea ice directly modulate the Arctic Oscillation and Rossby wave trains, influencing the variability and onset of the Indian Summer Monsoon.\n` +
          `• **Subsurface Mooring:** Houses IndARC, India's deep underwater mooring anchored at 192m depth since 2014.`;
      }
      else if (lower.includes('dakshin gangotri')) {
        botResponseText = `❄️ **Dakshin Gangotri (India's 1st Antarctic Base):**\n\n` +
          `Established during the 3rd Indian Scientific Expedition (1983-84) on the ice shelf of Queen Maud Land. It served as India's wintering station until 1990, when it was gradually submerged beneath accumulating snow. It is now preserved as an officially designated historic site under the Antarctic Treaty.`;
      }
      else if (lower.includes('join') || lower.includes('apply') || lower.includes('participate') || lower.includes('eligibility')) {
        botResponseText = `🏔️ **How to Join an Indian Scientific Expedition (MoES / NCPOR Procedure):**\n\n` +
          `1. **Call for Research Proposals:** NCPOR releases the official National Call for Proposals annually between April and June on the official portal.\n` +
          `2. **Peer Review & Steering Committee:** Proposals are evaluated by the MoES Polar Science Committee for scientific merit and national priority.\n` +
          `3. **Medical Fitness Screening:** Shortlisted researchers undergo rigorous multi-phase medical clearances at the Institute of Aerospace Medicine (IAM, IAF Bengaluru) and AIIMS.\n` +
          `4. **Snow & Ice Acclimatization:** Wintering teams complete high-altitude, extreme survival and avalanche training at the ITBP Mountaineering Institute in Auli (Uttarakhand).\n` +
          `5. **Embarkation:** Deployment departs in November/December aboard chartered polar vessels (SA Agulhas II) from Cape Town to Antarctica.`;
      }
      else if (lower.includes('agulhas') || lower.includes('ship') || lower.includes('vessel')) {
        botResponseText = `🚢 **R/V S.A. Agulhas II (Indian Polar Expedition Flagship):**\n\n` +
          `An ice-strengthened Polar Class 5 research and supply vessel utilized by MoES / NCPOR for Antarctic relief voyages and dedicated Southern Ocean multi-disciplinary cruises.\n\n` +
          `• **Length:** 134 meters | **Ice Breaking:** 1 meter of level ice at 5 knots.\n` +
          `• **Scientific Facilities:** 8 on-board clean analytical laboratories, CTD rosette cranes, multibeam sonar, acoustic Doppler current profilers (ADCP), and double helicopter hangar.`;
      }
      else if (
        lower.includes('hello') || lower.includes('hi') || lower.includes('namaste') || 
        lower.includes('hey') || lower.includes('kaise') || lower.includes('haal')
      ) {
        botResponseText = `Namaste! I am PolarVision AI, ready to assist your research. \n\nAsk me about:\n• Any scientist's reports (e.g. *"Dr. Meenakshi"*, *"Dr. Vikramaditya"*)\n• Current weather telemetry across Bharati & Maitri\n• Expedition reports, datasets, and cruise logs\n• How to apply for polar missions under MoES!`;
      }
      else if (lower.includes('who made you') || lower.includes('who are you') || lower.includes('tum kaun ho')) {
        botResponseText = `I am **PolarVision AI**, the specialized AI Dissemination and Knowledge Assistant of the **National Centre for Polar and Ocean Research (NCPOR)**, Ministry of Earth Sciences, Govt. of India. I am directly connected to our national scientific archives, expeditional compendiums, and telemetry sensors.`;
      }
      else {
        botResponseText = `Here is information on **"${q}"** from the MoES / NCPOR Polar & Oceanic Archives:\n\n` +
          `Under India's national polar program, multidisciplinary scientific observations are conducted continuously across the cryosphere, polar atmosphere, physical oceanography, and marine biogeochemistry.\n\n` +
          `All verified cruise compendiums, sensor telemetry, and peer-reviewed outputs are cataloged under FAIR open-data principles with assigned DOIs by the Ministry of Earth Sciences.\n\n` +
          `💡 **Quick Tip:** You can also type any scientist's name (e.g., *"Dr. Meenakshi"*, *"Dr. Vikramaditya"*, *"Dr. Meloth"*) to instantly view and download their official reports!`;
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        authorProfile: authorProfileToSend,
        relatedItems: itemsToSend,
        suggestedAction: actionSuggestionToSend
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:pr-8 sm:pb-8 p-3 bg-black/60 backdrop-blur-sm animate-fadeIn">
        <div className="w-full max-w-lg h-[640px] rounded-3xl polar-glass border border-cyan-500/40 shadow-2xl flex flex-col overflow-hidden bg-[#07101e] text-white">
          
          {/* Chat Header */}
          <div className="p-4 bg-gradient-to-r from-[#091b33] via-[#0d284d] to-[#091b33] border-b border-cyan-500/30 flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 shadow ring-1 ring-cyan-400/50 bg-[#06152b] p-0.5">
                <img src="/himvigyan-crest.png" alt="HimVigyan AI" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-sm">HimVigyan AI Assistant</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <p className="text-[11px] text-cyan-300 font-medium">Grounded in NCPOR & MoES Central Archives</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors"
              title="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Message History */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mt-0.5 ring-1 ring-cyan-400/40 bg-[#06152b] p-0.5">
                    <img src="/himvigyan-crest.png" alt="HimVigyan AI" className="w-full h-full object-contain" />
                  </div>
                )}

                <div className={`max-w-[88%] space-y-2.5 ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  {/* Text Bubble */}
                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-md'
                        : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                    }`}
                  >
                    <p>{m.text}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block text-right font-mono">
                      {m.time}
                    </span>
                  </div>

                  {/* Author Profile Header Card if scientist recognized */}
                  {m.authorProfile && (
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-[#0c2035] to-[#091524] border border-cyan-500/40 shadow-lg space-y-2 text-white animate-fadeIn">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center shrink-0">
                          <User className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-white text-xs truncate">{m.authorProfile.name}</h4>
                            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              MoES Verified
                            </span>
                          </div>
                          <p className="text-[10px] text-cyan-300 truncate">{m.authorProfile.role}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-300 pt-1 border-t border-slate-800">
                        <div className="flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span className="truncate">{m.authorProfile.stationOrBase}</span>
                        </div>
                        <div className="flex items-center gap-1 truncate justify-end">
                          <Layers className="w-3 h-3 text-sky-400 shrink-0" />
                          <span className="truncate">{m.authorProfile.domain}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Related Interactive Report / Dataset Cards */}
                  {m.relatedItems && m.relatedItems.length > 0 && (
                    <div className="space-y-2 w-full animate-fadeIn">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1 px-1">
                        <FileText className="w-3 h-3" />
                        <span>Official Documents & Reports ({m.relatedItems.length})</span>
                      </div>

                      {m.relatedItems.map((item) => {
                        const isDownloaded = downloadSuccessId === item.id;
                        return (
                          <div
                            key={item.id}
                            className="p-3 rounded-2xl bg-[#0c1a2d] border border-cyan-500/30 hover:border-cyan-400 shadow-md text-white space-y-2 transition-all group"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                item.type === 'Report' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                                item.type === 'Dataset' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                                'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                              }`}>
                                {item.type}
                              </span>

                              <span className="text-[10px] font-mono text-cyan-300/80 truncate">
                                {item.doi || 'DOI: 10.5281/ncpor'}
                              </span>
                            </div>

                            <h5 className="font-bold text-xs text-white leading-snug line-clamp-2 group-hover:text-cyan-300 transition-colors">
                              {item.title}
                            </h5>

                            <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                              {item.summary}
                            </p>

                            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                              <span className="truncate max-w-[140px]">
                                {item.authorsOrLead}
                              </span>
                              <span>{item.fileSize} • {item.format}</span>
                            </div>

                            {/* Dual In-Chat Action Buttons */}
                            <div className="flex items-center gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() => handleViewReport(item)}
                                className="flex-1 py-1.5 px-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-semibold text-[11px] border border-cyan-500/35 flex items-center justify-center gap-1.5 transition-all shadow-xs"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>View Full Report</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDownloadItem(item)}
                                className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-[11px] border border-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-xs shrink-0"
                                title="Download PDF Compendium"
                              >
                                {isDownloaded ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="text-emerald-400">Done</span>
                                  </>
                                ) : (
                                  <>
                                    <Download className="w-3 h-3 text-slate-300" />
                                    <span>Download</span>
                                  </>
                                )}
                              </button>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Action Suggestion button if any */}
                  {m.suggestedAction && (
                    <button
                      type="button"
                      onClick={() => {
                        if (m.suggestedAction?.type === 'contribute' && onOpenContribute) {
                          onOpenContribute();
                          onClose();
                        }
                      }}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>{m.suggestedAction.label}</span>
                    </button>
                  )}
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-blue-900 border border-blue-600 flex items-center justify-center text-white shrink-0 text-xs mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-cyan-400 italic animate-pulse">
                <Bot className="w-4 h-4" />
                <span>PolarVision AI is reviewing MoES archives & telemetry...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Pills */}
          <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800/80 shrink-0">
            <p className="text-[10px] text-slate-400 uppercase font-semibold mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Suggested Queries & Scientists:</span>
            </p>
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(q)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-900 hover:bg-cyan-950/80 border border-slate-700/80 hover:border-cyan-500/50 text-cyan-300 hover:text-white transition-colors shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#050b14] border-t border-slate-800 flex gap-2 shrink-0">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything or enter a scientist name (e.g. Dr. Meenakshi)..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 shadow-inner"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors flex items-center justify-center shadow-md active:scale-95 shrink-0"
              title="Send Query"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Embedded Scenic Report Detail Modal if clicked from within PolarBot */}
      {viewingReportItem && (
        <ReportDetailModal
          item={viewingReportItem}
          onClose={() => setViewingReportItem(null)}
          onSelectForAI={() => {}}
        />
      )}
    </>
  );
}
