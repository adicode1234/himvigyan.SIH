export interface ResearchProject {
  id: string;
  title: string;
  expeditionId: string;
  expeditionCode: string;
  domain: string;
  leadScientist: string;
  institution: string;
  summary: string;
  objectives: string[];
  status: 'Completed' | 'Under Analysis' | 'Ongoing';
  methodology: string;
  relatedPublicationIds: string[];
  relatedDatasetIds: string[];
}

export interface RelatedPublication {
  id: string;
  title: string;
  expeditionId: string;
  expeditionCode: string;
  researchId?: string;
  researchTitle?: string;
  authors: string;
  journal: string;
  year: number;
  doi: string;
  abstract: string;
  citation: string;
}

export interface RelatedDataset {
  id: string;
  title: string;
  expeditionId: string;
  expeditionCode: string;
  researchId?: string;
  researchTitle?: string;
  parameters: string[];
  fileFormat: string;
  fileSize: string;
  downloads: number;
  doi: string;
  dateCollected: string;
}

export interface ExpeditionReport {
  id: string;
  title: string;
  expeditionId: string;
  expeditionCode: string;
  docCode: string;
  pages: number;
  fileSize: string;
  type: 'Scientific Compendium' | 'Cruise Report' | 'Environmental Evaluation' | 'Logistics & Medical Summary';
  author: string;
}

export interface ExpeditionMedia {
  id: string;
  title: string;
  expeditionId: string;
  expeditionCode: string;
  type: 'Photo' | 'Video';
  category: 'Wildlife' | 'Research' | 'Expedition' | 'Landscape';
  resolution: '4K UHD' | '8K Ultra-HD' | 'Full HD';
  duration?: string;
  imageUrl: string;
  videoUrl?: string;
  caption: string;
  credit: string;
}

export interface TimelineMilestone {
  date: string;
  title: string;
  location: string;
  description: string;
  status: 'Completed' | 'Milestone';
}

export interface DetailedExpedition {
  id: string;
  code: string;
  title: string;
  region: 'Antarctica' | 'Arctic' | 'Southern Ocean' | 'Himalayas';
  status: 'Under Analysis' | 'Completed' | 'Ongoing' | 'Active All-Year';
  imageUrl: string;
  description: string;
  lead: string;
  leadDesignation: string;
  duration: string;
  dates: string;
  vesselOrBase: string;
  teamSize: string;
  teamBreakdown: string[];
  objectives: string[];
  highlights: string[];
  reportPdfUrl?: string;
  // Relational connections
  researchProjects: ResearchProject[];
  publications: RelatedPublication[];
  datasets: RelatedDataset[];
  reports: ExpeditionReport[];
  media: ExpeditionMedia[];
  timeline: TimelineMilestone[];
}

