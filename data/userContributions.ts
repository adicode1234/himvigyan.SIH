import { RepositoryItem } from './polarData';

export interface UserContribution {
  id: string;
  title: string;
  type: 'Publication' | 'Dataset' | 'Report' | 'Media';
  categoryBadge: string;
  expedition: string;
  date: string;
  doi: string;
  downloads: number;
  views: number;
  citations?: number;
  fileSize: string;
  format: string;
  summary: string;
  fullAbstract: string;
  tags: string[];
  peerReviewed?: boolean;
  journal?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  images?: string[];
  mediaType?: 'image' | 'video';
  mediaKind?: 'photo' | 'video';
  fileUrl?: string;
  pdfUrl?: string;
  fileName?: string;
  leadScientist?: string;
  coAuthors?: string;
  station?: string;
  license?: string;
  equipment?: string;
  targetAudience?: string[];
  region?: 'Antarctica' | 'Arctic' | 'Himalayas' | 'Southern Ocean' | 'All';
}

export function contributionToRepositoryItem(uc: UserContribution): RepositoryItem {
  const isVideo = uc.mediaType === 'video' || uc.mediaKind === 'video' ||
    ((uc.format?.toLowerCase().includes('mp4') || uc.format?.toLowerCase().includes('video')) &&
     !uc.format?.toLowerCase().includes('jpg') &&
     !uc.format?.toLowerCase().includes('png') &&
     !uc.format?.toLowerCase().includes('photo') &&
     !uc.format?.toLowerCase().includes('image'));

  return {
    id: uc.id,
    title: uc.title,
    type: uc.type,
    region: (uc.region as any) || 'Antarctica',
    year: new Date().getFullYear(),
    date: uc.date,
    authorsOrLead: uc.leadScientist || 'Lead Scientist (You)',
    doi: uc.doi,
    fileSize: uc.fileSize,
    format: uc.format,
    fileUrl: uc.fileUrl,
    pdfUrl: uc.pdfUrl,
    fileName: uc.fileName,
    downloads: uc.downloads,
    tags: uc.tags,
    summary: uc.summary,
    fullAbstract: uc.fullAbstract || uc.summary,
    mediaUrl: uc.thumbnailUrl || uc.mediaUrl || (uc.type === 'Media' ? (isVideo ? 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80' : 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80') : undefined),
    mediaType: uc.type === 'Media' ? (isVideo ? 'video' : 'image') : undefined,
    isUserUploaded: true,
    aiDissemination: {
      twitterThread: [
        `🚨 NEW SCIENTIFIC UPLOAD: "${uc.title}" has just been cataloged by Indian Polar Scientists! 🇮🇳❄️ 1/3`,
        `🔬 Research Highlights: ${uc.summary.slice(0, 180)}... Conducted under ${uc.expedition}. 2/3`,
        `📊 Open Data & Citations: Registered with official DOI: ${uc.doi}. Full documentation available on the NCPOR Portal! 3/3 #PolarIndia #Science #Antarctica`
      ],
      instagramPost: {
        caption: `❄️ FRONTIER RESEARCH LIVE: "${uc.title}"\n\nFresh scientific findings logged into the National Polar & Ocean Repository! Swipe for mission highlights. 🇮🇳🏔️`,
        slides: [
          `Slide 1: ${uc.title}\nLead: ${uc.leadScientist || 'MoES Scientist'}`,
          `Slide 2: KEY FINDING\n${uc.summary}`,
          `Slide 3: DOI CITATION\n${uc.doi}\nOpen Access via NCPOR`
        ],
        hashtags: ['#NCPOR', '#PolarScience', '#Antarctica', '#MoES', '#ResearchLife']
      },
      linkedInPost: `Excited to announce the publication of "${uc.title}" in the National Centre for Polar and Ocean Research (NCPOR) archive.\n\nSummary:\n${uc.summary}\n\nDOI: ${uc.doi}\nLicense: ${uc.license || 'CC-BY 4.0 Open Access'}\n\nExplore and download the full dataset/report directly on the Indian Polar Knowledge Portal.`,
      pressRelease: {
        headline: `NCPOR Announces Immediate Archival of "${uc.title}"`,
        dateline: `NEW DELHI / GOA — MINISTRY OF EARTH SCIENCES`,
        body: `The National Centre for Polar and Ocean Research (NCPOR) has registered a new peer asset titled "${uc.title}". In accordance with Open Access scientific principles, the asset has been assigned DOI: ${uc.doi} and integrated into the national polar cryospheric database.\n\n${uc.summary}`,
        quote: `"This contribution strengthens India's global polar observations and offers high-precision data for climate models worldwide." — NCPOR Science Directorate`,
        notesToEditors: `Full citation, NetCDF data files, and high-resolution media are hosted on the NCPOR Knowledge Repository under MoES, Government of India.`
      },
      hindiTranslation: {
        headline: `एनसीपीओआर पोर्टल पर नया शोध प्रकाशित: "${uc.title}"`,
        summary: `पृथ्वी विज्ञान मंत्रालय के राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र ने नया डेटासेट एवं शोध रिपोर्ट जारी किया है: ${uc.summary}`,
        socialSnippet: `🇮🇳 ध्रुवीय अनुसंधान में नई उपलब्धि! "${uc.title}" अब राष्ट्रीय पोर्टल पर लाइव है। विस्तृत विवरण और डीओआई के लिए पोर्टल देखें। #PolarIndia #NCPOR`
      }
    }
  };
}

