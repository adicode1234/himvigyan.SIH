export interface Station {
  id: string;
  name: string;
  location: string;
  region: 'Antarctica' | 'Arctic' | 'Himalayas' | 'Ocean';
  established: number;
  status: 'Active All-Year' | 'Active Summer' | 'Historical Site' | 'Operational Vessel';
  coordinates: string;
  elevation: string;
  temperature: string;
  windSpeed: string;
  pressure: string;
  iceThickness?: string;
  description: string;
  scientificFocus: string[];
  bannerImage: string;
  currentExpedition: string;
  keyHighlights: string[];
}

export interface RepositoryItem {
  id: string;
  title: string;
  type: 'Dataset' | 'Report' | 'Publication' | 'Media';
  region: 'Antarctica' | 'Arctic' | 'Himalayas' | 'Southern Ocean' | 'All';
  year: number;
  date: string;
  authorsOrLead: string;
  doi?: string;
  fileSize: string;
  format: string;
  downloads: number;
  tags: string[];
  summary: string;
  fullAbstract: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  thumbnailUrl?: string;
  isUserUploaded?: boolean;
  fileUrl?: string;
  pdfUrl?: string;
  fileName?: string;
  station?: string;
  author?: string;
  bannerImage?: string;
  image?: string;
  // Pre-configured AI Dissemination packs
  aiDissemination: {
    twitterThread: string[];
    instagramPost: {
      caption: string;
      slides: string[];
      hashtags: string[];
    };
    linkedInPost: string;
    pressRelease: {
      headline: string;
      dateline: string;
      body: string;
      quote: string;
      notesToEditors: string;
    };
    hindiTranslation: {
      headline: string;
      summary: string;
      socialSnippet: string;
    };
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  funFact: string;
}

export const POLAR_STATIONS: Station[] = [
  {
    id: 'bharati',
    name: 'Bharati Station',
    location: 'Larsemann Hills, Prydz Bay, East Antarctica',
    region: 'Antarctica',
    established: 2012,
    status: 'Active All-Year',
    coordinates: "69°24'28\"S, 76°11'14\"E",
    elevation: '35 m above sea level',
    temperature: '-18.4°C',
    windSpeed: '34 knots (Blizzard condition)',
    pressure: '984 hPa',
    iceThickness: '2.8 m (Pack Ice)',
    description: "India's cutting-edge third Antarctic research facility constructed using 134 prefabricated shipping containers on elevated stilts to prevent snow drift accumulation. Features thermal insulation and comprehensive eco-friendly waste management.",
    scientificFocus: ['Continental Breakup & Gondwana tectonics', 'Atmospheric Physics & Ionosphere', 'Oceanography & Marine Biology', 'Satellite Remote Sensing Ground Station'],
    bannerImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    currentExpedition: '44th Indian Scientific Expedition to Antarctica (ISEA)',
    keyHighlights: [
      'High-speed ISRO satellite telemetry ground station',
      'Regulated greywater recycling with zero untreated outflow',
      'Accommodates 47 scientists in summer and 24 in polar winter'
    ]
  },
  {
    id: 'maitri',
    name: 'Maitri Station',
    location: 'Schirmacher Oasis, Queen Maud Land, East Antarctica',
    region: 'Antarctica',
    established: 1989,
    status: 'Active All-Year',
    coordinates: "70°45'57\"S, 11°44'09\"E",
    elevation: '117 m above sea level',
    temperature: '-22.1°C',
    windSpeed: '28 knots',
    pressure: '978 hPa',
    iceThickness: 'Ice-free oasis / Lake Priyadarshini adjacent',
    description: "India's second Antarctic station, serving as the pillar of Indian polar research for over 35 years. Situated on a rocky, ice-free permafrost oasis adjacent to the pristine freshwater Lake Priyadarshini.",
    scientificFocus: ['Geomagnetism & Aurora Studies', 'Meteorology & Ozone Layer Monitoring', 'Glacial Geology', 'Human Physiology in Extreme Isolation'],
    bannerImage: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=1200&q=80',
    currentExpedition: '44th Indian Scientific Expedition to Antarctica (ISEA)',
    keyHighlights: [
      'Continuous ozone profile measurements since 1989',
      'Freshwater supply derived directly from Lake Priyadarshini',
      'Upcoming replacement facility Maitri-II in active planning'
    ]
  },
  {
    id: 'himadri',
    name: 'Himadri Research Station',
    location: 'Ny-Ålesund, Spitsbergen, Svalbard, Norway',
    region: 'Arctic',
    established: 2008,
    status: 'Active Summer',
    coordinates: "78°55'N, 11°56'E",
    elevation: '12 m above sea level',
    temperature: '-6.4°C',
    windSpeed: '14 knots',
    pressure: '1012 hPa',
    description: "Located just 1,200 km from the North Pole in the international science village of Ny-Ålesund, Himadri anchors India's Arctic research into teleconnections between Arctic warming and the Indian Monsoon.",
    scientificFocus: ['Arctic-Indian Monsoon Teleconnections', 'Fjord Biogeochemistry (Kongsfjorden)', 'Atmospheric Aerosols & Black Carbon', 'Cryospheric microbial diversity'],
    bannerImage: 'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=1200&q=80',
    currentExpedition: 'Annual Indian Arctic Winter-Summer Expeditions',
    keyHighlights: [
      'Mooring observatory IndARC deployed in Kongsfjorden at 192m depth',
      'Investigation of black carbon transport from temperate zones',
      'First Indian winter expedition successfully flagged off in 2023'
    ]
  },
  {
    id: 'himansh',
    name: 'Himansh High-Altitude Station',
    location: 'Chandra Basin, Spiti Valley, Himachal Pradesh',
    region: 'Himalayas',
    established: 2016,
    status: 'Active All-Year',
    coordinates: "32°24'N, 77°38'E",
    elevation: '4,080 m above sea level',
    temperature: '-12.8°C',
    windSpeed: '19 knots',
    pressure: '620 hPa',
    iceThickness: 'Glacier benchmark: Batal, Samudra Tapu, Sutri Dhaka',
    description: "NCPOR's dedicated high-altitude research station in the western Himalayas (the 'Third Pole'), observing glacial mass balance, discharge dynamics, and freshwater security for Northern India.",
    scientificFocus: ['Glacier Mass Balance & Melt Rates', 'Ground Penetrating Radar (GPR) Ice Profiling', 'Discharge Gauge Hydrology', 'Debris cover thermophysical dynamics'],
    bannerImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    currentExpedition: 'Long-term Himalayan Cryosphere Monitoring Program',
    keyHighlights: [
      'Integrated Automatic Weather Stations (AWS) network across 6 glaciers',
      'Direct assessment of Indus and Ganges river basin meltwater security',
      'Autonomous winter data telemetry under -35°C conditions'
    ]
  },
  {
    id: 'sagar-kanya',
    name: 'ORV Sagar Kanya',
    location: 'Southern Ocean & Indian Ocean Sector',
    region: 'Ocean',
    established: 1983,
    status: 'Operational Vessel',
    coordinates: "Cruising: 55°12'S, 57°40'E",
    elevation: 'Sea Level',
    temperature: '+1.5°C',
    windSpeed: '42 knots (Roaring Forties)',
    pressure: '992 hPa',
    description: "India's premier oceanographic research vessel equipped with multidisciplinary labs for geological, geophysical, meteorological, and biochemical research across polar front boundaries.",
    scientificFocus: ['Southern Ocean Hydrodynamics', 'Deep Sea Sediment Coring', 'Plankton Dynamics & Carbon Flux', 'Atmospheric Boundary Layer Fluxes'],
    bannerImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    currentExpedition: '12th Indian Southern Ocean Expedition (ISOE)',
    keyHighlights: [
      'Multibeam swath bathymetry system for ocean floor mapping',
      'Hydrographic CTD rosette systems capable of 6000m deep casts',
      'Crucial contributor to WMO and Argo global ocean floats program'
    ]
  },
  {
    id: 'dakshin-gangotri',
    name: 'Dakshin Gangotri (Historical)',
    location: 'Princess Astrid Coast, Queen Maud Land, Antarctica',
    region: 'Antarctica',
    established: 1983,
    status: 'Historical Site',
    coordinates: "70°05'37\"S, 12°00'00\"E",
    elevation: 'Ice shelf level',
    temperature: '-26.5°C',
    windSpeed: 'Automated Sensor',
    pressure: '972 hPa',
    description: "India's historic first permanent Antarctic base, erected in a record 60 days during the 3rd Indian Expedition. Submerged under permanent ice in 1989 and now preserved as a designated historic Antarctic monument.",
    scientificFocus: ['Historical Heritage', 'Automated Meteorological Relay', 'Ice Sheet Accumulation Studies'],
    bannerImage: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1200&q=80',
    currentExpedition: 'Commemorative Heritage Monitoring',
    keyHighlights: [
      'Built in 1983-84 under the leadership of Dr. S.Z. Qasim',
      'Established India as a Consultative Party to the Antarctic Treaty',
      'Protected under Antarctic Treaty Historic Site No. 44'
    ]
  }
];

export const REPOSITORY_DATA: RepositoryItem[] = [
  {
    id: 'ds-01',
    title: 'High-Resolution Ice Core Chemistry & Trace Gas Proxy Records (Central Dronning Maud Land)',
    type: 'Dataset',
    region: 'Antarctica',
    year: 2024,
    date: '2024-03-15',
    authorsOrLead: 'Dr. Thamban Meloth, Ice Core Laboratory, NCPOR',
    doi: '10.5281/ncpor.ant.2024.089',
    fileSize: '48.2 MB',
    format: 'NetCDF / CSV',
    downloads: 1420,
    thumbnailUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    tags: ['Cryosphere', 'Paleoclimate', 'Ice Core', 'Maitri'],
    summary: 'Decadal isotopic record (delta-18-O) and major ion chemistry from a 102m firn core extracted near Maitri station, revealing 500-year temperature anomalies.',
    fullAbstract: 'This dataset comprises ion chromatographic and stable isotope ratio measurements conducted on a 102-meter firn/ice core recovered during the 41st Indian Scientific Expedition to Antarctica. High-resolution records of methane sulfonic acid (MSA), sulfate, nitrate, and sodium provide insights into past sea-ice extent in the Southern Ocean and regional atmospheric circulation over the last 5 centuries.',
    aiDissemination: {
      twitterThread: [
        '🧊 What can 500-year-old Antarctic ice tell us about modern climate changes? NCPOR scientists just unlocked clues from a 102-meter ice core near Maitri Station! 🧵👇 #PolarScience #ClimateChange #MoES',
        '2/5 By analyzing oxygen isotopes (δ18O) layer by layer, researchers have mapped historical Southern Ocean temperature shifts dating back to the 16th century.',
        '3/5 Key finding: The rate of sea-ice variability over Queen Maud Land has accelerated significantly in the last 4 decades compared to the 500-year baseline.',
        '4/5 All raw isotopic, ionic, and density profiles are now published as OPEN DATA under FAIR principles by NCPOR. Researchers worldwide can access this for free!',
        '5/5 Discover the full dataset & download NetCDF files here: https://ncpor.res.in/datasets/ds-01 🌐 Proudly supported by @moesgoi @PIB_India'
      ],
      instagramPost: {
        caption: 'Unlocking 500 years of Earth’s climate secrets through Antarctic ice! 🧊🇦🇶 Our scientists at @ncpor.goa extracted a 102-meter ice core near Maitri Station. Swipe to see what ancient ice bubbles reveal about our planet’s future 👉',
        slides: [
          'Slide 1: [Visual of ice core drilling rig] 500 Years Frozen in Time: India’s Antarctic Discovery',
          'Slide 2: [Cross section infographic] How ice layers trap ancient air and volcanic ash',
          'Slide 3: [Data chart comparison] What the last 40 years look like versus the previous 450 years',
          'Slide 4: [Scientist in clean lab] Precision ion chromatography at NCPOR Goa',
          'Slide 5: [Call to Action] Accessible to all students & researchers as open science!'
        ],
        hashtags: ['#Antarctica', '#NCPOR', '#IceCore', '#ClimateResearch', '#MoES', '#ScienceInIndia', '#PolarExploration']
      },
      linkedInPost: 'Pleased to share a significant milestone in Indian Paleoclimatology: NCPOR has released the open-access dataset "High-Resolution Ice Core Chemistry & Trace Gas Proxy Records (Central Dronning Maud Land)" from the 41st Indian Scientific Expedition to Antarctica.\n\nCovering 500 years of climate history, this research provides high-resolution insights into historical atmospheric composition, teleconnections, and sea-ice variations.\n\nUnder the Ministry of Earth Sciences (MoES) Open Data Mandate, this dataset is freely available to global researchers to bolster climate modeling.',
      pressRelease: {
        headline: 'NCPOR Releases Open-Access 500-Year Climate Dataset Derived from Antarctic Ice Core',
        dateline: 'NEW DELHI / VASCO DA GAMA (GOA) — MARCH 15, 2024',
        body: 'The National Centre for Polar and Ocean Research (NCPOR), an autonomous institute under the Ministry of Earth Sciences (MoES), Government of India, has officially released a comprehensive open-access paleoclimate dataset from Central Dronning Maud Land, Antarctica.\n\nThe dataset, derived from a 102-meter-deep ice core retrieved during the 41st Indian Scientific Expedition to Antarctica, maps five centuries of temperature fluctuations, aerosol deposition, and Southern Ocean sea-ice boundaries with unprecedented sub-annual resolution.',
        quote: '"This archive represents decades of Indian scientific rigor in the deep polar desert. By making this dataset FAIR (Findable, Accessible, Interoperable, and Reusable), India reinforces its commitment to global open climate science." — Director, NCPOR',
        notesToEditors: 'NCPOR operates two year-round stations in Antarctica (Maitri and Bharati) and one research base in the Arctic (Himadri).'
      },
      hindiTranslation: {
        headline: 'एनसीपीओआर ने अंटार्कटिका आइस कोर से 500 साल का ऐतिहासिक जलवायु डेटासेट जारी किया',
        summary: 'पृथ्वी विज्ञान मंत्रालय के तहत राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र (एनसीपीओआर) ने अंटार्कटिका के मैत्री स्टेशन के पास से निकाले गए 102 मीटर गहरे आइस कोर का ओपन डेटासेट जारी किया है, जिससे पिछले 500 वर्षों के जलवायु रहस्यों का खुलासा हुआ है।',
        socialSnippet: '🧊 अंटार्कटिका की 500 साल पुरानी बर्फ से खुला जलवायु का इतिहास! एनसीपीओआर के वैज्ञानिकों ने 102 मीटर आइस कोर से जुटाया अहम डेटा। ओपन एक्सेस डेटासेट अब सभी के लिए उपलब्ध है। #PolarScience'
      }
    }
  },
  {
    id: 'rep-01',
    title: 'Scientific Report of the 42nd Indian Scientific Expedition to Antarctica (ISEA)',
    type: 'Report',
    region: 'Antarctica',
    year: 2023,
    date: '2023-11-20',
    authorsOrLead: 'Dr. Yogesh Ray (Expedition Leader, Bharati) & Er. Alok Sharma (Leader, Maitri)',
    doi: '10.5281/ncpor.rep.isea42.2023',
    fileSize: '114.5 MB',
    format: 'PDF',
    downloads: 3890,
    tags: ['ISEA', 'Expedition', 'Logistics', 'Bharati', 'Maitri'],
    summary: 'Comprehensive scientific and operational compendium of the 42nd ISEA detailing 36 scientific experiments across atmospheric sciences, glaciology, geology, and station infrastructure maintenance.',
    fullAbstract: 'The 42nd Indian Scientific Expedition to Antarctica was launched in December 2022 and successfully concluded in April 2023. Over 70 winter and summer team members from 18 Indian scientific institutions conducted field experiments at Maitri, Bharati, and the Larsemann Hills periglacial zone. Key achievements include the installation of a new broadband seismometer, continuous automated weather station relays, and ecological monitoring of polar skua bird populations.',
    station: 'Bharati & Maitri Stations',
    pdfUrl: '/reports/isea-42-scientific-report.pdf',
    bannerImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2000&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516431883659-655d41c09bf9?auto=format&fit=crop&w=1200&q=80',
    aiDissemination: {
      twitterThread: [
        '🇮🇳 From 70° South to the world: The Official Report of the 42nd Indian Scientific Expedition to Antarctica is now LIVE! Discover what our brave scientists achieved over 14 months of isolation ❄️👇 #ISEA42',
        '2/4 Team India deployed new deep-ground seismic sensors at Bharati and recovered over 4,000 km of automated weather telemetry data despite enduring -40°C blizzards.',
        '3/4 Environmental milestone: 100% of non-biodegradable waste generated during the expedition was safely compacted and brought back to mainland India, preserving pristine Antarctic ecology.',
        '4/4 Read the full illustrated expedition diary and experiment blueprints here: https://ncpor.res.in/reports/isea-42 🌏 @moesgoi'
      ],
      instagramPost: {
        caption: '14 Months, -40°C, and Zero Waste Left Behind! 🇮🇳❄️ The official chronicle of the 42nd Indian Antarctic Expedition is out. From facing 100-knot blizzards to advancing Earth sciences, our polar scientists define grit and innovation.',
        slides: [
          'Slide 1: [Tricolor fluttering against blizzard at Bharati Station] Mission Antarctica: 42nd ISEA Report',
          'Slide 2: [Scientists in orange parkas checking sensors] Conducting 36 experiments in extreme isolation',
          'Slide 3: [Containers packed for ship return] Zero Waste Mandate: Bringing every scrap back to India',
          'Slide 4: [Priyadarshini lake reflection] Environmental monitoring of delicate polar ecosystems',
          'Slide 5: [Group photo of winter-over team] Meet the heroes who spent polar night in Antarctica'
        ],
        hashtags: ['#AntarcticaExpedition', '#TeamIndia', '#NCPOR', '#MoES', '#ScienceHeroes', '#PolarMission']
      },
      linkedInPost: 'Proud to announce the release of the 42nd Indian Scientific Expedition to Antarctica (ISEA) Compendium by NCPOR.\n\nCovering 36 national research projects spanning 18 premier Indian institutions, the report underscores India’s operational resilience and pioneering contributions to Antarctic Treaty environmental stewardship.',
      pressRelease: {
        headline: 'MoES Publishes Comprehensive 42nd Indian Antarctic Expedition Report',
        dateline: 'NEW DELHI — NOV 20, 2023',
        body: 'The Ministry of Earth Sciences has published the comprehensive scientific and technical report of the 42nd Indian Scientific Expedition to Antarctica (ISEA).\n\nThe expedition saw the successful execution of 36 research programs in cryospheric dynamics, upper atmosphere geospace studies, and geological mapping around the Schirmacher Oasis and Larsemann Hills.',
        quote: '"The 42nd ISEA demonstrated seamless synergy between defense logistics, inter-institutional academia, and NCPOR leadership." — Dr. M. Ravichandran, Secretary, MoES',
        notesToEditors: 'India has been an active signatory to the Antarctic Treaty since 1983.'
      },
      hindiTranslation: {
        headline: '42वें भारतीय अंटार्कटिक वैज्ञानिक अभियान की विस्तृत वैज्ञानिक रिपोर्ट जारी',
        summary: 'पृथ्वी विज्ञान मंत्रालय ने 42वें अंटार्कटिक अभियान (ISEA) की आधिकारिक रिपोर्ट जारी कर दी है। इसमें भारतीय वैज्ञानिकों द्वारा -40°C तापमान में किए गए 36 बड़े वैज्ञानिक अनुसंधानों का ब्योरा है।',
        socialSnippet: '🇮🇳 14 महीने की कठिन साधना और -40°C में 36 रिसर्च प्रोजेक्ट्स! 42वें अंटार्कटिक अभियान की रिपोर्ट अब पब्लिक डोमेन में जारी। #NCPOR #MoES'
      }
    }
  },
  {
    id: 'rep-02',
    title: 'Annual Scientific Compendium & Environmental Assessment of the Indian Arctic Expedition (Himadri, Svalbard)',
    type: 'Report',
    region: 'Arctic',
    year: 2024,
    date: '2024-05-12',
    authorsOrLead: 'Dr. K. P. Krishnan (Station Leader) & Arctic Research Consortium, NCPOR',
    doi: '10.5281/ncpor.rep.arc2024.018',
    fileSize: '98.4 MB',
    format: 'PDF',
    downloads: 2450,
    tags: ['Arctic', 'Himadri', 'Svalbard', 'Kongsfjorden', 'Atmosphere & Glacier', 'MoES'],
    summary: 'Official operational report and multi-institutional scientific compendium detailing 22 research programs executed during the 2023-2024 Indian Arctic campaigns at Himadri Station, Ny-Ålesund.',
    fullAbstract: 'Commissioned by the Ministry of Earth Sciences (MoES) and archived at NCPOR, this official compendium documents the operational execution, fuel logistics, environmental impact mitigation, and primary scientific findings of the Indian Arctic Expedition. It incorporates technical reports from 14 participating national institutions on permafrost microbiological succession, glacial ablation rates in Midtre Lovénbreen, and fjord stratification in Kongsfjorden.',
    station: 'Himadri Station (Ny-Ålesund, Svalbard)',
    pdfUrl: '/reports/indian-arctic-expedition-himadri-report.pdf',
    bannerImage: 'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=2000&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=1200&q=80',
    aiDissemination: {
        twitterThread: [
        '❄️ Frontline Science at 79° North: The Official Report of the Indian Arctic Expedition (Himadri) is now published! 🧵👇 #Arctic #Himadri #MoES #PolarScience',
        '2/4 Covering 22 multidisciplinary projects, the compendium details how Arctic fjord warming alters sea-ice coverage and drives extreme precipitation anomalies across South Asia.',
        '3/4 Milestone: Indian microbiologists identified 14 novel psychrophilic enzymes from Ny-Ålesund permafrost with potential biomedical and cold-cleaning applications.',
        '4/4 Download the official verified PDF compendium on HimVigyan: https://ncpor.res.in/reports/rep-02 🌐 @moesgoi'
      ],
      instagramPost: {
        caption: 'Inside the Northernmost Civilian Base on Earth! 🏔️❄️ 79° North in Svalbard: The official scientific chronicle of India\'s Himadri Arctic Expedition.',
        slides: [
          'Slide 1: [Himadri base surrounded by Arctic snowfields] Mission Arctic: Official Himadri Report',
          'Slide 2: [Scientists collecting glacier water in Kongsfjorden] 22 research experiments across ice and sea',
          'Slide 3: [Illumina DNA sequencer in polar lab] Unlocking cold-adapted microbes in tundra soil',
          'Slide 4: [Infographic of Arctic-Monsoon teleconnection] Why the North Pole dictates Indian rainfall',
          'Slide 5: [Open access report cover] Download the complete official PDF on HimVigyan'
        ],
        hashtags: ['#ArcticExpedition', '#Himadri', '#Svalbard', '#NCPOR', '#MoES', '#ClimateResearch', '#PolarMission']
      },
      linkedInPost: 'Arctic Science Compendium: NCPOR has published the "Annual Scientific Compendium & Environmental Assessment of the Indian Arctic Expedition" at Himadri Station, Ny-Ålesund (79°N).\n\nHighlighting contributions from 14 national research bodies, the document outlines key empirical metrics on fjord thermodynamics, atmospheric mercury depletion, and glaciological recession.',
      pressRelease: {
        headline: 'Ministry of Earth Sciences Publishes Comprehensive Indian Arctic Expedition Report',
        dateline: 'NEW DELHI / NY-ÅLESUND — MAY 12, 2024',
        body: 'The National Centre for Polar and Ocean Research (NCPOR), under the Ministry of Earth Sciences, has released the official compendium of the 2023-2024 Indian Arctic Expedition.\n\nThe publication chronicles extensive field campaigns conducted at Himadri Station, Svalbard, focusing on Arctic amplification, IndARC mooring telemetry, and microbiological biodiversity.',
        quote: '"India\'s sustained research presence in the high Arctic strengthens our global understanding of cryospheric stability and tropical teleconnections." — Secretary, MoES',
        notesToEditors: 'Himadri Station operates year-round in the international scientific settlement of Ny-Ålesund, Norway.'
      },
      hindiTranslation: {
        headline: 'भारतीय आर्कटिक वैज्ञानिक अभियान (हिमाद्रि) की आधिकारिक वार्षिक रिपोर्ट जारी',
        summary: 'पृथ्वी विज्ञान मंत्रालय ने उत्तरी ध्रुव पर स्थित हिमाद्रि स्टेशन के 22 वैज्ञानिक प्रोजेक्ट्स, ग्लेशियर पिघलन और पर्यावरण ऑडिट की आधिकारिक वार्षिक रिपोर्ट जारी की है।',
        socialSnippet: '❄️ 79° उत्तरी ध्रुव पर भारत का परचम! हिमाद्रि स्टेशन से 2024 की आधिकारिक वैज्ञानिक रिपोर्ट अब पीडीएफ फॉर्मेट में उपलब्ध। #Himadri #Arctic'
      }
    }
  },
  {
    id: 'rep-03',
    title: 'Cruise Report & Scientific Synthesis of the 12th Indian Southern Ocean Expedition (SOE-12)',
    type: 'Report',
    region: 'Southern Ocean',
    year: 2024,
    date: '2024-04-10',
    authorsOrLead: 'Dr. N. Anilkumar (Chief Scientist) & SOE-12 Cruise Directorate, NCPOR & MoES',
    doi: '10.5281/ncpor.rep.soe12.2024',
    fileSize: '126.8 MB',
    format: 'PDF',
    downloads: 3120,
    tags: ['Southern Ocean', 'SA Agulhas II', 'Cruise Report', 'Carbon Sink', 'Polar Front', 'Hydrography'],
    summary: 'Comprehensive cruise and scientific synthesis of the 60-day Southern Ocean Expedition tracking the Antarctic Circumpolar Current, biogeochemical carbon drawdown, and ocean acidification along 57°30\'E.',
    fullAbstract: 'Official cruise compendium of the 12th Indian Southern Ocean Expedition conducted aboard the polar research vessel SA Agulhas II. The expedition mapped 42 full-depth hydrographic stations from 40°S to the ice shelf boundary at 69°S. Details physical oceanography casts, dissolved greenhouse gases, plankton taxonomic shifts, microplastics, and atmospheric boundary-layer heat exchange.',
    station: 'SA Agulhas II (Polar Research Vessel)',
    pdfUrl: '/reports/12th-southern-ocean-expedition-cruise-report.pdf',
    bannerImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    aiDissemination: {
      twitterThread: [
        '🌊 Into the Roaring Forties and Furious Fifties! The Official Cruise Report of the 12th Indian Southern Ocean Expedition (SOE-12) is officially live! 🧵👇 #SouthernOcean #Oceanography #MoES',
        '2/4 Aboard the icebreaker SA Agulhas II, Indian scientists sampled water down to 4,500m across the Polar Front, assessing the global oceanic carbon pump.',
        '3/4 Key alert: Seawater pH drops south of 60°S confirm accelerating ocean acidification in the fragile Antarctic food web.',
        '4/4 Read and download the complete illustrated cruise report: https://ncpor.res.in/reports/rep-03 🚢 @moesgoi @PIB_India'
      ],
      instagramPost: {
        caption: 'Sailing 10,000 Kilometers into the Roaring Forties! 🚢🌊 The official cruise report of India\'s 12th Southern Ocean Expedition aboard SA Agulhas II.',
        slides: [
          'Slide 1: [Ship cutting through 8-meter waves] Voyage to the Ice Edge: SOE-12 Report',
          'Slide 2: [Lowering 24-bottle CTD rosette at midnight] 42 deep-water stations sampled',
          'Slide 3: [Plankton net towing] Microscopic krill and pteropods under microscope',
          'Slide 4: [Air-sea carbon flux diagram] How Southern Ocean currents trap heat and CO2',
          'Slide 5: [Download banner] Full cruise compendium PDF now available on HimVigyan'
        ],
        hashtags: ['#SouthernOcean', '#ExpeditionLife', '#Oceanography', '#SAAgulhas', '#NCPOR', '#MoES', '#ScienceExcellence']
      },
      linkedInPost: 'Oceanographic Cruise Compendium: NCPOR has published the "Cruise Report & Scientific Synthesis of the 12th Indian Southern Ocean Expedition (SOE-12)".\n\nDetailing physical, chemical, and biological oceanographic sections along 57°30\'E, this document provides critical empirical ground-truth data for planetary climate and carbon cycle models.',
      pressRelease: {
        headline: 'NCPOR Publishes Scientific Cruise Report of 12th Southern Ocean Expedition',
        dateline: 'VASCO DA GAMA (GOA) — APR 10, 2024',
        body: 'The National Centre for Polar and Ocean Research (NCPOR), Goa, has issued the comprehensive cruise report for the 12th Indian Scientific Expedition to the Southern Ocean.\n\nExecuted aboard the research vessel SA Agulhas II, the cruise gathered vital parameters across four major oceanic fronts, charting biological carbon sequestration and deep water mass formation.',
        quote: '"The Southern Ocean is the engine of global thermohaline circulation. This report delivers decisive insights into regional ocean health." — Chief Scientist, SOE-12',
        notesToEditors: 'NCPOR oversees scientific and logistical management of India’s oceanographic campaigns into high-latitude waters.'
      },
      hindiTranslation: {
        headline: '12वें भारतीय दक्षिणी महासागर अभियान की विस्तृत क्रूज रिपोर्ट जारी',
        summary: 'पृथ्वी विज्ञान मंत्रालय ने अनुसंधान पोत एसए अगुलहास II द्वारा दक्षिणी महासागर में 60 दिनों की यात्रा और 4,500 मीटर गहरे समुद्री अध्ययनों की आधिकारिक रिपोर्ट जारी की है।',
        socialSnippet: '🚢 तूफानी दक्षिणी महासागर में 10,000 किमी का सफर! 12वें दक्षिणी महासागर अभियान की आधिकारिक क्रूज रिपोर्ट अब पीडीएफ में उपलब्ध। #SouthernOcean #MoES'
      }
    }
  },
  {
    id: 'rep-04',
    title: 'Decadal Cryospheric Assessment & Glacier Mass Balance Monitoring Report (Chandra Basin, Western Himalayas)',
    type: 'Report',
    region: 'Himalayas',
    year: 2024,
    date: '2024-02-28',
    authorsOrLead: 'Dr. Parmanand Sharma (Expedition Lead) & Cryosphere Science Division, Himansh Base, NCPOR',
    doi: '10.5281/ncpor.rep.him2024.007',
    fileSize: '84.2 MB',
    format: 'PDF',
    downloads: 2890,
    tags: ['Himalayas', 'Himansh', 'Chandra Basin', 'Glacier Mass Balance', 'Water Security', 'Spiti'],
    summary: 'Official decadal technical monograph synthesizing long-term in-situ glaciological mass balance, debris cover dynamics, and automated weather station telemetry across 6 benchmark glaciers in Himachal Pradesh.',
    fullAbstract: 'Published by NCPOR under the Ministry of Earth Sciences, this comprehensive scientific report compiles 10 years of continuous ablation stake measurements, deep GPR radar soundings, and hydrological runoff modeling at Himansh Station. It assesses changing equilibrium line altitudes (ELA), snow accumulation deficits, and glacial lake outburst flood (GLOF) vulnerabilities in the Indus-Ganga-Brahmaputra headwaters.',
    station: 'Himansh Observatory (Spiti Valley, 4,080m)',
    pdfUrl: '/reports/western-himalayan-cryosphere-himansh-report.pdf',
    bannerImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    aiDissemination: {
      twitterThread: [
        '🏔️ Safeguarding the Water Tower of Asia: NCPOR’s Himansh Station has released its 10-Year Himalayan Glacier Health & Mass Balance Report! 🧵👇 #Himalayas #Glaciers #Himansh #WaterSecurity',
        '2/4 Tracking 6 benchmark glaciers at 4,000m+ elevation in Spiti Valley, glaciologists report an average mass loss rate of -0.58m water equivalent per year.',
        '3/4 Ground Penetrating Radar (GPR) soundings reveal 3.4 cubic km of ice reserves remaining in the Chandra Basin, proving crucial for future northern river runoff projections.',
        '4/4 Access the official full-color technical monograph PDF here: https://ncpor.res.in/reports/rep-04 🇮🇳 @moesgoi'
      ],
      instagramPost: {
        caption: '10 Years on the Glaciers of the Third Pole! 🏔️❄️ From 4,080 meters altitude at Himansh Station, the official decadal assessment of Himalayan ice melt and river security.',
        slides: [
          'Slide 1: [Himansh station against snow-capped Himalayan peaks] Guardians of the High Himalayas',
          'Slide 2: [Scientists drilling ablation stakes on glacier ice] Measuring 10 years of ice loss',
          'Slide 3: [3D radar bedrock elevation model] What lies beneath 160 meters of ice',
          'Slide 4: [Downstream river Indus and Sutlej] Why glacier health impacts 500 million lives',
          'Slide 5: [Download Monograph cover] Full PDF report now available on HimVigyan'
        ],
        hashtags: ['#Himalayas', '#Himansh', '#GlacierResearch', '#WaterSecurity', '#SpitiValley', '#NCPOR', '#MoES']
      },
      linkedInPost: 'Himalayan Cryosphere Monograph: NCPOR has published the "Decadal Cryospheric Assessment & Glacier Mass Balance Monitoring Report" covering benchmark glaciers in Himachal Pradesh.\n\nSynthesizing 10 years of high-altitude telemetry from Himansh Station (4,080m a.s.l.), this report delivers critical foundational guidance for regional water management and flood risk preparedness.',
      pressRelease: {
        headline: 'NCPOR Publishes 10-Year Decadal Assessment on Himalayan Glacier Mass Balance',
        dateline: 'SPITI VALLEY / NEW DELHI — FEB 28, 2024',
        body: 'The Ministry of Earth Sciences has released a landmark decadal report assessing the health and melt dynamics of glaciers across the Western Himalayas.\n\nSpearheaded by the National Centre for Polar and Ocean Research (NCPOR) from its high-altitude observatory Himansh, the monograph compiles long-term in-situ measurements on glacier retreat, ice volume, and hydrological discharge.',
        quote: '"Long-term in-situ monitoring in the Himalayas is indispensable for accurate freshwater forecasting in India." — Lead Scientist, Himalayan Cryosphere Program',
        notesToEditors: 'Himansh Station was inaugurated in 2016 and is India\'s highest permanent scientific research base.'
      },
      hindiTranslation: {
        headline: 'हिमालयी ग्लेशियरों की सेहत पर 10 साल की ऐतिहासिक वैज्ञानिक रिपोर्ट जारी',
        summary: 'पृथ्वी विज्ञान मंत्रालय के हिमांश स्टेशन से वैज्ञानिकों ने स्पीति घाटी के 6 बड़े ग्लेशियरों के पिघलने, बर्फ मोटाई और जल सुरक्षा पर 10-वर्षीय विस्तृत रिपोर्ट जारी की है।',
        socialSnippet: '🏔️ भारत के तीसरे ध्रुव (हिमालय) की 10 साल की पड़ताल! हिमांश स्टेशन की आधिकारिक ग्लेशियर रिपोर्ट अब पीडीएफ फॉर्मेट में लाइव। #Himansh #Himalayas'
      }
    }
  },
  {
    id: 'pub-01',
    title: 'Arctic Warming and its Teleconnection with the Anomalous Indian Summer Monsoon Rainfall Variability',
    type: 'Publication',
    region: 'Arctic',
    year: 2024,
    date: '2024-02-10',
    authorsOrLead: 'Dr. K.P. Krishnan, Dr. Avinash Kumar et al., NCPOR & IIT Delhi',
    doi: '10.1038/s41558-024-01923-x',
    fileSize: '6.4 MB',
    format: 'PDF',
    downloads: 5120,
    pdfUrl: '/reports/arctic-warming-teleconnection-indian-monsoon.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=1200&q=80',
    tags: ['Teleconnection', 'Monsoon', 'Arctic Warming', 'Himadri', 'Nature Climate Change'],
    summary: 'Landmark peer-reviewed study establishing physical atmospheric wave pathways linking rapid sea-ice retreat in the Barents-Kara Sea to extreme rain events during Indian monsoons.',
    fullAbstract: 'Utilizing 15 years of continuous observations from the Himadri Research Station in Svalbard and oceanographic moorings in Kongsfjorden, combined with high-resolution coupled climate models, this paper uncovers a persistent Rossby wave train excited by anomalous Arctic amplification. The resulting geopotential height perturbations modulate the subtropical westerly jet, triggering unseasonal extreme rainfall episodes across Central and North-Western India.',
    aiDissemination: {
      twitterThread: [
        '🌧️ Why does melting Arctic ice impact farmers in Punjab and Maharashtra? A groundbreaking study by NCPOR & IIT researchers reveals the direct teleconnection! 🧵👇 #ArcticIndia #MonsoonScience #ClimateImpact',
        '2/4 Published in a leading journal, data from India’s Himadri Station shows that sea-ice loss in the Barents-Kara Sea alters high-altitude jet streams over Eurasia.',
        '3/4 This atmospheric ripple effect can trigger sudden breaks or unexpected extreme downpours in the Indian Summer Monsoon season.',
        '4/4 Understanding this polar link is key to improving India’s long-range agricultural and flood forecasting systems! Read paper: https://doi.org/10.1038/s41558-024-01923-x 🇮🇳 @moesgoi'
      ],
      instagramPost: {
        caption: 'How does the North Pole control the Indian Monsoon? ❄️➡️🌧️ New research from India’s Arctic station “Himadri” shows that melting polar ice directly influences rain patterns over India!',
        slides: [
          'Slide 1: [Map connecting Arctic with Indian subcontinent] Arctic Warming ➡️ Indian Monsoon Teleconnection',
          'Slide 2: [Melting ice animation] When Barents-Kara sea ice melts, heat rises into polar stratosphere',
          'Slide 3: [Jet stream diagram] This twists the high-altitude jet stream heading toward the Himalayas',
          'Slide 4: [Rain over Indian fields] Result: Unpredictable rainfall extremes during crop seasons',
          'Slide 5: [Himadri station photo] Why India’s presence in the Arctic is critical for our food security!'
        ],
        hashtags: ['#Arctic #IndianMonsoon #ClimateScience #Himadri #NCPOR #ScienceExplainer #EarthSciences']
      },
      linkedInPost: 'Groundbreaking research from the National Centre for Polar and Ocean Research (NCPOR) has mapped the direct atmospheric teleconnection between Arctic sea-ice decline and Indian Summer Monsoon variability.\n\nThis study underscores why polar research is directly intertwined with national food security and water resource management in India.',
      pressRelease: {
        headline: 'NCPOR Study Links Arctic Sea-Ice Melting to Extreme Rainfall Patterns in India',
        dateline: 'NEW DELHI — FEB 10, 2024',
        body: 'Scientists at the National Centre for Polar and Ocean Research (NCPOR), Goa, in collaboration with national academic partners, have established a definitive causal mechanism between warming trends in the Arctic Ocean and extreme precipitation anomalies over the Indian subcontinent.\n\nThe findings, derived from multi-year in-situ measurements at the Himadri Station in Svalbard and advanced atmospheric reanalysis, demonstrate that polar climate disruption does not remain confined to high latitudes.',
        quote: '"What happens in the Arctic does not stay in the Arctic. This research is pivotal for climate adaptation policy in India." — Lead Author, NCPOR',
        notesToEditors: 'Himadri is India’s first permanent research station in the Arctic, established in 2008 at Ny-Ålesund, Norway.'
      },
      hindiTranslation: {
        headline: 'आर्कटिक की पिघलती बर्फ और भारतीय मानसून का सीधा संबंध: एनसीपीओआर का ऐतिहासिक शोध',
        summary: 'एनसीपीओआर के वैज्ञानिकों ने साबित किया है कि उत्तरी ध्रुव (आर्कटिक) में समुद्री बर्फ के पिघलने का सीधा असर भारत में होने वाली मानसून की बारिश और बेमौसम तूफानों पर पड़ता है।',
        socialSnippet: '🌧️ क्या आप जानते हैं कि उत्तरी ध्रुव की बर्फ पिघलने से भारत के मानसून पर असर पड़ता है? एनसीपीओआर के आर्कटिक स्टेशन हिमाद्री से हुआ बड़ा खुलासा। #Himadri #Monsoon'
      }
    }
  },
  {
    id: 'med-01',
    title: 'Adélie Penguin Colony Dynamics & Foraging Ecology at Larsemann Hills',
    type: 'Media',
    region: 'Antarctica',
    year: 2024,
    date: '2024-01-28',
    authorsOrLead: 'Wildlife Biology Team, 43rd ISEA (Photo by Dr. Aniruddha Roy)',
    fileSize: '32.1 MB',
    format: 'Ultra-HD JPEG (4K)',
    downloads: 8740,
    tags: ['Wildlife', 'Penguins', 'Biodiversity', 'Larsemann Hills', 'Photography'],
    summary: 'High-resolution photographic survey documenting breeding pair nesting density and chick fledging rates under changing fast-ice conditions near Bharati Station.',
    fullAbstract: 'Ultra-high-definition photographic and drone-assisted visual catalog captured between December 2023 and January 2024. The media captures micro-habitat nesting behaviors of Pygoscelis adeliae colonies across Fisher Island and the Rauer Islands group in Prydz Bay.',
    mediaUrl: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    aiDissemination: {
      twitterThread: [
        '🐧 Adélie penguin chicks are out in full force at Larsemann Hills! Check out this stunning 4K capture from our 43rd Indian Antarctic Expedition team near Bharati Station 📸👇 #Antarctica #Wildlife #BioDiversity',
        '2/3 Indian scientists track these penguin colonies every summer as key bio-indicators of marine krill abundance and Southern Ocean health.',
        '3/3 Download high-res educational media from the NCPOR Open Vault: https://ncpor.res.in/media/med-01 🇦🇶🇮🇳 @moesgoi'
      ],
      instagramPost: {
        caption: 'Meet Antarctica’s most resilient residents! 🐧❄️ Captured in breathtaking 4K by our 43rd Indian Antarctic Expedition team near Bharati Station. These Adélie penguins help our biologists monitor the overall health of the Southern Ocean.',
        slides: [
          'Slide 1: [Hero shot of Adélie penguins on blue ice] Life in -20°C: The Adélie Colonies of Larsemann Hills',
          'Slide 2: [Close-up of fluffy chick] Hatching in peak polar summer under 24-hour sunlight',
          'Slide 3: [Map graphic] Where Bharati station monitors these colonies',
          'Slide 4: [Biologist with non-invasive telescope] Studying without disturbing wildlife',
          'Slide 5: [Fact card] Why penguins are the true guardians of Antarctic ecosystems'
        ],
        hashtags: ['#AntarcticaWildlife', '#Penguins', '#AdeliePenguin', '#BharatiStation', '#NCPOR', '#WildlifePhotography', '#MoES']
      },
      linkedInPost: 'Capturing ecological vitality in extreme latitudes: The wildlife biology division of the 43rd Indian Scientific Expedition to Antarctica has released high-resolution survey media of Adélie penguin colonies at Larsemann Hills.\n\nThese non-invasive photographic surveys provide vital baseline data on polar biodiversity in the context of warming Southern Ocean currents.',
      pressRelease: {
        headline: 'Indian Scientists Record Healthy Adélie Penguin Breeding Season at Larsemann Hills, Antarctica',
        dateline: 'BHARATI STATION, ANTARCTICA — JAN 28, 2024',
        body: 'The biological sciences unit of the 43rd Indian Scientific Expedition to Antarctica (ISEA) stationed at Bharati Station has reported robust fledging success among Adélie penguin (Pygoscelis adeliae) colonies in the Larsemann Hills region.',
        quote: '"Long-term monitoring of apex avian predators gives us invaluable real-time metrics on Southern Ocean krill reserves." — Expedition Biologist',
        notesToEditors: 'All biological studies comply strictly with the Protocol on Environmental Protection to the Antarctic Treaty (Madrid Protocol).'
      },
      hindiTranslation: {
        headline: 'अंटार्कटिका में भारतीय वैज्ञानिकों ने ली एडेली पेंगुइन की दुर्लभ 4K तस्वीरें',
        summary: 'अंटार्कटिका के भारती स्टेशन के पास भारतीय वैज्ञानिकों ने एडेली पेंगुइन कॉलोनियों का हाई-रिज़ॉल्यूशन फोटोग्राफिक सर्वे पूरा किया है। ये पेंगुइन समुद्री पर्यावरण की सेहत के सबसे बड़े संकेतक हैं।',
        socialSnippet: '🐧 अंटार्कटिका की -20°C ठंड में नन्हे पेंगुइन! भारत के 43वें अंटार्कटिक अभियान दल ने खींची मनमोहक तस्वीरें। #Antarctica #Wildlife'
      }
    }
  },
  {
    id: 'ds-02',
    title: 'Himalayan Glacier Mass Balance & Hydro-Meteorological AWS Telemetry (Chandra Basin)',
    type: 'Dataset',
    region: 'Himalayas',
    year: 2024,
    date: '2024-04-05',
    authorsOrLead: 'Cryosphere Science Group, Himansh Station, NCPOR',
    doi: '10.5281/ncpor.him.2024.012',
    fileSize: '76.8 MB',
    format: 'CSV / NetCDF',
    downloads: 2190,
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    tags: ['Himalayas', 'Himansh', 'Glacier Melt', 'Water Security', 'Spiti'],
    summary: 'Continuous 10-minute resolution meteorological and glacier ablation stake data from Sutri Dhaka and Batal glaciers in the Western Himalayas.',
    fullAbstract: 'This dataset presents continuous hourly automated weather station (AWS) metrics including shortwave/longwave incoming radiation, air temperature, relative humidity, wind vector, and ultrasonic snow-depth sensor data recorded at Himansh Station (4,080 m) and high-elevation glacier stakes up to 5,200 m in the Chandra Basin.',
    aiDissemination: {
      twitterThread: [
        '🏔️ The "Water Tower of Asia" is under the microscope. NCPOR’s Himansh Station in Spiti Valley has released the 2024 Himalayan Glacier Melt & Telemetry dataset! 🧵👇 #Himalayas #Glaciers #Himansh',
        '2/4 Situated at 4,080 meters elevation, Himansh tracks the health of 6 key glaciers feeding the Indus and Sutlej river basins.',
        '3/4 The real-time AWS telemetry helps water resource managers predict seasonal meltwater contributions and downstream glacial lake outburst floods (GLOFs).',
        '4/4 Open science for public security: Access the raw meteorological and mass balance datasets today! 🌐 https://ncpor.res.in/datasets/ds-02 @moesgoi'
      ],
      instagramPost: {
        caption: 'Monitoring the Third Pole at 4,000 meters above sea level! 🏔️❄️ From the frozen Chandra Basin in Himachal Pradesh, our scientists at Himansh Station measure every drop of glacier melt that feeds India’s rivers.',
        slides: [
          'Slide 1: [Himansh station amidst snowy peaks] High-Altitude Guardians: Inside Himansh Station',
          'Slide 2: [Scientist measuring ablation stake] How we measure glacier loss in millimeters',
          'Slide 3: [Sensors facing the ice] Automated weather stations enduring -35°C',
          'Slide 4: [River Indus/Sutlej graphic] Why Himalayan glaciers matter to 500 million people',
          'Slide 5: [Open data portal banner] Explore the live data on the NCPOR Portal'
        ],
        hashtags: ['#Himalayas', '#Himansh', '#GlacierResearch', '#SpitiValley', '#WaterSecurity', '#NCPOR', '#MoES']
      },
      linkedInPost: 'Water security starts at high altitudes: NCPOR has published the comprehensive 2023-24 hydro-meteorological mass balance records collected from the Chandra Basin in the Western Himalayas.\n\nOperated out of Himansh Station (4,080m a.s.l.), these high-frequency observations are crucial for climate adaptation and downstream flood mitigation policies.',
      pressRelease: {
        headline: 'NCPOR Releases Western Himalayan Glacier Telemetry Data from Himansh Station',
        dateline: 'SPITI VALLEY / NEW DELHI — APR 5, 2024',
        body: 'The National Centre for Polar and Ocean Research (NCPOR) has made available extensive mass balance and meteorological telemetry datasets from the Chandra Basin in Himachal Pradesh.\n\nThe data, gathered through autonomous high-altitude weather stations connected to the Himansh research facility, provides critical inputs for assessing meltwater runoff across northern river basins.',
        quote: '"Continuous in-situ monitoring in the rugged Himalayas allows us to refine flood early-warning mechanisms and seasonal discharge models." — Head, Cryosphere Division, NCPOR',
        notesToEditors: 'Himansh was established by NCPOR in 2016 in the Spiti Valley as India’s highest dedicated cryospheric observatory.'
      },
      hindiTranslation: {
        headline: 'हिमांश स्टेशन से हिमालयी ग्लेशियर पिघलने का लाइव वेदर डेटासेट जारी',
        summary: 'स्पीति घाटी में 4,080 मीटर की ऊंचाई पर स्थित भारत के हिमांश स्टेशन से वैज्ञानिकों ने छह बड़े ग्लेशियरों का मौसम और पिघलन संबंधी डेटासेट सार्वजनिक किया है।',
        socialSnippet: '🏔️ भारत के तीसरे ध्रुव (हिमालय) पर सीधी नजर! हिमांश स्टेशन ने जारी किया ग्लेशियरों के पिघलने और मौसम का नया ओपन डेटासेट। #Himansh #Himalayas'
      }
    }
  },
  {
    id: 'med-02',
    title: 'Aurora Australis (Southern Lights) Time-Lapse over Maitri Station',
    type: 'Media',
    region: 'Antarctica',
    year: 2024,
    date: '2024-05-18',
    authorsOrLead: 'Geomagnetism & Geospace Group (Video / Time-Lapse)',
    fileSize: '240 MB',
    format: '4K Ultra-HD MP4',
    downloads: 12400,
    thumbnailUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80',
    tags: ['Aurora', 'Southern Lights', 'Geospace', 'Maitri', 'Space Weather'],
    summary: 'Mesmerizing high-frame-rate 4K time-lapse depicting intense geomagnetic storm activity and green oxygen emission ribbons above Maitri station.',
    fullAbstract: 'Recorded during the peak polar winter night of May 2024 using an all-sky emCCD imager calibrated for 557.7 nm auroral emissions. The dataset illustrates magnetosphere-ionosphere coupling during a severe solar flare coronal mass ejection (CME) impact.',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    mediaType: 'video',
    aiDissemination: {
      twitterThread: [
        '🌌 Cosmic magic over Maitri Station! When solar storms collide with Earth’s magnetic shield in Antarctica, this breathtaking spectacle occurs. 🇦🇶✨ #AuroraAustralis #SouthernLights #NCPOR #SpaceWeather',
        '2/3 Captured by Indian geophysicists during polar winter night, these green ribbons (557.7 nm) are produced by excited atmospheric oxygen atoms 100 km high.',
        '3/3 Beyond beauty, tracking auroral intensity is crucial for protecting Indian communication satellites and polar flights from space radiation! Watch the 4K clip: https://ncpor.res.in/media/med-02 🚀'
      ],
      instagramPost: {
        caption: 'The sky dances in green ribbons over India’s Maitri Station in Antarctica! 🌌🇦🇶 During the pitch-black polar night, our winter-over team witnessed this mind-blowing Aurora Australis (Southern Lights). Swipe to see why space weather matters 👉',
        slides: [
          'Slide 1: [Vibrant green aurora over Maitri base] The Southern Lights over Maitri Station, Antarctica',
          'Slide 2: [Solar flare diagram] How solar wind strikes Earth’s geomagnetic field',
          'Slide 3: [Maitri station lit under the glow] Surviving 60 days of continuous polar darkness',
          'Slide 4: [Satellite orbit graphic] Why studying auroras safeguards our space satellites',
          'Slide 5: [Download badge] High-res 4K wallpapers available on the NCPOR Portal!'
        ],
        hashtags: ['#AuroraAustralis', '#SouthernLights', '#MaitriStation', '#Antarctica', '#SpaceWeather', '#Astrophotography', '#NCPOR']
      },
      linkedInPost: 'Spectacular visualization meets critical space physics: The Geomagnetism unit at Maitri Station, Antarctica, has captured this exceptional Aurora Australis event resulting from a G4-class geomagnetic storm.\n\nContinuous all-sky monitoring from polar latitudes gives India crucial predictive capability for space weather anomalies affecting satellite communications.',
      pressRelease: {
        headline: 'NCPOR Scientists Record Major Geomagnetic Storm and Aurora Display over Maitri Station',
        dateline: 'MAITRI STATION, ANTARCTICA — MAY 18, 2024',
        body: 'During the onset of the Antarctic winter night, scientists stationed at India’s Maitri Station in East Antarctica recorded an exceptionally vivid Aurora Australis event accompanied by pronounced geomagnetic field perturbations.',
        quote: '"Our magnetic observatories recorded peak fluctuations exceeding 450 nanoTeslas, providing rare observational confirmation of solar flare energy coupling." — Lead Space Physicist, NCPOR',
        notesToEditors: 'Maitri has operated an uninterrupted geomagnetic observatory since 1989.'
      },
      hindiTranslation: {
        headline: 'अंटार्कटिका में मैत्री स्टेशन के ऊपर दिखा दुर्लभ "अरोरा ऑस्ट्रेलिस" का नज़ारा',
        summary: 'अंटार्कटिका की ध्रुवीय रात में भारतीय वैज्ञानिकों ने आसमान में झिलमिलाती हरी रोशनी (अरोरा ऑस्ट्रेलिस) को कैमरे में कैद किया। यह सौर तूफानों और अंतरिक्ष मौसम के अध्ययन के लिए बेहद महत्वपूर्ण है।',
        socialSnippet: '🌌 अंटार्कटिका के आसमान में प्रकृति का करिश्मा! भारत के मैत्री स्टेशन के ऊपर चमकी जादुई दक्षिणी रोशनी (Aurora Australis)। #Antarctica #Aurora'
      }
    }
  },
  {
    id: 'med-03',
    title: 'Aerial Drone Reconnaissance of Samudra Tapu Glacier & Glacial Lakes',
    type: 'Media',
    region: 'Himalayas',
    year: 2024,
    date: '2024-06-15',
    authorsOrLead: 'UAV Survey Wing, Himansh Station (Dr. Parmanand Sharma)',
    fileSize: '380 MB',
    format: '4K Ultra-HD MP4',
    downloads: 7650,
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
    mediaType: 'video',
    tags: ['Himalayas', 'Drone Survey', 'Himansh', 'Samudra Tapu', 'GLOF Hazard', 'Glaciology'],
    summary: 'Ultra-HD drone aerial survey of supra-glacial ponds, moraine-dammed meltwater lakes, and ice tongue crevasses across the Samudra Tapu glacier system in Chandra Basin.',
    fullAbstract: 'Multi-rotor RTK-UAV aerial photogrammetry conducted between 4,400m and 5,100m elevation. The footage documents high-resolution structural calving, moraine lake expansion rates, and unstable ice seracs for flood hazard early warning.',
    station: 'Himansh Station (Spiti, HP)',
    aiDissemination: {
      twitterThread: [
        '🚁 High-altitude drone flight over the Himalayas! See spectacular 4K footage of Samudra Tapu glacier filmed by scientists from Himansh Station! 🏔️✨ #DroneFlight #Himalayas #Glaciology #Himansh',
        '2/3 Operating drones at 15,000 feet requires special low-density propellers and extreme cold battery management.',
        '3/3 The footage mapped 12 expanding glacial lakes, helping downstream authorities detect early risks of outburst floods! 🇮🇳 @moesgoi'
      ],
      instagramPost: {
        caption: 'Flying at 15,000 feet above the world! 🚁🏔️ Stunning 4K aerial footage captured by India’s Himansh research team surveying the mighty Samudra Tapu glacier in Spiti Valley.',
        slides: [
          'Slide 1: [Drone shot flying over icy crevasses] High Altitude Eyes: UAV Flight over Chandra Basin',
          'Slide 2: [Turquoise glacial lake surrounded by ice] Monitoring expanding meltwater lakes',
          'Slide 3: [Team with rugged drone gear] Piloting in sub-zero thin air',
          'Slide 4: [3D terrain elevation model] Converting drone video into life-saving flood maps',
          'Slide 5: [HimVigyan badge] Watch the full 4K film on the portal!'
        ],
        hashtags: ['#Himalayas #DroneFootage #SamudraTapu #Himansh #Spiti #AerialPhotography #NCPOR']
      },
      linkedInPost: 'Cryosphere Remote Sensing: NCPOR’s UAV Survey Wing has released cinematic 4K aerial photogrammetry from Himansh Station documenting pro-glacial lake dynamics across the Samudra Tapu glacier system.\n\nA vital visual and spatial dataset for Himalayan early warning hazard systems.',
      pressRelease: {
        headline: 'Himansh Station Deploys Autonomous UAVs for High-Resolution Glacial Hazard Mapping',
        dateline: 'SPITI / GOA — JUNE 15, 2024',
        body: 'Scientists operating from India’s high-altitude observatory Himansh in the Western Himalayas have completed high-resolution drone reconnaissance of high-elevation glacial lakes.\n\nThe resulting 4K footage and digital orthomosaics provide unprecedented visibility into structural weaknesses in moraine dams.',
        quote: '"UAV photogrammetry gives us millimeters of precision in terrain where human trekking is physically impossible." — Lead Glaciologist, NCPOR',
        notesToEditors: 'Himansh is situated in the Chandra basin at 4,080 meters elevation.'
      },
      hindiTranslation: {
        headline: 'हिमांश स्टेशन से 15,000 फीट की ऊंचाई पर ड्रोन सर्वे: समुद्र तापु ग्लेशियर का 4K वीडियो जारी',
        summary: 'स्पीति घाटी के समुद्र तापु ग्लेशियर पर भारतीय वैज्ञानिकों ने ड्रोन उड़ाकर झीलों और बर्फ की दरारों का ऐतिहासिक 4K वीडियो सर्वे तैयार किया है।',
        socialSnippet: '🚁 15,000 फीट की ऊंचाई पर ड्रोन का कमाल! हिमांश स्टेशन से जारी हुआ समुद्र तापु ग्लेशियर का अद्भुत 4K वीडियो। #Himansh #Drone'
      }
    }
  },
  {
    id: 'med-04',
    title: 'Deep Ice-Core Extraction & Stratigraphy Operations at Central Dronning Maud Land',
    type: 'Media',
    region: 'Antarctica',
    year: 2024,
    date: '2024-02-14',
    authorsOrLead: 'Ice Core Laboratory Division, 43rd ISEA (Dr. Thamban Meloth)',
    fileSize: '45.2 MB',
    format: 'Ultra-HD RAW Photo (5K)',
    downloads: 5410,
    mediaUrl: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=1200&q=85',
    mediaType: 'image',
    tags: ['Ice Core', 'Antarctica', 'Paleoclimate', 'Maitri', 'Drilling Rig', 'Cryosphere'],
    summary: 'Documentary photographic record of the Hans Tausen electro-mechanical drill retrieving pristine 102-meter firn and ice cores spanning 500 years of Southern Hemisphere climate history.',
    fullAbstract: 'Photographic documentation of sub-surface ice trench laboratory procedures, core logging, and thermal insulated storage at -25°C before transit aboard the expedition vessel to the National Ice Core Laboratory in Goa.',
    station: 'Maitri Station (Dronning Maud Land)',
    aiDissemination: {
      twitterThread: [
        '❄️ Digging 500 years into the past! Ultra-HD photo series of India’s deep ice-core drilling operations in Antarctica! 🧊📸 #IceCore #Antarctica #Paleoclimate #NCPOR',
        '2/3 Operating in a sub-surface ice trench at -25°C, Indian scientists retrieved pristine ice cylinders containing ancient atmospheric bubbles.',
        '3/3 Download 5K wallpaper quality scientific photography from the HimVigyan portal! 🇦🇶🇮🇳 @moesgoi'
      ],
      instagramPost: {
        caption: 'Frozen Time Capsules: What does 500-year-old ice look like? 🧊✨ See our scientists at Maitri Station drilling into central Antarctic ice sheets.',
        slides: [
          'Slide 1: [Scientist holding transparent ice cylinder] 500 Years in a Glass Cylinder',
          'Slide 2: [Drill rig inside deep ice trench] Working underground in -25°C natural freezer',
          'Slide 3: [Close-up of ancient air bubbles] Trapping the air that Renaissance humans breathed',
          'Slide 4: [Insulated core boxes loaded onto sledges] Transporting Antarctic treasures home to Goa',
          'Slide 5: [Explore button] High-res photo collection live on the portal!'
        ],
        hashtags: ['#Antarctica #IceCores #Paleoclimatology #MaitriStation #NCPOR #SciencePhotography']
      },
      linkedInPost: 'Paleoclimatology Field Operations: NCPOR has curated an Ultra-HD documentary photographic monograph documenting deep firn and ice-core extraction in Central Dronning Maud Land, Antarctica.\n\nThe collection captures precision engineering and field scientific discipline under extreme polar conditions.',
      pressRelease: {
        headline: 'NCPOR Releases Photographic Monograph of Antarctic Deep Ice-Core Drilling Campaign',
        dateline: 'MAITRI / GOA — FEB 14, 2024',
        body: 'The Ice Core Laboratory of the National Centre for Polar and Ocean Research has released an exhaustive ultra-high-definition photographic archive documenting the successful extraction of a 102-meter firn core in Queen Maud Land.',
        quote: '"Every millimeter of ice is an unwritten page of Earth’s climate history." — Lead Paleoclimatologist, NCPOR',
        notesToEditors: 'NCPOR operates India\'s premier national ice-core repository facility in Goa maintained at -20°C.'
      },
      hindiTranslation: {
        headline: 'अंटार्कटिका में 500 साल पुरानी बर्फ की खुदाई: मैत्री स्टेशन से मनमोहक फोटो संग्रह जारी',
        summary: 'अंटार्कटिका के क्वीन मॉड लैंड में 102 मीटर गहरे आइस-कोर ड्रिलिंग अभियान की 5K अल्ट्रा-एचडी तस्वीरें जारी की गई हैं। यह बर्फ 500 साल पुराने मौसम का सटीक रिकॉर्ड रखती है।',
        socialSnippet: '🧊 500 साल पुरानी बर्फ का राज! मैत्री स्टेशन से भारतीय वैज्ञानिकों के आइस-कोर ड्रिलिंग की शानदार तस्वीरें। #Antarctica #IceCore'
      }
    }
  },
  {
    id: 'med-05',
    title: 'Icebreaker Vessel Maneuvers & Sea-Ice Operations in Prydz Bay',
    type: 'Media',
    region: 'Southern Ocean',
    year: 2024,
    date: '2024-03-02',
    authorsOrLead: 'Vessel Operations & Marine Geophysics Contingent (ORV Sagar Nidhi)',
    fileSize: '420 MB',
    format: '4K Ultra-HD MP4',
    downloads: 9120,
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    thumbnailUrl: '/about/polar-ship-exact.jpg',
    mediaType: 'video',
    tags: ['Southern Ocean', 'Prydz Bay', 'Icebreaker', 'ORV Sagar Nidhi', 'Maritime', 'Sea Ice'],
    summary: 'Stunning 4K high-frame-rate bridge and mast cameras capturing icebreaker hull ramming, lead navigation, and heavy pack-ice maneuvering approaching Bharati Station.',
    fullAbstract: 'Cinematic operational footage depicting polar navigation in 1.8-meter thick fast ice with 30-knot katabatic winds. Features heavy CTD deployment, multibeam bathymetric sonar passes, and helicopter cargo sling operations.',
    station: 'ORV Sagar Nidhi / Prydz Bay',
    aiDissemination: {
      twitterThread: [
        '🚢 Smashing through 2-meter thick Antarctic ice! Watch jaw-dropping 4K footage from the bow of India’s polar expedition ship! 🌊❄️ #Icebreaker #SouthernOcean #Antarctica #MoES',
        '2/3 Battling the "Furious Fifties" and ice floes in Prydz Bay, our nautical team carves shipping channels to resupply Bharati Station.',
        '3/3 Watch the full 4K video documentary on HimVigyan: https://ncpor.res.in/media/med-05 🇮🇳'
      ],
      instagramPost: {
        caption: 'Cracking the Frozen Ocean! 🚢❄️ Feel the raw power of an ice-strengthened polar vessel cutting through thick fast ice in Prydz Bay, Antarctica.',
        slides: [
          'Slide 1: [Bow smashing through blue ice floes] Ramming Speed: Polar Navigation in Prydz Bay',
          'Slide 2: [Bridge navigation radar screen] Spotting underwater ice growlers and bergy bits',
          'Slide 3: [Helicopter takeoff from ship deck] Slinging food and fuel to Bharati Station',
          'Slide 4: [Sunset over frozen ocean] Life aboard India’s polar research ship',
          'Slide 5: [Watch video button] Stream 4K video clip now!'
        ],
        hashtags: ['#Icebreaker #SouthernOcean #PolarExpedition #ORVSagarNidhi #Antarctica #Maritime #MoES']
      },
      linkedInPost: 'Polar Logistics & Marine Operations: New high-definition operational footage captured aboard India’s polar charter vessel highlights navigational maneuvers through sea-ice leads in Prydz Bay, East Antarctica.\n\nA showcase of Indian logistical capabilities in supporting remote Antarctic stations.',
      pressRelease: {
        headline: 'NCPOR Releases Polar Maritime Documentary on Sea-Ice Navigation in Prydz Bay',
        dateline: 'PRYDZ BAY, ANTARCTICA — MAR 02, 2024',
        body: 'The logistics and ship management directorate of the National Centre for Polar and Ocean Research has released high-definition footage detailing vessel maneuvers through 1.8-meter sea ice during the 43rd Antarctic expedition relief voyage.',
        quote: '"Navigating pack ice requires seamanship of the highest caliber under sub-zero conditions." — Expedition Master',
        notesToEditors: 'Prydz Bay is the maritime gateway for supplying India’s Bharati Research Station.'
      },
      hindiTranslation: {
        headline: 'अंटार्कटिका में 2 मीटर मोटी बर्फ चीरते भारतीय जहाज का 4K वीडियो रिलीज',
        summary: 'प्रिड्ज बे में भारती स्टेशन तक राशन और उपकरण पहुंचाने के लिए बर्फ की मोटी चादरों को तोड़ते ध्रुवीय अनुसंधान पोत का रोमांचक 4K वीडियो जारी किया गया है।',
        socialSnippet: '🚢 बर्फीले समंदर का सीना चीरते भारतीय जहाज का अद्भुत वीडियो! प्रिड्ज बे से 4K में देखें आइसब्रेकर का रोमांच। #Icebreaker #Antarctica'
      }
    }
  },
  {
    id: 'pub-02',
    title: 'Biogeochemical Carbon Sequestration and Southern Ocean Micro-Nutrient Limitation',
    type: 'Publication',
    region: 'Southern Ocean',
    year: 2023,
    date: '2023-09-14',
    authorsOrLead: 'Dr. N. Anilkumar, Dr. Sarat C. Tripathy, ORV Sagar Kanya Expedition Team',
    doi: '10.1016/j.dsr2.2023.105210',
    fileSize: '5.2 MB',
    format: 'PDF',
    downloads: 1850,
    pdfUrl: '/reports/southern-ocean-biogeochemical-carbon-sequestration.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Southern Ocean', 'Carbon Sink', 'Oceanography', 'ORV Sagar Kanya', 'Phytoplankton'],
    summary: 'Investigation of iron and silicate co-limitation on diatoms across the Subtropical to Polar Frontal Zones in the Indian sector of the Southern Ocean.',
    fullAbstract: 'Cruise observations aboard ORV Sagar Kanya during the 11th Indian Southern Ocean Expedition measured dissolved trace metals, chlorophyll-a size fractions, and primary production along a transect from 40°S to 66°S. Results demonstrate that natural iron fertilization events downstream of the Crozet and Kerguelen plateaus stimulate substantial carbon drawdown into the deep abyss.',
    aiDissemination: {
      twitterThread: [
        '🌊 The Southern Ocean acts as Earth’s colossal carbon sponge. How much CO2 does it really soak up? 🚢 New findings from India’s ORV Sagar Kanya expedition provide vital clues! 🧵👇 #OceanScience #CarbonSink',
        '2/3 Crossing the "Roaring Forties" and "Furious Fifties", Indian oceanographers discovered that trace iron micronutrients trigger massive microscopic plankton blooms that trap carbon for millennia.',
        '3/3 Read the full open study published by NCPOR’s ocean team: https://doi.org/10.1016/j.dsr2.2023.105210 🌏 @moesgoi @PIB_India'
      ],
      instagramPost: {
        caption: 'Sailing into the Roaring Forties! 🚢🌊 How tiny ocean plankton in the Southern Ocean help fight global warming, as discovered by Indian scientists aboard ORV Sagar Kanya.',
        slides: [
          'Slide 1: [ORV Sagar Kanya battling rough waves] Voyage to the End of the Earth',
          'Slide 2: [Microscope view of diatom plankton] Nature’s Carbon Vacuum Cleaners',
          'Slide 3: [Map of Southern Ocean fronts] Where Indian scientists conducted deep water testing',
          'Slide 4: [CTD Rosette winch lowering into sea] Sampling water at 4,000 meters depth',
          'Slide 5: [Takeaway message] Protecting our oceans means protecting our climate future'
        ],
        hashtags: ['#SouthernOcean', '#ORVSagarKanya', '#Oceanography', '#CarbonSink', '#NCPOR', '#MoES', '#ScienceExcellence']
      },
      linkedInPost: 'Marine Carbon Dynamics: Proud to share newly published research from the Indian Southern Ocean Expedition led by NCPOR aboard ORV Sagar Kanya.\n\nThe findings provide critical parameters on micronutrient limitation and deep-ocean carbon sequestration, aiding IPCC climate prediction models.',
      pressRelease: {
        headline: 'NCPOR Oceanographers Unveil Crucial Carbon Sink Dynamics in the Southern Ocean',
        dateline: 'GOA — SEPT 14, 2023',
        body: 'A scientific contingent from the National Centre for Polar and Ocean Research (NCPOR), Goa, returning from the Indian sector of the Southern Ocean aboard ORV Sagar Kanya, has presented key insights into how Southern Ocean diatom blooms absorb atmospheric carbon dioxide.',
        quote: '"Understanding natural biological carbon pumps in the Southern Ocean is fundamental to global climate policy." — Lead Oceanographer, NCPOR',
        notesToEditors: 'ORV Sagar Kanya is an ocean research vessel managed by NCPOR under the Ministry of Earth Sciences.'
      },
      hindiTranslation: {
        headline: 'ओआरवी सागर कन्या के वैज्ञानिकों ने खोजा दक्षिणी महासागर में कार्बन सोखने का रहस्य',
        summary: 'भारतीय अनुसंधान पोत "सागर कन्या" के वैज्ञानिकों ने दक्षिणी महासागर में सूक्ष्म प्लैंकटन द्वारा वातावरण से भारी मात्रा में कार्बन डाइऑक्साइड सोखने की प्रक्रिया का अध्ययन किया है।',
        socialSnippet: '🚢 तूफानी दक्षिणी महासागर में भारतीय वैज्ञानिक! ओआरवी सागर कन्या से हुआ जलवायु परिवर्तन से लड़ने वाला अहम शोध। #OceanScience'
      }
    }
  },
  {
    id: 'pub-03',
    title: 'Aerosol Radiative Forcing, Black Carbon Deposition, and Surface Albedo Modulation over Larsemann Hills, East Antarctica',
    type: 'Publication',
    region: 'Antarctica',
    year: 2024,
    date: '2024-04-22',
    authorsOrLead: 'Dr. Thamban Meloth, Dr. Manish Tiwari, Dr. Rohit Srivastava et al., NCPOR & ESSO',
    doi: '10.1029/2023JD039821',
    fileSize: '7.8 MB',
    format: 'PDF',
    downloads: 3840,
    pdfUrl: '/reports/antarctica-aerosol-radiative-forcing-publication.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=1200&q=80',
    tags: ['Antarctica', 'Black Carbon', 'Bharati Station', 'Aerosol Forcing', 'JGR Atmospheres', 'Albedo'],
    summary: 'Multi-season study at Bharati Station quantifying how long-range transported black carbon aerosols alter snow albedo and accelerate localized radiative surface warming in coastal East Antarctica.',
    fullAbstract: 'Light-absorbing impurities such as refractory black carbon (rBC) and mineral dust significantly alter the radiative balance of pristine polar ice sheets. Here we report multi-year continuous observations from Bharati Station (Larsemann Hills) and Maitri Station (Schirmacher Oasis) combining dual-wavelength Aethalometer BC monitoring, AERONET aerosol optical depth, and spectral albedometers. Deposition of rBC in surface snow reduced snow albedo by up to 0.018, inducing an instantaneous top-of-canopy radiative forcing of +0.48 W/m2, driving blue-ice melt onset in coastal Antarctica.',
    station: 'Bharati & Maitri Stations',
    aiDissemination: {
      twitterThread: [
        '🇦🇶 Even the pristine Antarctic ice sheet is feeling the heat! Landmark research from India\'s Bharati Station reveals how airborne black carbon affects snow melting! 🧵👇 #Antarctica #AtmosphericScience #ClimateCrisis',
        '2/4 Published in AGU\'s JGR Atmospheres, scientists from NCPOR recorded black carbon particulates traveling thousands of kilometers across Southern oceans to Larsemann Hills.',
        '3/4 The darkened snow absorbs significantly more solar radiation, reducing natural albedo and triggering earlier seasonal melt ponding.',
        '4/4 Read the full open access paper: https://doi.org/10.1029/2023JD039821 🇮🇳 @moesgoi'
      ],
      instagramPost: {
        caption: 'How clean is Antarctic snow really? ❄️🔍 Indian scientists at Bharati Station have detected micro-particles of soot carried across oceans, speeding up snowmelt in East Antarctica!',
        slides: [
          'Slide 1: [Bharati Station under aurora] Pure White or Darkening Ice?',
          'Slide 2: [Microscopic soot particles] What is Black Carbon and where does it originate?',
          'Slide 3: [Laser spectrometry at Bharati] How Indian scientists detect parts-per-billion impurities',
          'Slide 4: [Albedo reduction graph] Darker snow absorbs more solar radiation and melts faster',
          'Slide 5: [Actionable message] Why polar clean air monitoring is critical for Earth’s future'
        ],
        hashtags: ['#Antarctica', '#BharatiStation', '#AtmosphericPhysics', '#BlackCarbon', '#ClimateResearch', '#MoES']
      },
      linkedInPost: 'Atmospheric Physics at the Edge of the World: New peer-reviewed findings in JGR Atmospheres from NCPOR scientists at Bharati Station quantify aerosol radiative forcing and black carbon deposition over East Antarctica.\n\nThe research provides essential ground-truth parameters for international CMIP7 climate models assessing polar albedo decay.',
      pressRelease: {
        headline: 'Indian Scientists at Bharati Station Quantify Black Carbon Deposition on Antarctic Ice Sheet',
        dateline: 'VASCO DA GAMA, GOA — APR 22, 2024',
        body: 'A research team from the National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, has published breakthrough findings documenting the radiative forcing impact of long-range black carbon aerosols on the pristine blue-ice zones of Larsemann Hills, East Antarctica.\n\nThe study utilized continuous radiometric and chemical monitoring from India’s Bharati Station to quantify surface albedo reductions driven by trans-oceanic air masses.',
        quote: '"Tracking ultra-trace aerosol intrusions at Bharati Station enables us to detect planetary-scale atmospheric circulation shifts before they manifest in global climate statistics." — Director, NCPOR',
        notesToEditors: 'Bharati Station was commissioned in 2012 in the Larsemann Hills and is one of the world\'s most technologically advanced polar observation facilities.'
      },
      hindiTranslation: {
        headline: 'अंटार्कटिका में भारती स्टेशन से बड़ा खुलासा: ब्लैक कार्बन से तेजी से घट रहा है बर्फ का एल्बिडो',
        summary: 'एनसीपीओआर के वैज्ञानिकों ने अंटार्कटिका के भारती और मैत्री स्टेशन से साबित किया है कि हजारों किलोमीटर दूर से आने वाले सूक्ष्म धुंए और कार्बन के कण अंटार्कटिका की सफेद बर्फ पर गिरकर उसके पिघलने की गति बढ़ा रहे हैं।',
        socialSnippet: '🇦🇶 क्या अंटार्कटिका की बर्फ पर भी प्रदूषण का असर है? भारती स्टेशन से भारतीय वैज्ञानिकों का नया अंतरराष्ट्रीय शोध प्रकाशित! #BharatiStation #Antarctica'
      }
    }
  },
  {
    id: 'pub-04',
    title: 'Accelerated Glacier Mass Deficits and Runoff Vulnerability in the Chandra Basin, Western Himalayas',
    type: 'Publication',
    region: 'Himalayas',
    year: 2024,
    date: '2024-05-18',
    authorsOrLead: 'Dr. Parmanand Sharma, Dr. Bhanu Pratap, Dr. Lavkush Patel et al., NCPOR Himalayan Cryosphere Group',
    doi: '10.5194/tc-18-2041-2024',
    fileSize: '6.9 MB',
    format: 'PDF',
    downloads: 4210,
    pdfUrl: '/reports/himalayan-glacier-mass-balance-hydrology.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    tags: ['Himalayas', 'Glacier Mass Balance', 'Himansh', 'Chandra Basin', 'The Cryosphere', 'Water Security'],
    summary: 'Decade-long continuous geodetic and glacio-hydrological synthesis from Himansh Observatory revealing negative mass balance trends (-0.52 m w.e. a⁻¹) and shifted summer discharge regimes.',
    fullAbstract: 'Glaciers in the Western Himalayas sustain the headwaters of the Indus River basin. Here we synthesize ten years (2013-2023) of continuous glacio-hydrological monitoring conducted from India\'s high-altitude research station Himansh (4,080 m a.s.l.) in the Chandra Basin, Himachal Pradesh. Differential GPS ablation stakes, ground-penetrating radar (GPR), and stereo satellite DEMs reveal an accelerated mean basin-wide mass deficit of -0.52 +/- 0.08 m w.e. a-1, accompanied by a 22-day forward shift in annual peak discharge.',
    station: 'Himansh Station (Spiti, HP)',
    aiDissemination: {
      twitterThread: [
        '🏔️ The "Third Pole" is losing ice at unprecedented rates. A 10-year benchmark study from India’s Himansh Station in the Himalayas is out! 🧵👇 #HimalayanGlaciers #Himansh #WaterSecurity #Cryosphere',
        '2/4 Published in EGU’s The Cryosphere, NCPOR glaciologists tracked 6 major glaciers in the Chandra Basin using GPR and differential GPS.',
        '3/4 The results show accelerated thinning (-0.52 m w.e./year) and a 3-week shift in seasonal peak meltwater discharge.',
        '4/4 Understanding this shift is vital for planning hydropower and water security in northern India. Read paper: https://doi.org/10.5194/tc-18-2041-2024 🇮🇳'
      ],
      instagramPost: {
        caption: 'Life at 13,500 feet: How scientists at India’s highest research station “Himansh” are tracking the melting heart of the Himalayas. 🏔️❄️',
        slides: [
          'Slide 1: [Himansh base in snowy valley] Guardian of the Third Pole',
          'Slide 2: [Scientists with ice core drills] How do you measure a glacier’s heartbeat?',
          'Slide 3: [Before & After photo comparison] 10 Years of retreat in the Chandra Basin',
          'Slide 4: [Infographic of river basins] Why Himalayan glaciers feed 200 million people downstream',
          'Slide 5: [Himansh team photo] Scientific courage in sub-zero thin air!'
        ],
        hashtags: ['#Himansh #Himalayas #Glaciology #ClimateChange #ThirdPole #SpitiValley #NCPOR #MoES']
      },
      linkedInPost: 'Decadal Glaciology in the Western Himalayas: NCPOR\'s high-altitude research station Himansh has delivered a benchmark 10-year assessment of glacier mass balance and downstream hydrology in "The Cryosphere".\n\nEssential reading for climate policy analysts, hydrologists, and water resources engineers working across the Indus basin.',
      pressRelease: {
        headline: 'Decade of In-Situ Glaciological Telemetry from Himansh Station Published in Top European Journal',
        dateline: 'SHIMLA / GOA — MAY 18, 2024',
        body: 'The National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, has published a comprehensive decadal monograph on the mass balance and hydrological response of Western Himalayan glaciers in the prestigious European journal The Cryosphere.\n\nOperating from Himansh Observatory at 4,080 meters elevation in the Chandra Basin, researchers logged ten years of ground-penetrating radar and streamflow measurements.',
        quote: '"Himansh has transformed Indian cryospheric monitoring from sporadic seasonal treks into continuous, high-precision observatory science." — Lead Glaciologist, NCPOR',
        notesToEditors: 'Himansh was inaugurated in 2016 and is the highest permanent glaciological observatory in the Himalayas.'
      },
      hindiTranslation: {
        headline: 'हिमांश स्टेशन से 10 वर्षों का ऐतिहासिक अध्ययन: हिमालयी ग्लेशियरों के पिघलने पर नई रिपोर्ट प्रकाशित',
        summary: 'स्पीति घाटी में 13,500 फीट की ऊंचाई पर स्थित भारत के "हिमांश" स्टेशन के वैज्ञानिकों ने 10 साल के शोध के बाद साबित किया है कि चंद्र बेसिन के ग्लेशियर हर साल आधा मीटर से ज्यादा सिकुड़ रहे हैं।',
        socialSnippet: '🏔️ हिमालय का पानी कब तक रहेगा? हिमांश स्टेशन से जारी 10-वर्षीय ऐतिहासिक ग्लेशियर रिपोर्ट अब अंतरराष्ट्रीय जर्नल में प्रकाशित। #Himansh #Himalayas'
      }
    }
  },
  {
    id: 'pub-05',
    title: 'Psychrophilic Adaptations and Novel Antimicrobial Secondary Metabolites from Streptomyces in Schirmacher Oasis, East Antarctica',
    type: 'Publication',
    region: 'Antarctica',
    year: 2023,
    date: '2023-10-28',
    authorsOrLead: 'Dr. Archana Singh, Dr. K. P. Krishnan, Dr. R. Ravindra et al., Polar Biology Lab, NCPOR',
    doi: '10.3389/fmicb.2023.1189420',
    fileSize: '5.8 MB',
    format: 'PDF',
    downloads: 2790,
    pdfUrl: '/reports/antarctic-psychrophilic-microbial-genomics.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    tags: ['Antarctica', 'Maitri Station', 'Microbiology', 'Cold Enzymes', 'Bioprospecting', 'Schirmacher Oasis'],
    summary: 'Whole-genome sequencing and bioprospecting of extremophilic Actinobacteria isolated from cryoconite holes around Maitri Station, uncovering cold-active enzymes and potent anti-MRSA cyclic peptides.',
    fullAbstract: 'Psychrotolerant Actinobacteria dwelling in Antarctic cryo-environments harbor unique biosynthetic gene clusters evolved for freeze survival. Here we present whole-genome sequencing and antimicrobial profiling of three novel Streptomyces strains isolated from cryoconite holes around Maitri Station, Schirmacher Oasis. Genome mining identified an uncharacterized cyclic non-ribosomal peptide (antarcidil-A) displaying bactericidal efficacy against multi-drug resistant MRSA (MIC = 1.2 ug/mL).',
    station: 'Maitri Station (Schirmacher Oasis)',
    aiDissemination: {
      twitterThread: [
        '❄️ Superbug fighters from the South Pole! Indian scientists at Maitri Station discover a new antibiotic compound in frozen Antarctic soil! 🧬🧫 🧵👇 #PolarBio #Antibiotics #Antarctica #ScienceBreakthrough',
        '2/4 Published in Frontiers in Microbiology, the NCPOR Polar Biology team cultured Streptomyces bacteria from cryoconite holes near Lake Priyadarshini.',
        '3/4 The isolated peptide, "antarcidil-A", effectively killed hospital superbug MRSA in lab trials while functioning at near-freezing temperatures.',
        '4/4 Polar extremophiles may hold the cure for future drug-resistant pathogens! Read paper: https://doi.org/10.3389/fmicb.2023.1189420 🇮🇳'
      ],
      instagramPost: {
        caption: 'Could the frozen soils of Antarctica cure hospital superbugs? 🧫❄️ Indian microbiologists at Maitri Station make a sensational discovery!',
        slides: [
          'Slide 1: [Frozen soil close-up] Hidden Life in the Antarctic Freeze',
          'Slide 2: [Microscope image of Streptomyces] The ancient micro-warriors of Schirmacher Oasis',
          'Slide 3: [Petri dish showing inhibition zone] How "antarcidil-A" destroys drug-resistant bacteria',
          'Slide 4: [Maitri Station lab] Doing cutting-edge genomics at -30°C',
          'Slide 5: [Takeaway] India’s polar science directly advancing healthcare solutions!'
        ],
        hashtags: ['#PolarBiology #Microbiology #Antarctica #Maitri #Superbugs #Biotechnology #NCPOR #MoES']
      },
      linkedInPost: 'Extremophile Biotechnology: Researchers from NCPOR\'s Polar Biology Division have isolated and characterized novel bioactive metabolites from Antarctic permafrost at Maitri Station in "Frontiers in Microbiology".\n\nThe study highlights how India’s polar presence is driving bio-discovery in cold-active enzymes and next-generation antimicrobial peptides.',
      pressRelease: {
        headline: 'Antarctic Bacteria Isolated by Indian Scientists Yield Potential Novel Antibiotic Candidate',
        dateline: 'GOA — OCT 28, 2023',
        body: 'Microbiologists from the National Centre for Polar and Ocean Research (NCPOR), Goa, conducting bioprospecting studies at Maitri Station in East Antarctica, have isolated and fully sequenced three novel psychrophilic bacterial strains producing bioactive peptides capable of inhibiting drug-resistant pathogens.\n\nThe findings, published in Frontiers in Microbiology, showcase the biological treasures preserved in polar cryoconite sediment matrices.',
        quote: '"Antarctica\'s hyper-arid cold habitats force microorganisms to evolve chemical survival weapons that can solve human antibiotic resistance." — Principal Investigator, Polar Biology Lab',
        notesToEditors: 'Maitri Station was established in 1989 in the Schirmacher Oasis and maintains active microbiological wet labs.'
      },
      hindiTranslation: {
        headline: 'अंटार्कटिका की बर्फीली मिट्टी में मिला नया एंटीबायोटिक: मैत्री स्टेशन से भारतीय वैज्ञानिकों की बड़ी खोज',
        summary: 'एनसीपीओआर के वैज्ञानिकों ने मैत्री स्टेशन के पास जमी हुई मिट्टी से ऐसे बैक्टीरिया खोजे हैं जो खतरनाक सुपरबग (MRSA) को खत्म करने वाला नया प्राकृतिक रसायन पैदा करते हैं।',
        socialSnippet: '🧫 अंटार्कटिका से आई चिकित्सा जगत की बड़ी खबर! मैत्री स्टेशन से भारतीय वैज्ञानिकों ने खोजा जानलेवा बैक्टीरिया को हराने वाला नया यौगिक। #Maitri #Antarctica'
      }
    }
  },
  {
    id: 'pub-06',
    title: 'Meso-Scale Eddy Dynamics and Poleward Heat Transport across the Antarctic Polar Front in the Indian Ocean Sector',
    type: 'Publication',
    region: 'Southern Ocean',
    year: 2024,
    date: '2024-06-04',
    authorsOrLead: 'Dr. Sarat C. Tripathy, Dr. N. Anilkumar, Dr. R. K. Nayak et al., NCPOR Ocean Dynamics Division',
    doi: '10.1038/s43247-024-01389-w',
    fileSize: '7.1 MB',
    format: 'PDF',
    downloads: 2150,
    pdfUrl: '/reports/southern-ocean-eddy-dynamics-heat-transport.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Southern Ocean', 'Ocean Eddies', 'Polar Front', 'ORV Sagar Nidhi', 'Heat Transport', 'Nature'],
    summary: 'High-resolution satellite altimetry and biogeochemical Argo float profiles tracking eddy-induced cross-frontal heat exchange and its influence on Southern Ocean sea-ice edge retreat.',
    fullAbstract: 'Meso-scale eddies generated along the Antarctic Polar Front provide the primary conduit for transporting heat and salt across the circum-polar barrier. Utilizing multi-satellite altimetry, ADCP transects aboard ORV Sagar Nidhi, and deep biogeochemical Argo profiling floats, we quantify meridional eddy heat fluxes in the Indian sector (50°E - 80°E). Results identify recurrent anticyclonic eddy shedding downstream of the Southwest Indian Ridge conveying over 0.18 PW of poleward heat.',
    station: 'ORV Sagar Nidhi & Argo Array',
    aiDissemination: {
      twitterThread: [
        '🌀 Giant ocean whirlpools in the Southern Ocean are pushing heat towards Antarctic ice shelves! New Nature Communications study from Indian oceanographers! 🌊🚢 🧵👇 #OceanDynamics #SouthernOcean #SagarNidhi',
        '2/4 Combining satellite altimetry with ORV Sagar Nidhi ship cruise surveys, researchers mapped 100-km-wide eddy currents in the "Furious Fifties".',
        '3/4 These spinning eddies act as oceanic conveyor belts, leaking 0.18 Petawatts of warm sub-tropical water across the Polar Front.',
        '4/4 Read open access paper in Communications Earth & Environment: https://doi.org/10.1038/s43247-024-01389-w 🇮🇳'
      ],
      instagramPost: {
        caption: 'Into the Roaring Forties! 🚢🌊 How massive underwater ocean whirlpools are transporting heat to Antarctica, as discovered by Indian scientists aboard ORV Sagar Nidhi.',
        slides: [
          'Slide 1: [ORV Sagar Nidhi cutting through storm waves] Frontlines of Ocean Physics',
          'Slide 2: [Satellite radar image of spinning eddies] Giant whirlpools larger than cities',
          'Slide 3: [CTD rosette dipping into ice-water] Measuring ocean heat down to 2,000 meters',
          'Slide 4: [3D graphic of heat flux] How eddies breach the Antarctic Polar Front',
          'Slide 5: [Why it matters] Improving sea level rise projections worldwide!'
        ],
        hashtags: ['#SouthernOcean #ORVSagarNidhi #PhysicalOceanography #OceanEddies #NaturePortfolio #ClimateScience']
      },
      linkedInPost: 'Physical Oceanography & Southern Ocean Dynamics: New publication in Nature Communications Earth & Environment led by NCPOR details the quantification of meso-scale eddy heat fluxes across the Antarctic Polar Front.\n\nA major step forward for parameterizing sub-mesoscale ocean mixing in global climate models.',
      pressRelease: {
        headline: 'Nature Comms Study by Indian Oceanographers Maps Eddy-Driven Heat Transport in Southern Ocean',
        dateline: 'GOA — JUNE 04, 2024',
        body: 'Scientists from the National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, utilizing high-resolution observations gathered aboard ORV Sagar Nidhi alongside deep autonomous Argo profilers, have quantified how ocean eddies shuttle heat across the Antarctic Polar Front.\n\nThe findings provide crucial observational constraints for CMIP6 climate model simulations.',
        quote: '"Capturing deep eddy structures in the stormy Southern Ocean gives us the physical missing link in polar heat budgets." — Lead Author, NCPOR Ocean Group',
        notesToEditors: 'ORV Sagar Nidhi is India’s premier ice-class oceanographic research vessel operated by MoES.'
      },
      hindiTranslation: {
        headline: 'दक्षिणी महासागर के विशाल भंवर अंटार्कटिका तक पहुंचा रहे हैं गर्मी: भारतीय वैज्ञानिकों का नेचर जर्नल में शोध',
        summary: 'ओआरवी सागर निधि और उपग्रहों के आंकड़ों से भारतीय वैज्ञानिकों ने पाया है कि दक्षिणी महासागर के 100 किमी चौड़े समुद्री भंवर अंटार्कटिका की ओर गर्म पानी धकेल रहे हैं, जिससे वहां की बर्फ पर असर पड़ रहा है।',
        socialSnippet: '🌊 50 डिग्री दक्षिणी अक्षांश के तूफानों के बीच भारतीय वैज्ञानिकों की बड़ी खोज! नेचर कम्युनिकेशंस में छपा अहम शोध। #SagarNidhi #SouthernOcean'
      }
    }
  },
  {
    id: 'ds-03',
    title: 'IndARC Multi-Sensor Underwater Mooring Oceanographic Time-Series (Kongsfjorden, Svalbard)',
    type: 'Dataset',
    region: 'Arctic',
    year: 2024,
    date: '2024-06-10',
    authorsOrLead: 'Dr. K. P. Krishnan & Arctic Oceanography Team, Himadri Station, NCPOR',
    doi: '10.5281/ncpor.arc.2024.045',
    fileSize: '112.4 MB',
    format: 'NetCDF / CSV',
    downloads: 2680,
    thumbnailUrl: 'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=1200&q=80',
    tags: ['Arctic', 'IndARC', 'Kongsfjorden', 'Himadri', 'Svalbard', 'Physical Oceanography'],
    summary: 'Continuous sub-surface oceanographic measurements (temperature, salinity, current velocity, dissolved oxygen, PAR) from India\'s IndARC moored observatory deployed at 192m depth in Kongsfjorden, Svalbard.',
    fullAbstract: 'Deployed annually since 2014 by NCPOR at 78°59\'N, 11°49\'E in the inner Kongsfjorden fjord, the IndARC observatory measures the progressive intrusion of warm Atlantic Water (AW) into the pristine Arctic basin. This dataset encompasses calibrated Sea-Bird SBE-16plus V2 CTD profiles, Nortek acoustic Doppler current profiler (ADCP) velocity vectors, Aanderaa optode dissolved oxygen concentrations, and Turner Designs chlorophyll fluorometer time-series sampled at 15-minute intervals throughout the complete seasonal freezing-thawing cycle.',
    station: 'Himadri Station (Ny-Ålesund)',
    aiDissemination: {
      twitterThread: [
        '🌊 Arctic Ocean Deep Secrets: India’s moored underwater observatory "IndARC" has transmitted a decade of sub-surface oceanographic telemetry from 79° North! 🧵👇 #Arctic #Himadri #IndARC #MoES',
        '2/4 Moored at 192 meters depth in Svalbard\'s icy waters, IndARC tracks the inflow of warm Atlantic waters that destabilize Arctic ice shelves.',
        '3/4 The data reveals unprecedented winter warming events that directly modulate sub-tropical jet streams and Indian monsoon variations.',
        '4/4 Full multi-parameter NetCDF time-series is now open for climate scientists worldwide! 🌐 https://ncpor.res.in/datasets/ds-03 @moesgoi'
      ],
      instagramPost: {
        caption: '192 Meters Under the Arctic Sea Ice! 🌊❄️ Meet IndARC — India’s underwater scientific sentinel anchored in the Arctic Ocean near our Himadri base in Svalbard.',
        slides: [
          'Slide 1: [Underwater observatory diagram] Anchored in the Abyss: India’s IndARC Observatory',
          'Slide 2: [Acoustic Doppler sensors deployed into frozen fjord] How IndARC survives year-round pack ice',
          'Slide 3: [Ocean temperature cross-section] Tracking warm Atlantic water pulses into the Arctic',
          'Slide 4: [Himadri base with glaciers] Why Arctic currents govern India’s monsoon rains',
          'Slide 5: [Open data portal preview] Download the complete 2024 NetCDF dataset free'
        ],
        hashtags: ['#ArcticScience', '#IndARC', '#HimadriStation', '#Oceanography', '#Svalbard', '#NCPOR', '#MoES']
      },
      linkedInPost: 'Physical Oceanography Milestone: NCPOR has officially published the 2024 calibrated oceanographic time-series from IndARC, India\'s multi-sensor sub-surface mooring situated in Kongsfjorden, Svalbard (79°N).\n\nThe dataset provides continuous high-resolution metrics on thermal stratification, halocline dynamics, and Atlantic Water intrusion, vital for refining Arctic-Monsoon teleconnection models.',
      pressRelease: {
        headline: 'NCPOR Releases Sub-Surface Arctic Oceanographic Dataset from IndARC Mooring',
        dateline: 'NY-ÅLESUND (SVALBARD) / GOA — JUNE 10, 2024',
        body: 'The National Centre for Polar and Ocean Research (NCPOR), under the Ministry of Earth Sciences, has released the comprehensive 2023-24 underwater mooring dataset from IndARC, situated in the high Arctic fjord of Kongsfjorden.\n\nOperating since 2014, IndARC is India\'s crown jewel in polar physical oceanography, measuring the delicate interplay between glacial meltwater discharge and warm Atlantic currents.',
        quote: '"IndARC provides empirical evidence that changes in the Arctic\'s deep thermal structure reverberate across the global climate system." — Project Director, Arctic Division, NCPOR',
        notesToEditors: 'IndARC is serviced annually during the summer Arctic expedition using chartered ice-class vessels operating out of Ny-Ålesund.'
      },
      hindiTranslation: {
        headline: 'एनसीपीओआर ने आर्कटिक महासागर वेधशाला "IndARC" का नया ओपन डेटासेट जारी किया',
        summary: 'नॉर्वे के स्वालबार्ड में 192 मीटर गहरे बर्फीले समुद्र में स्थापित भारत की वेधशाला "इंडरार्क" ने महासागरीय तापमान, लवणता और धाराओं का विस्तृत 1-वर्षीय डेटा जारी किया है।',
        socialSnippet: '🌊 बर्फीले आर्कटिक समुद्र के 192 मीटर नीचे से मिला लाइव डेटा! भारत की IndARC वेधशाला का नया महासागरीय डेटासेट अब ओपन साइंस पोर्टल पर लाइव है। #IndARC #Himadri'
      }
    }
  },
  {
    id: 'ds-04',
    title: 'Southern Ocean Hydrographic CTD & Biogeochemical Carbon Flux Profiles (SOE Transect 60°S - 69°S)',
    type: 'Dataset',
    region: 'Southern Ocean',
    year: 2024,
    date: '2024-05-22',
    authorsOrLead: 'Dr. N. Anilkumar & 12th Indian Southern Ocean Expedition Team, NCPOR & MoES',
    doi: '10.5281/ncpor.soe.2024.103',
    fileSize: '89.6 MB',
    format: 'NetCDF / ODV / CSV',
    downloads: 3140,
    thumbnailUrl: '/about/polar-ship.jpg',
    tags: ['Southern Ocean', 'CTD Profiling', 'Carbon Sink', 'Polar Front', 'Biogeochemistry', 'SA Agulhas II'],
    summary: 'Full-depth hydrographic CTD sensor profiles (0–4,500m), nitrate, silicate, phosphate, and dissolved inorganic carbon (DIC) measured across the Sub-Antarctic and Polar Fronts along 57°30\'E.',
    fullAbstract: 'Collected aboard the ice-class polar research vessel SA Agulhas II during the 12th Indian Southern Ocean Expedition, this hydrographic dataset covers 42 deep-water stations spanning from 40°S to the Antarctic continental margin at 69°S. Measurements include dual Sea-Bird 911plus CTD temperature-salinity casts calibrated against discrete Autosal salinometer samples, dissolved oxygen (Winkler titration), nutrients (Seal Analytical AutoAnalyzer), total alkalinity, and coulometric dissolved inorganic carbon (DIC) tracking deep ocean carbon sequestration pathways.',
    station: 'SA Agulhas II (Polar Research Vessel)',
    aiDissemination: {
      twitterThread: [
        '🚢 Deep into the Furious Fifties! Indian oceanographers aboard SA Agulhas II have released a colossal 4,500m depth hydrographic dataset from the Southern Ocean! 🧵👇 #SouthernOcean #Oceanography #MoES',
        '2/4 Across 42 deep stations along 57°30\'E, scientists sampled water all the way to the abyssal seabed, measuring how much carbon dioxide is drawn down into deep currents.',
        '3/4 Findings indicate the Sub-Antarctic Front is acting as an intensifying thermal barrier with marked shifts in nutrient stoichiometric ratios.',
        '4/4 Access raw CTD casts & Ocean Data View (ODV) spreadsheets now: https://ncpor.res.in/datasets/ds-04 🌊 @moesgoi @PIB_India'
      ],
      instagramPost: {
        caption: 'Plunging 4,500 Meters into the Frozen Sea! 🚢⚓ See how Indian scientists mapped the world\'s fiercest ocean currents during the 12th Southern Ocean Expedition.',
        slides: [
          'Slide 1: [Giant 24-bottle CTD rosette lowering into rough polar sea] 4,500 Meters Under the Southern Ocean',
          'Slide 2: [Water sample bottles being drained] Analyzing ancient water masses untouched for centuries',
          'Slide 3: [Graph of Antarctic Bottom Water] The cold engine driving all global ocean circulation',
          'Slide 4: [Laboratory aboard SA Agulhas II] Measuring dissolved inorganic carbon in real time',
          'Slide 5: [Open Access link] Download full NetCDF & CSV data free on HimVigyan'
        ],
        hashtags: ['#SouthernOcean', '#ExpeditionLife', '#OceanScience', '#CTD', '#CarbonSink', '#NCPOR', '#MoES']
      },
      linkedInPost: 'Deep Hydrography Release: The National Centre for Polar and Ocean Research (NCPOR) has published the complete CTD and Biogeochemical hydrographic section from the 12th Indian Southern Ocean Expedition (SOE-12).\n\nEncompassing full-depth (0-4,500m) physical and chemical oceanography across the Polar Front, this open dataset strengthens global oceanic carbon inventory modeling.',
      pressRelease: {
        headline: 'NCPOR Publishes Deep-Ocean Hydrographic CTD Dataset from 12th Southern Ocean Expedition',
        dateline: 'VASCO DA GAMA (GOA) — MAY 22, 2024',
        body: 'The Ministry of Earth Sciences has announced the publication of a landmark deep-ocean hydrographic dataset collected across the Indian sector of the Southern Ocean.\n\nCarried out aboard the research vessel SA Agulhas II, the study provides comprehensive physical, chemical, and biological baseline parameters from the surface down to 4,500 meters depth.',
        quote: '"The Southern Ocean accounts for over 40% of all oceanic uptake of anthropogenic CO2. These empirical observations are crucial for climate modelers globally." — Lead Scientist, Southern Ocean Group',
        notesToEditors: 'NCPOR conducts regular multidisciplinary scientific cruises into the Southern Ocean targeting the Enderby and Crozet Basins.'
      },
      hindiTranslation: {
        headline: 'दक्षिणी महासागर से 4,500 मीटर गहरा हाइड्रो-केमिकल महासागरीय डेटासेट जारी',
        summary: '12वें भारतीय दक्षिणी महासागर अभियान दल ने 40°S से 69°S तक 4,500 मीटर गहराई तक समुद्र के तापमान, लवणता और कार्बन सोखने की क्षमता का दुर्लभ डेटा जारी किया है।',
        socialSnippet: '🚢 4,500 मीटर गहरे समुद्र का रहस्य! भारतीय वैज्ञानिकों ने दक्षिणी महासागर से जुटाया अनोखा हाइड्रो-केमिकल डेटासेट। अब ओपन एक्सेस के लिए उपलब्ध। #SouthernOcean'
      }
    }
  },
  {
    id: 'ds-05',
    title: 'Atmospheric Boundary Layer Fluxes & Equivalent Black Carbon (eBC) Concentration (Bharati Station, Larsemann Hills)',
    type: 'Dataset',
    region: 'Antarctica',
    year: 2024,
    date: '2024-04-18',
    authorsOrLead: 'Atmospheric Science Group & 43rd ISEA Winter Team, Bharati Base, NCPOR',
    doi: '10.5281/ncpor.ant.2024.072',
    fileSize: '64.2 MB',
    format: 'CSV / NetCDF',
    downloads: 1980,
    thumbnailUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    tags: ['Bharati Station', 'Larsemann Hills', 'Black Carbon', 'Aethalometer', 'Aerosols', 'Boundary Layer'],
    summary: 'Continuous 1-minute 7-wavelength Aethalometer (AE33) aerosol optical absorption, meteorological flux tower metrics, and UV-A/UV-B radiation logged at Bharati Station during the 43rd ISEA.',
    fullAbstract: 'Monitored at the dedicated atmospheric observatory of Bharati Station (69°24\'28" S, 76°11\'14" E) in the Larsemann Hills, East Antarctica, this dataset records equivalent black carbon mass concentrations (ng/m3) resolved at 370 nm to 950 nm alongside 3D sonic anemometer eddy covariance sensible heat fluxes, atmospheric ozone mixing ratios (Thermo 49i), and broadband downwelling shortwave irradiance. It provides an unpolluted Antarctic coastal baseline and captures episodic long-range transboundary aerosol transport events from Southern Hemisphere continental landmasses.',
    station: 'Bharati Station (Larsemann Hills)',
    aiDissemination: {
      twitterThread: [
        '❄️ How clean is Antarctic air? NCPOR scientists at Bharati Station have released 1-minute resolution atmospheric boundary layer & Black Carbon data! 🧵👇 #BharatiStation #Antarctica #AtmosphericScience',
        '2/4 Using high-precision 7-wavelength Magee Aethalometers, researchers tracked aerosol background levels hovering below 15 ng/m³ — among the cleanest air on planet Earth.',
        '3/4 The data also caught episodic smoke signatures transported across 5,000 km of ocean from Australian bushfires, proving that global emissions reach even remote polar ice.',
        '4/4 Open Data for atmospheric chemists: Explore the raw CSV/NetCDF files here: https://ncpor.res.in/datasets/ds-05 🇦🇶 @moesgoi'
      ],
      instagramPost: {
        caption: 'Breathing the Purest Air on Earth! ❄️🇦🇶 Inside the atmospheric science laboratory at India’s Bharati Station in Antarctica, where we track global air pollution footprints.',
        slides: [
          'Slide 1: [Bharati station on stilts amidst icy hills] The Atmospheric Guardians of Larsemann Hills',
          'Slide 2: [Aethalometer sensor intake tube on roof] Measuring particles 10,000 times thinner than hair',
          'Slide 3: [Graph of 15 ng/m³ baseline] Comparing city air (50,000 ng) with Antarctic air (15 ng)',
          'Slide 4: [Wind vortex simulation] How katabatic winds flush out the coastal atmosphere',
          'Slide 5: [Open dataset banner] Accessible to researchers worldwide via NCPOR HimVigyan'
        ],
        hashtags: ['#Antarctica', '#BharatiStation', '#AtmosphericScience', '#CleanAir', '#BlackCarbon', '#MoES', '#NCPOR']
      },
      linkedInPost: 'Aerosol Physics & Boundary Layer Dynamics: NCPOR has released the open-access dataset "Atmospheric Boundary Layer Fluxes & Equivalent Black Carbon Concentration (Bharati Station, Larsemann Hills)" from the 43rd Indian Antarctic Expedition.\n\nThis continuous sub-hourly archive serves as a gold standard background reference for global climate chemistry and satellite atmospheric retrieval calibration.',
      pressRelease: {
        headline: 'NCPOR Releases High-Precision Atmospheric Aerosol & Black Carbon Dataset from Bharati Station',
        dateline: 'BHARATI STATION (ANTARCTICA) / NEW DELHI — APR 18, 2024',
        body: 'The Ministry of Earth Sciences (MoES) has officially made public a year-long high-resolution atmospheric aerosol and micro-meteorological flux dataset gathered at Bharati Station, East Antarctica.\n\nThe dataset provides continuous measurements of equivalent black carbon (eBC) at seven spectral wavelengths, detailing the background aerosol optical properties of the pristine East Antarctic atmosphere.',
        quote: '"These baseline measurements allow the scientific community to detect even minuscule traces of global pollution reaching the Antarctic continent." — Lead Atmospheric Scientist, NCPOR',
        notesToEditors: 'Bharati Station was constructed in 2012 and operates an array of automated atmospheric and geospace observation instruments.'
      },
      hindiTranslation: {
        headline: 'भारती स्टेशन अंटार्कटिका से ब्लैक कार्बन एवं वायुमंडलीय फ्लक्स डेटासेट जारी',
        summary: 'अंटार्कटिका के भारती स्टेशन में स्थापित अत्याधुनिक एथलोमीटर एवं वेदर टावर से जुटाया गया 1-वर्षीय वायुमंडलीय डेटासेट एनसीपीओआर द्वारा सार्वजनिक किया गया।',
        socialSnippet: '❄️ दुनिया की सबसे शुद्ध हवा की जांच! अंटार्कटिका के भारती स्टेशन से ब्लैक कार्बन और मौसम का नया ओपन डेटासेट जारी। #BharatiStation #Antarctica'
      }
    }
  },
  {
    id: 'ds-06',
    title: 'Multi-Frequency GPR Ice Thickness Sounding & Bedrock Elevation Grid (Chhota Shigri & Sutri Dhaka Glaciers)',
    type: 'Dataset',
    region: 'Himalayas',
    year: 2024,
    date: '2024-03-29',
    authorsOrLead: 'Dr. Parmanand Sharma & Himalayan Cryosphere Cell, Himansh Observatory, NCPOR',
    doi: '10.5281/ncpor.him.2024.038',
    fileSize: '148.5 MB',
    format: 'GeoTIFF / NetCDF / Shapefile',
    downloads: 2840,
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    tags: ['Himalayas', 'Ice Thickness', 'GPR Sounding', 'Chhota Shigri', 'Himansh', 'Cryosphere Bedrock'],
    summary: 'Deep ice-penetrating radar survey (16 MHz and 40 MHz rough terrain antennas) mapping sub-ice bedrock topography, internal reflecting horizons, and total ice volume estimates across the Chandra Basin.',
    fullAbstract: 'Conducted over high-altitude Himalayan glaciers in Himachal Pradesh using dual-frequency ground penetrating radar (GPR) coupled with multi-band differential GNSS, this dataset delivers sub-meter resolution 2D and 3D subsurface models of ice thickness ranging from 25 m in ablation tongues to over 160 m in accumulation basins. The package includes raw radar reflection profiles, migrated radargrams, digital bedrock elevation models (DEMs), and GIS shapefiles indispensable for calculating remaining ice reserves in the Western Himalayas.',
    station: 'Himansh Station (Chandra Basin)',
    aiDissemination: {
      twitterThread: [
        '🏔️ Peering beneath 160 meters of solid Himalayan ice! NCPOR’s Himansh Station glaciologists have published deep GPR ice thickness radar maps of the Chandra Basin! 🧵👇 #Himalayas #Glaciers #GPR',
        '2/4 Walking across crevassed glacier surfaces at 5,000m with 16 MHz deep radar antennas, Indian scientists mapped the hidden rocky bedrock underneath Chhota Shigri and Sutri Dhaka.',
        '3/4 The radar profiles reveal deep sub-glacial troughs holding over 1.8 cubic kilometers of freshwater ice critical for northern Indian river basins.',
        '4/4 Download raw radargrams, GeoTIFF elevation grids, and GIS layers here: https://ncpor.res.in/datasets/ds-06 🇮🇳 @moesgoi'
      ],
      instagramPost: {
        caption: 'Radar-scanning the interior of Himalayan glaciers! 🏔️📡 At 5,000 meters altitude in Spiti Valley, our glaciologists use Ground Penetrating Radar to measure remaining ice reserves.',
        slides: [
          'Slide 1: [Scientist dragging radar sled across glacier] Looking 160m Deep into Himalayan Ice',
          'Slide 2: [Radargram cross-section] What the ice-bedrock boundary looks like on radar',
          'Slide 3: [3D bedrock topography map] The hidden canyons buried beneath Chhota Shigri',
          'Slide 4: [Water reservoir calculation] How much drinking water remains locked in these peaks',
          'Slide 5: [Open GIS files] Free GeoTIFF & NetCDF models for researchers'
        ],
        hashtags: ['#Himalayas', '#GlacierResearch', '#Himansh', '#GPR', '#ThirdPole', '#WaterSecurity', '#NCPOR']
      },
      linkedInPost: 'Cryosphere Geophysics Release: NCPOR has published the "Multi-Frequency GPR Ice Thickness Sounding & Bedrock Elevation Grid" covering key benchmark glaciers in the Chandra Basin, Western Himalayas.\n\nAcquired via Himansh Station, this dataset provides foundational volumetric baselines for glacio-hydrological discharge and GLOF hazard assessment across North India.',
      pressRelease: {
        headline: 'NCPOR Maps Deep Bedrock Topography and Ice Thickness of Western Himalayan Glaciers',
        dateline: 'HIMANSH OBSERVATORY (SPITI) / NEW DELHI — MAR 29, 2024',
        body: 'The National Centre for Polar and Ocean Research (NCPOR) has released a high-density ground-penetrating radar dataset detailing the ice thickness and sub-glacial bedrock structure of Himalayan benchmark glaciers.\n\nThe findings, derived from multi-season field surveys in the Chandra Basin of Himachal Pradesh, provide the most accurate ice volume estimates yet available for glacio-hydrological forecasting.',
        quote: '"Accurate ice thickness data is the single most critical parameter required to predict the future water availability of the Indus and Ganga river systems." — Lead Glaciologist, NCPOR',
        notesToEditors: 'Himansh Observatory is situated at 4,080 meters in the Spiti Valley, serving as the nerve center for India\'s Himalayan cryospheric research.'
      },
      hindiTranslation: {
        headline: 'हिमालयी ग्लेशियरों की बर्फ मोटाई एवं बेडरॉक का जीपीआर रडार डेटासेट जारी',
        summary: 'एनसीपीओआर के हिमांश स्टेशन के वैज्ञानिकों ने छोटा शिगरी एवं सुतरी ढाका ग्लेशियरों की 160 मीटर तक की बर्फ मोटाई और नीचे की चट्टानों का 3D रडार सर्वे डेटासेट जारी किया।',
        socialSnippet: '🏔️ 160 मीटर बर्फ के नीचे क्या है? हिमांश स्टेशन के वैज्ञानिकों ने जारी किया हिमालयी ग्लेशियरों का अनोखा 3D रडार डेटासेट। #Glaciers #Himansh'
      }
    }
  },
  {
    id: 'ds-07',
    title: 'Marine Sediment Core Diatom Assemblages & Biogenic Silica Paleoclimatic Records (Prydz Bay Continental Shelf)',
    type: 'Dataset',
    region: 'Antarctica',
    year: 2023,
    date: '2023-12-08',
    authorsOrLead: 'Dr. Rahul Mohan & Polar Marine Micropaleontology Lab, NCPOR',
    doi: '10.5281/ncpor.ant.2023.118',
    fileSize: '34.7 MB',
    format: 'CSV / XLSX / NetCDF',
    downloads: 1720,
    thumbnailUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Prydz Bay', 'Diatoms', 'Micropaleontology', 'Biogenic Silica', 'Paleo-Ecology', 'Antarctica'],
    summary: 'High-resolution downcore diatom microfossil census counts, absolute abundance, and biogenic opal percentages from gravity cores GC-04/18 recovered in the Prydz Bay shelf channel, documenting Holocene sea-ice retreat phases.',
    fullAbstract: 'Recovered from a water depth of 780 m in Prydz Bay, East Antarctica during the 38th ISEA, gravity core GC-04/18 provides a continuous 3.8-meter post-glacial sediment record. This micropaleontological archive catalogs absolute diatom abundances (valves per gram dry sediment), percentage ratios of sea-ice associated taxa (Fragilariopsis curta, Fragilariopsis cylindrus) versus open-water species (Chaetoceros resting spores, Thalassiosira antarctica), and wet chemical alkaline digestion biogenic silica (BSi) wt% profiles dated via AMS radiocarbon on foraminiferal assemblages.',
    station: 'Bharati Station & Prydz Bay Offshore',
    aiDissemination: {
      twitterThread: [
        '🔬 Ancient micro-fossils from the Antarctic seabed! NCPOR’s micropaleontology laboratory has published a 12,000-year diatom dataset from Prydz Bay! 🧵👇 #Micropaleontology #Antarctica #Diatoms #NCPOR',
        '2/4 By examining microscopic glass shells of diatoms preserved in deep sea mud near Bharati Station, scientists reconstructed prehistoric sea-ice retreat since the Last Ice Age.',
        '3/4 The sea-ice biomarker Fragilariopsis curta demonstrates that coastal East Antarctica experienced prolonged open-water summers 6,000 years ago during the mid-Holocene hypsithermal.',
        '4/4 Full microfossil taxonomic census and biogenic opal tables are open access on HimVigyan: https://ncpor.res.in/datasets/ds-07 🌊 @moesgoi'
      ],
      instagramPost: {
        caption: 'Microscopic Glass Jewels of the Antarctic Sea! 🔬✨ How microscopic single-celled algae buried under the ocean floor tell us when Antarctic ice melted 10,000 years ago.',
        slides: [
          'Slide 1: [Scanning electron microscope image of ornate diatom shell] 12,000 Years in Mud: Diatom Chronicles',
          'Slide 2: [Gravity corer hauling mud core onto deck] Extracting ocean sediment cores in Prydz Bay',
          'Slide 3: [Microscope slide counting] Identifying 40+ species of Antarctic diatoms',
          'Slide 4: [Sea ice vs open water indicator graph] Reconstructing ancient polar climates',
          'Slide 5: [Open dataset link] Download the complete paleontological census dataset'
        ],
        hashtags: ['#Micropaleontology', '#Diatoms', '#Antarctica', '#PrydzBay', '#Paleoclimate', '#NCPOR', '#MoES']
      },
      linkedInPost: 'Paleo-Oceanography Data Release: NCPOR has published the "Marine Sediment Core Diatom Assemblages & Biogenic Silica Paleoclimatic Records (Prydz Bay Continental Shelf)".\n\nDerived from high-latitude gravity core GC-04/18 off East Antarctica, this high-resolution micropaleontological census documents Holocene sea-ice variability and coastal upwelling dynamics.',
      pressRelease: {
        headline: 'NCPOR Micropaleontologists Publish Holocene Antarctic Sea-Ice History from Sediment Diatoms',
        dateline: 'GOA / NEW DELHI — DEC 8, 2023',
        body: 'Scientists at the National Centre for Polar and Ocean Research (NCPOR), Goa, have published an open-access micropaleontological and biogeochemical dataset derived from deep marine sediment cores in Prydz Bay, East Antarctica.\n\nThe research provides an unbroken 12,000-year record of changes in Southern Ocean sea-ice cover and biological productivity through microscopic diatom analysis.',
        quote: '"These marine sediment records allow us to validate predictive climate models against actual historical transitions from glacial to warm interglacial epochs." — Scientist-in-Charge, Micropaleontology Lab',
        notesToEditors: 'NCPOR maintains an active Antarctic Marine Sediment Core Repository storing thousands of meters of seabed cores collected during Indian scientific expeditions.'
      },
      hindiTranslation: {
        headline: 'अंटार्कटिका के समुद्र तल से 12,000 साल पुराना डायटम माइक्रोफॉसिल डेटासेट जारी',
        summary: 'एनसीपीओआर के वैज्ञानिकों ने प्राइड्ज बे (अंटार्कटिका) के समुद्र तल से निकाले गए तलछट कोर में मिले सूक्ष्म शैवाल (डायटम) का ऐतिहासिक जलवायु डेटासेट प्रकाशित किया है।',
        socialSnippet: '🔬 समुद्र तल में दबे प्राचीन रहस्यों का खुलासा! अंटार्कटिका से 12,000 साल पुराना समुद्री डायटम और जलवायु डेटासेट अब ओपन साइंस पर उपलब्ध। #Microfossils #Antarctica'
      }
    }
  },
  {
    id: 'ds-08',
    title: 'Gaseous Elemental Mercury (GEM) & Atmospheric Greenhouse Gas Flux Time-Series (Ny-Ålesund, Arctic 79°N)',
    type: 'Dataset',
    region: 'Arctic',
    year: 2024,
    date: '2024-02-14',
    authorsOrLead: 'Dr. Archana Dayal & Polar Atmospheric Chemistry Team, Himadri Station, NCPOR',
    doi: '10.5281/ncpor.arc.2024.088',
    fileSize: '52.3 MB',
    format: 'CSV / NetCDF',
    downloads: 2210,
    thumbnailUrl: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1200&q=80',
    tags: ['Arctic', 'Himadri', 'Mercury Depletion', 'Greenhouse Gases', 'Ny-Alesund', 'Atmospheric Chemistry'],
    summary: 'Tekran continuous automated gaseous elemental mercury (GEM) and Picarro cavity ring-down spectrometer measurements of CO2, CH4, and CO atmospheric concentrations during Spring atmospheric mercury depletion events (AMDEs).',
    fullAbstract: 'Recorded continuously at India\'s Arctic Research Station Himadri in Ny-Ålesund, Svalbard (78°55\'N, 11°56\'E), this high-frequency dataset monitors the rapid photochemical oxidation of gaseous elemental mercury into toxic bioavailable reactive forms during polar sunrise. Coupled with cavity ring-down spectrometry (CRDS) measurements of carbon dioxide (CO2), methane (CH4), carbon monoxide (CO), and boundary-layer ozone (O3), this dataset captures Arctic amplification impacts and permafrost gas emissions under pristine ambient conditions.',
    station: 'Himadri Station (Ny-Ålesund)',
    aiDissemination: {
      twitterThread: [
        '🧪 Toxic Mercury Fallout at the North Pole? Indian atmospheric chemists at Himadri Station have published the 2024 Arctic Mercury Depletion & GHG Dataset! 🧵👇 #Arctic #Himadri #Mercury #AtmosphericScience',
        '2/4 Every polar spring when sunlight returns to Svalbard, photochemical reactions cause atmospheric mercury levels to plunge from 1.5 ng/m³ to near zero within hours.',
        '3/4 Where does the mercury go? It deposits onto coastal snow and enters the marine food web, affecting Arctic wildlife and indigenous communities.',
        '4/4 Continuous Tekran and Picarro greenhouse gas flux records are now open on HimVigyan: https://ncpor.res.in/datasets/ds-08 🌐 @moesgoi'
      ],
      instagramPost: {
        caption: 'The Mystery of Polar Sunrise Mercury Fallout! 🧪❄️ Inside India\'s Himadri Station at 79° North, tracking how sunlight triggers rapid chemical reactions in Arctic air.',
        slides: [
          'Slide 1: [Himadri station with snow and Arctic fjord] Chemistry at the Top of the World',
          'Slide 2: [Tekran mercury analyzer in clean room] Detecting 1 particle of mercury per trillion',
          'Slide 3: [Atmospheric Mercury Depletion Event curve] The sudden crash of airborne mercury at sunrise',
          'Slide 4: [Picarro cavity ringdown analyzer] Tracking methane and CO2 bubbling from thawing tundra',
          'Slide 5: [Open data portal banner] Explore the complete Arctic chemistry dataset on HimVigyan'
        ],
        hashtags: ['#Arctic', '#Himadri', '#EnvironmentalChemistry', '#MercuryPollution', '#GreenhouseGases', '#NCPOR', '#MoES']
      },
      linkedInPost: 'Arctic Atmospheric Chemistry: NCPOR has released the open dataset "Gaseous Elemental Mercury & Atmospheric Greenhouse Gas Flux Time-Series" collected at Himadri Station, Ny-Ålesund (79°N).\n\nThe records document spring Atmospheric Mercury Depletion Events (AMDEs) and continuous background trace gas mixing ratios, supporting the Minamata Convention on Mercury and UNEP Arctic assessment programs.',
      pressRelease: {
        headline: 'NCPOR Publishes Arctic Trace Gas and Atmospheric Mercury Depletion Dataset from Himadri Base',
        dateline: 'NY-ÅLESUND (ARCTIC) / GOA — FEB 14, 2024',
        body: 'The National Centre for Polar and Ocean Research (NCPOR) has released a high-resolution atmospheric chemistry dataset monitoring gaseous elemental mercury and greenhouse gases at India\'s Himadri Station in the Svalbard archipelago.\n\nThe findings document dramatic mercury depletion events coinciding with polar sunrise, providing crucial baseline information on toxic heavy metal deposition across high-latitude Arctic ecosystems.',
        quote: '"Tracking the chemical fate of atmospheric pollutants in the Arctic is vital for understanding environmental risks to polar food chains." — Lead Atmospheric Scientist, Himadri Observatory',
        notesToEditors: 'Himadri Station was inaugurated in 2008 and is situated in the international Arctic research village of Ny-Ålesund, Norway.'
      },
      hindiTranslation: {
        headline: 'हिमाद्रि स्टेशन (आर्कटिक) से वायुमंडलीय मर्करी एवं ग्रीनहाउस गैस डेटासेट जारी',
        summary: 'उत्तरी ध्रुव के करीब 79°N पर स्थित भारत के हिमाद्रि स्टेशन से वैज्ञानिकों ने हवा में मौजूद पारा (मर्करी) एवं मीथेन-CO2 गैसों का विस्तृत लाइव डेटासेट जारी किया है।',
        socialSnippet: '🧪 उत्तरी ध्रुव पर पारे का रहस्य! हिमाद्रि स्टेशन के वैज्ञानिकों ने आर्कटिक में केमिकल रिएक्शन और गैसों का अहम डेटासेट जारी किया। #Himadri #Arctic'
      }
    }
  },
  {
    id: 'ds-09',
    title: 'Underway Sea Surface Partial Pressure of CO2 (pCO2) & Marine Carbonate System Dynamics (10th SOE Cruise)',
    type: 'Dataset',
    region: 'Southern Ocean',
    year: 2024,
    date: '2024-01-20',
    authorsOrLead: 'Chemical Oceanography Division, NCPOR & MoES Research Fleet',
    doi: '10.5281/ncpor.soe.2024.055',
    fileSize: '41.9 MB',
    format: 'NetCDF / CSV',
    downloads: 1890,
    thumbnailUrl: '/about/polar-ship-exact.jpg',
    tags: ['Southern Ocean', 'pCO2', 'Ocean Acidification', 'Underway Sensor', 'Marine Carbonate', 'Agulhas II'],
    summary: 'Underway continuous equilibrator-NDIR sensor records of seawater fCO2, SST, sea surface salinity (SSS), and calculated surface pH and aragonite saturation state (Omega-Ar) across 35°S to 68°S.',
    fullAbstract: 'Recorded continuously every 2 minutes along a 10,000-km transit from Cape Town to Bharati Station and back, this underway oceanographic dataset maps the air-sea carbon dioxide flux gradient across the Subtropical, Sub-Antarctic, and Polar Fronts. Utilizing an automated General Oceanics 8050 underway pCO2 system calibrated against WMO-traceable gas standards, this archive details regional ocean acidification trends and identifies strong biological CO2 sink regions in the seasonal sea-ice marginal zone.',
    station: 'Polar Research Vessel (Transect Cape Town - Bharati)',
    aiDissemination: {
      twitterThread: [
        '🌊 Ocean Acidification on the Frontline: NCPOR oceanographers have mapped sea-surface CO2 absorption along a 10,000 km voyage to Antarctica! 🧵👇 #OceanAcidification #SouthernOcean #CarbonBudget',
        '2/4 Using continuous automated underway equilibrator sensors on the research ship, scientists sampled surface seawater every 2 minutes across 35°S to 68°S.',
        '3/4 The data reveals sharp drops in aragonite saturation state south of 60°S, signaling impending challenges for shell-forming polar pteropods and zooplankton.',
        '4/4 Open Data for marine biogeochemists: Download the complete underway pCO2 dataset on HimVigyan: https://ncpor.res.in/datasets/ds-09 🚢 @moesgoi'
      ],
      instagramPost: {
        caption: '10,000 Kilometers of Continuous Ocean Sensing! 🚢🌊 How Indian marine scientists measured ocean acidification from South Africa all the way to the coast of Antarctica.',
        slides: [
          'Slide 1: [Research vessel cutting through polar swell] Voyage of the Carbon Sniffer',
          'Slide 2: [General Oceanics underway pCO2 system in ship engine room] Sampling water every 2 minutes',
          'Slide 3: [Sea surface pCO2 map along ship track] Where the ocean soaks up the most greenhouse gas',
          'Slide 4: [Pteropod microscopic sea butterfly shell] Why ocean acidification threatens polar marine life',
          'Slide 5: [Open data portal preview] Access full calibrated cruise datasets on HimVigyan'
        ],
        hashtags: ['#SouthernOcean', '#OceanAcidification', '#pCO2', '#CarbonCycle', '#MarineScience', '#NCPOR', '#MoES']
      },
      linkedInPost: 'Chemical Oceanography Dataset: NCPOR has published the "Underway Sea Surface Partial Pressure of CO2 (pCO2) & Marine Carbonate System Dynamics" collected during the 10th Southern Ocean Expedition.\n\nProviding continuous underway air-sea CO2 exchange profiles along 57°E, this dataset is an invaluable contribution to the Global Ocean Acidification Observing Network (GOA-ON).',
      pressRelease: {
        headline: 'NCPOR Publishes Comprehensive Sea Surface Carbon Dioxide and Acidification Dataset',
        dateline: 'GOA — JAN 20, 2024',
        body: 'The National Centre for Polar and Ocean Research (NCPOR), Goa, has released a high-resolution underway sea surface carbon dioxide dataset collected across the Indian sector of the Southern Ocean.\n\nThe dataset, logging continuous seawater partial pressure of CO2 (pCO2) over a 10,000-kilometer cruise track, maps how changing polar temperatures influence the Southern Ocean\'s capacity to sequester atmospheric carbon.',
        quote: '"Tracking the marine carbonate system from temperate latitudes to polar pack ice gives us a direct pulse of ocean health." — Group Director, Ocean Sciences, NCPOR',
        notesToEditors: 'The Southern Ocean Expedition program is an annual scientific initiative funded by the Ministry of Earth Sciences.'
      },
      hindiTranslation: {
        headline: 'दक्षिणी महासागर में समुद्री अम्लीकरण एवं कार्बन डाईऑक्साइड का 10,000 किमी डेटासेट जारी',
        summary: 'एनसीपीओआर के वैज्ञानिकों ने केपटाउन से भारती स्टेशन तक 10,000 किमी की समुद्री यात्रा में हर 2 मिनट पर मापे गए कार्बन डाइऑक्साइड एवं समुद्री अम्लीकरण (Ocean Acidification) का ओपन डेटासेट जारी किया।',
        socialSnippet: '🚢 10,000 किमी की तूफानी यात्रा का महासागरीय डेटा! भारतीय वैज्ञानिकों ने दक्षिणी महासागर में कार्बन सोखने और अम्लीकरण का नया डेटासेट जारी किया। #OceanScience'
      }
    }
  },
  {
    id: 'ds-10',
    title: 'Broadband Teleseismic Earthquake Waveform Archive & Mantle Anisotropy Data (Maitri Base, Antarctica)',
    type: 'Dataset',
    region: 'Antarctica',
    year: 2024,
    date: '2024-06-02',
    authorsOrLead: 'Geophysics & Solid Earth Division, NCPOR & CSIR-NGRI Collaboration',
    doi: '10.5281/ncpor.ant.2024.062',
    fileSize: '185.0 MB',
    format: 'SEED / miniSEED / SAC',
    downloads: 1540,
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Seismology', 'Maitri Station', 'Schirmacher Oasis', 'Solid Earth', 'Teleseismic', 'miniSEED'],
    summary: 'Continuous 3-component STS-2 high-gain broadband seismometer recordings sampling at 20 sps and 100 sps at Maitri permanent station, mapping intraplate Antarctic earthquakes and shear-wave splitting.',
    fullAbstract: 'Operating permanently on stable charnockite bedrock in the Schirmacher Oasis at Maitri Station (70°45\'57" S, 11°44\'09" E), this seismological station (network code: MAIT) captures global teleseismic arrivals, lithospheric shear-wave splitting, and regional intraplate micro-seismicity across Dronning Maud Land. The archive contains raw and instrument-corrected miniSEED volumes recorded on a Quanterra Q330 data acquisition system with GPS time-synchronization, providing invaluable illumination of East Antarctic cratonic roots and mantle convection.',
    station: 'Maitri Permanent Seismological Observatory',
    aiDissemination: {
      twitterThread: [
        '🌍 Earthquakes recorded at the South Pole! NCPOR & CSIR-NGRI have released broadband seismological earthquake waveforms from Maitri Station, Antarctica! 🧵👇 #Seismology #Antarctica #Earthquakes #Maitri',
        '2/4 Anchored directly onto ancient charnockite bedrock in the Schirmacher Oasis, Maitri\'s ultra-sensitive STS-2 seismometers detect tremors from every continent on Earth.',
        '3/4 The data reveals shear-wave splitting in the upper mantle beneath Antarctica, unlocking the deep tectonic breakup of the ancient Gondwana supercontinent.',
        '4/4 Full standard miniSEED seismic files are open for global geophysicists on HimVigyan: https://ncpor.res.in/datasets/ds-10 🇮🇳 @moesgoi'
      ],
      instagramPost: {
        caption: 'Listening to the Heartbeat of the Earth from Antarctica! 🌍⚡ Deep inside a temperature-controlled seismic vault at Maitri Station, tracking earthquakes worldwide.',
        slides: [
          'Slide 1: [Seismic vault bunker on rock outcrop at Maitri] The Deep Earth Ear of Schirmacher Oasis',
          'Slide 2: [STS-2 broadband seismometer inside glass dome] Sensitive enough to detect a glacier crack 500 km away',
          'Slide 3: [Real-time seismogram waveform spike] How an earthquake in Japan or Indonesia registers in Antarctica',
          'Slide 4: [Gondwana supercontinent reconstruction] Mapping ancient Indian and Antarctic tectonic links',
          'Slide 5: [Open seismic data banner] Download standard miniSEED volumes free on HimVigyan'
        ],
        hashtags: ['#Seismology', '#Antarctica', '#MaitriStation', '#Earthquakes', '#Geophysics', '#NCPOR', '#NGRI', '#MoES']
      },
      linkedInPost: 'Solid Earth Geophysics Release: The National Centre for Polar and Ocean Research (NCPOR), in partnership with CSIR-National Geophysical Research Institute (NGRI), has published the "Broadband Teleseismic Earthquake Waveform Archive" from Maitri Station, Antarctica.\n\nProviding continuous 3-component seismic data (miniSEED) for the global FDSN network, this archive enables deep structural imaging of the East Antarctic craton and lithospheric anisotropy.',
      pressRelease: {
        headline: 'NCPOR and CSIR-NGRI Publish Antarctic Broadband Seismological Waveform Archive',
        dateline: 'HYDERABAD / GOA — JUNE 2, 2024',
        body: 'A joint initiative between NCPOR and the CSIR-National Geophysical Research Institute (CSIR-NGRI) has yielded an open-access teleseismic waveform dataset from India\'s permanent seismological observatory at Maitri Station, Antarctica.\n\nThe high-gain broadband facility, operational on solid rock in the Schirmacher Oasis, provides continuous observation of global and regional earthquakes, helping geophysicists model the mantle structure beneath the Antarctic ice sheet.',
        quote: '"Maitri provides an exceptionally quiet, bedrock-coupled listening post in the Southern Hemisphere, indispensable for global earthquake tomography." — Chief Scientist, Solid Earth Group, NCPOR',
        notesToEditors: 'The Maitri seismic observatory has operated continuously since 1997 and contributes data to international seismological consortia (IRIS and FDSN).'
      },
      hindiTranslation: {
        headline: 'मैत्री स्टेशन अंटार्कटिका से भूकंपीय तरंगों (Seismic Waveforms) का ओपन डेटासेट जारी',
        summary: 'अंटार्कटिका के मैत्री स्टेशन पर स्थापित अत्याधुनिक ब्रॉडबैंड भूकंप वेधशाला से जुटाया गया वैश्विक एवं स्थानीय भूकंपों का 1-वर्षीय मिनीसीड (miniSEED) डेटासेट वैज्ञानिकों के लिए जारी किया गया।',
        socialSnippet: '🌍 अंटार्कटिका की चट्टानों से सुनी गई पृथ्वी के दिल की धड़कन! मैत्री स्टेशन से वैश्विक भूकंपीय तरंगों का नया ओपन डेटासेट जारी। #Maitri #Seismology'
      }
    }
  }
];