export const DETAILED_EXPEDITIONS: DetailedExpedition[] = [
  {
    id: 'isea-43',
    code: '43-IAE',
    title: '43rd Indian Scientific Expedition to Antarctica',
    region: 'Antarctica',
    status: 'Under Analysis',
    imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=85',
    description: 'India’s flagship Antarctic campaign operating across Bharati and Maitri stations. Executed an 800-km inland glaciological traverse, drilled a 120-meter deep paleo-climatic ice core in coastal Dronning Maud Land, and established high-frequency boundary layer flux towers.',
    lead: 'Dr. Vikramaditya Sen',
    leadDesignation: 'Senior Cryosphere Scientist, NCPOR Goa',
    duration: '114 Days (Nov 2023 - Mar 2024)',
    dates: '15 November 2023 – 24 March 2024',
    vesselOrBase: 'Chartered Ice-Class Vessel MV Vasiliy Golovnin, Bharati & Maitri Stations',
    teamSize: '48 Personnel',
    teamBreakdown: [
      '32 Scientific Researchers (NCPOR, IITM, NGRI, CCMB, IIG)',
      '10 Logistics & Engineering (Indian Army EME & Engineers)',
      '4 IT, Satellite & Telecommunications (ISRO/NRSC)',
      '2 Polar Medical Officers (Armed Forces Medical Services)'
    ],
    objectives: [
      'Extract a 120-meter firn/ice core to map sub-annual climate proxies across the last 1,200 years.',
      'Deploy sonic anemometer flux towers to study katabatic wind shear and surface energy budget.',
      'Establish permanent GNSS geodetic baselines to quantify Glacial Isostatic Adjustment (GIA).',
      'Profile psychrophilic microbial biodiversity in permafrost and cryoconite oasis environments.'
    ],
    highlights: ['Glaciology', 'Atmospheric Physics', 'Geodesy', 'Cryospheric Geobiology'],
    researchProjects: [
      {
        id: 'res-43-1',
        title: 'Ice Core Chemistry & Paleoclimate Proxy Dynamics',
        expeditionId: 'isea-43',
        expeditionCode: '43-IAE',
        domain: 'Glaciology & Paleoclimatology',
        leadScientist: 'Dr. Vikramaditya Sen',
        institution: 'National Centre for Polar and Ocean Research (NCPOR)',
        summary: 'Sub-annual chemical profiling of major ions (Na+, Cl-, SO4^2-, MSA) and stable isotopes (δ18O, δD) from a 120m ice core recovered near Dronning Maud Land.',
        objectives: [
          'Reconstruct Southern Ocean sea-ice extent over the past 1,200 years.',
          'Quantify volcanic sulfate horizons and solar cycle teleconnections.'
        ],
        status: 'Under Analysis',
        methodology: 'Continuous Flow Analysis (CFA), Cavity Ring-Down Spectroscopy (CRDS), and high-resolution Ion Chromatography inside -20°C class-100 clean rooms.',
        relatedPublicationIds: ['pub-43-1'],
        relatedDatasetIds: ['data-43-1']
      },
      {
        id: 'res-43-2',
        title: 'Atmospheric Boundary Layer Physics & Surface Energy Budget',
        expeditionId: 'isea-43',
        expeditionCode: '43-IAE',
        domain: 'Atmospheric Physics',
        leadScientist: 'Dr. Sneha Ganguly',
        institution: 'Indian Institute of Tropical Meteorology (IITM)',
        summary: 'High-frequency turbulent flux measurements over coastal snow packs to understand katabatic wind deceleration and latent heat exchange.',
        objectives: [
          'Quantify turbulent sensible and latent heat fluxes during polar summer.',
          'Analyze boundary layer stability under 100-knot storm wind conditions.'
        ],
        status: 'Completed',
        methodology: '3D Sonic Anemometers mounted on 10m meteorological towers coupled with infrared gas analyzers (IRGA).',
        relatedPublicationIds: ['pub-43-2'],
        relatedDatasetIds: ['data-43-2']
      },
      {
        id: 'res-43-3',
        title: 'Geodetic Crustal Deformation & Post-Glacial Rebound',
        expeditionId: 'isea-43',
        expeditionCode: '43-IAE',
        domain: 'Geodesy & Geodynamics',
        leadScientist: 'Dr. T. V. Ramanathan',
        institution: 'National Geophysical Research Institute (NGRI)',
        summary: 'Continuous GNSS geodesy and absolute gravity monitoring across nunataks to isolate solid Earth viscoelastic rebound from present-day ice mass loss.',
        objectives: [
          'Measure vertical bedrock uplift velocity with millimeter precision.',
          'Constrain regional Antarctic ice sheet melt mass estimates.'
        ],
        status: 'Under Analysis',
        methodology: 'Dual-frequency geodetic GNSS receivers anchored directly into crystalline bedrock with cryogenic gravimeters.',
        relatedPublicationIds: ['pub-43-3'],
        relatedDatasetIds: ['data-43-3']
      },
      {
        id: 'res-43-4',
        title: 'Cryospheric Geobiology & Permafrost Genomics',
        expeditionId: 'isea-43',
        expeditionCode: '43-IAE',
        domain: 'Cryospheric Geobiology',
        leadScientist: 'Dr. Priya Nair',
        institution: 'Centre for Cellular and Molecular Biology (CCMB)',
        summary: 'Metagenomic sequencing of extremophile bacteria and fungi inhabiting blue ice moraines and subglacial supraglacial sediments.',
        objectives: [
          'Discover cold-active enzymes (lipases, proteases) for industrial biocatalysis.',
          'Map antimicrobial peptide resistance in pristine polar habitats.'
        ],
        status: 'Completed',
        methodology: 'Sterile cryo-coring, Illumina NovaSeq high-throughput metagenomic sequencing, and HPLC biochemical profiling.',
        relatedPublicationIds: ['pub-43-4'],
        relatedDatasetIds: ['data-43-4']
      }
    ],
    publications: [
      {
        id: 'pub-43-1',
        title: 'Centennial-Scale Atmospheric Circulation Recorded in East Antarctic Ice Cores',
        expeditionId: 'isea-43',
        expeditionCode: '43-IAE',
        researchId: 'res-43-1',
        researchTitle: 'Ice Core Chemistry & Paleoclimate Proxy Dynamics',
        authors: 'Sen, V., Sharma, P., Kumar, R., & Meloth, T.',
        journal: 'Journal of Geophysical Research: Atmospheres',
        year: 2024,
        doi: '10.1029/2024JD041289',
        abstract: 'High-resolution chemical and isotopic investigation of the 120m Dronning Maud Land ice core reveals a sharp decadal shift in Southern Annular Mode (SAM) positive polarity over the last 150 years.',
        citation: 'Sen et al. (2024). J. Geophys. Res. Atmos., 129(8), e2024JD041289.'
      },
      {
        id: 'pub-43-2',
        title: 'Katabatic Wind Forcing and Latent Heat Exchange at Larsemann Hills',
        expeditionId: 'isea-43',
        expeditionCode: '43-IAE',
        researchId: 'res-43-2',
        researchTitle: 'Atmospheric Boundary Layer Physics & Surface Energy Budget',
        authors: 'Ganguly, S., Anilkumar, N., & Sen, V.',
        journal: 'Polar Science',
        year: 2024,
        doi: '10.1016/j.polar.2024.100984',
        abstract: 'In-situ eddy covariance flux tower observations demonstrate that turbulent sensible heat dissipation increases threefold during summer katabatic drainage events.',
        citation: 'Ganguly et al. (2024). Polar Science, 40, 100984.'
      },
      {
        id: 'pub-43-3',
        title: 'Crustal Velocity Field and Glacial Isostatic Adjustment in Queen Maud Land',
        expeditionId: 'isea-43',
        expeditionCode: '43-IAE',
        researchId: 'res-43-3',
        researchTitle: 'Geodetic Crustal Deformation & Post-Glacial Rebound',
        authors: 'Ramanathan, T. V., & Banerjee, S.',
        journal: 'Geophysical Journal International',
        year: 2024,
        doi: '10.1093/gji/ggae112',
        abstract: 'GNSS coordinates measured over 12 continuous seasons yield an average vertical bedrock displacement of 1.4 ± 0.2 mm/yr across the Schirmacher Oasis.',
        citation: 'Ramanathan & Banerjee (2024). Geophys. J. Int., 237(2), 789–804.'
      },
      {
        id: 'pub-43-4',
        title: 'Metagenomic Insights into Cold-Active Hydrolases from Antarctic Cryoconite Holes',
        expeditionId: 'isea-43',
        expeditionCode: '43-IAE',
        researchId: 'res-43-4',
        researchTitle: 'Cryospheric Geobiology & Permafrost Genomics',
        authors: 'Nair, P., Kulkarni, S., & Roy, A.',
        journal: 'FEMS Microbiology Ecology',
        year: 2024,
        doi: '10.1093/femsec/fiae045',
        abstract: 'Discovered 14 novel psychrophilic esterase gene clusters with optimal biocatalytic turnover at 4°C, expanding known enzymes for green chemistry.',
        citation: 'Nair et al. (2024). FEMS Microbiol. Ecol., 100(5), fiae045.'
      }
    ],
    datasets: [
      {
        id: 'data-43-1',
        title: '120m Dronning Maud Land Ice Core Micro-Chemical Profile (1-cm resolution)',
        expeditionId: 'isea-43',
        expeditionCode: '43-IAE',
        researchId: 'res-43-1',
        researchTitle: 'Ice Core Chemistry & Paleoclimate Proxy Dynamics',
        parameters: ['δ18O', 'δD', 'Sodium (Na+)', 'Sulfate (SO4^2-)', 'MSA', 'Dust Particulates'],
        fileFormat: 'NetCDF / CSV',
        fileSize: '42.8 MB',
        downloads: 840,
        doi: '10.26063/ncpor.icecore.43iae.01',
        dateCollected: 'January 2024'
      },
      {
        id: 'data-43-2',
        title: 'High-Frequency (20 Hz) Sonic Anemometer Turbulence & Surface Flux Timeseries',
        expeditionId: 'isea-43',
        expeditionCode: '43-IAE',
        researchId: 'res-43-2',
        researchTitle: 'Atmospheric Boundary Layer Physics & Surface Energy Budget',
        parameters: ['3D Wind Velocity (u, v, w)', 'Sonic Temperature', 'Sensible Heat Flux', 'Momentum Flux'],
        fileFormat: 'HDF5 / NetCDF',
        fileSize: '128.4 MB',
        downloads: 512,
        doi: '10.26063/ncpor.atmos.43iae.02',
        dateCollected: 'December 2023 - February 2024'
      },
      {
        id: 'data-43-3',
        title: 'Continuous Geodetic GNSS RINEX Observables & Gravity Baselines',
        expeditionId: 'isea-43',
        expeditionCode: '43-IAE',
        researchId: 'res-43-3',
        researchTitle: 'Geodetic Crustal Deformation & Post-Glacial Rebound',
        parameters: ['Carrier Phase L1/L2', 'Pseudorange C1/P2', 'Absolute Gravity Acceleration'],
        fileFormat: 'RINEX 3.0 / ASCII',
        fileSize: '18.4 MB',
        downloads: 320,
        doi: '10.26063/ncpor.geodesy.43iae.03',
        dateCollected: 'February 2024'
      },
      {
        id: 'data-43-4',
        title: 'Antarctic Cryoconite Soil Metagenome FASTQ Reads & Assembled Contigs',
        expeditionId: 'isea-43',
        expeditionCode: '43-IAE',
        researchId: 'res-43-4',
        researchTitle: 'Cryospheric Geobiology & Permafrost Genomics',
        parameters: ['Illumina 150bp Paired-End Reads', '16S rRNA OTU Tables', 'Assembled Biosynthetic Contigs'],
        fileFormat: 'FASTQ.GZ / FASTA',
        fileSize: '1.2 GB',
        downloads: 410,
        doi: '10.26063/ncpor.biology.43iae.04',
        dateCollected: 'January 2024'
      }
    ],
    reports: [
      {
        id: 'rep-43-1',
        title: '43-IAE Official Scientific Compendium & Voyage Cruise Report',
        expeditionId: 'isea-43',
        expeditionCode: '43-IAE',
        docCode: 'MoES-NCPOR-TR-2024-43',
        pages: 284,
        fileSize: '18.2 MB',
        type: 'Scientific Compendium',
        author: 'Dr. Vikramaditya Sen & NCPOR Editorial Board'
      },
      {
        id: 'rep-43-2',
        title: 'Comprehensive Environmental Evaluation & Treaty Protocol Compliance Audit',
        expeditionId: 'isea-43',
        expeditionCode: '43-IAE',
        docCode: 'ATCM-XLVI-IP-24',
        pages: 64,
        fileSize: '6.4 MB',
        type: 'Environmental Evaluation',
        author: 'NCPOR Antarctic Environmental Stewardship Committee'
      },
      {
        id: 'rep-43-3',
        title: 'Polar Medical Health, High-Altitude Traverse Safety & Evacuation Logistics Manual',
        expeditionId: 'isea-43',
        expeditionCode: '43-IAE',
        docCode: 'AFMS-NCPOR-MED-43',
        pages: 82,
        fileSize: '4.8 MB',
        type: 'Logistics & Medical Summary',
        author: 'Surgeon Commander R. Sharma, AFMS'
      }
    ],
    media: [
      {
        id: 'med-43-1',
        title: 'Arrival of MV Vasiliy Golovnin at Larsemann Hills Fast Ice Pack',
        expeditionId: 'isea-43',
        expeditionCode: '43-IAE',
        type: 'Video',
        category: 'Expedition',
        resolution: '4K UHD',
        duration: '06:32',
        imageUrl: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=800&q=80',
        videoUrl: 'https://pixabay.com/videos/download/x-327101_medium.mp4',
        caption: '4K documentary footage capturing heavy icebreaker navigation, helicopter cargo airlift, and arrival at Bharati Station.',
        credit: 'INSAT / NCPOR Logistics Media Unit'
      },
      {
        id: 'med-43-2',
        title: 'Emperor Penguins Colony Survey at Prydz Bay Sea Ice',
        expeditionId: 'isea-43',
        expeditionCode: '43-IAE',
        type: 'Photo',
        category: 'Wildlife',
        resolution: '4K UHD',
        imageUrl: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=800&q=80',
        caption: 'Adult Emperor penguins and chicks observed during biological monitoring transects along coastal fast ice.',
        credit: 'Dr. R. Kumar, Wildlife Wing'
      },
      {
        id: 'med-43-3',
        title: '120-Meter Deep Ice Core Drilling Operation on Polar Plateau',
        expeditionId: 'isea-43',
        expeditionCode: '43-IAE',
        type: 'Photo',
        category: 'Research',
        resolution: '4K UHD',
        imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
        caption: 'Scientists in cold-weather gear operating the electromechanical drill rig inside the subsurface trench.',
        credit: 'Ice Core Field Division'
      },
      {
        id: 'med-43-4',
        title: 'All-Sky Time-Lapse: Aurora Australis Ribboning Over Maitri Station',
        expeditionId: 'isea-43',
        expeditionCode: '43-IAE',
        type: 'Video',
        category: 'Landscape',
        resolution: '4K UHD',
        duration: '02:15',
        imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        caption: 'Green and purple geomagnetic solar storm emissions recorded by all-sky optical imager.',
        credit: 'Geospace Sciences Division, IIG'
      }
    ],
    timeline: [
      {
        date: '15 Nov 2023',
        title: 'Expedition Flag-Off from Mormugao Port, Goa',
        location: 'Goa, India',
        description: 'Vessel MV Vasiliy Golovnin loaded with 48 scientists, specialized drill rigs, and Antarctic fuel supplies.',
        status: 'Completed'
      },
      {
        date: '02 Dec 2023',
        title: 'Crossing Roaring Forties & First Iceberg Sighting (58°S)',
        location: 'Southern Ocean',
        description: 'Deploying deep ocean ARGO floats and initiating shipboard atmospheric aerosol monitoring.',
        status: 'Completed'
      },
      {
        date: '18 Dec 2023',
        title: 'Arrival at Prydz Bay & Bharati Station Cargo Airlift',
        location: 'Larsemann Hills, Antarctica',
        description: 'Kamov helicopters completed 42 sorties transfering containerized food and scientific equipment.',
        status: 'Completed'
      },
      {
        date: '08 Jan 2024',
        title: 'Commencement of 800-km Polar Glaciological Traverse',
        location: 'Central Dronning Maud Land',
        description: 'PistenBully snowcats convoying deep into the plateau for sub-ice core drilling operations.',
        status: 'Completed'
      },
      {
        date: '14 Feb 2024',
        title: 'Retrieval of 120-Meter Ice Core & AWS Flux Tower Setup',
        location: 'Plateau Drill Site Alpha',
        description: 'Core safely packed in insulated thermal boxes at -25°C; sonic anemometer tower commissioned.',
        status: 'Completed'
      },
      {
        date: '04 Mar 2024',
        title: 'Station Handover to Winter-Over Team & Return Voyage',
        location: 'Maitri & Bharati Stations',
        description: 'Completed handover of life-support, fuel reservoirs, and telemetry systems for polar night.',
        status: 'Completed'
      },
      {
        date: '24 Mar 2024',
        title: 'Safe Port Arrival at Cape Town & Cold-Chain Transfer',
        location: 'Cape Town, South Africa',
        description: 'Ice core specimens and cryogenic biological samples loaded into refrigerated air cargo bound for NCPOR Goa.',
        status: 'Completed'
      }
    ]
  },
  {
    id: 'isea-42',
    code: '42-IAE',
    title: '42nd Indian Scientific Expedition to Antarctica',
    region: 'Antarctica',
    status: 'Completed',
    imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=85',
    description: 'Focused on Larsemann Hills coastal dynamics, Southern Ocean boundary layer turbulence, and benthic ecosystem surveys under fast ice.',
    lead: 'Dr. Anandita Chatterjee',
    leadDesignation: 'Head, Marine Biological Sciences, NCPOR',
    duration: '128 Days (Nov 2022 - Apr 2023)',
    dates: '20 November 2022 – 14 April 2023',
    vesselOrBase: 'MV Vasiliy Golovnin & Bharati Station',
    teamSize: '44 Personnel',
    teamBreakdown: [
      '28 Scientific Researchers',
      '10 Defense Logistics & Technical Support',
      '4 Communications & Power Engineers',
      '2 Medical Officers'
    ],
    objectives: [
      'Survey shallow benthic marine communities beneath fast-ice using remote underwater vehicles.',
      'Monitor permafrost temperature profiles down to 30 meters depth in Schirmacher Oasis.',
      'Record high-latitude geomagnetic storm perturbations during the solar cycle 25 upswing.'
    ],
    highlights: ['Oceanography', 'Microbiology', 'Cryospheric Structural Engineering'],
    researchProjects: [
      {
        id: 'res-42-1',
        title: 'Benthic Ecosystem Biodiversity & Ocean Acidification Beneath Fast Ice',
        expeditionId: 'isea-42',
        expeditionCode: '42-IAE',
        domain: 'Marine Biology',
        leadScientist: 'Dr. Anandita Chatterjee',
        institution: 'NCPOR',
        summary: 'Investigating calcifying benthos and cold-water sponge assemblages in Prydz Bay.',
        objectives: ['Assess shell dissolution in polar pteropods.', 'Map benthic biodiversity indices.'],
        status: 'Completed',
        methodology: 'ROV underwater video surveys and grab sampling down to 400m depths.',
        relatedPublicationIds: ['pub-42-1'],
        relatedDatasetIds: ['data-42-1']
      }
    ],
    publications: [
      {
        id: 'pub-42-1',
        title: 'Vulnerability of Antarctic Benthic Communities to Southern Ocean Acidification',
        expeditionId: 'isea-42',
        expeditionCode: '42-IAE',
        researchId: 'res-42-1',
        researchTitle: 'Benthic Ecosystem Biodiversity & Ocean Acidification Beneath Fast Ice',
        authors: 'Chatterjee, A., & Nair, R.',
        journal: 'Marine Ecology Progress Series',
        year: 2023,
        doi: '10.3354/meps14321',
        abstract: 'Reveals significant decreases in aragonite saturation depth impacting larval settlement in Larsemann Hills coastal waters.',
        citation: 'Chatterjee & Nair (2023). Mar. Ecol. Prog. Ser., 712, 45–60.'
      }
    ],
    datasets: [
      {
        id: 'data-42-1',
        title: 'Prydz Bay Benthic Species Abundance & CTD Hydrographic Profiles',
        expeditionId: 'isea-42',
        expeditionCode: '42-IAE',
        researchId: 'res-42-1',
        parameters: ['Water Salinity', 'Dissolved Oxygen', 'Aragonite Saturation', 'Taxa Count'],
        fileFormat: 'CSV / NetCDF',
        fileSize: '34.2 MB',
        downloads: 620,
        doi: '10.26063/ncpor.marine.42iae.01',
        dateCollected: 'February 2023'
      }
    ],
    reports: [
      {
        id: 'rep-42-1',
        title: '42nd Indian Scientific Expedition to Antarctica: Official Mission Compendium',
        expeditionId: 'isea-42',
        expeditionCode: '42-IAE',
        docCode: 'MoES-NCPOR-TR-2023-42',
        pages: 312,
        fileSize: '22.4 MB',
        type: 'Scientific Compendium',
        author: 'Dr. Anandita Chatterjee & NCPOR Editorial Board'
      }
    ],
    media: [
      {
        id: 'med-42-1',
        title: 'Underwater ROV Exploration of Prydz Bay Benthic Life',
        expeditionId: 'isea-42',
        expeditionCode: '42-IAE',
        type: 'Video',
        category: 'Research',
        resolution: '4K UHD',
        duration: '08:45',
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        caption: 'High-definition underwater drone footage documenting rich polar marine invertebrate communities.',
        credit: 'NCPOR Deep Sea Unit'
      }
    ],
    timeline: [
      {
        date: '20 Nov 2022',
        title: 'Departure from Mormugao, Goa',
        location: 'Goa, India',
        description: 'Voyage initiation with 44 expeditioners and wintering personnel.',
        status: 'Completed'
      },
      {
        date: '15 Jan 2023',
        title: 'Prydz Bay Benthic Dredge & ROV Deployment',
        location: 'Prydz Bay',
        description: 'Successfully deployed subsea optical vehicle through fast ice hole.',
        status: 'Completed'
      },
      {
        date: '14 Apr 2023',
        title: 'Expedition Conclusion & Team Debrief',
        location: 'Goa, India',
        description: 'Successful debrief with MoES Secretary and archival of research samples.',
        status: 'Completed'
      }
    ]
  },
  {
    id: 'arctic-24',
    code: 'ARCTIC-24',
    title: 'Indian Arctic Summer Scientific Expedition 2024',
    region: 'Arctic',
    status: 'Completed',
    imageUrl: 'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=1200&q=85',
    description: 'Investigated rapid glacier retreat in Kongsvegen and Blomstrandbreen, measured atmospheric black carbon transport from mid-latitudes, and retrieved deep mooring data from IndARC.',
    lead: 'Dr. Rajeshwar Nair',
    leadDesignation: 'Scientist-in-Charge, Arctic Operations, NCPOR',
    duration: '65 Days (Jun 2024 - Aug 2024)',
    dates: '10 June 2024 – 15 August 2024',
    vesselOrBase: 'Himadri Research Station, Ny-Ålesund & RV Lance',
    teamSize: '24 Scientists',
    teamBreakdown: [
      '18 Atmospheric & Glaciological Researchers',
      '4 Marine Fjord Oceanographers',
      '2 Technical & Safety Specialists'
    ],
    objectives: [
      'Retrieve and redeploy India’s IndARC subsurface mooring in Kongsfjorden (192m depth).',
      'Quantify black carbon aerosol concentrations and their snow albedo reduction impact.',
      'Perform drone photogrammetry and ground-penetrating radar on Kongsvegen Glacier.'
    ],
    highlights: ['Atmospheric Science', 'Fjord Oceanography', 'Glacial Hydrology'],
    researchProjects: [
      {
        id: 'res-arc-1',
        title: 'Fjord Oceanography & Atlantic Water Inflow Dynamics (IndARC)',
        expeditionId: 'arctic-24',
        expeditionCode: 'ARCTIC-24',
        domain: 'Fjord Oceanography',
        leadScientist: 'Dr. Rajeshwar Nair',
        institution: 'NCPOR',
        summary: 'Continuous 10-year monitoring of Atlantic Water pulses penetrating the Arctic Svalbard archipelago.',
        objectives: ['Track heat transport into Kongsfjorden.', 'Examine impact on glacier calving fronts.'],
        status: 'Completed',
        methodology: 'Acoustic Doppler Current Profilers (ADCP) and CTD sensor strings moored at 192m depth.',
        relatedPublicationIds: ['pub-arc-1'],
        relatedDatasetIds: ['data-arc-1']
      }
    ],
    publications: [
      {
        id: 'pub-arc-1',
        title: 'Intensified Atlantic Water Inflow Accelerates Marine-Terminating Glacier Melt in Kongsfjorden',
        expeditionId: 'arctic-24',
        expeditionCode: 'ARCTIC-24',
        researchId: 'res-arc-1',
        authors: 'Nair, R., Krishnan, K. P., & Ravichandran, M.',
        journal: 'Geophysical Research Letters',
        year: 2024,
        doi: '10.1029/2024GL108922',
        abstract: 'IndARC mooring records show a 0.8°C thermal anomaly in sub-surface Atlantic Water driving basal submarine melt of Kongsbreen Glacier.',
        citation: 'Nair et al. (2024). Geophys. Res. Lett., 51(12), e2024GL108922.'
      }
    ],
    datasets: [
      {
        id: 'data-arc-1',
        title: 'IndARC Mooring Full-Column Salinity, Temperature & Current Velocity (2023-2024)',
        expeditionId: 'arctic-24',
        expeditionCode: 'ARCTIC-24',
        researchId: 'res-arc-1',
        parameters: ['Potential Temperature', 'Practical Salinity', 'Current Vector U/V', 'Turbidity'],
        fileFormat: 'NetCDF / ASCII',
        fileSize: '68.5 MB',
        downloads: 910,
        doi: '10.26063/ncpor.arctic.indarc.2024',
        dateCollected: 'July 2024'
      }
    ],
    reports: [
      {
        id: 'rep-arc-1',
        title: 'Indian Arctic Summer Scientific Mission 2024: Technical & Observational Report',
        expeditionId: 'arctic-24',
        expeditionCode: 'ARCTIC-24',
        docCode: 'MoES-NCPOR-ARC-2024',
        pages: 146,
        fileSize: '12.8 MB',
        type: 'Scientific Compendium',
        author: 'Dr. Rajeshwar Nair & Arctic Research Group'
      }
    ],
    media: [
      {
        id: 'med-arc-1',
        title: 'Himadri Research Station Under Midnight Sun in Ny-Ålesund',
        expeditionId: 'arctic-24',
        expeditionCode: 'ARCTIC-24',
        type: 'Photo',
        category: 'Expedition',
        resolution: '4K UHD',
        imageUrl: 'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=800&q=80',
        caption: 'Indian tricolor fluttering above Himadri base surrounded by Arctic fjords and glaciated mountains.',
        credit: 'Dr. R. Nair, NCPOR'
      }
    ],
    timeline: [
      {
        date: '10 Jun 2024',
        title: 'Arrival of Summer Contingent in Ny-Ålesund',
        location: 'Svalbard, Norway',
        description: 'Opening Himadri base laboratories and initiating baseline aerosol measurement.',
        status: 'Completed'
      },
      {
        date: '02 Jul 2024',
        title: 'IndARC Mooring Recovery from RV Lance',
        location: 'Kongsfjorden',
        description: 'Acoustic release triggered; retrieved 12 months of high-resolution subsurface hydrographic data.',
        status: 'Completed'
      },
      {
        date: '15 Aug 2024',
        title: 'Redeployment of IndARC-2024/25 & Summer Wrap-up',
        location: 'Kongsfjorden',
        description: 'Re-ballasted mooring deployed with new sensors for upcoming polar winter monitoring.',
        status: 'Completed'
      }
    ]
  },
  {
    id: 'isoe-12',
    code: '12-ISOE',
    title: '12th Indian Southern Ocean Expedition',
    region: 'Southern Ocean',
    status: 'Completed',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    description: 'Deep ocean CTD casts across Subtropical to Polar Frontal zones, studying biogeochemical carbon drawdown and trace iron limitation in diatoms.',
    lead: 'Dr. N. Anilkumar',
    leadDesignation: 'Programme Director, Ocean Sciences, NCPOR',
    duration: '45 Days (Jan 2024 - Feb 2024)',
    dates: '05 January 2024 – 19 February 2024',
    vesselOrBase: 'Oceanographic Research Vessel ORV Sagar Kanya',
    teamSize: '36 Scientists & Crew',
    teamBreakdown: [
      '22 Marine Scientists (NCPOR, NIO, CMLRE, CUSAT)',
      '14 Marine Technicians & Vessel Crew'
    ],
    objectives: [
      'Transect from 40°S to 66°S measuring carbon sequestration in the Southern Ocean Biological Pump.',
      'Measure trace metal iron bioavailability and limitation on micro-phytoplankton bloom development.'
    ],
    highlights: ['Marine Biogeochemistry', 'Carbon Sink', 'Plankton Dynamics'],
    researchProjects: [
      {
        id: 'res-soe-1',
        title: 'Trace Iron Biogeochemistry & Carbon Export in the Polar Frontal Zone',
        expeditionId: 'isoe-12',
        expeditionCode: '12-ISOE',
        domain: 'Marine Biogeochemistry',
        leadScientist: 'Dr. N. Anilkumar',
        institution: 'NCPOR',
        summary: 'Quantifying dissolved iron limitation in High-Nutrient Low-Chlorophyll (HNLC) polar waters.',
        objectives: ['Measure particulate organic carbon export.', 'Map iron fertilization thresholds.'],
        status: 'Completed',
        methodology: 'Clean titanium rosette CTD casts down to 4,000m with inductively coupled plasma mass spectrometry.',
        relatedPublicationIds: ['pub-soe-1'],
        relatedDatasetIds: ['data-soe-1']
      }
    ],
    publications: [
      {
        id: 'pub-soe-1',
        title: 'Trace Iron Limitation Regulates Primary Productivity Across the Indian Sector of Southern Ocean',
        expeditionId: 'isoe-12',
        expeditionCode: '12-ISOE',
        researchId: 'res-soe-1',
        authors: 'Anilkumar, N., Sabu, P., & George, J. V.',
        journal: 'Deep Sea Research Part II',
        year: 2024,
        doi: '10.1016/j.dsr2.2024.105389',
        abstract: 'Demonstrates that nanoplankton dominate carbon fixation along the Sub-Antarctic Front under iron-depleted conditions.',
        citation: 'Anilkumar et al. (2024). Deep Sea Res. II, 218, 105389.'
      }
    ],
    datasets: [
      {
        id: 'data-soe-1',
        title: 'Southern Ocean 40°S-66°S Deep CTD Hydrography & Dissolved Iron Profiles',
        expeditionId: 'isoe-12',
        expeditionCode: '12-ISOE',
        researchId: 'res-soe-1',
        parameters: ['Dissolved Fe (nM)', 'Particulate Organic Carbon (POC)', 'Chlorophyll-a', 'Nutrients (Nitrate/Phosphate)'],
        fileFormat: 'NetCDF / CSV',
        fileSize: '54.2 MB',
        downloads: 540,
        doi: '10.26063/ncpor.ocean.12isoe.01',
        dateCollected: 'January - February 2024'
      }
    ],
    reports: [
      {
        id: 'rep-soe-1',
        title: '12th Indian Southern Ocean Expedition: Cruise & Oceanographic Report',
        expeditionId: 'isoe-12',
        expeditionCode: '12-ISOE',
        docCode: 'MoES-ORV-CRUISE-2024-12',
        pages: 188,
        fileSize: '15.6 MB',
        type: 'Cruise Report',
        author: 'Dr. N. Anilkumar & Chief Scientists'
      }
    ],
    media: [
      {
        id: 'med-soe-1',
        title: 'ORV Sagar Kanya Navigating the Furious Fifties Southern Ocean Swells',
        expeditionId: 'isoe-12',
        expeditionCode: '12-ISOE',
        type: 'Photo',
        category: 'Expedition',
        resolution: '4K UHD',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        caption: 'India’s premier oceanographic research vessel sailing through heavy polar swells during deep CTD casts.',
        credit: 'ORV Sagar Kanya Science Crew'
      }
    ],
    timeline: [
      {
        date: '05 Jan 2024',
        title: 'Departure from Port Louis, Mauritius',
        location: 'Mauritius',
        description: 'Commencement of southern transect towards the Antarctic continental shelf.',
        status: 'Completed'
      },
      {
        date: '28 Jan 2024',
        title: 'Crossing Polar Front & Deep Hydrographic Cast 4,500m',
        location: '56°S, 57°E',
        description: 'Titanium trace-metal rosette cast deployed successfully in icy seas.',
        status: 'Completed'
      },
      {
        date: '19 Feb 2024',
        title: 'Arrival at Cape Town & Sample Preservation',
        location: 'Cape Town',
        description: 'Cruise concluded with 48 deep stations completed.',
        status: 'Completed'
      }
    ]
  },
  {
    id: 'arctic-w23',
    code: 'ARCTIC-W23',
    title: 'First Indian Arctic Winter Scientific Expedition',
    region: 'Arctic',
    status: 'Completed',
    imageUrl: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=1200&q=85',
    description: 'Historic milestone maintaining continuous observation during the 24-hour Arctic polar night, evaluating wintertime boundary layers and aerosol radiative forcing.',
    lead: 'Dr. K.P. Krishnan',
    leadDesignation: 'Senior Scientist, Polar Microbiology & Cryosphere, NCPOR',
    duration: '90 Days (Dec 2023 - Mar 2024)',
    dates: '19 December 2023 – 18 March 2024',
    vesselOrBase: 'Himadri Station (Ny-Ålesund, Norway)',
    teamSize: '12 Scientists (Winter-Over)',
    teamBreakdown: [
      '8 Atmospheric & Space Physics Scientists',
      '4 Cryospheric Microbiologists'
    ],
    objectives: [
      'Maintain continuous 24-hour dark period observation of aurora and ionospheric scinitillation.',
      'Quantify baseline atmospheric mercury, ozone, and aerosol chemistry during polar night.'
    ],
    highlights: ['Polar Night Chemistry', 'Sea Ice Physics', 'Microbiology'],
    researchProjects: [
      {
        id: 'res-w23-1',
        title: 'Polar Night Atmospheric Chemistry & Inversion Layer Dynamics',
        expeditionId: 'arctic-w23',
        expeditionCode: 'ARCTIC-W23',
        domain: 'Atmospheric Chemistry',
        leadScientist: 'Dr. K.P. Krishnan',
        institution: 'NCPOR',
        summary: 'First in-situ winter atmospheric profiling under continuous absence of solar radiation.',
        objectives: ['Analyze nocturnal ozone depletion events.', 'Characterize Arctic haze.'],
        status: 'Completed',
        methodology: 'Multi-axis differential optical absorption spectroscopy (MAX-DOAS) and tethered sonde flights.',
        relatedPublicationIds: ['pub-w23-1'],
        relatedDatasetIds: ['data-w23-1']
      }
    ],
    publications: [
      {
        id: 'pub-w23-1',
        title: 'Nocturnal Atmospheric Aerosol Evolution During Arctic Polar Night at Ny-Ålesund',
        expeditionId: 'arctic-w23',
        expeditionCode: 'ARCTIC-W23',
        researchId: 'res-w23-1',
        authors: 'Krishnan, K. P., & Sinha, P. R.',
        journal: 'Atmospheric Chemistry and Physics',
        year: 2024,
        doi: '10.5194/acp-24-4512-2024',
        abstract: 'Documents episodic long-range transport of mid-latitude sulfate pollution into the Arctic boundary layer during winter vortex breakdowns.',
        citation: 'Krishnan & Sinha (2024). Atmos. Chem. Phys., 24, 4512–4528.'
      }
    ],
    datasets: [
      {
        id: 'data-w23-1',
        title: 'Continuous Arctic Winter Surface Ozone & Black Carbon Concentration Timeseries',
        expeditionId: 'arctic-w23',
        expeditionCode: 'ARCTIC-W23',
        researchId: 'res-w23-1',
        parameters: ['Surface Ozone (ppbv)', 'Equivalent Black Carbon (ng/m3)', 'Boundary Inversion Height (m)'],
        fileFormat: 'CSV / NetCDF',
        fileSize: '28.1 MB',
        downloads: 480,
        doi: '10.26063/ncpor.arctic.winter.2024.01',
        dateCollected: 'December 2023 - March 2024'
      }
    ],
    reports: [
      {
        id: 'rep-w23-1',
        title: 'Inaugural Indian Arctic Winter Scientific Expedition: Pioneer Compendium',
        expeditionId: 'arctic-w23',
        expeditionCode: 'ARCTIC-W23',
        docCode: 'MoES-NCPOR-WINARC-2024',
        pages: 128,
        fileSize: '9.8 MB',
        type: 'Scientific Compendium',
        author: 'Dr. K.P. Krishnan & Wintering Team'
      }
    ],
    media: [
      {
        id: 'med-w23-1',
        title: 'Himadri Research Station Lit Under Arctic Polar Night',
        expeditionId: 'arctic-w23',
        expeditionCode: 'ARCTIC-W23',
        type: 'Photo',
        category: 'Expedition',
        resolution: '4K UHD',
        imageUrl: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=800&q=80',
        caption: 'Historic long-exposure photograph of India’s Arctic station operating during 24-hour winter darkness.',
        credit: 'Dr. K.P. Krishnan, NCPOR'
      }
    ],
    timeline: [
      {
        date: '19 Dec 2023',
        title: 'Flag-Off by Union Minister for Earth Sciences',
        location: 'New Delhi, India',
        description: 'First ever wintering deployment sent to high Arctic.',
        status: 'Completed'
      },
      {
        date: '28 Dec 2023',
        title: 'Arrival in Ny-Ålesund & Polar Night Commencement',
        location: 'Svalbard, Norway',
        description: 'Station systems commissioned in -28°C dark conditions.',
        status: 'Completed'
      },
      {
        date: '18 Mar 2024',
        title: 'Successful Winter Completion & First Sunrise Witnessed',
        location: 'Himadri Base',
        description: 'All winter experiments concluded with 100% operational uptime.',
        status: 'Completed'
      }
    ]
  },
  {
    id: 'himansh-24',
    code: 'HIM-2024',
    title: 'Himalayan Cryosphere & Mass Balance Mission',
    region: 'Himalayas',
    status: 'Active All-Year',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
    description: 'Monitoring benchmark glaciers (Batal, Samudra Tapu, Sutri Dhaka) in Chandra Basin at 4,080m elevation to evaluate melt runoff feeding northern rivers.',
    lead: 'Dr. Lavkush Patel',
    leadDesignation: 'Scientist, Himalayan Cryosphere Program, NCPOR',
    duration: 'Annual Continuous Program',
    dates: 'Ongoing High-Altitude Station Operations',
    vesselOrBase: 'Himansh High-Altitude Research Station (Spiti, Himachal Pradesh)',
    teamSize: '16 Scientists & Mountaineers',
    teamBreakdown: [
      '10 Glaciologists & Hydrologists',
      '4 High-Altitude Mountaineering Guides (ITBP certified)',
      '2 Sensor Technicians'
    ],
    objectives: [
      'Quantify seasonal and annual glacier mass balance on Chhota Shigri & Sutri Dhaka glaciers.',
      'Deploy ground penetrating radar (GPR) to calculate total ice volume and bedrock topography.'
    ],
    highlights: ['Glacier Mass Balance', 'Discharge Hydrology', 'GPR Ice Profiling'],
    researchProjects: [
      {
        id: 'res-him-1',
        title: 'Chandra Basin Glacier Mass Balance & Discharge Hydrology',
        expeditionId: 'himansh-24',
        expeditionCode: 'HIM-2024',
        domain: 'Glacial Hydrology',
        leadScientist: 'Dr. Lavkush Patel',
        institution: 'NCPOR',
        summary: 'Long-term monitoring of benchmark glaciers in the Western Himalayas to evaluate melt runoff.',
        objectives: ['Determine equilibrium line altitude (ELA).', 'Model future river runoff.'],
        status: 'Ongoing',
        methodology: 'Direct glaciological ablation stake networks coupled with automated water level discharge recorders.',
        relatedPublicationIds: ['pub-him-1'],
        relatedDatasetIds: ['data-him-1']
      }
    ],
    publications: [
      {
        id: 'pub-him-1',
        title: 'Accelerated Ice Mass Loss in Chandra Basin Glaciers Over the Last Two Decades',
        expeditionId: 'himansh-24',
        expeditionCode: 'HIM-2024',
        researchId: 'res-him-1',
        authors: 'Patel, L., Sharma, P., & Thamban, M.',
        journal: 'Journal of Glaciology',
        year: 2024,
        doi: '10.1017/jog.2024.18',
        abstract: 'In-situ stake measurements combined with geodetic DEM differencing reveal an average mass deficit of -0.58 ± 0.08 m w.e./yr across Chandra Basin.',
        citation: 'Patel et al. (2024). J. Glaciol., 70(279), 112–126.'
      }
    ],
    datasets: [
      {
        id: 'data-him-1',
        title: 'Chandra Basin High-Altitude AWS Meteorological & Stream Discharge Timeseries',
        expeditionId: 'himansh-24',
        expeditionCode: 'HIM-2024',
        researchId: 'res-him-1',
        parameters: ['Air Temperature (4,080m)', 'Solar Radiation', 'Snow Depth', 'Runoff Discharge (m3/s)'],
        fileFormat: 'CSV / NetCDF',
        fileSize: '38.4 MB',
        downloads: 720,
        doi: '10.26063/ncpor.himalaya.himansh.2024',
        dateCollected: 'Annual 2023-2024'
      }
    ],
    reports: [
      {
        id: 'rep-him-1',
        title: 'State of Himalayan Cryosphere: Chandra-Bhaga Basin Annual Assessment',
        expeditionId: 'himansh-24',
        expeditionCode: 'HIM-2024',
        docCode: 'MoES-NCPOR-HIM-2024',
        pages: 160,
        fileSize: '14.2 MB',
        type: 'Scientific Compendium',
        author: 'Himansh Science Division'
      }
    ],
    media: [
      {
        id: 'med-him-1',
        title: 'Himansh High-Altitude Station Situated at 4,080m in Chandra Basin',
        expeditionId: 'himansh-24',
        expeditionCode: 'HIM-2024',
        type: 'Photo',
        category: 'Landscape',
        resolution: '4K UHD',
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        caption: 'India’s remote high-altitude research station Himansh surrounded by snow-covered peaks in Himachal Pradesh.',
        credit: 'Himansh Field Team'
      }
    ],
    timeline: [
      {
        date: 'May 2024',
        title: 'Spring Stake Network Inspection & Snow Density Measurement',
        location: 'Chhota Shigri Glacier',
        description: 'Scientists completed winter accumulation measurement across 24 ablation stakes.',
        status: 'Completed'
      },
      {
        date: 'July 2024',
        title: 'Peak Melt Discharge Hydrograph Recording',
        location: 'Himansh Stream Gauging Station',
        description: 'Automated pressure transducers recorded peak diurnal glacial melt discharge.',
        status: 'Completed'
      },
      {
        date: 'October 2024',
        title: 'Annual Net Mass Balance Computation & Winterization',
        location: 'Himansh Base',
        description: 'Annual glaciological mass budget finalized for international World Glacier Monitoring Service (WGMS).',
        status: 'Milestone'
      }
    ]
  }
];
