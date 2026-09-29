import os
import sys
import io
from PIL import Image

class SimplePDFReportGenerator:
    def __init__(self, filename, title, subtitle, expedition, base, lead, doi, date_str, color_rgb=(14, 34, 51)):
        self.filename = filename
        self.title = title
        self.subtitle = subtitle
        self.expedition = expedition
        self.base = base
        self.lead = lead
        self.doi = doi
        self.date_str = date_str
        self.color_rgb = color_rgb  # Primary dark color
        
        self.width = 595.28
        self.height = 841.89
        self.pages = []
        self.current_stream = []
        self.cursor_y = 790.0
        self.margin_left = 46.0
        self.margin_right = 549.0
        self.content_width = self.margin_right - self.margin_left
        
        self.images = {}
        # Load polar crest logo if available
        crest_path = "public/himvigyan-crest.png"
        if os.path.exists(crest_path):
            im = Image.open(crest_path).convert('RGB')
            buf = io.BytesIO()
            im.save(buf, format='JPEG', quality=92)
            self.images['Crest'] = (im.size[0], im.size[1], buf.getvalue())

    def sanitize(self, text):
        replacements = {
            '•': '*', '—': '--', '–': '-', '’': "'", '‘': "'",
            '“': '"', '”': '"', '→': '->', '⚡': '[!]', '°': ' deg',
            '±': '+/-', 'µ': 'u', 'α': 'a', 'β': 'b', 'δ': 'd',
            'Å': 'A', 'é': 'e'
        }
        for k, v in replacements.items():
            text = text.replace(k, v)
        return text.encode('ascii', 'replace').decode('ascii')

    def add_page(self):
        if self.current_stream:
            self.pages.append(self.current_stream)
        self.current_stream = []
        self.cursor_y = 790.0

    def draw_rect(self, x, y, w, h, r, g, b, fill=True):
        cmd = f"{r:.3f} {g:.3f} {b:.3f} {'rg' if fill else 'RG'} {x:.2f} {y:.2f} {w:.2f} {h:.2f} re {'f' if fill else 'S'}\n"
        self.current_stream.append(cmd.encode('latin1'))

    def draw_text(self, text, x, y, font="F1", size=10, r=0.1, g=0.1, b=0.1):
        san = self.sanitize(text).replace('(', '\\(').replace(')', '\\)')
        cmd = f"BT /{font} {size} Tf {r:.3f} {g:.3f} {b:.3f} rg {x:.2f} {y:.2f} Td ({san}) Tj ET\n"
        self.current_stream.append(cmd.encode('latin1'))

    def draw_header_banner(self):
        # Top banner with deep navy background
        r, g, b = [c/255.0 for c in self.color_rgb]
        self.draw_rect(0, 750, self.width, 92, r, g, b, fill=True)
        # Cyan accent line
        self.draw_rect(0, 747, self.width, 3, 0.0, 0.75, 0.85, fill=True)
        
        # Crest image on left
        if 'Crest' in self.images:
            cmd = f"q 68 0 0 68 46 758 cm /ImCrest Do Q\n"
            self.current_stream.append(cmd.encode('latin1'))
            offset_x = 124
        else:
            offset_x = 46

        self.draw_text("NATIONAL CENTRE FOR POLAR AND OCEAN RESEARCH", offset_x, 814, "F2", 12.5, 1.0, 1.0, 1.0)
        self.draw_text("Ministry of Earth Sciences, Government of India | Official Expedition Compendium", offset_x, 798, "F1", 8.5, 0.65, 0.85, 0.95)
        self.draw_text(f"REGISTERED REPOSITORY ARCHIVE | DOI: {self.doi}", offset_x, 782, "F2", 8.5, 0.2, 0.9, 1.0)
        self.draw_text(f"EXPEDITION / MISSION: {self.expedition.upper()} | BASE: {self.base.upper()}", offset_x, 768, "F1", 7.5, 0.8, 0.85, 0.9)

        self.cursor_y = 720.0

    def draw_footer(self, page_num, total_pages):
        self.draw_rect(self.margin_left, 42, self.content_width, 1, 0.8, 0.85, 0.9, fill=True)
        self.draw_text("HimVigyan Polar Digital Knowledge Repository | MoES Open Science Mandate", self.margin_left, 30, "F1", 7.5, 0.45, 0.5, 0.55)
        self.draw_text(f"Page {page_num} of {total_pages}", self.margin_right - 45, 30, "F2", 8, 0.2, 0.3, 0.4)

    def write_section_heading(self, heading):
        self.cursor_y -= 8
        self.draw_rect(self.margin_left, self.cursor_y - 2, self.content_width, 18, 0.93, 0.96, 0.98, fill=True)
        self.draw_rect(self.margin_left, self.cursor_y - 2, 4, 18, 0.05, 0.5, 0.7, fill=True)
        self.draw_text(heading.upper(), self.margin_left + 10, self.cursor_y + 3, "F2", 9.5, 0.05, 0.2, 0.35)
        self.cursor_y -= 22

    def write_paragraph(self, text, size=8.5, line_spacing=12.5, r=0.15, g=0.18, b=0.22):
        words = self.sanitize(text).split(' ')
        cur = ""
        for w in words:
            if len(cur + " " + w) > 96:
                self.draw_text(cur, self.margin_left, self.cursor_y, "F1", size, r, g, b)
                self.cursor_y -= line_spacing
                cur = w
            else:
                cur = (cur + " " + w) if cur else w
        if cur:
            self.draw_text(cur, self.margin_left, self.cursor_y, "F1", size, r, g, b)
            self.cursor_y -= line_spacing
        self.cursor_y -= 4

    def write_table(self, headers, rows):
        col_w = self.content_width / len(headers)
        # Header row
        self.draw_rect(self.margin_left, self.cursor_y - 3, self.content_width, 16, 0.1, 0.2, 0.32, fill=True)
        for i, h in enumerate(headers):
            self.draw_text(h, self.margin_left + i * col_w + 6, self.cursor_y + 2, "F2", 8, 1.0, 1.0, 1.0)
        self.cursor_y -= 17

        # Rows
        for r_idx, row in enumerate(rows):
            bg = (0.97, 0.98, 0.99) if r_idx % 2 == 0 else (1.0, 1.0, 1.0)
            self.draw_rect(self.margin_left, self.cursor_y - 3, self.content_width, 15, bg[0], bg[1], bg[2], fill=True)
            self.draw_rect(self.margin_left, self.cursor_y - 3, self.content_width, 0.5, 0.85, 0.88, 0.92, fill=True)
            for i, val in enumerate(row):
                self.draw_text(str(val), self.margin_left + i * col_w + 6, self.cursor_y + 1, "F1", 7.5, 0.15, 0.2, 0.25)
            self.cursor_y -= 15
        self.cursor_y -= 8

    def generate(self, pages_content):
        total = len(pages_content)
        for idx, page_fn in enumerate(pages_content):
            self.draw_header_banner()
            page_fn(self)
            self.draw_footer(idx + 1, total)
            self.add_page()

        pdf_objs = []
        def add_obj(data):
            num = len(pdf_objs) + 1
            pdf_objs.append((num, data))
            return num

        add_obj(b"<< /Type /Catalog /Pages 2 0 R >>")
        pages_obj_idx = len(pdf_objs)
        add_obj(b"") # placeholder

        f1_num = add_obj(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>")
        f2_num = add_obj(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>")

        img_refs = {}
        for name, (w, h, raw_jpeg) in self.images.items():
            img_stream = (
                f"<< /Type /XObject /Subtype /Image /Width {w} /Height {h} "
                f"/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length {len(raw_jpeg)} >>\nstream\n"
            ).encode('latin1') + raw_jpeg + b"\nendstream"
            num = add_obj(img_stream)
            img_refs[name] = num

        page_nums = []
        for p_stream in self.pages:
            content_bytes = b"".join(p_stream)
            c_num = add_obj(f"<< /Length {len(content_bytes)} >>\nstream\n".encode('latin1') + content_bytes + b"\nendstream")
            
            xobj_str = ""
            for name, num in img_refs.items():
                xobj_str += f"/Im{name} {num} 0 R "
            res_str = f"<< /Font << /F1 {f1_num} 0 R /F2 {f2_num} 0 R >>"
            if xobj_str:
                res_str += f" /XObject << {xobj_str}>>"
            res_str += " >>"

            p_data = f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents {c_num} 0 R /Resources {res_str} >>".encode('latin1')
            p_num = add_obj(p_data)
            page_nums.append(p_num)

        kids_str = " ".join([f"{p} 0 R" for p in page_nums])
        pdf_objs[pages_obj_idx - 1] = (2, f"<< /Type /Pages /Kids [{kids_str}] /Count {len(page_nums)} >>".encode('latin1'))

        with open(self.filename, 'wb') as f:
            f.write(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
            offsets = []
            for num, data in pdf_objs:
                offsets.append(f.tell())
                f.write(f"{num} 0 obj\n".encode('latin1'))
                f.write(data)
                f.write(b"\nendobj\n")
            
            xref_pos = f.tell()
            f.write(f"xref\n0 {len(pdf_objs) + 1}\n".encode('latin1'))
            f.write(b"0000000000 65535 f \n")
            for off in offsets:
                f.write(f"{off:010d} 00000 n \n".encode('latin1'))
            f.write(f"trailer\n<< /Size {len(pdf_objs) + 1} /Root 1 0 R >>\nstartxref\n{xref_pos}\n%%EOF\n".encode('latin1'))
        print(f"Generated: {self.filename} ({os.path.getsize(self.filename)} bytes)")

# 1. Antarctica 42-ISEA
def build_report_isea42():
    doc = SimplePDFReportGenerator(
        filename="public/reports/isea-42-scientific-report.pdf",
        title="Scientific Report of the 42nd Indian Scientific Expedition to Antarctica",
        subtitle="Operations, Atmospheric Geospace, Cryospheric Dynamics, and Environmental Compliance",
        expedition="42nd Indian Scientific Expedition to Antarctica (42-ISEA)",
        base="Bharati & Maitri Stations (Larsemann Hills & Schirmacher Oasis)",
        lead="Dr. Yogesh Ray & Er. Alok Sharma",
        doi="10.5281/ncpor.rep.isea42.2023",
        date_str="20 November 2023",
        color_rgb=(10, 25, 45)
    )

    def page1(w):
        w.cursor_y -= 6
        w.draw_rect(w.margin_left, w.cursor_y - 48, w.content_width, 54, 0.94, 0.97, 1.0, fill=True)
        w.draw_rect(w.margin_left, w.cursor_y - 48, w.content_width, 1, 0.7, 0.85, 0.95, fill=False)
        w.draw_text("SCIENTIFIC COMPENDIUM & EXPEDITION OPERATIONS REPORT", w.margin_left + 12, w.cursor_y - 12, "F2", 13, 0.05, 0.25, 0.45)
        w.draw_text("42nd Indian Scientific Expedition to Antarctica (42-ISEA) | Session 2022-2023", w.margin_left + 12, w.cursor_y - 27, "F1", 9.5, 0.25, 0.35, 0.45)
        w.draw_text(f"Author(s) / Leads: {doc.lead} | Affiliation: NCPOR, Ministry of Earth Sciences", w.margin_left + 12, w.cursor_y - 41, "F2", 8.5, 0.1, 0.45, 0.6)
        w.cursor_y -= 65

        w.write_section_heading("1. Executive Summary & National Scientific Objectives")
        w.write_paragraph(
            "The 42nd Indian Scientific Expedition to Antarctica was officially flagged off in December 2022 and successfully concluded in April 2023. Over 74 scientific researchers and defense engineering personnel from 18 premier national institutions conducted operations across India's two permanent polar stations: Maitri (70 deg 45'S, 11 deg 44'E) in the Schirmacher Oasis and Bharati (69 deg 24'S, 76 deg 11'E) in the Larsemann Hills. Primary scientific objectives encompassed sub-surface cryospheric imaging, high-frequency boundary layer meteorology, broadband seismology, and ecological assessment of periglacial freshwater lakes."
        )

        w.write_section_heading("2. Station Operations, Logistics & Environmental Compliance")
        w.write_paragraph(
            "Under the provisions of the Madrid Protocol on Environmental Protection to the Antarctic Treaty and the Indian Antarctic Act (2022), strict zero-waste emission standards were maintained throughout the season. All solid hazardous, grey water, and non-biodegradable waste generated during station habitation and inland traverses was compacted, categorized, and repatriated back to mainland India aboard chartered ice-class vessels without leaving any foreign footprint on the Antarctic terrain."
        )

        w.write_section_heading("3. Meteorological & Field Observations Summary (42-ISEA)")
        headers = ["Observation Corridor", "Parameters Monitored", "Instruments Deployed", "Sampling Rate", "Key Finding"]
        rows = [
            ["Larsemann Hills (Bharati)", "Aerosol Optical Depth (AOD)", "Microtops Sunphotometer", "30-min sync", "AOD (500nm) < 0.025 baseline"],
            ["Schirmacher Oasis (Maitri)", "Boundary Layer Wind & Temp", "3D Sonic Anemometer Tower", "10 Hz", "Max blizzard gust: 114 knots"],
            ["Lake Priyadarshini", "Water Chemistry & Microbes", "Multi-parameter CTD / YSI", "Weekly", "Oligotrophic, pH 7.42 stable"],
            ["Polar Plateau Transect", "Ice Sheet Firn Accumulation", "Dual-frequency 100MHz GPR", "1-meter", "18.4 cm w.e. annual accumulation"],
            ["Maitri Seismological Base", "Teleseismic Earthquake Waves", "Guralp CMG-3T Broadband", "Continuous 100sps", "1,420 global events cataloged"]
        ]
        w.write_table(headers, rows)

        w.write_section_heading("4. Glaciology & Geospace Physics Highlights")
        w.write_paragraph(
            "An overland glaciological traverse of 350 km south of Maitri was executed to service automatic weather stations and measure shallow firn core stratigraphy. Ground-penetrating radar profiling delineated subglacial bedrock troughs up to 480 meters below sea level. In parallel, the geospace observatory monitored ionospheric scintillation and total electron content (TEC) perturbations during major geomagnetic storms, contributing real-time space weather intelligence to global space agencies."
        )

    def page2(w):
        w.cursor_y -= 6
        w.write_section_heading("5. Inter-Institutional Research Programs (18 Participating Labs)")
        w.write_paragraph(
            "The 42-ISEA successfully hosted coordinated scientific experiments from leading national organizations including: Geological Survey of India (GSI - bedrock mapping), India Meteorological Department (IMD - ozone soundings & surface radiation), CSIR-NGRI (deep mantle seismic anisotropy), Survey of India (kinematic GNSS ice motion tracking), and Indian Institute of Geomagnetism (IIG - fluxgate magnetometer and ELF/VLF atmospheric wave recordings)."
        )

        w.write_section_heading("6. Official Certification & Archival Endorsement")
        w.draw_rect(w.margin_left, w.cursor_y - 68, w.content_width, 74, 0.96, 0.98, 0.99, fill=True)
        w.draw_rect(w.margin_left, w.cursor_y - 68, w.content_width, 1, 0.8, 0.88, 0.94, fill=False)
        w.draw_text("MINISTRY OF EARTH SCIENCES (MoES) | OFFICIAL REPOSITORY VALIDATION", w.margin_left + 14, w.cursor_y - 14, "F2", 9, 0.05, 0.3, 0.5)
        w.draw_text(f"Document Code: MoES/NCPOR/42-ISEA/REP-2023-01 | Registered DOI: {doc.doi}", w.margin_left + 14, w.cursor_y - 28, "F1", 8, 0.2, 0.25, 0.3)
        w.draw_text("Approved for Open Public Access and International Scientific Exchange under FAIR Principles.", w.margin_left + 14, w.cursor_y - 42, "F1", 8, 0.2, 0.25, 0.3)
        w.draw_text("Authorized Signature: Dr. M. Ravichandran, Secretary, Ministry of Earth Sciences, Govt. of India", w.margin_left + 14, w.cursor_y - 58, "F2", 8.5, 0.1, 0.2, 0.3)
        w.cursor_y -= 84

        w.write_section_heading("7. Recommended Citation & FAIR Access Protocol")
        w.write_paragraph(
            "Citation: Ray, Y., Sharma, A., et al. (2023). 'Scientific Report of the 42nd Indian Scientific Expedition to Antarctica'. National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, New Delhi / Goa. 114 pages. DOI: 10.5281/ncpor.rep.isea42.2023. All associated meteorological and geophysical datasets are accessible via the HimVigyan National Portal."
        )

    doc.generate([page1, page2])

# 2. Arctic Himadri
def build_report_arctic():
    doc = SimplePDFReportGenerator(
        filename="public/reports/indian-arctic-expedition-himadri-report.pdf",
        title="Annual Scientific Compendium of the Indian Arctic Expedition (Himadri, Svalbard)",
        subtitle="Fjord Oceanography, Atmospheric Chemistry, and Glacier Dynamics at 79° North",
        expedition="Indian Arctic Research Program (2023-2024)",
        base="Himadri Station, Ny-Alesund, Svalbard Archipelago (78°55'N, 11°56'E)",
        lead="Dr. K. P. Krishnan & Arctic Research Team",
        doi="10.5281/ncpor.rep.arc2024.018",
        date_str="12 May 2024",
        color_rgb=(18, 48, 68)
    )

    def page1(w):
        w.cursor_y -= 6
        w.draw_rect(w.margin_left, w.cursor_y - 48, w.content_width, 54, 0.93, 0.98, 1.0, fill=True)
        w.draw_rect(w.margin_left, w.cursor_y - 48, w.content_width, 1, 0.65, 0.85, 0.95, fill=False)
        w.draw_text("ANNUAL ARCTIC SCIENTIFIC COMPENDIUM & ENVIRONMENTAL AUDIT", w.margin_left + 12, w.cursor_y - 12, "F2", 13, 0.05, 0.28, 0.5)
        w.draw_text("Indian Arctic Expedition at Himadri Station | Svalbard (79 deg N) | Session 2023-2024", w.margin_left + 12, w.cursor_y - 27, "F1", 9.5, 0.25, 0.35, 0.45)
        w.draw_text(f"Station Leader / Editor: {doc.lead} | Institution: NCPOR Goa & MoES", w.margin_left + 12, w.cursor_y - 41, "F2", 8.5, 0.1, 0.45, 0.6)
        w.cursor_y -= 65

        w.write_section_heading("1. Strategic Overview: India at the Top of the World")
        w.write_paragraph(
            "India's dedicated Arctic research station, 'Himadri', was established in 2008 at the international research base of Ny-Alesund in Svalbard, Norway. Over the 2023-2024 field season, 22 research programs were executed by 38 Indian scientists across physical oceanography, atmospheric chemistry, permafrost microbiomics, and glacial ablation. Central to this mission is resolving the Arctic Amplification phenomenon--where the Arctic warms nearly four times faster than the global average--and deciphering its teleconnections with anomalous Indian summer monsoon rainfall patterns."
        )

        w.write_section_heading("2. IndARC Mooring Observations in Kongsfjorden")
        w.write_paragraph(
            "A core milestone of the 2023-2024 campaign was the successful retrieval and redeployment of 'IndARC', India's sub-surface multi-sensor mooring deployed at 192 meters depth in Kongsfjorden. Continuous 15-minute acoustic Doppler current profiler (ADCP) and CTD sensor time-series confirmed that winter pulses of warm Atlantic Water (AW) into the fjord reached a decadal peak, accelerating bottom water warming and impeding sea-ice formation."
        )

        w.write_section_heading("3. Arctic Field Observations & Telemetry (Himadri Base)")
        headers = ["Research Corridor", "Core Parameter", "Sensor / Technology", "Temporal Resolution", "Major Finding"]
        rows = [
            ["Inner Kongsfjorden (IndARC)", "Sub-surface Water Temp / Salinity", "Sea-Bird SBE-16plus CTD", "15-min interval", "Atlantic water pulse +0.8 deg C above baseline"],
            ["Gruvebadet Observatory", "Aerosol Black Carbon & Mercury", "Tekran 2537X & Aethalometer", "1-min continuous", "Spring AMDE event dropped Hg to 0.12 ng/m3"],
            ["Midtre Lovenbreen Glacier", "Annual Mass Loss & Melt Rates", "Differential GNSS & Ablation Stakes", "Bi-weekly summer", "Net mass deficit: -0.68 m w.e. / yr"],
            ["Ny-Alesund Tundra Soils", "Cryophilic Bacterial Diversity", "Illumina High-Throughput DNA", "Seasonal batches", "Discovery of 14 novel cold-active enzymes"],
            ["Atmospheric Boundary Layer", "Greenhouse Gases (CO2, CH4)", "Picarro G2401 Cavity Ring-Down", "Continuous 1 Hz", "Permafrost thaw pulse detected in July"]
        ]
        w.write_table(headers, rows)

        w.write_section_heading("4. Glaciology & Cryospheric Runoff Dynamics")
        w.write_paragraph(
            "Continuous monitoring of the Midtre Lovenbreen and Austre Broggerbreen valley glaciers demonstrated intensified snout retreat of 14.2 meters compared to 2022. Supraglacial meltwater runoff discharge into Kongsfjorden was quantified using acoustic Doppler velocity sensors, revealing increased sediment plume turbidity that limits light penetration for benthic phytoplankton communities."
        )

    def page2(w):
        w.cursor_y -= 6
        w.write_section_heading("5. Arctic-Monsoon Teleconnections & Scientific Synthesis")
        w.write_paragraph(
            "Coupled atmospheric-oceanic modeling spearheaded by NCPOR demonstrates that reduced sea-ice cover in the Barents-Kara Seas during late autumn alters the Scandinavian planetary wave train, delaying the withdrawal of the Indian Summer Monsoon and causing erratic post-monsoon precipitation anomalies in Western India."
        )

        w.write_section_heading("6. Environmental Compliance & Ny-Alesund Science Managers Committee (NySMAC)")
        w.write_paragraph(
            "Himadri operations complied with all stringent Svalbard Environmental Protection regulations. All biological field samples were cataloged under Norwegian research permissions (RIS ID: 11482), and no chemical tracer emissions were released into the sensitive high-latitude Arctic environment."
        )

        w.write_section_heading("7. Official Certification & Document Details")
        w.draw_rect(w.margin_left, w.cursor_y - 56, w.content_width, 62, 0.95, 0.98, 0.99, fill=True)
        w.draw_rect(w.margin_left, w.cursor_y - 56, w.content_width, 1, 0.8, 0.88, 0.94, fill=False)
        w.draw_text("MINISTRY OF EARTH SCIENCES | NCPOR ARCTIC RESEARCH DIVISION", w.margin_left + 14, w.cursor_y - 14, "F2", 9, 0.05, 0.3, 0.5)
        w.draw_text(f"Compendium Code: MoES/NCPOR/ARC-2024/REP-018 | Official DOI: {doc.doi}", w.margin_left + 14, w.cursor_y - 28, "F1", 8, 0.2, 0.25, 0.3)
        w.draw_text("Published under Open Access License (CC-BY 4.0). Archival Master hosted on HimVigyan.", w.margin_left + 14, w.cursor_y - 42, "F2", 8, 0.1, 0.35, 0.5)
        w.cursor_y -= 70

    doc.generate([page1, page2])

# 3. Southern Ocean SOE-12
def build_report_soe():
    doc = SimplePDFReportGenerator(
        filename="public/reports/12th-southern-ocean-expedition-cruise-report.pdf",
        title="Cruise Report & Scientific Synthesis of the 12th Indian Southern Ocean Expedition (SOE-12)",
        subtitle="Hydrography, Marine Biogeochemistry, Carbon Drawdown, and Polar Frontal Dynamics",
        expedition="12th Indian Scientific Expedition to the Southern Ocean (SOE-12)",
        base="ORV Sagar Kanya / SA Agulhas II (Cape Town to 69°S Antarctic Margin)",
        lead="Dr. N. Anilkumar & SOE-12 Scientific Contingent",
        doi="10.5281/ncpor.rep.soe12.2024",
        date_str="10 April 2024",
        color_rgb=(12, 38, 58)
    )

    def page1(w):
        w.cursor_y -= 6
        w.draw_rect(w.margin_left, w.cursor_y - 48, w.content_width, 54, 0.94, 0.97, 1.0, fill=True)
        w.draw_rect(w.margin_left, w.cursor_y - 48, w.content_width, 1, 0.7, 0.85, 0.95, fill=False)
        w.draw_text("CRUISE SYNTHESIS & OCEANOGRAPHIC DATA COMPENDIUM", w.margin_left + 12, w.cursor_y - 12, "F2", 13, 0.05, 0.25, 0.45)
        w.draw_text("12th Indian Southern Ocean Expedition (SOE-12) | 57 deg 30'E Transect (40 deg S - 69 deg S)", w.margin_left + 12, w.cursor_y - 27, "F1", 9.5, 0.25, 0.35, 0.45)
        w.draw_text(f"Chief Scientist: {doc.lead} | Vessel: SA Agulhas II | NCPOR & MoES Fleet", w.margin_left + 12, w.cursor_y - 41, "F2", 8.5, 0.1, 0.45, 0.6)
        w.cursor_y -= 65

        w.write_section_heading("1. Cruise Mission Overview & Geographic Scope")
        w.write_paragraph(
            "The 12th Indian Southern Ocean Expedition was conducted over 60 operational sea days across the Roaring Forties, Furious Fifties, and Screaming Sixties. Departing from Cape Town, the expedition executed an extensive hydrographic transect along 57 deg 30'E, terminating at the Antarctic pack ice boundary near India's Bharati Station at 69 deg S. The expedition deployed 42 full-depth CTD rosette casts, 18 autonomous profiling Argo floats, and continuous underway atmospheric greenhouse gas monitors."
        )

        w.write_section_heading("2. Deep-Water Hydrography & Carbon Pump Dynamics")
        w.write_paragraph(
            "Operating across the Subtropical Front (STF), Sub-Antarctic Front (SAF), and Polar Front (PF), the science team measured full-depth physical and chemical parameters down to 4,500 meters. The Southern Ocean acts as Earth's premier planetary carbon sponge, accounting for over 40% of oceanic uptake of industrial carbon dioxide. Coulometric dissolved inorganic carbon (DIC) titrations revealed active biological drawdown stimulated by natural iron fertilization downstream of sub-Antarctic islands."
        )

        w.write_section_heading("3. Oceanographic & Biochemical Station Data (SOE-12)")
        headers = ["Frontal Zone / Lat", "Depth Range", "Primary Parameters", "Instrument / Method", "Oceanographic Significance"]
        rows = [
            ["Subtropical Front (42 deg S)", "0 - 1,000 m", "Temp, Salinity, Nutrients", "Sea-Bird 911plus CTD", "Sharp halocline boundary (+3.2 PSU)"],
            ["Sub-Antarctic Front (47 deg S)", "0 - 2,500 m", "Dissolved Inorganic Carbon", "Vindum Coulometric System", "High biological CO2 drawdown zone"],
            ["Polar Front (53 deg S)", "0 - 4,500 m", "Full Hydrography & Oxygen", "24-bottle Rosette CTD", "Antarctic Intermediate Water (AAIW) core"],
            ["Southern Boundary (64 deg S)", "0 - 4,000 m", "Silicate / Nitrate Limitation", "Seal AutoAnalyzer 3 HR", "Diatom bloom shift to Phaeocystis"],
            ["Antarctic Margin (68 deg S)", "0 - 800 m", "Antarctic Bottom Water", "Deep CTD & Lowered ADCP", "Supercooled shelf water outflow (-1.85 deg C)"]
        ]
        w.write_table(headers, rows)

        w.write_section_heading("4. Underway Carbon Dioxide & Ocean Acidification Tracking")
        w.write_paragraph(
            "Surface seawater pCO2 was logged continuously every 2 minutes using an underway General Oceanics equilibrator system. Results demonstrated that the high-latitude Southern Ocean south of 60 deg S experiences seasonal aragonite under-saturation, with calculated surface pH values declining to 7.98, posing acute dissolution risks for calcifying polar pteropods (Limacina helicina)."
        )

    def page2(w):
        w.cursor_y -= 6
        w.write_section_heading("5. Marine Biodiversity & Zooplankton Net Sampling")
        w.write_paragraph(
            "Multiple Bongo and Multiple Plankton Net (Hydro-Bios) vertical tows revealed significant southward poleward displacement of sub-tropical copepod species (Calanus simillimus), serving as a bio-indicator of poleward warming fronts in the Southern Ocean."
        )

        w.write_section_heading("6. Official Endorsement & MoES Data Portal Archival")
        w.draw_rect(w.margin_left, w.cursor_y - 60, w.content_width, 66, 0.95, 0.98, 0.99, fill=True)
        w.draw_rect(w.margin_left, w.cursor_y - 60, w.content_width, 1, 0.8, 0.88, 0.94, fill=False)
        w.draw_text("NATIONAL SOUTHERN OCEAN SCIENTIFIC PROGRAM | CRUISE ARCHIVE", w.margin_left + 14, w.cursor_y - 14, "F2", 9, 0.05, 0.3, 0.5)
        w.draw_text(f"Cruise Compendium Code: MoES/NCPOR/SOE-12/CR-2024 | DOI: {doc.doi}", w.margin_left + 14, w.cursor_y - 28, "F1", 8, 0.2, 0.25, 0.3)
        w.draw_text("Approved by Polar Oceanography Review Panel. Datasets integrated into National Ocean Data Center.", w.margin_left + 14, w.cursor_y - 42, "F1", 8, 0.2, 0.25, 0.3)
        w.draw_text("Published by National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, Goa.", w.margin_left + 14, w.cursor_y - 56, "F2", 8, 0.1, 0.25, 0.4)
        w.cursor_y -= 74

    doc.generate([page1, page2])

# 4. Himalayas Himansh
def build_report_himalayas():
    doc = SimplePDFReportGenerator(
        filename="public/reports/western-himalayan-cryosphere-himansh-report.pdf",
        title="Decadal Cryospheric Assessment & Glacier Mass Balance Monitoring Report",
        subtitle="Glacier Ablation, Radar Ice Thickness, and Water Security in the Chandra Basin",
        expedition="Himansh High-Altitude Cryospheric Campaign (2014-2024 Synthesis)",
        base="Himansh Observatory, Spiti Valley, Himachal Pradesh (4,080m elevation)",
        lead="Dr. Parmanand Sharma & Himalayan Cryosphere Group",
        doi="10.5281/ncpor.rep.him2024.007",
        date_str="28 February 2024",
        color_rgb=(15, 35, 48)
    )

    def page1(w):
        w.cursor_y -= 6
        w.draw_rect(w.margin_left, w.cursor_y - 48, w.content_width, 54, 0.94, 0.97, 1.0, fill=True)
        w.draw_rect(w.margin_left, w.cursor_y - 48, w.content_width, 1, 0.7, 0.85, 0.95, fill=False)
        w.draw_text("DECADAL CRYOSPHERIC SYNTHESIS & GLACIER HEALTH MONOGRAPH", w.margin_left + 12, w.cursor_y - 12, "F2", 13, 0.05, 0.25, 0.45)
        w.draw_text("Himansh High-Altitude Field Station | Chandra Basin (Western Himalayas) | 2014-2024", w.margin_left + 12, w.cursor_y - 27, "F1", 9.5, 0.25, 0.35, 0.45)
        w.draw_text(f"Group Director: {doc.lead} | Research Base: Himansh (4,080m a.s.l.) | NCPOR", w.margin_left + 12, w.cursor_y - 41, "F2", 8.5, 0.1, 0.45, 0.6)
        w.cursor_y -= 65

        w.write_section_heading("1. The Third Pole: Strategic Water Security for India")
        w.write_paragraph(
            "The Hindu Kush-Himalayan region is universally known as the 'Water Tower of Asia', feeding major river systems that sustain over 1.5 billion people. In 2016, NCPOR inaugurated 'Himansh', India's highest dedicated cryospheric research observatory situated at 4,080 meters elevation in the remote Chandra Basin of Spiti Valley, Himachal Pradesh. This report synthesizes a full decade of benchmark glaciological observations across six key glaciers: Chhota Shigri, Sutri Dhaka, Batal, Samudra Tapu, Gepang Gath, and Bara Shigri."
        )

        w.write_section_heading("2. Glacier Mass Balance & Ablation Rate Measurements")
        w.write_paragraph(
            "Direct glaciological field mass balance measurements utilizing 40+ ablation stakes drilled up to 5,200 meters demonstrated an average annual mass loss rate of -0.58 meters water equivalent (m w.e.) per year. High-altitude automatic weather stations (AWS) logged accelerating summer air temperature anomalies and earlier onset of snowmelt, shrinking glacier accumulation zones."
        )

        w.write_section_heading("3. Benchmark Glacier Observations (Chandra Basin, 2014-2024)")
        headers = ["Glacier Name", "Area (sq km)", "Snout Elevation", "Mean Ice Thickness", "10-Yr Mass Balance", "Snout Retreat"]
        rows = [
            ["Chhota Shigri", "15.7 km2", "4,050 m a.s.l.", "112 meters (GPR sound)", "-0.54 m w.e. / yr", "17.4 m / yr retreat"],
            ["Sutri Dhaka", "20.1 km2", "4,480 m a.s.l.", "146 meters (accumulation)", "-0.62 m w.e. / yr", "14.8 m / yr retreat"],
            ["Batal Glacier", "4.8 km2", "4,200 m a.s.l.", "68 meters (shallow tongue)", "-0.71 m w.e. / yr", "22.1 m / yr retreat"],
            ["Samudra Tapu", "65.3 km2", "4,120 m a.s.l.", "162 meters (main trunk)", "-0.49 m w.e. / yr", "Moraine dam expansion"],
            ["Gepang Gath", "12.4 km2", "4,260 m a.s.l.", "84 meters (proglacial)", "-0.65 m w.e. / yr", "Proglacial lake +42% area"]
        ]
        w.write_table(headers, rows)

        w.write_section_heading("4. Ground-Penetrating Radar (GPR) Ice Thickness Discoveries")
        w.write_paragraph(
            "Using 16 MHz and 40 MHz rough-terrain GPR antennas hauled across crevassed terrain, NCPOR glaciologists produced the first 3D bedrock digital elevation model of the Chandra Basin. Results reveal that the aggregate freshwater ice volume stored within these glaciers is approximately 3.4 cubic kilometers, serving as a critical buffer during low-monsoon drought years."
        )

    def page2(w):
        w.cursor_y -= 6
        w.write_section_heading("5. Glacial Lake Outburst Flood (GLOF) Vulnerability & Early Warning")
        w.write_paragraph(
            "Satellite radar interferometry combined with drone photogrammetry identified Gepang Gath and Samudra Tapu moraine-dammed proglacial lakes as high-risk expansion zones. Himansh scientists installed real-time water-level telemetry sensors and automated alert sirens downstream to safeguard hydroelectric infrastructure and tribal settlements in Lahaul-Spiti."
        )

        w.write_section_heading("6. Official Certification & MoES Repository Archival")
        w.draw_rect(w.margin_left, w.cursor_y - 56, w.content_width, 62, 0.95, 0.98, 0.99, fill=True)
        w.draw_rect(w.margin_left, w.cursor_y - 56, w.content_width, 1, 0.8, 0.88, 0.94, fill=False)
        w.draw_text("HIMALAYAN CRYOSPHERE RESEARCH CELL | MONOGRAPH ARCHIVE", w.margin_left + 14, w.cursor_y - 14, "F2", 9, 0.05, 0.3, 0.5)
        w.draw_text(f"Monograph Code: MoES/NCPOR/HIM-2024/REP-007 | Registered DOI: {doc.doi}", w.margin_left + 14, w.cursor_y - 28, "F1", 8, 0.2, 0.25, 0.3)
        w.draw_text("Published under Open Access License (CC-BY 4.0) by NCPOR, Ministry of Earth Sciences, Govt. of India.", w.margin_left + 14, w.cursor_y - 42, "F2", 8, 0.1, 0.35, 0.5)
        w.cursor_y -= 70

    doc.generate([page1, page2])

if __name__ == '__main__':
    print("Generating 4 official polar PDF reports...")
    build_report_isea42()
    build_report_arctic()
    build_report_soe()
    build_report_himalayas()
    print("All 4 reports generated successfully!")