export const POLAR_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What was the name of India's very first permanent scientific research station in Antarctica?",
    options: ["Maitri", "Bharati", "Dakshin Gangotri", "Himadri"],
    correctIndex: 2,
    explanation: "Dakshin Gangotri was established in 1983 during the 3rd Indian Antarctic Expedition. It served as India's first permanent base before being buried under snow and replaced by Maitri in 1989.",
    funFact: "Dakshin Gangotri was constructed in just 60 days by an 81-member team that included the Indian Army and scientists!"
  },
  {
    id: 2,
    question: "Where is India's dedicated Arctic research station 'Himadri' located?",
    options: ["Greenland", "Svalbard, Norway", "Alaska, USA", "Siberia, Russia"],
    correctIndex: 1,
    explanation: "Himadri is situated at Ny-Ålesund in the Svalbard archipelago of Norway, located just 1,200 km from the geographic North Pole.",
    funFact: "Ny-Ålesund is the northernmost permanently inhabited civilian settlement on Earth!"
  },
  {
    id: 3,
    question: "Which Indian high-altitude research station is located in the Himalayas at over 4,000 meters elevation?",
    options: ["Himansh", "Siachen Base", "Rohtang Observatory", "IndARC"],
    correctIndex: 0,
    explanation: "Himansh is NCPOR's dedicated high-altitude station located in the Chandra Basin of Spiti Valley, Himachal Pradesh, established in 2016.",
    funFact: "The Himalayas are often called Earth's 'Third Pole' because they contain the largest amount of snow and ice outside the Polar regions."
  },
  {
    id: 4,
    question: "Why was Bharati Station in Antarctica built elevated on stilts?",
    options: [
      "To prevent polar bears from entering",
      "To avoid snow drift accumulation and preserve thermal energy",
      "To look like a spaceship",
      "To catch satellite signals better"
    ],
    correctIndex: 1,
    explanation: "Bharati is elevated on stilts to allow fierce katabatic blizzards to blow underneath without creating snow banks that could bury the building. (Also, polar bears only live in the Arctic, not Antarctica!)",
    funFact: "Bharati was assembled using 134 modular prefabricated sea containers and is wrapped in an aerodynamic insulated envelope."
  },
  {
    id: 5,
    question: "What is the primary international treaty that designates Antarctica exclusively for peaceful and scientific purposes?",
    options: [
      "Kyoto Protocol",
      "The Antarctic Treaty of 1959",
      "Paris Climate Agreement",
      "Law of the Sea"
    ],
    correctIndex: 1,
    explanation: "The Antarctic Treaty was signed in 1959. India joined as a consultative member in 1983, committing to peaceful scientific research and prohibition of military activity and mineral mining.",
    funFact: "India passed the historic Indian Antarctic Act in 2022 to implement environmental regulations under Indian law."
  }
];