export const INITIAL_USER_CONTRIBUTIONS: UserContribution[] = [];

export const SAMPLE_ARCHIVED_CONTRIBUTIONS: UserContribution[] = [
  {
    id: 'uc-01',
    title: 'Sub-Glacial Bedrock Topography and Ice Sheet Dynamics across Maitri-Bharati Inland Traverse',
    type: 'Publication',
    categoryBadge: 'Peer-Reviewed Article',
    expedition: '43rd Indian Scientific Expedition to Antarctica (43-IAE)',
    date: '18 Jan 2024',
    doi: '10.1016/j.polar.2024.100982',
    downloads: 4820,
    views: 15400,
    citations: 42,
    fileSize: '14.2 MB',
    format: 'PDF (Journal Offprint)',
    journal: 'Polar Science & Cryospheric Annals (Elsevier)',
    peerReviewed: true,
    summary: 'Comprehensive ground-penetrating radar (GPR) and satellite altimetry survey across an 800-km inland transect between Maitri and Bharati stations, identifying deep bedrock troughs controlling ice stream velocity.',
    fullAbstract: 'During the 43rd Indian Scientific Expedition to Antarctica, an 800-km inland overland traverse was conducted from Bharati Station (Larsemann Hills) to Maitri Station (Schirmacher Oasis). Multi-frequency ground-penetrating radar (50 MHz and 100 MHz GPR) combined with kinematic dual-frequency GPS was deployed to map ice shelf thickness, internal accumulation isochrones, and underlying sub-glacial bedrock topography. The findings delineate two previously uncharted sub-glacial trenches exceeding 650 m below sea level, which exert first-order boundary condition control over continental ice drainage toward the Prydz Bay sector.',
    tags: ['Glaciology', 'GPR Profiling', 'Ice Thickness', 'Maitri-Bharati', 'Bedrock Topography']
  },
  {
    id: 'uc-02',
    title: 'Central Dronning Maud Land 102m Firn & Ice Core Geochemical Proxy Records',
    type: 'Dataset',
    categoryBadge: 'Open Scientific Dataset',
    expedition: '41st Indian Scientific Expedition to Antarctica (41-IAE)',
    date: '15 Mar 2024',
    doi: '10.5281/ncpor.ant.2024.089',
    downloads: 6140,
    views: 18200,
    citations: 28,
    fileSize: '48.2 MB',
    format: 'NetCDF / CSV / GeoTIFF',
    peerReviewed: true,
    summary: 'Decadal isotopic record (delta-18-O) and major ion chemistry from a 102m firn core extracted near Maitri station, revealing 500-year temperature anomalies.',
    fullAbstract: 'This dataset presents high-resolution ion chromatographic (IC) and inductively coupled plasma mass spectrometry (ICP-MS) measurements performed on a 102-meter firn/ice core extracted in Central Dronning Maud Land. Parameters include delta-18-O, delta-D, MSA (methanesulfonic acid), sulfate, nitrate, chloride, and black carbon concentrations calibrated against sub-annual density profiles.',
    tags: ['Paleoclimate', 'Ice Core', 'Dronning Maud Land', 'NetCDF', 'FAIR Data']
  },
  {
    id: 'uc-03',
    title: 'Official Scientific Compendium & Operational Logistics Cruise Report of the 43rd IAE',
    type: 'Report',
    categoryBadge: 'MoES Official Report',
    expedition: '43rd Indian Scientific Expedition to Antarctica (43-IAE)',
    date: '04 Apr 2024',
    doi: '10.5281/ncpor.rep.2024.043',
    downloads: 3190,
    views: 8900,
    fileSize: '114.5 MB',
    format: 'PDF (Complete Compendium)',
    summary: 'Complete official compilation of 38 multi-institutional scientific programs executed during the 2023-2024 polar campaign, winter-over logistics, and environmental assessments.',
    fullAbstract: 'Commissioned by the Ministry of Earth Sciences (MoES) and published by NCPOR, this official compendium documents the operational execution, fuel logistics, environmental impact mitigation, and primary scientific findings of the 43rd Indian Scientific Expedition to Antarctica. It incorporates technical reports from 18 participating national institutions including Survey of India, IMD, CSIR-NGRI, and DRDO-Sase.',
    tags: ['Expedition Report', 'Logistics', 'Maitri', 'Bharati', 'MoES Compendium']
  },
  {
    id: 'uc-04',
    title: '4K Aerial Drone Photogrammetry of Schirmacher Oasis Glacial Meltwater Outbursts',
    type: 'Media',
    categoryBadge: 'Research Media Vault',
    expedition: '42nd Indian Scientific Expedition to Antarctica (42-IAE)',
    date: '28 Dec 2023',
    doi: '10.5281/ncpor.media.2023.012',
    downloads: 4300,
    views: 12800,
    fileSize: '1.4 GB',
    format: '4K ProRes / MP4 / Orthomosaic',
    mediaUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    summary: 'High-framerate aerial drone footage and orthomosaic photogrammetry of supraglacial lakes and drainage channels near Maitri station during peak austral summer.',
    fullAbstract: 'Ultra-high-definition aerial photogrammetric dataset captured by calibrated RTK-equipped survey drones over the Schirmacher Oasis, Antarctica. The collection captures episodic drainage events, moraine-dammed lake outbursts, and seasonal albedo changes across blue ice areas with sub-centimeter ground sampling distance.',
    tags: ['Drone Survey', '4K Video', 'Schirmacher Oasis', 'Glacial Lakes', 'Photogrammetry']
  }
];
