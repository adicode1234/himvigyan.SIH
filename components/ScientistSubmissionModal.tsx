'use client';

import React, { useState, useRef } from 'react';
import { 
  X, 
  UploadCloud, 
  CheckCircle2, 
  Sparkles, 
  Compass, 
  Building2, 
  Users, 
  ShieldCheck, 
  Cpu, 
  ExternalLink,
  Layers,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Camera,
  Film,
  Image as ImageIcon,
  Trash2
} from 'lucide-react';

interface ScientistSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitted: (data: any) => void;
}

export default function ScientistSubmissionModal({ isOpen, onClose, onSubmitted }: ScientistSubmissionModalProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  // Core Identifiers
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Dataset');
  const [region, setRegion] = useState('Antarctica');
  
  // Interconnection Fields
  const [expedition, setExpedition] = useState('43rd Indian Scientific Expedition to Antarctica (43-ISEA)');
  const [station, setStation] = useState('Bharati Station (Larsemann Hills)');
  
  // Authorship
  const [lead, setLead] = useState('');
  const [coAuthors, setCoAuthors] = useState('');
  
  // Scientific Metadata & Licensing
  const [tags, setTags] = useState('Glaciology, Climate');
  const [license, setLicense] = useState('CC-BY 4.0 Open Access (Recommended)');
  const [equipment, setEquipment] = useState('');
  const [summary, setSummary] = useState('');
  
  // Target Audience pills
  const audienceOptions = [
    'Peer Scientists & Labs',
    'Universities & PhD Scholars',
    'Schools & Citizen Outreach',
    'Media & Press Releases'
  ];
  const [targetAudience, setTargetAudience] = useState<string[]>([
    'Peer Scientists & Labs',
    'Universities & PhD Scholars'
  ]);

  // File Upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const [fileKind, setFileKind] = useState<'photo' | 'video' | 'document' | 'dataset' | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const processSelectedFile = (file: File) => {
    setFileName(file.name);
    setUploadedFile(file);

    const blobUrl = URL.createObjectURL(file);
    setFileUrl(blobUrl);

    const lowerName = file.name.toLowerCase();
    const isImage = file.type.startsWith('image/') || /\.(jpg|jpeg|png|webp|svg|gif|bmp)$/i.test(lowerName);
    const isVideo = file.type.startsWith('video/') || /\.(mp4|mov|avi|webm|mkv|m4v)$/i.test(lowerName);
    const isDoc = file.type === 'application/pdf' || /\.pdf$/i.test(lowerName);
    const isData = /\.(csv|nc|xlsx|xls|tsv|txt|json)$/i.test(lowerName);

    if (isImage) {
      setFileKind('photo');
      setType('Photo');
      setPreviewUrl(blobUrl);
      if (!thumbnailUrl) {
        setThumbnailUrl(blobUrl);
        setThumbnailFileName(file.name);
      }
    } else if (isVideo) {
      setFileKind('video');
      setType('Video');
      setPreviewUrl(null);
    } else if (isDoc) {
      setFileKind('document');
      setPdfUrl(blobUrl);
      setPreviewUrl(null);
      if (type === 'Photo' || type === 'Video') {
        setType('Report');
      }
    } else if (isData) {
      setFileKind('dataset');
      setPreviewUrl(null);
      if (type === 'Photo' || type === 'Video') {
        setType('Dataset');
      }
    }
  };

  const processSelectedFiles = (files: FileList | File[]) => {
    const fileList = Array.from(files);
    if (fileList.length === 0) return;

    const first = fileList[0];
    processSelectedFile(first);

    const imageFiles = fileList.filter(f => f.type.startsWith('image/') || /\.(jpg|jpeg|png|webp|svg|gif|bmp)$/i.test(f.name.toLowerCase()));
    if (imageFiles.length > 0) {
      const urls = imageFiles.map(f => URL.createObjectURL(f));
      setUploadedImages(urls);
      if (imageFiles.length > 1) {
        setFileName(`${imageFiles.length} photos selected (${first.name}, +${imageFiles.length - 1} more)`);
      }
    }
  };

  // Thumbnail / Cover Image Selection
  const thumbInputRef = useRef<HTMLInputElement>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [thumbnailFileName, setThumbnailFileName] = useState<string>('');
  const [thumbTab, setThumbTab] = useState<'preset' | 'upload'>('preset');
  const [isThumbDragging, setIsThumbDragging] = useState(false);

  // Curated high-resolution polar thumbnail presets
  const polarPresets = [
    {
      id: 'polar-ice',
      label: 'Antarctic Icefield',
      url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'polar-vessel',
      label: 'SA Agulhas II Vessel',
      url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'polar-aurora',
      label: 'Arctic Aurora Station',
      url: 'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'polar-glacier',
      label: 'Himalayan Cryosphere',
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'polar-marine',
      label: 'Polar Marine Ecology',
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'polar-iceberg',
      label: 'Blue Tabular Shelf',
      url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const processThumbnailFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (.jpg, .png, .webp) for the thumbnail.');
      return;
    }
    const blobUrl = URL.createObjectURL(file);
    setThumbnailUrl(blobUrl);
    setThumbnailFileName(file.name);
  };

  // Automations
  const [autoDOI, setAutoDOI] = useState(true);
  const [queueAI, setQueueAI] = useState(true);
  const [syncProfile, setSyncProfile] = useState(true);

  // Submission State
  const [submitted, setSubmitted] = useState(false);
  const [generatedDOI, setGeneratedDOI] = useState('');

  if (!isOpen) return null;

  const toggleAudience = (item: string) => {
    setTargetAudience(prev => 
      prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !lead) return;

    const prefix = region === 'Antarctica' ? 'ant' : region === 'Arctic' ? 'arc' : region === 'Himalayas' ? 'him' : 'soe';
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const newDOI = `10.5281/ncpor.${prefix}.${new Date().getFullYear()}.${randNum}`;
    setGeneratedDOI(newDOI);

    setSubmitted(true);
    setTimeout(() => {
      onSubmitted({
        title,
        type,
        fileKind: fileKind || (type === 'Photo' ? 'photo' : type === 'Video' ? 'video' : fileName.toLowerCase().endsWith('.pdf') ? 'document' : undefined),
        mediaKind: (type === 'Photo' || fileKind === 'photo') ? 'photo' : (type === 'Video' || fileKind === 'video') ? 'video' : undefined,
        region,
        expedition,
        station,
        authorsOrLead: lead,
        coAuthors,
        license,
        equipment,
        summary,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        targetAudience,
        fileName,
        fileUrl: fileUrl || undefined,
        pdfUrl: pdfUrl || (fileName.toLowerCase().endsWith('.pdf') ? (fileUrl || undefined) : undefined),
        mediaUrl: thumbnailUrl || previewUrl || undefined,
        thumbnailUrl: thumbnailUrl || previewUrl || undefined,
        bannerImage: thumbnailUrl || previewUrl || undefined,
        images: uploadedImages.length > 0 ? uploadedImages : undefined,
        doi: newDOI,
        autoDOI,
        queueAI,
        syncProfile
      });
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto border border-cyan-500/30 rounded-2xl p-5 sm:p-7 shadow-2xl bg-[#0E2233] text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with Official Emblem */}
        <div className="flex items-center gap-3.5 mb-2">
          <div className="w-12 h-12 flex items-center justify-center shrink-0">
            <img
              src="/polar-logo.png"
              alt="NCPOR Polar Crest"
              className="w-full h-full object-contain drop-shadow"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Scientist & Outreach Contribution Portal
            </h2>
            <p className="text-xs text-cyan-300 font-medium">
              National Centre for Polar and Ocean Research (NCPOR) • Ministry of Earth Sciences
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-5 leading-relaxed">
          Submit newly concluded expedition logs, field sensor datasets, peer-reviewed preprints, or media assets. 
          Your authentic file is preserved, assigned an official FAIR DOI, and archived in the MoES repository.
        </p>

        {submitted ? (
          <div className="py-14 flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
            <div className="relative">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-bounce" />
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full"></div>
            </div>
            
            <h3 className="text-2xl font-bold text-white">Document Successfully Archived!</h3>
            
            <div className="bg-slate-900/90 border border-cyan-500/30 rounded-xl p-4 max-w-lg text-left text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400 font-medium">Assigned FAIR DOI:</span>
                <span className="font-mono text-cyan-300 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                  {generatedDOI}
                </span>
              </div>
              {fileName && (
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400 font-medium">Archived File:</span>
                  <span className="text-white font-mono truncate max-w-[280px]">{fileName}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400 font-medium">Linked Expedition:</span>
                <span className="text-white font-semibold truncate max-w-[280px]">{expedition}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400 font-medium">Operating Station:</span>
                <span className="text-emerald-400 font-semibold">{station}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 max-w-md leading-relaxed">
              Your authentic file has been published to the repository and synced to your <strong className="text-white">Scientist Profile</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-xs">
            
            {/* Field 1: Title (Essential) */}
            <div>
              <label className="block text-slate-200 font-semibold mb-1.5">
                Record Title / Project Name <span className="text-cyan-400 font-bold">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 44th ISEA Larsemann Hills Aerosol Optical Depth Observations"
                className="w-full px-4 py-2.5 rounded-xl bg-[#16303F] border border-cyan-500/25 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:bg-[#1a3b4d] focus:ring-1 focus:ring-cyan-400/50 text-xs shadow-inner transition-all"
              />
            </div>

            {/* Field 2 & 3: Category & Geographic Domain (Essential) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-200 font-semibold mb-1.5">
                  Repository Category <span className="text-cyan-400 font-bold">*</span>
                </label>
                <select
                  value={type}
                  onChange={(e) => {
                    const newType = e.target.value;
                    setType(newType);
                    if (newType === 'Photo') setFileKind('photo');
                    else if (newType === 'Video') setFileKind('video');
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#16303F] border border-cyan-500/25 text-white focus:outline-none focus:border-cyan-400 focus:bg-[#1a3b4d] focus:ring-1 focus:ring-cyan-400/50 text-xs transition-all cursor-pointer"
                >
                  <option value="Dataset">Scientific Dataset (CSV / NetCDF)</option>
                  <option value="Report">Expedition Report & Field Log (PDF)</option>
                  <option value="Publication">Peer-Reviewed Publication (PDF)</option>
                  <option value="Photo">High-Res Photograph (Image / Drone Shot)</option>
                  <option value="Video">Expedition Video / Field Footage (MP4)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-1.5">
                  Polar / Oceanic Domain <span className="text-cyan-400 font-bold">*</span>
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#16303F] border border-cyan-500/25 text-white focus:outline-none focus:border-cyan-400 focus:bg-[#1a3b4d] focus:ring-1 focus:ring-cyan-400/50 text-xs transition-all cursor-pointer"
                >
                  <option value="Antarctica">Antarctica (Bharati / Maitri)</option>
                  <option value="Arctic">Arctic (Himadri / Svalbard)</option>
                  <option value="Himalayas">Himalayas (Himansh Station)</option>
                  <option value="Southern Ocean">Southern Ocean (ORV Sagar Kanya)</option>
                </select>
              </div>
            </div>

            {/* Field 4: Lead Scientist (Essential) */}
            <div>
              <label className="block text-slate-200 font-semibold mb-1.5">
                Principal Investigator / Lead Scientist <span className="text-cyan-400 font-bold">*</span>
              </label>
              <input
                type="text"
                required
                value={lead}
                onChange={(e) => setLead(e.target.value)}
                placeholder="e.g. Dr. Rajesh Kumar, NCPOR"
                className="w-full px-4 py-2.5 rounded-xl bg-[#16303F] border border-cyan-500/25 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:bg-[#1a3b4d] focus:ring-1 focus:ring-cyan-400/50 text-xs shadow-inner transition-all"
              />
            </div>

            {/* Field 5: Executive Abstract (Essential) */}
            <div>
              <label className="block text-slate-200 font-semibold mb-1.5">
                Executive Abstract & Key Takeaway <span className="text-cyan-400 font-bold">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Briefly describe what this dataset or report measures, key findings, and scientific significance..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#16303F] border border-cyan-500/25 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:bg-[#1a3b4d] focus:ring-1 focus:ring-cyan-400/50 text-xs shadow-inner transition-all resize-none"
              />
            </div>

            {/* Field 6: File Drag/Drop area (Essential - Click ANYWHERE to open file dialog) */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  processSelectedFiles(e.dataTransfer.files);
                }
              }}
              className={`p-5 rounded-2xl border-2 border-dashed transition-all text-center cursor-pointer select-none group relative overflow-hidden ${
                isDragging
                  ? 'border-cyan-400 bg-cyan-950/60 shadow-xl shadow-cyan-950/60 scale-[1.01]'
                  : 'border-cyan-500/35 bg-[#142838]/70 hover:border-cyan-400 hover:bg-[#183448] hover:shadow-lg hover:shadow-cyan-950/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                accept=".nc,.csv,.pdf,.mp4,.mov,.png,.jpg,.jpeg,.webp,.xlsx,.txt"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    processSelectedFiles(e.target.files);
                  }
                }}
              />

              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 group-hover:bg-cyan-500/25 group-hover:border-cyan-400 transition-all shadow-xs">
                {fileKind === 'photo' ? (
                  <Camera className="w-6 h-6 text-sky-400" />
                ) : fileKind === 'video' ? (
                  <Film className="w-6 h-6 text-indigo-400" />
                ) : (
                  <UploadCloud className="w-6 h-6" />
                )}
              </div>

              <p className="text-slate-100 font-bold text-xs sm:text-sm">
                Drag & drop dataset, document, photo(s) or video, or <span className="text-cyan-300 underline decoration-cyan-400/50 underline-offset-2 group-hover:text-cyan-200">click anywhere to browse</span>
              </p>
              <p className="text-[11px] text-slate-300 mt-1">
                Supports Multiple Images (.jpg, .png), Videos (.mp4, .mov), Datasets (.csv, .nc), Reports (.pdf) up to 500 MB.
              </p>

              {fileName ? (
                <div className="mt-3 flex flex-col items-center justify-center gap-2">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-xs font-mono shadow-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-semibold">{fileName}</span>
                      <span className="text-[10px] text-slate-400">
                        ({uploadedFile ? `${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB` : 'Ready'})
                      </span>
                    </div>
                    {fileKind === 'photo' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/40 text-[11px] font-semibold shadow-xs">
                        <Camera className="w-3.5 h-3.5 text-sky-400" />
                        {uploadedImages.length > 1 ? `${uploadedImages.length} High-Res Photos` : 'High-Res Photograph'}
                      </span>
                    )}
                    {fileKind === 'video' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 text-[11px] font-semibold shadow-xs">
                        <Film className="w-3.5 h-3.5 text-indigo-400" />
                        Expedition Video Footage
                      </span>
                    )}
                  </div>

                  {/* Multi-Photo Preview Strip inside submission modal */}
                  {uploadedImages.length > 1 && (
                    <div className="mt-2 flex items-center justify-center gap-2 overflow-x-auto max-w-full p-2 rounded-xl bg-slate-900/60 border border-cyan-500/20">
                      {uploadedImages.slice(0, 6).map((img, i) => (
                        <div key={i} className="w-12 h-10 rounded-lg overflow-hidden border border-cyan-400/40 shrink-0 bg-black">
                          <img src={img} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                      {uploadedImages.length > 6 && (
                        <span className="text-[11px] text-cyan-300 font-bold px-2">
                          +{uploadedImages.length - 6} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-[11px] font-semibold border border-cyan-500/35 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors shadow-xs">
                    Choose file (Click here or anywhere in box)
                  </span>
                </div>
              )}
            </div>

            {/* Field 7: Dedicated Thumbnail / Cover Image Selector */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#142938]/70 border border-cyan-500/25 space-y-3.5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-500/35 shrink-0">
                    <Camera className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <label className="text-slate-100 font-bold text-xs flex items-center gap-2">
                      <span>Thumbnail / Cover Image</span>
                      <span className="text-[10px] text-cyan-300 font-medium px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30">
                        Optional • Card Banner
                      </span>
                    </label>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Choose or upload a cover image to be displayed on repository cards and report headers.
                    </p>
                  </div>
                </div>

                {thumbnailUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setThumbnailUrl('');
                      setThumbnailFileName('');
                    }}
                    className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1.5 self-start sm:self-auto transition-colors bg-red-950/40 hover:bg-red-950/80 px-2.5 py-1 rounded-lg border border-red-800/40"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Thumbnail</span>
                  </button>
                )}
              </div>

              {/* Active Thumbnail Preview */}
              {thumbnailUrl ? (
                <div className="relative rounded-xl overflow-hidden border border-cyan-400/40 bg-slate-950 flex items-center gap-3.5 p-3 shadow-md">
                  <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-900 border border-slate-700 relative">
                    <img
                      src={thumbnailUrl}
                      alt="Thumbnail Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Thumbnail Image Selected</span>
                    </div>
                    <p className="text-[11px] text-slate-200 truncate mt-0.5 font-medium">
                      {thumbnailFileName || 'Custom Cover Image'}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                      Will be shown as card cover in Knowledge Repository & Expedition Reports.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => thumbInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 text-[11px] font-semibold transition-colors border border-cyan-500/35 shrink-0"
                  >
                    Change
                  </button>
                </div>
              ) : (
                /* Tabbed Thumbnail Picker */
                <div className="space-y-3">
                  {/* Selector Tabs: Suggested & Upload File */}
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0c1824] border border-cyan-500/20 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setThumbTab('preset')}
                      className={`flex-1 py-1.5 px-3 rounded-lg font-medium transition-all ${
                        thumbTab === 'preset'
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      ✨ Suggested
                    </button>
                    <button
                      type="button"
                      onClick={() => setThumbTab('upload')}
                      className={`flex-1 py-1.5 px-3 rounded-lg font-medium transition-all ${
                        thumbTab === 'upload'
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      📁 Upload File
                    </button>
                  </div>

                  {/* Preset Gallery */}
                  {thumbTab === 'preset' && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                      {polarPresets.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => {
                            setThumbnailUrl(preset.url);
                            setThumbnailFileName(preset.label);
                          }}
                          className="relative rounded-xl overflow-hidden border border-slate-700/80 hover:border-cyan-400 group/preset text-left transition-all h-20 bg-slate-900 focus:outline-none"
                        >
                          <img
                            src={preset.url}
                            alt={preset.label}
                            className="w-full h-full object-cover group-hover/preset:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-2">
                            <span className="text-[10px] font-semibold text-white leading-tight drop-shadow-sm truncate">
                              {preset.label}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Upload Image File */}
                  {thumbTab === 'upload' && (
                    <div
                      onClick={() => thumbInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsThumbDragging(true);
                      }}
                      onDragLeave={() => setIsThumbDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsThumbDragging(false);
                        const file = e.dataTransfer.files?.[0];
                        if (file) processThumbnailFile(file);
                      }}
                      className={`p-4 rounded-xl border border-dashed text-center cursor-pointer transition-all ${
                        isThumbDragging
                          ? 'border-cyan-400 bg-cyan-950/60'
                          : 'border-cyan-500/30 bg-[#0e1d29]/70 hover:border-cyan-400 hover:bg-[#122636]'
                      }`}
                    >
                      <Camera className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                      <p className="text-slate-200 text-xs font-semibold">
                        Click or drag & drop a thumbnail image (.png, .jpg, .webp)
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Recommended 16:9 banner ratio</p>
                    </div>
                  )}
                </div>
              )}

              <input
                ref={thumbInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) processThumbnailFile(file);
                }}
              />
            </div>

            {/* Collapsible Accordion Button for Advanced Options */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#142938]/80 hover:bg-[#183346] border border-cyan-500/25 hover:border-cyan-400/40 text-slate-200 transition-all text-xs font-medium group"
              >
                <div className="flex items-center gap-2.5">
                  <SlidersHorizontal className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
                  <span className="font-semibold text-white">
                    {showAdvanced ? 'Hide Advanced Options' : '+ Advanced Expedition & Attribution Options (Optional)'}
                  </span>
                  <span className="hidden sm:inline-block text-[11px] text-cyan-300/80 font-normal">
                    (Mission, Station, Co-authors, License, Automations)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400 text-xs">
                  <span>{showAdvanced ? 'Collapse' : 'Expand'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`} />
                </div>
              </button>
            </div>

            {/* Collapsible Content */}
            {showAdvanced && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#112331]/90 border border-cyan-500/25 space-y-4 animate-fadeIn shadow-inner">
                <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
                  <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider">
                    Extended Metadata & System Routing
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Default values applied if left unchanged
                  </span>
                </div>

                {/* Expedition & Station row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-3 rounded-xl bg-[#16303F]/60 border border-cyan-500/20">
                  <div>
                    <label className="flex items-center gap-1.5 text-cyan-300 font-semibold mb-1">
                      <Compass className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Associated Expedition / Mission</span>
                    </label>
                    <select
                      value={expedition}
                      onChange={(e) => setExpedition(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#183446] border border-cyan-500/30 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    >
                      <option value="43rd Indian Scientific Expedition to Antarctica (43-ISEA)">43rd Indian Scientific Expedition to Antarctica (43-ISEA)</option>
                      <option value="42nd Indian Scientific Expedition to Antarctica (42-ISEA)">42nd Indian Antarctic Expedition (42-ISEA)</option>
                      <option value="41st Indian Scientific Expedition to Antarctica (41-ISEA)">41st Indian Antarctic Expedition (41-ISEA)</option>
                      <option value="Himadri Arctic Winter Expedition 2024">Himadri Arctic Winter Expedition 2024</option>
                      <option value="Himansh Western Himalayas Glaciology 2023-24">Himansh Western Himalayas Glaciology 2023-24</option>
                      <option value="12th Southern Ocean Expedition (SOE-12)">12th Southern Ocean Expedition (SOE-12)</option>
                      <option value="Non-Expedition / Baseline Polar Studies">Non-Expedition / Baseline Polar Studies</option>
                    </select>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Automatically embeds this asset inside the Expedition's Detail Modal.
                    </p>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-cyan-300 font-semibold mb-1">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Operating Station / Vessel</span>
                    </label>
                    <select
                      value={station}
                      onChange={(e) => setStation(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#183446] border border-cyan-500/30 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    >
                      <option value="Bharati Station (Larsemann Hills)">Bharati Station (Larsemann Hills)</option>
                      <option value="Maitri Station (Schirmacher Oasis)">Maitri Station (Schirmacher Oasis)</option>
                      <option value="Himadri Station (Ny-Ålesund, Svalbard)">Himadri Station (Ny-Ålesund, Svalbard)</option>
                      <option value="Himansh High-Altitude Station (Chandra Basin, HP)">Himansh High-Altitude Station (Chandra Basin, HP)</option>
                      <option value="ORV Sagar Kanya / Polar Icebreaker Vessel">ORV Sagar Kanya / Polar Icebreaker Vessel</option>
                      <option value="Satellite / Airborne Remote Sensing">Satellite / Airborne Remote Sensing</option>
                    </select>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Assigns operational location & facility attribution.
                    </p>
                  </div>
                </div>

                {/* Co-Authors & Collaborating Institutes */}
                <div>
                  <label className="flex items-center gap-1.5 text-slate-300 font-semibold mb-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>Co-Authors & Collaborating Institutes</span>
                  </label>
                  <input
                    type="text"
                    value={coAuthors}
                    onChange={(e) => setCoAuthors(e.target.value)}
                    placeholder="e.g. Dr. A. Sharma (IIT Roorkee), Survey of India"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#16303F] border border-cyan-500/25 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>

                {/* Tags & Open Science License */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Subject Tags (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="e.g. Aerosol, Atmosphere, Maitri"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#16303F] border border-cyan-500/25 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 text-xs"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-slate-300 font-semibold mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Data License & Access Policy</span>
                    </label>
                    <select
                      value={license}
                      onChange={(e) => setLicense(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#16303F] border border-cyan-500/25 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    >
                      <option value="CC-BY 4.0 Open Access (Recommended)">CC-BY 4.0 Open Access (Recommended)</option>
                      <option value="Government Open Data License (NDSAP / GODL-India)">Government Open Data License (NDSAP / GODL-India)</option>
                      <option value="Embargoed (12 Months Peer-Review Period)">Embargoed (12 Months Peer-Review Period)</option>
                      <option value="Educational & Citizen Outreach Use Only">Educational & Citizen Outreach Use Only</option>
                    </select>
                  </div>
                </div>

                {/* Equipment / Sensor */}
                <div>
                  <label className="flex items-center gap-1.5 text-slate-300 font-semibold mb-1">
                    <Cpu className="w-3.5 h-3.5 text-slate-400" />
                    <span>Sensor / Equipment Methodology (Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                    placeholder="e.g. Microtops Sunphotometer, Automatic Weather Station (AWS), Ice Core Drill, CTD Rosette"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#16303F] border border-cyan-500/25 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>

                {/* Target Audience Pills */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">
                    Target Outreach Audience & Dissemination Scope
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {audienceOptions.map((opt) => {
                      const isSelected = targetAudience.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => toggleAudience(opt)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            isSelected 
                              ? 'bg-cyan-500/25 text-cyan-300 border-cyan-500/50 shadow-xs' 
                              : 'bg-[#16303F] text-slate-300 border-cyan-500/20 hover:text-white hover:border-cyan-400/40'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}{opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Smart Automations Toggles */}
                <div className="p-3.5 rounded-xl bg-[#16303F]/70 border border-cyan-500/25 space-y-2">
                  <div className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
                    Automated MoES Data Pipeline Toggles
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-slate-200 hover:text-white">
                      <input
                        type="checkbox"
                        checked={autoDOI}
                        onChange={(e) => setAutoDOI(e.target.checked)}
                        className="w-3.5 h-3.5 rounded accent-cyan-500"
                      />
                      <span>Generate FAIR DOI</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none text-slate-200 hover:text-white">
                      <input
                        type="checkbox"
                        checked={queueAI}
                        onChange={(e) => setQueueAI(e.target.checked)}
                        className="w-3.5 h-3.5 rounded accent-cyan-500"
                      />
                      <span>Queue to AI Studio</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none text-slate-200 hover:text-white">
                      <input
                        type="checkbox"
                        checked={syncProfile}
                        onChange={(e) => setSyncProfile(e.target.checked)}
                        className="w-3.5 h-3.5 rounded accent-cyan-500"
                      />
                      <span>Sync to My Profile</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-800">
              <div className="text-[11px] text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  {fileName ? (
                    <>Archiving your authentic file: <strong className="text-white font-mono">{fileName}</strong></>
                  ) : (
                    'Direct submission to NCPOR MoES National Repository'
                  )}
                </span>
              </div>
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-slate-300 hover:text-white bg-[#142636] hover:bg-[#1a3246] border border-slate-700/60 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload & Publish to Repository</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