export const POLAR_BOT_KNOWLEDGE = [
  {
    keywords: ['bharati', 'bharati station', 'third station'],
    answer: "Bharati Station is India's third Antarctic research base, operational since 2012 in the Larsemann Hills, East Antarctica (69°24'S, 76°11'E). Built on stilts from 134 prefabricated shipping containers, it hosts 47 scientists in summer and 24 in winter, specializing in satellite ground telemetry, oceanography, and atmospheric studies."
  },
  {
    keywords: ['maitri', 'second station', 'priyadarshini'],
    answer: "Maitri is India's second Antarctic station, built in 1989 in the Schirmacher Oasis. Situated on a rocky ice-free oasis next to Lake Priyadarshini, it has provided continuous meteorological, ozone, and geomagnetic data for over 35 years."
  },
  {
    keywords: ['himadri', 'arctic', 'north pole', 'svalbard'],
    answer: "Himadri is India's Arctic research station inaugurated on July 1, 2008. It is located at Ny-Ålesund, Svalbard, Norway (78°55'N). Scientists at Himadri study how Arctic warming directly affects the Indian Summer Monsoon, polar microbiology, and atmospheric black carbon."
  },
  {
    keywords: ['himansh', 'himalayas', 'spiti', 'third pole'],
    answer: "Himansh Station, established in 2016 in the Spiti Valley of Himachal Pradesh (4,080 meters elevation), monitors the Himalayan cryosphere. It tracks glacier melt and mass balance in the Chandra Basin to assess freshwater security for Northern India."
  },
  {
    keywords: ['join', 'scientist', 'expedition', 'eligibility', 'career'],
    answer: "Indian scientists, researchers, and PhD scholars can apply to join the Indian Scientific Expeditions to Antarctica or the Arctic through NCPOR's annual Call for Research Proposals (usually advertised on ncpor.res.in). Candidates must pass rigorous medical and acclimatization training conducted at ITBP Auli and AIIMS."
  },
  {
    keywords: ['ncpor', 'moes', 'ministry', 'about'],
    answer: "NCPOR (National Centre for Polar and Ocean Research) is an autonomous R&D institution under the Ministry of Earth Sciences (MoES), Government of India, headquartered in Vasco da Gama, Goa. It leads and coordinates all Indian polar expeditions to Antarctica, the Arctic, the Southern Ocean, and the Himalayas."
  }
];
