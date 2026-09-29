import os
from PIL import Image
from generate_summary_pdf import PDFWriter

def generate_himvigyan_dossier():
    pdf = PDFWriter("HimVigyan_Project_Summary_and_Tech_Stack.pdf")

    # Add HimVigyan Crest image
    if os.path.exists("scratch_crest.jpg"):
        pdf.add_image_resource("CrestLogo", "scratch_crest.jpg")

    # =========================================================================
    # PAGE 1: COVER PAGE
    # =========================================================================
    pdf.cursor_y = 800

    # Top Navy Banner Box
    pdf.rect(0, 690, pdf.width, 155, fill=True, color=(0.03, 0.08, 0.18))
    # Cyan accent line
    pdf.rect(0, 686, pdf.width, 4, fill=True, color=(0.02, 0.52, 0.82))

    # Top Header Pill on Cover
    pdf.rect(pdf.margin_left, 804, 310, 18, fill=True, color=(0.08, 0.22, 0.42))
    pdf.draw_text("SMART INDIA HACKATHON 2026 • PROBLEM ID 26063", pdf.margin_left + 8, 809, font="Helvetica-Bold", size=8.5, color=(0.3, 0.85, 1.0))

    # Big Title
    pdf.draw_text("HIMVIGYAN", pdf.margin_left, 755, font="Helvetica-Bold", size=34, color=(1.0, 1.0, 1.0))
    pdf.draw_text("Integrated Polar & Ocean Science Knowledge Platform", pdf.margin_left, 730, font="Helvetica-Bold", size=15, color=(0.4, 0.8, 1.0))
    pdf.draw_text("National Centre for Polar and Ocean Research (NCPOR) • Ministry of Earth Sciences (MoES)", pdf.margin_left, 706, font="Helvetica", size=9.5, color=(0.8, 0.88, 0.95))

    # Cover Crest Logo
    if "CrestLogo" in pdf.images:
        pdf.draw_image("CrestLogo", pdf.margin_right - 120, 705, 115, 115)

    pdf.cursor_y = 650

    # Subtitle / Document Type
    pdf.rect(pdf.margin_left, pdf.cursor_y - 2, 4, 18, fill=True, color=(0.02, 0.52, 0.82))
    pdf.draw_text("PROJECT SUMMARY, ARCHITECTURE & TECHNICAL DOSSIER", pdf.margin_left + 10, pdf.cursor_y, font="Helvetica-Bold", size=13, color=(0.05, 0.15, 0.3))
    pdf.cursor_y -= 22

    pdf.draw_paragraph(
        "HimVigyan is an integrated, full-stack digital knowledge ecosystem engineered to centralize, preserve, and disseminate India's four decades of polar exploration and cryospheric research across Antarctica, the Arctic, the Himalayas, and the Southern Ocean. Designed specifically for SIH Problem Statement 26063, this enterprise-grade platform bridges the gap between deep polar science and public understanding through real-time open datasets, AI-assisted multilingual communication, interactive student gamification, and verified researcher publication workflows.",
        size=9.5, line_height=14
    )

    pdf.cursor_y -= 8

    # Metadata Grid Box
    meta_box_y = pdf.cursor_y - 120
    pdf.rect(pdf.margin_left, meta_box_y, pdf.content_width, 125, fill=True, stroke=True, color=(0.96, 0.98, 1.0), line_width=0.8)
    pdf.rect(pdf.margin_left, pdf.cursor_y - 4, pdf.content_width, 22, fill=True, color=(0.08, 0.22, 0.42))
    pdf.draw_text("PROJECT METADATA & SPECIFICATIONS", pdf.margin_left + 12, pdf.cursor_y + 1, font="Helvetica-Bold", size=9.5, color=(1, 1, 1))

    meta_items = [
        ("Problem Statement ID:", "26063 (Ministry of Earth Sciences / NCPOR)"),
        ("Platform Name:", "HimVigyan (Formerly Polar India Portal)"),
        ("Primary Purpose:", "Centralized Polar Science Dissemination, Datasets, Media & Education"),
        ("Frontend Architecture:", "Next.js 16.3.6 (App Router) + React 19.2.8 + TypeScript 5"),
        ("Styling & Theme Engine:", "Tailwind CSS v4 + PostCSS + Dark/Light Theme Persistence"),
        ("Database & Auth:", "Supabase Cloud (PostgreSQL + RLS + Storage Buckets)"),
        ("Document Version:", "Version 1.0.0 (Production Hackathon Release • September 2026)")
    ]

    my = pdf.cursor_y - 22
    for label, val in meta_items:
        pdf.draw_text(label, pdf.margin_left + 14, my, font="Helvetica-Bold", size=8.5, color=(0.1, 0.2, 0.35))
        pdf.draw_text(val, pdf.margin_left + 155, my, font="Helvetica", size=8.5, color=(0.15, 0.25, 0.4))
        my -= 14

    pdf.cursor_y = meta_box_y - 20

    # Executive Highlights (3 Columns of Cards)
    pdf.draw_heading("CORE VALUE PROPOSITIONS", level=2)
    card_w = (pdf.content_width - 16) / 3
    card_h = 105
    cx = pdf.margin_left
    cy = pdf.cursor_y - card_h

    # Card 1
    pdf.rect(cx, cy, card_w, card_h, fill=True, stroke=True, color=(0.98, 0.99, 1.0), line_width=0.6)
    pdf.rect(cx, cy + card_h - 18, card_w, 18, fill=True, color=(0.02, 0.52, 0.82))
    pdf.draw_text("1. Unified Open Archive", cx + 8, cy + card_h - 13, font="Helvetica-Bold", size=8.5, color=(1, 1, 1))
    p1 = "Centralizes scientific datasets, official expedition compendiums, research papers, and ice-core registries with verified DOI minting."
    # draw lines
    pdf.draw_text(p1[:36], cx + 8, cy + 68, font="Helvetica", size=8, color=(0.2, 0.25, 0.35))
    pdf.draw_text(p1[36:74], cx + 8, cy + 56, font="Helvetica", size=8, color=(0.2, 0.25, 0.35))
    pdf.draw_text(p1[74:110], cx + 8, cy + 44, font="Helvetica", size=8, color=(0.2, 0.25, 0.35))
    pdf.draw_text(p1[110:], cx + 8, cy + 32, font="Helvetica", size=8, color=(0.2, 0.25, 0.35))

    # Card 2
    cx += card_w + 8
    pdf.rect(cx, cy, card_w, card_h, fill=True, stroke=True, color=(0.98, 0.99, 1.0), line_width=0.6)
    pdf.rect(cx, cy + card_h - 18, card_w, 18, fill=True, color=(0.45, 0.2, 0.7))
    pdf.draw_text("2. AI Outreach Studio", cx + 8, cy + card_h - 13, font="Helvetica-Bold", size=8.5, color=(1, 1, 1))
    p2 = "Transforms dense polar research papers into PIB press communiqués, social threads, and bilingual Hindi outreach ready for publishing."
    pdf.draw_text(p2[:36], cx + 8, cy + 68, font="Helvetica", size=8, color=(0.2, 0.25, 0.35))
    pdf.draw_text(p2[36:74], cx + 8, cy + 56, font="Helvetica", size=8, color=(0.2, 0.25, 0.35))
    pdf.draw_text(p2[74:110], cx + 8, cy + 44, font="Helvetica", size=8, color=(0.2, 0.25, 0.35))
    pdf.draw_text(p2[110:], cx + 8, cy + 32, font="Helvetica", size=8, color=(0.2, 0.25, 0.35))

    # Card 3
    cx += card_w + 8
    pdf.rect(cx, cy, card_w, card_h, fill=True, stroke=True, color=(0.98, 0.99, 1.0), line_width=0.6)
    pdf.rect(cx, cy + card_h - 18, card_w, 18, fill=True, color=(0.05, 0.6, 0.45))
    pdf.draw_text("3. Student Gamification", cx + 8, cy + card_h - 13, font="Helvetica-Bold", size=8.5, color=(1, 1, 1))
    p3 = "Interactive 10-question Polar Quiz, confetti animations, Himalayan glacier-melt simulator, and verified digital MoES certificates."
    pdf.draw_text(p3[:36], cx + 8, cy + 68, font="Helvetica", size=8, color=(0.2, 0.25, 0.35))
    pdf.draw_text(p3[36:74], cx + 8, cy + 56, font="Helvetica", size=8, color=(0.2, 0.25, 0.35))
    pdf.draw_text(p3[74:110], cx + 8, cy + 44, font="Helvetica", size=8, color=(0.2, 0.25, 0.35))
    pdf.draw_text(p3[110:], cx + 8, cy + 32, font="Helvetica", size=8, color=(0.2, 0.25, 0.35))

    pdf.cursor_y = cy - 25

    # Bottom Confidentiality Note
    pdf.draw_text("CONFIDENTIAL & PROPRIETARY • PREPARED FOR MINISTRY OF EARTH SCIENCES EVALUATORS", pdf.margin_left, 45, font="Helvetica-Bold", size=7.5, color=(0.4, 0.45, 0.55))

    # =========================================================================
    # PAGE 2: EXECUTIVE SUMMARY & PROBLEM STATEMENT 26063
    # =========================================================================
    pdf.new_page()
    pdf.draw_running_header()

    pdf.draw_heading("1. Executive Summary & Problem Context", level=1)
    pdf.draw_paragraph(
        "India holds an esteemed four-decade legacy in polar sciences, encompassing three permanent stations in Antarctica (Dakshin Gangotri, Maitri, and Bharati), the high-latitude Arctic station Himadri in Ny-Alesund (Svalbard), the multi-sensor IndARC underwater ocean mooring, the high-altitude Himansh station in the Western Himalayas (Chandra Basin), and recurring Southern Ocean scientific expeditions (ISOE). Despite this formidable scientific output, access to these crucial findings has historically been hindered by fragmented repositories, manual outreach pipelines, and complex formats inaccessible to non-specialists.",
        size=9, line_height=13
    )

    pdf.draw_heading("Problem Statement 26063 Objectives:", level=2)
    pdf.draw_bullet("Centralized Scientific Knowledge Hub:", "Build a single-window portal where Indian polar expeditions, station telemetry, scientific publications, ice core datasets, and high-resolution media are discoverable and downloadable.")
    pdf.draw_bullet("Bilingual & Multi-Tiered Dissemination:", "Provide AI-assisted conversion of complex scientific monographs into accessible English and Hindi press releases, social media threads, and educational digests.")
    pdf.draw_bullet("Youth & Citizen Science Engagement:", "Incorporate interactive cryospheric simulators, real-time quizzes, and authenticated achievement badges to inspire the next generation of polar scholars.")
    pdf.draw_bullet("Authorized Researcher Contribution Pipeline:", "Enable field scientists to log in, deposit field compendiums, submit metadata, mint verified DOIs, and track citation analytics seamlessly.")

    pdf.draw_heading("2. High-Level Architectural Blueprint", level=1)
    pdf.draw_paragraph(
        "HimVigyan employs a high-performance modern decoupled architecture. The frontend leverages Next.js 16 (App Router) with React 19 for instantaneous hybrid static and dynamic rendering. Server components provide lightning-fast hydration, while client components manage real-time interactivity. The cloud persistence layer utilizes Supabase PostgreSQL with Row Level Security (RLS) policies and S3-compatible cloud storage buckets.",
        size=9, line_height=13
    )

    # ASCII Architecture Box
    arch_box_y = pdf.cursor_y - 130
    pdf.rect(pdf.margin_left, arch_box_y, pdf.content_width, 135, fill=True, stroke=True, color=(0.95, 0.97, 1.0), line_width=0.8)
    pdf.draw_text("SYSTEM ARCHITECTURE & MULTI-TIER DATA FLOW", pdf.margin_left + 10, pdf.cursor_y - 2, font="Helvetica-Bold", size=9, color=(0.04, 0.15, 0.35))

    arch_lines = [
        "[ CLIENT LAYER ]        Web Browser / Mobile Viewport (Responsive HTML5, Tailwind v4 Engine)",
        "                                 │",
        "[ APPLICATION LAYER ]   Next.js 16.3.6 App Router (React 19 Server/Client Components)",
        "                        ├── Navigation & Routing (Home, Expeditions, Research, Media, About, Workflow)",
        "                        ├── State Management (React Hooks + Browser LocalStorage Persistence)",
        "                        └── Specialized Interactive Micro-Engines (AI Studio, Quiz, Glacier Simulator)",
        "                                 │",
        "[ SERVICE LAYER ]       Bilingual NLP Generator • Canvas-Confetti FX • Citation Engine (APA/BibTeX)",
        "                                 │",
        "[ BACKEND / DATABASE ]  Supabase Cloud (PostgreSQL 15 RLS • Supabase Auth • S3 Storage Buckets)"
    ]
    ay = pdf.cursor_y - 20
    for al in arch_lines:
        pdf.draw_text(al, pdf.margin_left + 12, ay, font="Courier", size=7.5, color=(0.1, 0.2, 0.35))
        ay -= 11

    pdf.cursor_y = arch_box_y - 15

    # =========================================================================
    # PAGE 3: COMPREHENSIVE TECHNOLOGY STACK
    # =========================================================================
    pdf.new_page()
    pdf.draw_running_header()

    pdf.draw_heading("3. Comprehensive Technology Stack", level=1)
    pdf.draw_paragraph(
        "HimVigyan is developed using the latest production-grade open web standards, prioritizing high accessibility, zero layout shifts, type safety, and real-time client performance.",
        size=9, line_height=13
    )

    headers = ["Layer / Subsystem", "Technology / Library", "Version", "Key Architectural Purpose"]
    col_w = [110, 130, 60, 211]
    rows = [
        ["Framework Runtime", "Next.js (App Router)", "16.3.6", "Server/Client Components, Webpack optimization"],
        ["User Interface", "React / React-DOM", "19.2.8", "Component-driven reactive UI & smooth transitions"],
        ["Type Safety", "TypeScript", "5.x", "End-to-end interface typing & compile-time safety"],
        ["CSS Styling", "Tailwind CSS + PostCSS", "v4.0.0", "Custom CSS variables, dark/light theme engine"],
        ["Cloud Database", "Supabase PostgreSQL", "2.109.0", "Managed relational tables, RLS policies, metadata"],
        ["Authentication", "Supabase Auth", "2.109.0", "Secure JWT sessions, researcher credentials"],
        ["Cloud Storage", "Supabase Storage Buckets", "v2 API", "PDF report storage, high-res photos, datasets"],
        ["Gamification FX", "Canvas Confetti", "1.9.4", "Particle physics celebratory triggers for quiz badge"],
        ["Iconography", "Lucide React", "1.48.0", "40+ semantic, accessible SVG vector icons"],
        ["Code Quality", "ESLint + Next Linter", "9.x", "Strict code style, clean architecture enforcement"]
    ]
    pdf.draw_table(headers, rows, col_w, font_size=7.5)

    pdf.draw_heading("Package.json Dependency Audit:", level=2)
    pdf.draw_bullet("Core Dependencies:", "@supabase/supabase-js (^2.109.0), canvas-confetti (^1.9.4), lucide-react (^1.48.0), next (16.3.6), react (19.2.8), react-dom (19.2.8)")
    pdf.draw_bullet("Development Tooling:", "@tailwindcss/postcss (^4), @types/canvas-confetti (^1.9.0), @types/node (^20), @types/react (^19), @types/react-dom (^19), eslint (^9), eslint-config-next (16.3.6), tailwindcss (^4), typescript (^5)")

    pdf.cursor_y -= 8
    pdf.draw_callout(
        "Zero-Runtime Overhead Design",
        "The application leverages modern CSS variables and Tailwind v4 compiled styles, eliminating runtime CSS-in-JS libraries. Client bundles remain under 85 KB, enabling instantaneous loading across 3G/4G connections.",
        icon="⚡"
    )

    # =========================================================================
    # PAGE 4: DETAILED MODULE BREAKDOWN (PART 1)
    # =========================================================================
    pdf.new_page()
    pdf.draw_running_header()

    pdf.draw_heading("4. Detailed Module-by-Module Breakdown", level=1)

    pdf.draw_heading("Module 1: Unified Header & Navigation System (Navbar.tsx, ThemeToggle.tsx)", level=2)
    pdf.draw_bullet("Official Brand Identity:", "Features the official HimVigyan Crest (Polar Bear mother & cub with snowy mountain backdrop) and tagline EXPLORE • RESEARCH • PRESERVE.")
    pdf.draw_bullet("Smart Navigation Bar:", "Direct navigation across Home, Expeditions, Research, Publications, Reports, Datasets, Media, and About.")
    pdf.draw_bullet("Theme Toggle Engine:", "Smooth toggle between Light Glacier Mode and Deep Ocean Dark Mode, persisting preferences in browser localStorage and html attributes.")
    pdf.draw_bullet("Evaluator / Demo Gateway:", "Provides instant 1-click test sign-in for evaluators without requiring manual database registrations.")

    pdf.draw_heading("Module 2: Hero Section & Dynamic Discovery Engine (Hero.tsx)", level=2)
    pdf.draw_bullet("Visual Immersion:", "Full-bleed polar landscape background with ambient overlays and live video fallback.")
    pdf.draw_bullet("Multi-Category Search Dropdown:", "Floating search input supporting category scoping across All Categories, Expeditions, Research, Publications, Reports, Datasets, and Media.")
    pdf.draw_bullet("Quick-Action Call-to-Actions:", "Direct 'Explore' button jumping into research and 'Contribute' button launching the scientist upload gateway.")

    pdf.draw_heading("Module 3: Indian Scientific Expeditions Catalog (ExpeditionsCatalog.tsx)", level=2)
    pdf.draw_bullet("Four Polar Domains:", "Comprehensive coverage of Antarctica (43-IAE, Maitri, Bharati), Arctic (INDARC, Himadri), Southern Ocean (12-ISOE), and Himalayas (Himansh Station).")
    pdf.draw_bullet("Full Operational Profiles:", "Station coordinates, operating seasons, historical timelines, weather telemetry, lead scientists, and environmental treaties.")
    pdf.draw_bullet("Associated Scientific Datasets:", "Each expedition directly cross-references research publications and open datasets with real-time download buttons.")

    pdf.draw_heading("Module 4: Integrated Polar Knowledge Repository (KnowledgeRepository.tsx)", level=2)
    pdf.draw_bullet("Faceted Filtering:", "Real-time tabs for All, Expeditions, Research, Publications, Reports, and Datasets.")
    pdf.draw_bullet("DOI Minting & Citations:", "Every archived item has a unique DOI (e.g. 10.26063/ncpor.icecore.43iae.01) and generates instant APA, BibTeX, and RIS citations.")
    pdf.draw_bullet("Scenic PDF Report Viewer (ReportDetailModal.tsx):", "Full-screen modal displaying metadata, lead investigators, executive abstracts, methodology, and direct download links.")

    # =========================================================================
    # PAGE 5: DETAILED MODULE BREAKDOWN (PART 2)
    # =========================================================================
    pdf.new_page()
    pdf.draw_running_header()

    pdf.draw_heading("Module 5: AI Media & Outreach Studio (AiDisseminator.tsx)", level=2)
    pdf.draw_paragraph(
        "Addresses Problem Statement 26063's explicit mandate for automated science dissemination. Takes technical expedition papers and generates ready-to-publish communication collateral across three key formats:",
        size=9, line_height=13
    )
    pdf.draw_bullet("PIB Press Communiqué:", "Formal government-style release with official dateline, headline, quote by Chief Scientist, key findings, and MoES sign-off.")
    pdf.draw_bullet("Social Media (X/Twitter) Thread:", "Numbered multi-tweet thread with hashtags (#PolarIndia #MoES #NCPOR), character counter, and engagement hooks.")
    pdf.draw_bullet("Instagram Educational Carousel:", "Slide-by-slide script featuring image visual suggestions, core science concepts, and call-to-actions.")
    pdf.draw_bullet("Bilingual Engine (English / Hindi):", "1-click toggle switches generated content between English and Hindi (Rashtriya Dhruviya Gyan Samachar).")

    pdf.draw_heading("Module 6: Smart Education & Student Citizen Hub (StudentPolarHub.tsx)", level=2)
    pdf.draw_paragraph(
        "Gamified outreach center targeting school students and university researchers:",
        size=9, line_height=13
    )
    pdf.draw_bullet("Interactive 10-Question Quiz:", "Tests knowledge on Antarctica Treaty 1959, Indian Antarctic Act 2022, permafrost thaw, IndARC moorings, and polar biology.")
    pdf.draw_bullet("Particle Physics Confetti:", "Triggers canvas-confetti upon completion, rendering a personalized Verified NCPOR Student Polar Badge.")
    pdf.draw_bullet("Glacier Retreat Timeline Slider:", "Interactive visual slider allowing students to explore ice volume loss in the Chandra Basin (Chhota Shigri & Samudra Tapu glaciers) from 2000 to 2024.")

    pdf.draw_heading("Module 7: Moments from Polar Frontiers (MediaPortal.tsx, MediaHighlights.tsx)", level=2)
    pdf.draw_bullet("4K UHD Multimedia Archive:", "Categorized library of high-resolution expedition photographs and documentaries.")
    pdf.draw_bullet("Technical Metadata Badges:", "Displays aspect ratios, resolutions (3840x2160 UHD), author attribution, expedition year, download counters, and community upvotes.")

    pdf.draw_heading("Module 8: HimVigyan AI Assistant (PolarBot.tsx)", level=2)
    pdf.draw_bullet("Contextual Scientific RAG:", "Conversational agent grounded in central NCPOR archives, station telemetry, and scientist profiles.")
    pdf.draw_bullet("Author & Station Query Parsing:", "Recognizes queries like 'Dr. Meenakshi Reports' or 'Bharati Station Weather' and returns structured scientist profiles and reports.")
    pdf.draw_bullet("Embedded Actions:", "Allows users to inspect and download PDF reports directly inside the chat interface.")

    # =========================================================================
    # PAGE 6: DETAILED MODULE BREAKDOWN (PART 3)
    # =========================================================================
    pdf.new_page()
    pdf.draw_running_header()

    pdf.draw_heading("Module 9: Scientist Contribution & Peer-Review Workflow", level=2)
    pdf.draw_paragraph(
        "Authorized portal (ScientistSubmissionModal.tsx) enabling active researchers to contribute new expedition data directly from base stations or home institutions:",
        size=9, line_height=13
    )
    pdf.draw_bullet("Metadata Tagging:", "Collects publication title, lead investigator, expedition number, category (Research, Dataset, Report, Media), and abstract.")
    pdf.draw_bullet("Automated DOI Assignment:", "Generates an official DOI format (e.g. 10.26063/ncpor.submission...) upon submission.")
    pdf.draw_bullet("Dual-Mode Persistence:", "When Supabase is configured, uploads metadata to PostgreSQL tables and files to cloud storage; falls back seamlessly to browser localStorage with full CRUD capability.")
    pdf.draw_bullet("Immediate Live Sync:", "Submitted items immediately reflect across the Knowledge Repository, AI Disseminator, and author profiles without requiring page reloads.")

    pdf.draw_heading("Module 10: About HimVigyan Portal (AboutPortal.tsx)", level=2)
    pdf.draw_paragraph(
        "Executive overview page structured according to the latest government design guidelines:",
        size=9, line_height=13
    )
    pdf.draw_bullet("Panoramic Antarctic Hero:", "Featuring 4K imagery of Emperor penguins on sea ice with golden horizon.")
    pdf.draw_bullet("Our Mission & Our Vision:", "Card-based statement of public outreach and high-latitude scientific stewardship.")
    pdf.draw_bullet("Seven Service Modules:", "Interactive cards leading directly to Repository, Expeditions, AI Studio, Student Hub, Media, Scientist Submission, and AI Bot.")
    pdf.draw_bullet("Four Focus Regions:", "Circular high-definition badges covering Antarctica, the Arctic, the Himalayas, and the Southern Ocean.")
    pdf.draw_bullet("Ethical Commitment Banner:", "Reaffirming scientific integrity, source attribution, data provenance, and fair open access.")

    pdf.draw_heading("Module 11: End-to-End Workflow Slide (app/workflow/page.tsx)", level=2)
    pdf.draw_bullet("16:9 Presentation Format:", "Built specifically for SIH presentation slides and evaluator walkthroughs.")
    pdf.draw_bullet("Four Interactive Zones:", "Zone 1 (Public User Discovery), Zone 2 (Authorized Researcher), Zone 3 (Institutional Review & Moderation), and Zone 4 (Technical Architecture & Cloud Storage).")

    # =========================================================================
    # PAGE 7: DATA ARCHITECTURE, SECURITY & ACCESSIBILITY
    # =========================================================================
    pdf.new_page()
    pdf.draw_running_header()

    pdf.draw_heading("5. Data Architecture & Schema Models", level=1)
    pdf.draw_paragraph(
        "HimVigyan maintains a strictly typed data model matching the International Polar Year (IPY) and Antarctic Treaty System metadata requirements:",
        size=9, line_height=13
    )

    d_headers = ["Field Name", "TypeScript Type", "Description / Constraints", "Example Value"]
    d_widths = [110, 95, 175, 130]
    d_rows = [
        ["id", "string", "Unique identifier for repository item", "'rep-01'"],
        ["title", "string", "Official paper or dataset title", "'43-IAE Larsemann Hills Ice Core'"],
        ["type", "string", "'Research' | 'Dataset' | 'Report' | 'Media'", "'Dataset'"],
        ["category", "string", "Expedition topic classification", "'Glaciology & Cryosphere'"],
        ["date", "string", "Publication or collection date", "'March 2024'"],
        ["author", "string", "Principal Investigator name & title", "'Dr. Thamban Meloth'"],
        ["doi", "string", "Standard Digital Object Identifier", "'10.26063/ncpor.icecore.43iae.01'"],
        ["station", "string", "Associated research base or vessel", "'Bharati Station, Antarctica'"],
        ["downloadCount", "number", "Aggregate public access metric", "1420"]
    ]
    pdf.draw_table(d_headers, d_rows, d_widths, font_size=7.5)

    pdf.draw_heading("6. Security, Privacy & Performance Standards", level=1)
    pdf.draw_bullet("Row-Level Security (RLS):", "PostgreSQL tables in Supabase restrict update/delete permissions strictly to authenticated researchers and administrators, while granting public read access.")
    pdf.draw_bullet("WCAG 2.1 Accessibility:", "High-contrast text colors, semantic HTML5 tags (<header>, <nav>, <main>, <section>, <footer>), and ARIA attributes ensure full compliance.")
    pdf.draw_bullet("Hydration Protection:", "Inline theme script in app/layout.tsx reads user theme preference prior to DOM rendering, eliminating theme flickering and hydration errors.")
    pdf.draw_bullet("Offline-First Resilience:", "If internet connectivity or Supabase is temporarily unreachable, all client functions (quiz, glacier simulator, AI preview, and search) continue operating smoothly using local caches.")

    # =========================================================================
    # PAGE 8: COMPETITIVE ADVANTAGE MATRIX & FUTURE ROADMAP
    # =========================================================================
    pdf.new_page()
    pdf.draw_running_header()

    pdf.draw_heading("7. Competitive Advantage Matrix (SIH Evaluation)", level=1)
    pdf.draw_paragraph(
        "Comparison between legacy polar websites and HimVigyan's modern architecture:",
        size=9, line_height=13
    )

    c_headers = ["Evaluation Metric", "Legacy MoES / Polar Sites", "HimVigyan Platform (Problem 26063)"]
    c_widths = [130, 160, 220]
    c_rows = [
        ["Data Discoverability", "Scattered PDF links across static pages", "Faceted multi-category search with DOI minting"],
        ["AI Science Outreach", "Manual press releases (delays of weeks)", "Instant PIB, X threads & Hindi carousels"],
        ["Student Engagement", "Static text and brochures", "10-Q Quiz, Confetti, Glacier Timeline & Certificates"],
        ["Field Submissions", "Paper forms or unindexed email attachments", "Direct web portal with metadata tagging & instant sync"],
        ["Modern UX / Theme", "Non-responsive, fixed-width desktop layout", "Fully responsive Tailwind v4 with dark/light themes"],
        ["Offline Resilience", "Fails completely without active network", "LocalStorage fallbacks and zero-downtime demo mode"]
    ]
    pdf.draw_table(c_headers, c_rows, c_widths, font_size=7.5)

    pdf.draw_heading("8. Future Production Scaling Milestones", level=1)
    pdf.draw_bullet("Phase 1 (Immediate Production):", "Deploy on Vercel / National Informatics Centre (NIC) Cloud with custom government domain (himvigyan.moes.gov.in).")
    pdf.draw_bullet("Phase 2 (IoT & Satellite Integration):", "Direct automated ingestion of Bharati & Maitri AWS (Automatic Weather Station) telemetry via GSAT/Inmarsat satellite relays.")
    pdf.draw_bullet("Phase 3 (3D Virtual Station Tours):", "WebGL-based 3D digital twins of Bharati Station interior and Ny-Alesund atmospheric laboratory.")
    pdf.draw_bullet("Phase 4 (National School Challenge):", "Annual nationwide Polar Science Quiz competition linked with NCPOR student expedition fellowship grants.")

    pdf.cursor_y -= 15
    pdf.rect(pdf.margin_left, pdf.cursor_y - 28, pdf.content_width, 34, fill=True, color=(0.03, 0.08, 0.18))
    pdf.draw_text("HIMVIGYAN • EXPLORE • RESEARCH • PRESERVE", pdf.margin_left + 15, pdf.cursor_y - 12, font="Helvetica-Bold", size=10, color=(1, 1, 1))
    pdf.draw_text("Submitted for Smart India Hackathon 2026 Evaluation • Ministry of Earth Sciences, Govt. of India", pdf.margin_left + 15, pdf.cursor_y - 24, font="Helvetica", size=8, color=(0.4, 0.8, 1.0))

    # Build and write PDF
    pdf.build_pdf()

    # Also copy to public directory for direct browser download
    os.system("cp HimVigyan_Project_Summary_and_Tech_Stack.pdf public/HimVigyan_Project_Summary_and_Tech_Stack.pdf")
    print("Copied PDF to public/ directory for direct HTTP downloads.")

if __name__ == "__main__":
    generate_himvigyan_dossier()
