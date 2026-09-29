'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  Play, 
  Download, 
  Heart, 
  Camera, 
  Film, 
  Grid, 
  RotateCcw, 
  X, 
  MapPin, 
  Calendar, 
  User, 
  Upload, 
  SlidersHorizontal, 
  Maximize2, 
  Sparkles, 
  Check, 
  Share2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  Plus,
  Layers,
  Trash2
} from 'lucide-react';

import { UserContribution } from '@/data/userContributions';

export interface MediaPortalItem {
  id: string;
  title: string;
  type: 'Photo' | 'Video';
  imageUrl: string;
  images?: string[];
  videoUrl?: string;
  duration?: string;
  description: string;
  tags: string[];
  year: number;
  authorOrLead: string;
  region: 'Antarctica' | 'Arctic' | 'Himalayas' | 'Southern Ocean';
  category: 'Wildlife' | 'Research' | 'Expedition' | 'Landscapes' | 'People & Culture';
  resolution?: string;
  downloads?: number;
  likes?: number;
  isUserUploaded?: boolean;
}

interface MediaPortalProps {
  onLaunchAI?: (title: string, summary: string) => void;
  onContribute?: () => void;
  userContributions?: UserContribution[];
}

export default function MediaPortal({ onLaunchAI, onContribute, userContributions = [] }: MediaPortalProps) {
  // Filter States
  const [activeMediaTab, setActiveMediaTab] = useState<'All' | 'Photo' | 'Video'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [sortBy, setSortBy] = useState<'Latest' | 'Oldest' | 'Popular'>('Latest');

  // Mobile Filter Drawer toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Interaction States
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<MediaPortalItem | null>(null);
  const [activePhotoModal, setActivePhotoModal] = useState<MediaPortalItem | null>(null);

  // Multi-Photo Carousel & Upload States
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const [customItemImages, setCustomItemImages] = useState<Record<string, string[]>>({});
  const [isUploadingPhotos, setIsUploadingPhotos] = useState<boolean>(false);
  const [photoUploadSuccessMessage, setPhotoUploadSuccessMessage] = useState<string | null>(null);
  const [isDraggingPhoto, setIsDraggingPhoto] = useState<boolean>(false);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  // Load custom added photos from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('himvigyan_custom_media_images');
      if (saved) {
        setCustomItemImages(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  // Dataset matching screenshot 100% with rich multi-photo collections
  const allMediaItems: MediaPortalItem[] = [
    {
      id: 'm-1',
      title: 'Emperor Penguins Colony',
      type: 'Photo',
      imageUrl: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1551972251-12070d63502a?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85'
      ],
      description: 'A stunning view of Emperor penguins at one of the breeding colonies in Antarctica.',
      tags: ['Wildlife', 'Antarctica', 'Penguins'],
      year: 2024,
      authorOrLead: 'Dr. R. Kumar',
      region: 'Antarctica',
      category: 'Wildlife',
      resolution: '4K Ultra-HD (3840x2160)',
      downloads: 1420,
      likes: 384
    },
    {
      id: 'm-2',
      title: 'Indian Antarctic Expedition 2024',
      type: 'Video',
      imageUrl: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      duration: '06:32',
      description: 'Documentary on the research activities and journey of the Indian team in Antarctica.',
      tags: ['Expedition', 'Research', 'Antarctica'],
      year: 2024,
      authorOrLead: 'INSAT Team',
      region: 'Antarctica',
      category: 'Expedition',
      resolution: '4K UHD • 60 FPS',
      downloads: 890,
      likes: 512
    },
    {
      id: 'm-3',
      title: 'Maitri Research Station',
      type: 'Photo',
      imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1516431883659-655d41c09bf9?auto=format&fit=crop&w=1200&q=85'
      ],
      description: 'Life and research activities at Maitri Research Station, Antarctica.',
      tags: ['Station', 'Research', 'Antarctica'],
      year: 2024,
      authorOrLead: 'NCPOR',
      region: 'Antarctica',
      category: 'Research',
      resolution: '4K Ultra-HD (4000x2660)',
      downloads: 1250,
      likes: 290
    },
    {
      id: 'm-4',
      title: 'Underwater Exploration',
      type: 'Video',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
      duration: '08:45',
      description: 'Exploring the marine life and underwater geography of the Southern Ocean.',
      tags: ['Marine Life', 'Research', 'Southern Ocean'],
      year: 2023,
      authorOrLead: 'NCPOR',
      region: 'Southern Ocean',
      category: 'Research',
      resolution: '4K UHD Deep Sub-sea',
      downloads: 970,
      likes: 440
    },
    {
      id: 'm-5',
      title: 'Glacier Landscape',
      type: 'Photo',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=1200&q=85'
      ],
      description: 'Magnificent ice formations and glaciers in the Antarctic region.',
      tags: ['Landscapes', 'Antarctica', 'Icebergs'],
      year: 2024,
      authorOrLead: 'Dr. A. Singh',
      region: 'Antarctica',
      category: 'Landscapes',
      resolution: '5K Resolution',
      downloads: 2130,
      likes: 670
    },
    {
      id: 'm-6',
      title: 'Field Research Activities',
      type: 'Video',
      imageUrl: 'https://images.unsplash.com/photo-1516431883659-655d41c09bf9?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      duration: '05:21',
      description: 'Scientists collecting samples and conducting research in the field.',
      tags: ['Research', 'Expedition', 'Antarctica'],
      year: 2024,
      authorOrLead: 'NCPOR',
      region: 'Antarctica',
      category: 'Expedition',
      resolution: '4K UHD Field Recording',
      downloads: 780,
      likes: 310
    },
    {
      id: 'm-7',
      title: 'Leopard Seal',
      type: 'Photo',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85'
      ],
      description: 'A leopard seal spotted during the expedition in the Antarctic waters.',
      tags: ['Wildlife', 'Antarctica', 'Marine Life'],
      year: 2024,
      authorOrLead: 'Dr. P. Sharma',
      region: 'Antarctica',
      category: 'Wildlife',
      resolution: 'High Resolution Wildlife Telephoto',
      downloads: 1640,
      likes: 520
    },
    {
      id: 'm-8',
      title: 'Aurora Australis',
      type: 'Photo',
      imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=1200&q=85'
      ],
      description: 'Breathtaking view of the Southern Lights from the Indian research station.',
      tags: ['Environment', 'Southern Ocean', 'Night Sky'],
      year: 2023,
      authorOrLead: 'NCPOR',
      region: 'Southern Ocean',
      category: 'Landscapes',
      resolution: '4K Long-Exposure Astro',
      downloads: 3200,
      likes: 980
    },
    {
      id: 'm-9',
      title: 'Himadri Station Midnight Sun',
      type: 'Photo',
      imageUrl: 'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85'
      ],
      description: 'Continuous daylight monitoring and atmospheric aerosol analysis at Ny-Ålesund, Arctic.',
      tags: ['Station', 'Arctic', 'Atmosphere'],
      year: 2025,
      authorOrLead: 'Arctic Research Wing',
      region: 'Arctic',
      category: 'Research',
      resolution: '4K Ultra-HD',
      downloads: 650,
      likes: 215
    },
    {
      id: 'm-10',
      title: 'Chandra Basin High-Altitude Survey',
      type: 'Video',
      imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      duration: '04:18',
      description: 'Himansh Station team carrying radar glaciology equipment across Chhota Shigri Glacier.',
      tags: ['Glaciology', 'Himalayas', 'Field Work'],
      year: 2025,
      authorOrLead: 'Dr. Meenakshi Joshi',
      region: 'Himalayas',
      category: 'Expedition',
      resolution: '4K Drone 60FPS',
      downloads: 820,
      likes: 340
    },
    {
      id: 'm-11',
      title: 'Polar Team Wintering Ceremony',
      type: 'Photo',
      imageUrl: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1516431883659-655d41c09bf9?auto=format&fit=crop&w=1200&q=85'
      ],
      description: 'NCPOR scientists celebrating Midwinter Day inside Maitri station during polar darkness.',
      tags: ['People & Culture', 'Antarctica', 'Tradition'],
      year: 2024,
      authorOrLead: 'Dr. S. Kulkarni',
      region: 'Antarctica',
      category: 'People & Culture',
      resolution: '4K Ultra-HD',
      downloads: 910,
      likes: 470
    },
    {
      id: 'm-12',
      title: 'Polar Ice Core Drilling Operation',
      type: 'Video',
      imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      duration: '07:15',
      description: 'Scientists extracting 120-meter deep paleo-climatic ice cores from the Polar Plateau.',
      tags: ['Ice Cores', 'Paleoclimate', 'Cryosphere'],
      year: 2022,
      authorOrLead: 'Cryosphere Division',
      region: 'Antarctica',
      category: 'Research',
      resolution: '4K UHD Field Recording',
      downloads: 1100,
      likes: 395
    }
  ];

  // Toggle Heart / Like
  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Instant Download Action
  const handleDownload = (item: MediaPortalItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadSuccessId(item.id);
    
    const link = document.createElement('a');
    link.href = item.imageUrl;
    link.target = '_blank';
    link.download = `${item.title.toLowerCase().replace(/\s+/g, '-')}-ncpor.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadSuccessId(null), 2500;
    });
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('All Regions');
    setSelectedYear('All Years');
    setSelectedCategory('All Categories');
    setActiveMediaTab('All');
    setSortBy('Latest');
  };

  // Active filters count for mobile indicator
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedRegion !== 'All Regions') count++;
    if (selectedYear !== 'All Years') count++;
    if (selectedCategory !== 'All Categories') count++;
    if (activeMediaTab !== 'All') count++;
    return count;
  }, [searchQuery, selectedRegion, selectedYear, selectedCategory, activeMediaTab]);

  // User uploaded media items
  const userMediaItems: MediaPortalItem[] = useMemo(() => {
    return (userContributions || [])
      .filter(uc => uc.type === 'Media' || uc.mediaUrl)
      .map(uc => {
        const isExplicitVideo = 
          uc.mediaType === 'video' || 
          uc.mediaKind === 'video' ||
          ((uc.format?.toLowerCase().includes('mp4') || uc.format?.toLowerCase().includes('video')) && 
           !uc.format?.toLowerCase().includes('jpg') && 
           !uc.format?.toLowerCase().includes('png') && 
           !uc.format?.toLowerCase().includes('image') &&
           !uc.format?.toLowerCase().includes('photo'));
        const isPhoto = !isExplicitVideo;

        return {
          id: uc.id,
          title: uc.title,
          type: isPhoto ? 'Photo' : 'Video',
          imageUrl: uc.mediaUrl || (isPhoto ? 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80' : 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'),
          images: uc.images || (uc.mediaUrl ? [uc.mediaUrl] : undefined),
          videoUrl: isExplicitVideo ? (uc.mediaUrl?.endsWith('.mp4') ? uc.mediaUrl : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4') : undefined,
          duration: isExplicitVideo ? '02:45' : undefined,
          description: uc.summary,
          tags: uc.tags,
          year: new Date().getFullYear(),
          authorOrLead: uc.leadScientist || 'Lead Scientist (You)',
          region: (uc.region as any) || 'Antarctica',
          category: 'Research',
          resolution: isPhoto ? 'High-Res Photo' : '4K Ultra-HD',
          downloads: uc.downloads,
          likes: 12,
          isUserUploaded: true
        };
      });
  }, [userContributions]);

  const combinedMediaItems = useMemo(() => {
    return [...userMediaItems, ...allMediaItems];
  }, [userMediaItems, allMediaItems]);

  // Filter & Sort Logic
  const filteredItems = useMemo(() => {
    return combinedMediaItems.filter(item => {
      // Media Tab Filter (All / Photo / Video)
      if (activeMediaTab !== 'All' && item.type !== activeMediaTab) {
        return false;
      }

      // Region Filter
      if (selectedRegion !== 'All Regions' && item.region !== selectedRegion) {
        return false;
      }

      // Year Filter
      if (selectedYear !== 'All Years' && item.year.toString() !== selectedYear) {
        return false;
      }

      // Category Filter
      if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesLead = item.authorOrLead.toLowerCase().includes(query);
        const matchesTags = item.tags.some(tag => tag.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesLead && !matchesTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'Latest') return b.year - a.year;
      if (sortBy === 'Oldest') return a.year - b.year;
      if (sortBy === 'Popular') return (b.downloads || 0) - (a.downloads || 0);
      return 0;
    });
  }, [combinedMediaItems, activeMediaTab, selectedRegion, selectedYear, selectedCategory, searchQuery, sortBy]);

  // Helper for active images in modal
  const activeImages = useMemo(() => {
    if (!activePhotoModal) return [];
    // Only user uploaded items can have custom images added via user edits
    if (activePhotoModal.isUserUploaded) {
      const custom = customItemImages[activePhotoModal.id];
      if (custom && custom.length > 0) return custom;
    }
    if (activePhotoModal.images && activePhotoModal.images.length > 0) {
      return activePhotoModal.images;
    }
    return [activePhotoModal.imageUrl];
  }, [activePhotoModal, customItemImages]);

  const activeImageUrl = activeImages[currentPhotoIndex] || activePhotoModal?.imageUrl || '';

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentPhotoIndex(prev => (prev > 0 ? prev - 1 : activeImages.length - 1));
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentPhotoIndex(prev => (prev < activeImages.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation for photo carousel
  useEffect(() => {
    if (!activePhotoModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentPhotoIndex(prev => (prev > 0 ? prev - 1 : activeImages.length - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentPhotoIndex(prev => (prev < activeImages.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Escape') {
        setActivePhotoModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoModal, activeImages.length]);

  // Multiple photo upload handler (restricted strictly to user's own photos)
  const handleUploadMultiplePhotos = (files: FileList | File[]) => {
    if (!activePhotoModal || !activePhotoModal.isUserUploaded || !files || files.length === 0) return;
    setIsUploadingPhotos(true);

    const fileList = Array.from(files).filter(f => f.type.startsWith('image/') || /\.(jpg|jpeg|png|webp|svg|gif|bmp)$/i.test(f.name));
    if (fileList.length === 0) {
      setIsUploadingPhotos(false);
      return;
    }

    const newPhotoUrls: string[] = [];
    let completed = 0;

    fileList.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newPhotoUrls.push(e.target.result as string);
        }
        completed++;
        if (completed === fileList.length) {
          const itemId = activePhotoModal.id;
          const currentPhotos = activeImages;
          const updatedPhotos = [...currentPhotos, ...newPhotoUrls];

          setCustomItemImages(prev => {
            const next = { ...prev, [itemId]: updatedPhotos };
            try {
              localStorage.setItem('himvigyan_custom_media_images', JSON.stringify(next));
            } catch (err) {
              console.warn('LocalStorage limit exceeded, saved in-memory', err);
            }
            return next;
          });

          // Jump to first newly added photo
          setCurrentPhotoIndex(currentPhotos.length);
          setIsUploadingPhotos(false);
          setPhotoUploadSuccessMessage(`Successfully added ${newPhotoUrls.length} photo${newPhotoUrls.length > 1 ? 's' : ''}!`);
          setTimeout(() => setPhotoUploadSuccessMessage(null), 3500);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeletePhoto = (indexToDelete: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activePhotoModal || !activePhotoModal.isUserUploaded || activeImages.length <= 1) return;
    const itemId = activePhotoModal.id;
    const updatedPhotos = activeImages.filter((_, idx) => idx !== indexToDelete);

    setCustomItemImages(prev => {
      const next = { ...prev, [itemId]: updatedPhotos };
      try {
        localStorage.setItem('himvigyan_custom_media_images', JSON.stringify(next));
      } catch (err) {}
      return next;
    });

    if (currentPhotoIndex >= updatedPhotos.length) {
      setCurrentPhotoIndex(Math.max(0, updatedPhotos.length - 1));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!activePhotoModal?.isUserUploaded) return;
    e.preventDefault();
    setIsDraggingPhoto(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingPhoto(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingPhoto(false);
    if (!activePhotoModal || !activePhotoModal.isUserUploaded) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUploadMultiplePhotos(e.dataTransfer.files);
    }
  };

  return (
    <div className="bg-[#070e1b] min-h-screen text-slate-100 font-sans pb-16">
      
      {/* ========================================================================= */}
      {/* 1. TOP HERO BANNER (Moments from the Polar Frontiers) */}
      {/* ========================================================================= */}
      <div className="relative w-full overflow-hidden border-b border-slate-800/80">
        
        {/* Background photo of ice mountains & ship */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2000&q=85"
            alt="Polar Frontiers"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Deep Navy Gradient Overlays matching screenshot */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070e1b] via-[#070e1b]/80 to-[#070e1b]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e1b] via-transparent to-black/40" />
        </div>

        {/* Content Box */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-12 sm:pb-16 flex flex-col justify-between min-h-[300px] sm:min-h-[340px]">
          
          <div className="space-y-3 max-w-2xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-sky-400 uppercase">
              <span>HimVigyan</span>
              <span className="text-slate-500">/</span>
              <span>MEDIA</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Moments from the <br className="hidden sm:inline" />
              <span className="text-sky-400">Polar Frontiers</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Explore high-quality photographs and videos from India&apos;s polar expeditions, research activities and scientific journeys.
            </p>

            {/* Stats Pills Row */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-3 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold leading-none">5,230+</div>
                  <div className="text-[11px] text-slate-400">Photos</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold leading-none">1,240+</div>
                  <div className="text-[11px] text-slate-400">Videos</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold leading-none">12+</div>
                  <div className="text-[11px] text-slate-400">Expeditions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Right Watermark Caption */}
          <div className="self-end mt-4 sm:mt-0 flex items-center gap-2 text-xs text-slate-200 font-semibold bg-slate-950/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/80 shadow-lg hover:border-sky-400/50 transition-colors">
            <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>Indian Antarctic Expedition 2024</span>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SUB-HEADER BAR (All Media | Photos | Videos + Sort Dropdown) */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          
          {/* Left: View Tabs (All Media, Photos, Videos) */}
          <div className="flex items-center gap-2 p-1 bg-[#0c1629] rounded-xl border border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setActiveMediaTab('All')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeMediaTab === 'All'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>All Media</span>
            </button>

            <button
              onClick={() => setActiveMediaTab('Photo')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeMediaTab === 'Photo'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Photos</span>
            </button>

            <button
              onClick={() => setActiveMediaTab('Video')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeMediaTab === 'Video'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Videos</span>
            </button>
          </div>

          {/* Right: Mobile Filter Button & Desktop Sort By */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            
            {/* Mobile Filter Toggle (Visible on screens < lg) */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-3.5 py-2 rounded-xl bg-[#0c1629] border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 hover:bg-slate-800 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-sky-400" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="hidden sm:inline">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#0c1629] border border-slate-700 rounded-xl px-3 py-2 pr-8 text-xs text-white appearance-none focus:outline-none focus:border-sky-500 cursor-pointer shadow-sm"
                >
                  <option value="Latest">Latest</option>
                  <option value="Oldest">Oldest</option>
                  <option value="Popular">Most Popular</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN CONTENT: LEFT SIDEBAR FILTERS + RIGHT 4-COLUMN CARDS GRID */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          
          {/* ------------------------------------------------------------- */}
          {/* LEFT SIDEBAR (Desktop always visible, Mobile Collapsible) */}
          {/* ------------------------------------------------------------- */}
          <aside className={`w-full lg:w-64 xl:w-72 shrink-0 ${mobileFilterOpen ? 'block' : 'hidden lg:block'} space-y-6 bg-[#0a1324] lg:bg-transparent p-5 lg:p-0 rounded-2xl border border-slate-800/80 lg:border-none shadow-xl lg:shadow-none`}>
            
            {/* Search Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>Search</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search photos or videos..."
                  className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-[#0c1629] border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 shadow-sm"
                />
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Region Filter */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>Region</span>
                </div>
                {selectedRegion !== 'All Regions' && (
                  <button
                    onClick={() => setSelectedRegion('All Regions')}
                    className="text-[11px] text-sky-400 hover:text-sky-300 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="space-y-1.5">
                {['All Regions', 'Antarctica', 'Arctic', 'Himalayas', 'Southern Ocean'].map((region) => {
                  const isSelected = selectedRegion === region;
                  return (
                    <label
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                      className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer py-1 select-none"
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'border-sky-500 bg-sky-500' 
                          : 'border-slate-600 bg-transparent'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className={isSelected ? 'font-semibold text-white' : ''}>{region}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Year Filter */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  <span>Year</span>
                </div>
                {selectedYear !== 'All Years' && (
                  <button
                    onClick={() => setSelectedYear('All Years')}
                    className="text-[11px] text-sky-400 hover:text-sky-300 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="space-y-1.5">
                {['All Years', '2025', '2024', '2023', '2022'].map((yr) => {
                  const isSelected = selectedYear === yr;
                  return (
                    <label
                      key={yr}
                      onClick={() => setSelectedYear(yr)}
                      className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer py-1 select-none"
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'border-sky-500 bg-sky-500' 
                          : 'border-slate-600 bg-transparent'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className={isSelected ? 'font-semibold text-white' : ''}>{yr}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                  <Grid className="w-3.5 h-3.5 text-sky-400" />
                  <span>Category</span>
                </div>
                {selectedCategory !== 'All Categories' && (
                  <button
                    onClick={() => setSelectedCategory('All Categories')}
                    className="text-[11px] text-sky-400 hover:text-sky-300 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="space-y-1.5">
                {['All Categories', 'Wildlife', 'Research', 'Expedition', 'Landscapes', 'People & Culture'].map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <label
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer py-1 select-none"
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'border-sky-500 bg-sky-500' 
                          : 'border-slate-600 bg-transparent'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className={isSelected ? 'font-semibold text-white' : ''}>{cat}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Reset Filters Full Width Button */}
            <div className="pt-2">
              <button
                onClick={handleResetFilters}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-700 hover:border-slate-500 bg-[#0c1629] text-xs font-bold text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>

          </aside>

          {/* ------------------------------------------------------------- */}
          {/* RIGHT MEDIA GRID (Responsive 1-col -> 2-col -> 3-col -> 4-col) */}
          {/* ------------------------------------------------------------- */}
          <main className="flex-1 min-w-0 space-y-6">
            
            {/* Quick Results Summary */}
            <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
              <span>Showing <strong className="text-white font-bold">{filteredItems.length}</strong> polar media assets</span>
              {activeFiltersCount > 0 && (
                <span className="text-sky-400 font-medium">
                  Filtered by active criteria
                </span>
              )}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 ? (
              <div className="p-12 text-center bg-[#0d1629] rounded-2xl border border-slate-800 space-y-4">
                <Camera className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">No media found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  No photographs or videos match the current filters. Try changing or clearing your search criteria.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-semibold hover:bg-sky-500 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* The 4-Column Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filteredItems.map((item) => {
                  const isLiked = likedIds[item.id];
                  const isDownloading = downloadSuccessId === item.id;
                  const itemPhotos = customItemImages[item.id] || item.images || (item.imageUrl ? [item.imageUrl] : []);
                  const photoCount = itemPhotos.length;
                  const cardImage = itemPhotos[0] || item.imageUrl;

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (item.type === 'Video') {
                          setActiveVideoModal(item);
                        } else {
                          setActivePhotoModal(item);
                          setCurrentPhotoIndex(0);
                          setPhotoUploadSuccessMessage(null);
                        }
                      }}
                      className="bg-[#0d1629] rounded-2xl border border-slate-800/90 hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-950/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer"
                    >
                      <div>
                        {/* Thumbnail Container */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                          <img
                            src={cardImage}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1629] via-transparent to-black/30" />

                          {/* Top Badges (Type & Heart) */}
                          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                            {/* Type Pill & Photos Count */}
                            <div className="flex items-center gap-1.5">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-md ${
                                item.type === 'Photo' ? 'bg-sky-600' : 'bg-indigo-600'
                              }`}>
                                {item.type}
                              </span>
                              {item.type === 'Photo' && photoCount > 1 && (
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-black/60 backdrop-blur-md text-sky-200 border border-white/15 flex items-center gap-1 shadow-md">
                                  <Layers className="w-2.5 h-2.5 text-sky-400" />
                                  <span>{photoCount}</span>
                                </span>
                              )}
                              {item.isUserUploaded && (
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-cyan-400 text-slate-950 shadow-md animate-pulse">
                                  ⚡ Uploaded by You
                                </span>
                              )}
                            </div>

                            {/* Like Heart Button */}
                            <button
                              onClick={(e) => handleToggleLike(item.id, e)}
                              className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white transition-transform active:scale-90"
                              title={isLiked ? 'Liked' : 'Like'}
                            >
                              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
                            </button>
                          </div>

                          {/* Video Overlay: Center Play Button & Bottom Duration */}
                          {item.type === 'Video' && (
                            <>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-sky-600 group-hover:border-sky-400 transition-all shadow-lg">
                                  <Play className="w-4 h-4 ml-0.5 fill-white" />
                                </div>
                              </div>

                              {item.duration && (
                                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[10px] font-mono font-semibold text-slate-200 border border-white/10">
                                  {item.duration}
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        {/* Card Body */}
                        <div className="p-3.5">
                          {/* Title */}
                          <h4 className="font-bold text-white text-xs sm:text-sm line-clamp-1 group-hover:text-sky-400 transition-colors">
                            {item.title}
                          </h4>

                          {/* Description */}
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mt-2.5">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-md text-[9px] font-medium bg-[#13223f] text-sky-300 border border-sky-800/40"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer (Metadata & Action) */}
                      <div className="p-3.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                        {/* Left: Year & Lead */}
                        <div className="flex items-center gap-2 truncate pr-2">
                          <span className="flex items-center gap-1 shrink-0">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            <span>{item.year}</span>
                          </span>
                          <span className="flex items-center gap-1 truncate">
                            <User className="w-3 h-3 text-slate-500 shrink-0" />
                            <span className="truncate">{item.authorOrLead}</span>
                          </span>
                        </div>

                        {/* Right: Watch or Download Action */}
                        <div className="shrink-0">
                          {item.type === 'Video' ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveVideoModal(item);
                              }}
                              className="flex items-center gap-1 font-semibold text-sky-400 hover:text-sky-300 transition-colors text-[11px]"
                            >
                              <Play className="w-3 h-3 fill-sky-400" />
                              <span>Watch</span>
                            </button>
                          ) : (
                            <button
                              onClick={(e) => handleDownload(item, e)}
                              className="flex items-center gap-1 font-semibold text-sky-400 hover:text-sky-300 transition-colors text-[11px]"
                            >
                              {isDownloading ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Done</span>
                                </>
                              ) : (
                                <>
                                  <Download className="w-3 h-3" />
                                  <span>Download</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

            {/* ========================================================================= */}
            {/* 4. BOTTOM BANNER: HAVE MEDIA TO SHARE? (Matching screenshot) */}
            {/* ========================================================================= */}
            <div className="mt-8 bg-[#0c1830] rounded-2xl border border-sky-900/40 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3.5 text-center sm:text-left flex-col sm:flex-row">
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-700/50 flex items-center justify-center text-sky-400 shadow-inner shrink-0">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    Have media to share?
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 max-w-xl">
                    Contribute your photos and videos to help build India&apos;s polar knowledge repository.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (onContribute) onContribute();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-sky-600/30 transition-all hover:scale-105 active:scale-95 shrink-0"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Contribute Media</span>
              </button>
            </div>

          </main>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. CINEMA VIDEO LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#091122] rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-slate-300 hover:text-white transition-colors border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player */}
            <div className="w-full aspect-video bg-black relative">
              <video
                src={activeVideoModal.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            {/* Video Details & AI Studio Action */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white">
                      Video Documentary
                    </span>
                    <span className="text-xs text-sky-400 font-semibold">
                      {activeVideoModal.region}
                    </span>
                    <span className="text-xs text-slate-400">
                      • {activeVideoModal.year}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {activeVideoModal.title}
                  </h3>
                </div>

                {onLaunchAI && (
                  <button
                    onClick={() => {
                      onLaunchAI(activeVideoModal.title, activeVideoModal.description);
                      setActiveVideoModal(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Launch in AI Media Studio</span>
                  </button>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeVideoModal.description}
              </p>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-slate-800">
                <div className="p-2.5 rounded-lg bg-[#0c1629] border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Producer / Lead</span>
                  <span className="font-semibold text-slate-200">{activeVideoModal.authorOrLead}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0c1629] border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Duration</span>
                  <span className="font-semibold text-slate-200">{activeVideoModal.duration || '05:00'}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0c1629] border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Resolution</span>
                  <span className="font-semibold text-slate-200">{activeVideoModal.resolution || '4K UHD'}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0c1629] border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Archive ID</span>
                  <span className="font-semibold text-slate-200 font-mono">NCPOR-{activeVideoModal.id.toUpperCase()}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. PHOTO HIGH-RES LIGHTBOX MODAL WITH MULTI-PHOTO SLIDER & UPLOAD */}
      {/* ========================================================================= */}
      {activePhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#091122] rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
            
            {/* Hidden Input for Adding Multiple Photos */}
            <input
              ref={multiFileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleUploadMultiplePhotos(e.target.files);
                }
                e.target.value = '';
              }}
              className="hidden"
            />

            {/* Top Close Button */}
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/60 hover:bg-black text-slate-300 hover:text-white transition-colors border border-white/10 shadow-lg cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo Slider View Area with Drag-and-Drop (only for user's own photos) */}
            <div 
              onDragOver={activePhotoModal.isUserUploaded ? handleDragOver : undefined}
              onDragLeave={activePhotoModal.isUserUploaded ? handleDragLeave : undefined}
              onDrop={activePhotoModal.isUserUploaded ? handleDrop : undefined}
              className="relative w-full h-[46vh] sm:h-[56vh] bg-black flex items-center justify-center overflow-hidden select-none group"
            >
              {/* Main Active Photo */}
              <img
                key={activeImageUrl}
                src={activeImageUrl}
                alt={`${activePhotoModal.title} - Photo ${currentPhotoIndex + 1}`}
                className="w-full h-full object-contain max-h-[56vh] transition-all duration-300 animate-fadeIn"
              />

              {/* Drag and Drop Overlay - strictly for user's own photos */}
              {isDraggingPhoto && activePhotoModal.isUserUploaded && (
                <div className="absolute inset-0 bg-sky-950/85 backdrop-blur-sm border-2 border-dashed border-sky-400 z-30 flex flex-col items-center justify-center text-white pointer-events-none">
                  <Upload className="w-12 h-12 text-sky-400 animate-bounce mb-2" />
                  <span className="font-bold text-base text-sky-200">Drop photos here to add to gallery</span>
                  <span className="text-xs text-sky-400 mt-1">Supports multiple JPG, PNG, WEBP files</span>
                </div>
              )}

              {/* Slide Counter Badge (Top Left) */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-white border border-white/15 shadow-md flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-sky-400" />
                  <span>Photo {currentPhotoIndex + 1} of {activeImages.length}</span>
                </span>
                {isUploadingPhotos && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-sky-600/90 text-white animate-pulse shadow">
                    Adding photos...
                  </span>
                )}
              </div>

              {/* Left Arrow Button (Previous Photo Slide) */}
              {activeImages.length > 1 && (
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-sky-600 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
                  title="Previous Photo (Left Arrow)"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                </button>
              )}

              {/* Right Arrow Button (Next Photo Slide) */}
              {activeImages.length > 1 && (
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-sky-600 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
                  title="Next Photo (Right Arrow)"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              )}

              {/* Center Bottom: Dot Indicators */}
              {activeImages.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-lg">
                  {activeImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPhotoIndex(idx)}
                      className={`transition-all rounded-full cursor-pointer ${
                        idx === currentPhotoIndex 
                          ? 'w-5 h-2 bg-sky-400' 
                          : 'w-2 h-2 bg-white/40 hover:bg-white/80'
                      }`}
                      title={`Go to photo ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Interactive Horizontal Thumbnail Strip (Visible if multiple photos or user's own photo) */}
            {(activeImages.length > 1 || activePhotoModal.isUserUploaded) && (
              <div className="px-4 sm:px-6 py-2.5 bg-[#060c18] border-y border-slate-800 flex items-center gap-2.5 overflow-x-auto scrollbar-thin">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 select-none">
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  <span>Gallery ({activeImages.length})</span>
                </span>

                {/* Photo Thumbnails */}
                {activeImages.map((imgUrl, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setCurrentPhotoIndex(idx)}
                    className={`relative group/thumb w-14 h-10 sm:w-16 sm:h-11 rounded-lg overflow-hidden shrink-0 cursor-pointer transition-all border ${
                      idx === currentPhotoIndex 
                        ? 'ring-2 ring-sky-400 ring-offset-2 ring-offset-[#060c18] scale-105 border-transparent shadow-lg' 
                        : 'border-slate-700/80 opacity-60 hover:opacity-100 hover:border-slate-500'
                    }`}
                    title={`Photo ${idx + 1}`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    
                    {/* Delete Photo Button (strictly visible only for user's own photos if more than 1 photo) */}
                    {activePhotoModal.isUserUploaded && activeImages.length > 1 && (
                      <button
                        onClick={(e) => handleDeletePhoto(idx, e)}
                        className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-red-600/80 hover:bg-red-600 text-white opacity-0 group-hover/thumb:opacity-100 transition-opacity shadow cursor-pointer"
                        title="Remove this photo from album"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    )}
                  </div>
                ))}

                {/* Quick Add Photos Button in Strip - ONLY FOR USER'S OWN PHOTOS */}
                {activePhotoModal.isUserUploaded && (
                  <button
                    onClick={() => multiFileInputRef.current?.click()}
                    className="h-10 sm:h-11 px-3 rounded-lg border-2 border-dashed border-sky-500/50 hover:border-sky-400 bg-sky-950/40 hover:bg-sky-900/60 text-sky-300 hover:text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer active:scale-95"
                    title="Add multiple photos to your gallery"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span className="hidden sm:inline">Add Photos</span>
                  </button>
                )}
              </div>
            )}

            {/* Photo Details & Action Buttons */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5">
              
              {/* Success Notification Banner */}
              {photoUploadSuccessMessage && (
                <div className="px-3.5 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{photoUploadSuccessMessage}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      activePhotoModal.isUserUploaded ? 'bg-cyan-400 text-slate-950 font-extrabold shadow-md' : 'bg-sky-600 text-white'
                    }`}>
                      {activePhotoModal.isUserUploaded ? '⚡ Uploaded by You' : 'Archival Photograph'}
                    </span>
                    <span className="text-xs text-sky-400 font-semibold">
                      {activePhotoModal.region}
                    </span>
                    <span className="text-xs text-slate-400">
                      • {activePhotoModal.year}
                    </span>
                    {activeImages.length > 1 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-sky-300 border border-slate-700">
                        {activeImages.length} Slides
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {activePhotoModal.title}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Add Multiple Photos Button - ONLY FOR USER'S OWN PHOTOS */}
                  {activePhotoModal.isUserUploaded && (
                    <button
                      onClick={() => multiFileInputRef.current?.click()}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      title="Upload and add multiple photos to this gallery"
                    >
                      <ImagePlus className="w-3.5 h-3.5" />
                      <span>+ Add Multiple Photos</span>
                    </button>
                  )}

                  {/* AI Caption Button */}
                  {onLaunchAI && (
                    <button
                      onClick={() => {
                        onLaunchAI(activePhotoModal.title, activePhotoModal.description);
                        setActivePhotoModal(null);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-sky-600/20 border border-sky-500/40 hover:bg-sky-600/30 text-sky-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                      <span>AI Caption</span>
                    </button>
                  )}

                  {/* Download Active Photo Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const link = document.createElement('a');
                      link.href = activeImageUrl;
                      link.target = '_blank';
                      link.download = `${activePhotoModal.title.toLowerCase().replace(/\s+/g, '-')}-photo-${currentPhotoIndex + 1}.jpg`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                    title="Download currently active photograph"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download ({currentPhotoIndex + 1}/{activeImages.length})</span>
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activePhotoModal.description}
              </p>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-slate-800">
                <div className="p-2.5 rounded-lg bg-[#0c1629] border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Photographer / Source</span>
                  <span className="font-semibold text-slate-200">{activePhotoModal.authorOrLead}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0c1629] border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Resolution</span>
                  <span className="font-semibold text-slate-200">{activePhotoModal.resolution || '4K Ultra-HD'}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0c1629] border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Category</span>
                  <span className="font-semibold text-slate-200">{activePhotoModal.category}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0c1629] border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Total Downloads</span>
                  <span className="font-semibold text-slate-200">{activePhotoModal.downloads?.toLocaleString() || '1,420+'}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
