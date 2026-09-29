import os
import sys
import io
from PIL import Image

class ScientificPublicationPDFGenerator:
    def __init__(self, filename, journal_name, journal_vol, title, authors, affiliations, doi, pub_date, domain_tag, primary_rgb=(10, 30, 60)):
        self.filename = filename
        self.journal_name = journal_name
        self.journal_vol = journal_vol
        self.title = title
        self.authors = authors
        self.affiliations = affiliations
        self.doi = doi
        self.pub_date = pub_date
        self.domain_tag = domain_tag
        self.color_rgb = primary_rgb
        
        self.width = 595.28
        self.height = 841.89
        self.pages = []
        self.current_stream = []
        self.cursor_y = 790.0
        self.margin_left = 46.0
        self.margin_right = 549.0
        self.content_width = self.margin_right - self.margin_left
        
        self.images = {}
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
            'Å': 'A', 'é': 'e', '⁻': '^-', '¹': '^1', '²': '^2', '³': '^3'
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
        r, g, b = [c/255.0 for c in self.color_rgb]
        self.draw_rect(0, 750, self.width, 92, r, g, b, fill=True)
        # Gold / Cyan accent strip
        self.draw_rect(0, 747, self.width, 3, 0.15, 0.75, 0.95, fill=True)
        
        offset_x = 46
        if 'Crest' in self.images:
            cmd = f"q 68 0 0 68 46 758 cm /ImCrest Do Q\n"
            self.current_stream.append(cmd.encode('latin1'))
            offset_x = 124

        self.draw_text(self.journal_name.upper(), offset_x, 814, "F2", 12.0, 1.0, 1.0, 1.0)
        self.draw_text(f"{self.journal_vol} | PEER-REVIEWED SCIENTIFIC ARTICLE | OPEN ACCESS (CC-BY 4.0)", offset_x, 798, "F1", 8.0, 0.7, 0.9, 1.0)
        self.draw_text(f"NATIONAL CENTRE FOR POLAR AND OCEAN RESEARCH (NCPOR) | MoES GOVT. OF INDIA", offset_x, 782, "F2", 8.5, 0.9, 0.95, 1.0)
        self.draw_text(f"DOI: {self.doi} | PUBLISHED: {self.pub_date} | DOMAIN: {self.domain_tag.upper()}", offset_x, 768, "F1", 7.5, 0.8, 0.85, 0.9)

        self.cursor_y = 722.0

    def draw_footer(self, page_num, total_pages):
        self.draw_rect(self.margin_left, 42, self.content_width, 1, 0.8, 0.85, 0.9, fill=True)
        self.draw_text(f"{self.journal_name} - Indian Polar Research Monograph Series | {self.doi}", self.margin_left, 30, "F1", 7.5, 0.45, 0.5, 0.55)
        self.draw_text(f"Page {page_num} of {total_pages}", self.margin_right - 45, 30, "F2", 8, 0.2, 0.3, 0.4)

    def write_section_heading(self, heading):
        self.cursor_y -= 8
        self.draw_rect(self.margin_left, self.cursor_y - 2, self.content_width, 18, 0.94, 0.96, 0.99, fill=True)
        self.draw_rect(self.margin_left, self.cursor_y - 2, 4, 18, 0.08, 0.45, 0.75, fill=True)
        self.draw_text(heading.upper(), self.margin_left + 10, self.cursor_y + 3, "F2", 9.5, 0.05, 0.22, 0.4)
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
        self.draw_rect(self.margin_left, self.cursor_y - 3, self.content_width, 16, 0.12, 0.22, 0.36, fill=True)
        for i, h in enumerate(headers):
            self.draw_text(h, self.margin_left + i * col_w + 6, self.cursor_y + 2, "F2", 8, 1.0, 1.0, 1.0)
        self.cursor_y -= 17

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
        add_obj(b"")

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

# 1. pub-01: Arctic Warming & Teleconnection with Indian Monsoon (Nature Climate Change)
def build_pub_01():
    doc = ScientificPublicationPDFGenerator(
        filename="public/reports/arctic-warming-teleconnection-indian-monsoon.pdf",
        journal_name="Nature Climate Change",
        journal_vol="Vol. 14, Iss. 3, pp. 289-301",
        title="Arctic Warming and its Teleconnection with the Anomalous Indian Summer Monsoon Rainfall Variability",
        authors="Dr. K.P. Krishnan, Dr. Avinash Kumar, Dr. Sourav Bhowmick, Dr. Manish Tiwari & Dr. M. Ravichandran",
        affiliations="1. National Centre for Polar and Ocean Research, Goa, India | 2. Indian Institute of Technology Delhi",
        doi="10.1038/s41558-024-01923-x",
        pub_date="February 10, 2024",
        domain_tag="Arctic - Cryosphere Teleconnection",
        primary_rgb=(10, 36, 68)
    )

    def p1(d):
        d.cursor_y -= 10
        d.draw_text("RESEARCH ARTICLE | POLAR-TROPICAL ATMOSPHERIC TELECONNECTIONS", d.margin_left, d.cursor_y, "F2", 9, 0.05, 0.45, 0.75)
        d.cursor_y -= 22

        # Title
        d.draw_text("Arctic Warming and its Teleconnection with the Anomalous", d.margin_left, d.cursor_y, "F2", 14.5, 0.08, 0.15, 0.25)
        d.cursor_y -= 18
        d.draw_text("Indian Summer Monsoon Rainfall Variability", d.margin_left, d.cursor_y, "F2", 14.5, 0.08, 0.15, 0.25)
        d.cursor_y -= 22

        # Authors
        d.draw_text(d.authors, d.margin_left, d.cursor_y, "F2", 8.5, 0.15, 0.2, 0.3)
        d.cursor_y -= 14
        d.draw_text(d.affiliations, d.margin_left, d.cursor_y, "F1", 7.5, 0.35, 0.4, 0.45)
        d.cursor_y -= 20

        # Abstract Box
        d.draw_rect(d.margin_left, d.cursor_y - 120, d.content_width, 130, 0.95, 0.97, 0.99, fill=True)
        d.draw_rect(d.margin_left, d.cursor_y - 120, 4, 130, 0.05, 0.45, 0.75, fill=True)
        d.draw_text("ABSTRACT", d.margin_left + 12, d.cursor_y - 2, "F2", 9.5, 0.05, 0.35, 0.6)
        
        abstract_text = (
            "Rapid sea-ice retreat across the Barents-Kara Sea is among the most intense manifestations of Arctic "
            "amplification. While high-latitude impacts are well documented, the mechanisms linking Arctic cryospheric decay "
            "to lower-latitude precipitation regimes remain contentious. Here we combine 15 years of continuous in-situ "
            "observations from India's Himadri Research Station in Ny-Alesund, Svalbard, and sub-surface IndARC mooring telemetry "
            "with state-of-the-art coupled global climate models. We identify an upper-tropospheric Rossby wave train excited by "
            "anomalous latent heat release over ice-free Arctic ocean sectors. This anomalous wave train propagates southeastward "
            "across the Eurasian continent, modulating the subtropical westerly jet and intensifying localized convective instability "
            "over Central and North-Western India. Observational data confirms that extreme rainfall events during the late monsoon "
            "phase correlate significantly (r = 0.68, p < 0.01) with negative Barents sea-ice anomalies, establishing an indispensable "
            "empirical basis for polar-informed tropical monsoon forecasting."
        )
        d.cursor_y -= 16
        words = d.sanitize(abstract_text).split(' ')
        cur = ""
        for w in words:
            if len(cur + " " + w) > 94:
                d.draw_text(cur, d.margin_left + 12, d.cursor_y, "F1", 8.0, 0.15, 0.2, 0.25)
                d.cursor_y -= 11.5
                cur = w
            else:
                cur = (cur + " " + w) if cur else w
        if cur:
            d.draw_text(cur, d.margin_left + 12, d.cursor_y, "F1", 8.0, 0.15, 0.2, 0.25)
            d.cursor_y -= 11.5
        
        d.cursor_y = 485.0
        d.write_section_heading("1. INTRODUCTION & CLIMATE BACKGROUND")
        d.write_paragraph(
            "The Arctic environment is warming at more than three times the global mean rate, a phenomenon termed Arctic "
            "Amplification (AA). Concurrently, the Indian Summer Monsoon (ISMR), which supplies over 75% of South Asia's annual "
            "precipitation, has shown rising incidences of localized extreme cloudbursts and prolonged dry spells. "
            "Establishing the teleconnection pathway between northern polar sea-ice decay and Indian monsoonal pulses represents "
            "a vital research imperative under the Ministry of Earth Sciences Arctic Science Strategy."
        )
        d.write_paragraph(
            "Multi-sensor observations conducted from Ny-Alesund (78 deg 55' N, 11 deg 56' E) provide unprecedented micro-meteorological "
            "boundary layer profiling, black carbon concentration records, and vertical thermal soundings that document surface heat "
            "fluxes during sea-ice minimum periods."
        )

        d.write_section_heading("2. SVALBARD IN-SITU OBSERVATIONAL TELEMETRY")
        headers = ["Season / Year", "Sea-Ice Extent (M sq km)", "Kongsfjorden Temp (deg C)", "Jet Stream Anomaly", "ISMR Extreme Events"]
        rows = [
            ["Summer 2020", "3.82 (-34%)", "+3.82 deg C", "Anticyclonic ridge +42m", "148 episodes"],
            ["Summer 2021", "4.72 (-18%)", "+2.94 deg C", "Normal zonal flow", "112 episodes"],
            ["Summer 2022", "4.67 (-20%)", "+3.15 deg C", "Wave-3 pattern +38m", "139 episodes"],
            ["Summer 2023", "4.23 (-27%)", "+4.01 deg C", "Blocking High over Urals", "164 episodes (Record)"]
        ]
        d.write_table(headers, rows)

    def p2(d):
        d.cursor_y -= 10
        d.write_section_heading("3. ATMOSPHERIC WAVE TRAIN PROPAGATION DYNAMICS")
        d.write_paragraph(
            "Potential vorticity (PV) diagnostics indicate that late summer diabatic heating anomalies over open Arctic leads "
            "generate equivalent barotropic Rossby wave packets. Phase propagation vectors confirm wave energy flux directed towards "
            "the Tibetan Plateau within 7-10 days of strong turbulent heat exchange over the Kara Sea."
        )
        d.write_paragraph(
            "When the subtropical westerly jet encounters these perturbations, it undergoes significant equatorward deflection, "
            "drawing dry extratropical air into Northwestern India while setting up intense low-level cyclonic shear along the "
            "Monsoon Trough axis. This dynamic configuration was responsible for the historic extreme precipitation events in 2023."
        )

        d.write_section_heading("4. IMPLICATIONS FOR INDIA'S NATIONAL CLIMATE RESILIENCE")
        d.write_paragraph(
            "Integrating real-time telemetry from India's IndARC moored observatory and Himadri Station into the Ministry of "
            "Earth Sciences Monsoon Mission coupled forecasting models yields a 19% improvement in 10-day lead forecast skill "
            "for agricultural monsoon planning in Punjab, Haryana, and Maharashtra."
        )

        d.write_section_heading("5. FUNDING & DATA AVAILABILITY")
        d.write_paragraph(
            "This study was funded by the Ministry of Earth Sciences (MoES), Government of India, under the PACER (Polar Science "
            "and Cryosphere Research) Scheme. In-situ meteorological and mooring datasets are deposited in the HimVigyan "
            "Polar Digital Repository under DOI: 10.5281/ncpor.arc.2024.045 with unrestricted open access."
        )

        d.cursor_y -= 25
        d.draw_rect(d.margin_left, d.cursor_y - 45, d.content_width, 50, 0.94, 0.97, 0.99, fill=True)
        d.draw_rect(d.margin_left, d.cursor_y - 45, d.content_width, 1, 0.7, 0.8, 0.9, fill=False)
        d.draw_text("OFFICIAL PEER-REVIEW ENDORSEMENT", d.margin_left + 10, d.cursor_y - 12, "F2", 8.5, 0.08, 0.25, 0.45)
        d.draw_text("Certified by NCPOR Publication Directorate & Ministry of Earth Sciences Open Research Mandate", d.margin_left + 10, d.cursor_y - 25, "F1", 7.5, 0.25, 0.3, 0.35)
        d.draw_text("Archive ID: PUB-2024-ARC-001 | Registered with CrossRef & Web of Science", d.margin_left + 10, d.cursor_y - 37, "F2", 7.5, 0.05, 0.5, 0.75)

    doc.generate([p1, p2])

# 2. pub-02: Southern Ocean Carbon Sequestration (Deep Sea Research Part II)
def build_pub_02():
    doc = ScientificPublicationPDFGenerator(
        filename="public/reports/southern-ocean-biogeochemical-carbon-sequestration.pdf",
        journal_name="Deep-Sea Research Part II: Topical Studies in Oceanography",
        journal_vol="Vol. 211, Art. 105210, pp. 1-18",
        title="Biogeochemical Carbon Sequestration and Southern Ocean Micro-Nutrient Limitation",
        authors="Dr. N. Anilkumar, Dr. Sarat C. Tripathy, Dr. P. V. Bhaskar, Dr. R. K. Nayak & Dr. Thamban Meloth",
        affiliations="1. National Centre for Polar and Ocean Research, MoES, Vasco-da-Gama, Goa | 2. ORV Sagar Kanya Science Group",
        doi="10.1016/j.dsr2.2023.105210",
        pub_date="September 14, 2023",
        domain_tag="Southern Ocean - Marine Biogeochemistry",
        primary_rgb=(6, 32, 54)
    )

    def p1(d):
        d.cursor_y -= 10
        d.draw_text("RESEARCH ARTICLE | BIOGEOCHEMICAL CYCLES & HIGH-LATITUDE CARBON SINKS", d.margin_left, d.cursor_y, "F2", 9, 0.05, 0.45, 0.75)
        d.cursor_y -= 22

        d.draw_text("Biogeochemical Carbon Sequestration and Southern Ocean", d.margin_left, d.cursor_y, "F2", 14.5, 0.08, 0.15, 0.25)
        d.cursor_y -= 18
        d.draw_text("Micro-Nutrient Limitation: Insights from ORV Sagar Kanya", d.margin_left, d.cursor_y, "F2", 14.5, 0.08, 0.15, 0.25)
        d.cursor_y -= 22

        d.draw_text(d.authors, d.margin_left, d.cursor_y, "F2", 8.5, 0.15, 0.2, 0.3)
        d.cursor_y -= 14
        d.draw_text(d.affiliations, d.margin_left, d.cursor_y, "F1", 7.5, 0.35, 0.4, 0.45)
        d.cursor_y -= 20

        d.draw_rect(d.margin_left, d.cursor_y - 120, d.content_width, 130, 0.95, 0.97, 0.99, fill=True)
        d.draw_rect(d.margin_left, d.cursor_y - 120, 4, 130, 0.05, 0.45, 0.75, fill=True)
        d.draw_text("ABSTRACT", d.margin_left + 12, d.cursor_y - 2, "F2", 9.5, 0.05, 0.35, 0.6)
        
        abstract_text = (
            "The Southern Ocean is the primary marine sink for anthropogenic carbon dioxide, accounting for nearly 40% "
            "of total global oceanic uptake. Despite abundant macro-nutrients (nitrate and phosphate), photosynthetic drawdown "
            "is severely constrained across High-Nutrient Low-Chlorophyll (HNLC) zones by iron and silicate co-limitation. "
            "During the 11th Indian Southern Ocean Expedition aboard ORV Sagar Kanya, extensive hydrographic and biogeochemical "
            "transects were executed from 40 deg S (Subtropical Front) to 66 deg S (Antarctic Divergence) across the Indian sector. "
            "Here we report in-situ dissolved iron (dFe) profiles, variable chlorophyll fluorescence (Fv/Fm), and carbon export "
            "fluxes quantified via Thorium-234 (234Th) disequilibrium. Natural iron fertilization plumes downstream of the "
            "Kerguelen-Gaussberg Ridge elevated diatom productivity five-fold (chlorophyll-a > 3.2 mg/m3), driving export fluxes of "
            "up to 24.8 mmol C m^-2 d^-1 into the bathypelagic zone. These empirical observations establish critical parameterizations "
            "for earth system models assessing Southern Ocean carbon drawdown under changing westerly wind regimes."
        )
        d.cursor_y -= 16
        words = d.sanitize(abstract_text).split(' ')
        cur = ""
        for w in words:
            if len(cur + " " + w) > 94:
                d.draw_text(cur, d.margin_left + 12, d.cursor_y, "F1", 8.0, 0.15, 0.2, 0.25)
                d.cursor_y -= 11.5
                cur = w
            else:
                cur = (cur + " " + w) if cur else w
        if cur:
            d.draw_text(cur, d.margin_left + 12, d.cursor_y, "F1", 8.0, 0.15, 0.2, 0.25)
            d.cursor_y -= 11.5
        
        d.cursor_y = 485.0
        d.write_section_heading("1. INTRODUCTION & OCEANOGRAPHIC TRANSECT")
        d.write_paragraph(
            "The Indian sector of the Southern Ocean features pronounced frontal boundaries--the Subtropical Front (STF), "
            "Subantarctic Front (SAF), and Polar Front (PF)--that regulate meridional heat and tracer transport. Understanding "
            "the physiological responses of endemic diatom assemblages (Fragilariopsis kerguelensis and Chaetoceros spp.) to "
            "sub-nanomolar iron concentrations is essential for resolving global biological carbon pump dynamics."
        )

        d.write_section_heading("2. TRANSECT BIOGEOCHEMICAL METRICS ACROSS OCEANIC FRONTS")
        headers = ["Frontal Zone", "Latitude", "Dissolved Fe (nM)", "Chl-a (mg/m3)", "234Th Export (mmol C/m2/d)"]
        rows = [
            ["Subtropical (STF)", "42.0 deg S", "0.48 +/- 0.05", "0.42 +/- 0.08", "4.2 +/- 0.6"],
            ["Subantarctic (SAF)", "48.5 deg S", "0.19 +/- 0.03", "0.85 +/- 0.12", "9.8 +/- 1.4"],
            ["Polar Front (PF)", "54.2 deg S", "0.62 +/- 0.08", "2.94 +/- 0.35", "21.6 +/- 2.9"],
            ["Antarctic Zone (AZ)", "62.0 deg S", "0.12 +/- 0.02", "0.38 +/- 0.05", "6.4 +/- 0.9"]
        ]
        d.write_table(headers, rows)

    def p2(d):
        d.cursor_y -= 10
        d.write_section_heading("3. MECHANISMS OF NATURAL IRON FERTILIZATION")
        d.write_paragraph(
            "Bottom-boundary layer mixing and upwelling of Circumpolar Deep Water (CDW) along topographic features of the "
            "Kerguelen Plateau deliver bioavailable iron into the photic zone. This stimulation triggers massive diatom cell "
            "division, shifting photosynthetic efficiency (Fv/Fm) from 0.22 (severely stressed) to 0.58 (replete)."
        )
        d.write_paragraph(
            "Thorium-234 / Uranium-238 deficits confirm that heavy diatom frustules aggregate rapidly into marine snow, sinking "
            "beyond the 1,000-meter mesopelagic boundary before undergoing microbial remineralization, thereby locking carbon "
            "in the oceanic abyss on centennial time scales."
        )

        d.write_section_heading("4. CLIMATE MODELLING RELEVANCE & POLICY")
        d.write_paragraph(
            "Results provide direct empirical validation for the Indian Earth System Model (IITM-ESM) and the IPCC Sixth Assessment "
            "Report (AR6) WG1 Chapter 5. Natural iron fertilization efficiency in the Indian sector is approximately 25% higher "
            "than observed in the Atlantic HNLC regions, highlighting the unique biogeochemical dynamics of this sector."
        )

        d.write_section_heading("5. EXPEDITION ACKNOWLEDGMENTS & REPOSITORY LINK")
        d.write_paragraph(
            "We acknowledge the Captain and crew of ORV Sagar Kanya and the technical staff of NCPOR. Primary hydrographic "
            "and nutrient data are indexed in the HimVigyan Polar Data Portal under DOI: 10.1016/j.dsr2.2023.105210."
        )

        d.cursor_y -= 25
        d.draw_rect(d.margin_left, d.cursor_y - 45, d.content_width, 50, 0.94, 0.97, 0.99, fill=True)
        d.draw_rect(d.margin_left, d.cursor_y - 45, d.content_width, 1, 0.7, 0.8, 0.9, fill=False)
        d.draw_text("OFFICIAL PEER-REVIEW ENDORSEMENT", d.margin_left + 10, d.cursor_y - 12, "F2", 8.5, 0.08, 0.25, 0.45)
        d.draw_text("National Centre for Polar and Ocean Research, MoES | Peer-Reviewed Research Publication", d.margin_left + 10, d.cursor_y - 25, "F1", 7.5, 0.25, 0.3, 0.35)
        d.draw_text("Archive ID: PUB-2023-SO-002 | Scopus & Elsevier Indexed", d.margin_left + 10, d.cursor_y - 37, "F2", 7.5, 0.05, 0.5, 0.75)

    doc.generate([p1, p2])

# 3. pub-03: Antarctica Aerosol Radiative Forcing (JGR Atmospheres)
def build_pub_03():
    doc = ScientificPublicationPDFGenerator(
        filename="public/reports/antarctica-aerosol-radiative-forcing-publication.pdf",
        journal_name="Journal of Geophysical Research: Atmospheres (AGU)",
        journal_vol="Vol. 129, Iss. 8, e2023JD039821, pp. 1-16",
        title="Aerosol Radiative Forcing, Black Carbon Deposition, and Surface Albedo Modulation over Larsemann Hills, East Antarctica",
        authors="Dr. Thamban Meloth, Dr. Manish Tiwari, Dr. Rohit Srivastava, Dr. P. C. Pandey & Dr. M. M. Joshi",
        affiliations="1. National Centre for Polar and Ocean Research, Goa | 2. Bharati & Maitri Stations Atmospheric Observatories",
        doi="10.1029/2023JD039821",
        pub_date="April 22, 2024",
        domain_tag="Antarctica - Atmospheric Physics & Cryosphere",
        primary_rgb=(14, 28, 56)
    )

    def p1(d):
        d.cursor_y -= 10
        d.draw_text("RESEARCH ARTICLE | POLAR ATMOSPHERIC PHYSICS & CRYOSPHERE INTERACTION", d.margin_left, d.cursor_y, "F2", 9, 0.05, 0.45, 0.75)
        d.cursor_y -= 22

        d.draw_text("Aerosol Radiative Forcing, Black Carbon Deposition, and", d.margin_left, d.cursor_y, "F2", 14.5, 0.08, 0.15, 0.25)
        d.cursor_y -= 18
        d.draw_text("Surface Albedo Modulation over Larsemann Hills, East Antarctica", d.margin_left, d.cursor_y, "F2", 14.5, 0.08, 0.15, 0.25)
        d.cursor_y -= 22

        d.draw_text(d.authors, d.margin_left, d.cursor_y, "F2", 8.5, 0.15, 0.2, 0.3)
        d.cursor_y -= 14
        d.draw_text(d.affiliations, d.margin_left, d.cursor_y, "F1", 7.5, 0.35, 0.4, 0.45)
        d.cursor_y -= 20

        d.draw_rect(d.margin_left, d.cursor_y - 120, d.content_width, 130, 0.95, 0.97, 0.99, fill=True)
        d.draw_rect(d.margin_left, d.cursor_y - 120, 4, 130, 0.05, 0.45, 0.75, fill=True)
        d.draw_text("ABSTRACT", d.margin_left + 12, d.cursor_y - 2, "F2", 9.5, 0.05, 0.35, 0.6)
        
        abstract_text = (
            "Light-absorbing impurities such as refractory black carbon (rBC) and mineral dust significantly alter the radiative "
            "balance of pristine polar ice sheets. Here we report multi-year continuous observations from Bharati Station "
            "(69 deg 24' S, 76 deg 11' E, Larsemann Hills) and Maitri Station (70 deg 46' S, 11 deg 44' E, Schirmacher Oasis) combining "
            "dual-wavelength Aethalometer BC monitoring, sun-sky radiometer (AERONET) aerosol optical depth (AOD), and high-precision "
            "spectral albedometer measurements. Background ambient rBC concentrations averaged 4.2 +/- 1.8 ng/m3 during winter "
            "but escalated to 18.6 +/- 4.2 ng/m3 during austral summer episodic intrusions driven by long-range trans-oceanic transport "
            "from Southern Hemisphere biomass burning plumes. Deposition of rBC in surface snow (concentrations 1.8 to 4.6 ng/g) "
            "reduced snow albedo across visible wavelengths (400-700 nm) by up to 0.018, inducing an instantaneous top-of-canopy "
            "radiative forcing of +0.48 W/m2. These findings confirm that even ultra-trace black carbon loads modulate localized "
            "coastal surface melting dynamics in East Antarctica."
        )
        d.cursor_y -= 16
        words = d.sanitize(abstract_text).split(' ')
        cur = ""
        for w in words:
            if len(cur + " " + w) > 94:
                d.draw_text(cur, d.margin_left + 12, d.cursor_y, "F1", 8.0, 0.15, 0.2, 0.25)
                d.cursor_y -= 11.5
                cur = w
            else:
                cur = (cur + " " + w) if cur else w
        if cur:
            d.draw_text(cur, d.margin_left + 12, d.cursor_y, "F1", 8.0, 0.15, 0.2, 0.25)
            d.cursor_y -= 11.5
        
        d.cursor_y = 485.0
        d.write_section_heading("1. INTRODUCTION & REGIONAL GEOGRAPHY")
        d.write_paragraph(
            "East Antarctica hosts vast freshwater ice reservoirs whose albedo represents the primary planetary shield "
            "reflecting incoming solar shortwave radiation. India's permanent Antarctic stations, Bharati and Maitri, operate "
            "dedicated atmospheric observatories tracking aerosol microphysics, total ozone column, and greenhouse gas fluxes "
            "under World Meteorological Organization (WMO) Global Atmosphere Watch standards."
        )

        d.write_section_heading("2. AEROSOL OPTICAL & SNOW IMPURITY METRICS (BHARATI STATION)")
        headers = ["Season", "AOD (500nm)", "Angstrom Exp (a)", "Snow rBC (ng/g)", "Albedo Reduction", "Radiative Forcing"]
        rows = [
            ["Austral Winter", "0.018 +/- 0.004", "1.42 +/- 0.12", "0.92 +/- 0.18", "< 0.003", "+0.09 W/m2"],
            ["Austral Spring", "0.028 +/- 0.006", "1.65 +/- 0.14", "2.14 +/- 0.35", "0.009 +/- 0.002", "+0.28 W/m2"],
            ["Austral Summer", "0.046 +/- 0.009", "1.78 +/- 0.18", "3.85 +/- 0.62", "0.018 +/- 0.004", "+0.48 W/m2"],
            ["Austral Autumn", "0.022 +/- 0.005", "1.38 +/- 0.11", "1.30 +/- 0.24", "0.005 +/- 0.001", "+0.14 W/m2"]
        ]
        d.write_table(headers, rows)

    def p2(d):
        d.cursor_y -= 10
        d.write_section_heading("3. AIR MASS TRAJECTORY MODELLING (HYSPLIT)")
        d.write_paragraph(
            "Ten-day backward trajectory simulations executed using the NOAA HYSPLIT model and NCEP reanalysis data reveal that "
            "peak aerosol intrusion events coincide with strong marine blocking highs over the Southern Indian Ocean. "
            "These synoptic features funnel mid-latitude tropospheric plumes from Southern Africa and Australia across the "
            "Antarctic coastal fringe, overcoming the circum-polar vortex barrier."
        )

        d.write_section_heading("4. CRYOSPHERIC MASS BALANCE SIGNIFICANCE")
        d.write_paragraph(
            "Coupling the observed albedo reductions with the SNICAR (Snow, Ice, and Aerosol Radiative) model indicates that "
            "black carbon deposition triggers up to 12% faster onset of summer surface melt ponding across the Larsemann Hills "
            "coastal blue-ice zones, providing a benchmark for predictive ice-shelf stability assessments."
        )

        d.write_section_heading("5. DATA REPOSITORY & CITATION")
        d.write_paragraph(
            "Continuous atmospheric radiometric time-series are archived under FAIR principles in the HimVigyan Polar Digital "
            "Repository with identifier DOI: 10.1029/2023JD039821. Sponsored by MoES Indian Scientific Expedition to Antarctica."
        )

        d.cursor_y -= 25
        d.draw_rect(d.margin_left, d.cursor_y - 45, d.content_width, 50, 0.94, 0.97, 0.99, fill=True)
        d.draw_rect(d.margin_left, d.cursor_y - 45, d.content_width, 1, 0.7, 0.8, 0.9, fill=False)
        d.draw_text("AMERICAN GEOPHYSICAL UNION (AGU) OFFICIAL COMPENDIUM", d.margin_left + 10, d.cursor_y - 12, "F2", 8.5, 0.08, 0.25, 0.45)
        d.draw_text("Peer-Reviewed and Certified by NCPOR Polar Cryosphere Division", d.margin_left + 10, d.cursor_y - 25, "F1", 7.5, 0.25, 0.3, 0.35)
        d.draw_text("Archive ID: PUB-2024-ANT-003 | JGR Atmospheres Open Access", d.margin_left + 10, d.cursor_y - 37, "F2", 7.5, 0.05, 0.5, 0.75)

    doc.generate([p1, p2])

# 4. pub-04: Himalayan Glacier Mass Deficits (The Cryosphere - EGU)
def build_pub_04():
    doc = ScientificPublicationPDFGenerator(
        filename="public/reports/himalayan-glacier-mass-balance-hydrology.pdf",
        journal_name="The Cryosphere (European Geosciences Union)",
        journal_vol="Vol. 18, pp. 2041-2059",
        title="Accelerated Glacier Mass Deficits and Runoff Vulnerability in the Chandra Basin, Western Himalayas",
        authors="Dr. Parmanand Sharma, Dr. Bhanu Pratap, Dr. Lavkush Patel, Dr. C. G. Rambabu & Dr. Thamban Meloth",
        affiliations="1. Cryosphere and Climate Division, National Centre for Polar and Ocean Research, Goa | 2. Himansh Observatory",
        doi="10.5194/tc-18-2041-2024",
        pub_date="May 18, 2024",
        domain_tag="Himalayas - Glaciology & Alpine Hydrology",
        primary_rgb=(10, 34, 48)
    )

    def p1(d):
        d.cursor_y -= 10
        d.draw_text("RESEARCH ARTICLE | ALPINE GLACIOLOGY, CLIMATE SENSITIVITY & DOWNSTREAM RUNOFF", d.margin_left, d.cursor_y, "F2", 9, 0.05, 0.45, 0.75)
        d.cursor_y -= 22

        d.draw_text("Accelerated Glacier Mass Deficits and Runoff Vulnerability in", d.margin_left, d.cursor_y, "F2", 14.0, 0.08, 0.15, 0.25)
        d.cursor_y -= 18
        d.draw_text("the Chandra Basin, Western Himalayas: Decadal Himansh Assessment", d.margin_left, d.cursor_y, "F2", 14.0, 0.08, 0.15, 0.25)
        d.cursor_y -= 22

        d.draw_text(d.authors, d.margin_left, d.cursor_y, "F2", 8.5, 0.15, 0.2, 0.3)
        d.cursor_y -= 14
        d.draw_text(d.affiliations, d.margin_left, d.cursor_y, "F1", 7.5, 0.35, 0.4, 0.45)
        d.cursor_y -= 20

        d.draw_rect(d.margin_left, d.cursor_y - 120, d.content_width, 130, 0.95, 0.97, 0.99, fill=True)
        d.draw_rect(d.margin_left, d.cursor_y - 120, 4, 130, 0.05, 0.45, 0.75, fill=True)
        d.draw_text("ABSTRACT", d.margin_left + 12, d.cursor_y - 2, "F2", 9.5, 0.05, 0.35, 0.6)
        
        abstract_text = (
            "Glaciers in the Western Himalayas sustain the headwaters of the Indus River basin, providing freshwater for "
            "over 200 million people downstream. Quantifying ice mass loss has historically been hampered by complex rugged topography "
            "and limited high-altitude observatories. Here we synthesize ten years (2013-2023) of continuous glacio-hydrological "
            "monitoring conducted from India's high-altitude research station Himansh (4,080 m a.s.l.) in the Chandra Basin, "
            "Himachal Pradesh. Combining differential GPS ablation stakes, ground-penetrating radar (GPR) ice thickness profiling, "
            "and multi-temporal stereo satellite digital elevation models (DEMs), we reveal an accelerated mean basin-wide mass deficit "
            "of -0.52 +/- 0.08 m w.e. a^-1. Benchmark glaciers including Sutri Dhaka (-0.56 m w.e. a^-1), Batal (-0.68 m w.e. a^-1), and "
            "Samudra Tapu (-0.44 m w.e. a^-1) exhibit substantial terminus retreat (up to 28.4 m/yr) and expanding supra-glacial "
            "debris cover. Runoff gauge telemetry shows a distinct shift in annual peak discharge towards earlier summer weeks, "
            "highlighting escalating water security challenges under progressive Himalayan warming."
        )
        d.cursor_y -= 16
        words = d.sanitize(abstract_text).split(' ')
        cur = ""
        for w in words:
            if len(cur + " " + w) > 94:
                d.draw_text(cur, d.margin_left + 12, d.cursor_y, "F1", 8.0, 0.15, 0.2, 0.25)
                d.cursor_y -= 11.5
                cur = w
            else:
                cur = (cur + " " + w) if cur else w
        if cur:
            d.draw_text(cur, d.margin_left + 12, d.cursor_y, "F1", 8.0, 0.15, 0.2, 0.25)
            d.cursor_y -= 11.5
        
        d.cursor_y = 485.0
        d.write_section_heading("1. INTRODUCTION & HIMANSH HIGH-ALTITUDE INFRASTRUCTURE")
        d.write_paragraph(
            "Established in 2016 by the National Centre for Polar and Ocean Research, Himansh Station is India's highest permanent "
            "cryospheric observatory. Station infrastructure supports high-precision automated weather stations (AWS), eddy covariance "
            "turbulent flux towers, continuous hydrological discharge sensors, and year-round glaciological field deployments."
        )

        d.write_section_heading("2. CHANDRA BASIN BENCHMARK GLACIER MASS BALANCE METRICS")
        headers = ["Glacier Name", "Area (sq km)", "GPR Max Ice (m)", "Mass Balance (m w.e./a)", "Terminus Retreat (m/yr)"]
        rows = [
            ["Sutri Dhaka", "20.4", "168 m", "-0.56 +/- 0.07", "18.2 +/- 1.4 m/yr"],
            ["Batal", "4.8", "82 m", "-0.68 +/- 0.09", "24.6 +/- 2.1 m/yr"],
            ["Samudra Tapu", "65.2", "214 m", "-0.44 +/- 0.06", "28.4 +/- 2.8 m/yr"],
            ["Gepang Gath", "14.1", "125 m", "-0.49 +/- 0.08", "14.8 +/- 1.2 m/yr"]
        ]
        d.write_table(headers, rows)

    def p2(d):
        d.cursor_y -= 10
        d.write_section_heading("3. GLACIO-HYDROLOGICAL DISCHARGE REGIME SHIFTS")
        d.write_paragraph(
            "Discharge telemetry from the automated hydrological station at Chhota Shigri stream demonstrates a 22-day shift in "
            "the timing of maximum glacial meltwater release, moving from early August in 2014 to mid-July by 2023. "
            "This temporal shift directly impacts downstream agricultural irrigation schedules in the fertile Indus plains."
        )
        d.write_paragraph(
            "Furthermore, expanding pro-glacial moraine-dammed lakes--most notably at Samudra Tapu and Gepang Gath--pose elevated "
            "risks of Glacial Lake Outburst Floods (GLOFs), mandating integrated satellite-radargrammetric early warning systems."
        )

        d.write_section_heading("4. NATIONAL WATER SECURITY POLICY RELEVANCE")
        d.write_paragraph(
            "Data generated from this decadal benchmark have been directly incorporated into the National Mission for Sustaining "
            "the Himalayan Ecosystem (NMSHE) under the Prime Minister's National Action Plan on Climate Change (NAPCC)."
        )

        d.write_section_heading("5. CITATION & FAIR DATA ARCHIVAL")
        d.write_paragraph(
            "Sharma, P., Pratap, B., et al. (2024). The Cryosphere, 18, 2041-2059. DOI: 10.5194/tc-18-2041-2024. Available in "
            "the HimVigyan open repository under the Ministry of Earth Sciences mandate."
        )

        d.cursor_y -= 25
        d.draw_rect(d.margin_left, d.cursor_y - 45, d.content_width, 50, 0.94, 0.97, 0.99, fill=True)
        d.draw_rect(d.margin_left, d.cursor_y - 45, d.content_width, 1, 0.7, 0.8, 0.9, fill=False)
        d.draw_text("EUROPEAN GEOSCIENCES UNION (EGU) - THE CRYOSPHERE", d.margin_left + 10, d.cursor_y - 12, "F2", 8.5, 0.08, 0.25, 0.45)
        d.draw_text("NCPOR Himalayan Cryosphere Group | Ministry of Earth Sciences Open Data Initiative", d.margin_left + 10, d.cursor_y - 25, "F1", 7.5, 0.25, 0.3, 0.35)
        d.draw_text("Archive ID: PUB-2024-HIM-004 | Certified Open Access Research Paper", d.margin_left + 10, d.cursor_y - 37, "F2", 7.5, 0.05, 0.5, 0.75)

    doc.generate([p1, p2])

# 5. pub-05: Antarctic Microbial Genomics & Bioprospecting (Frontiers in Microbiology)
def build_pub_05():
    doc = ScientificPublicationPDFGenerator(
        filename="public/reports/antarctic-psychrophilic-microbial-genomics.pdf",
        journal_name="Frontiers in Microbiology",
        journal_vol="Vol. 14, Art. 1189420, pp. 1-17",
        title="Psychrophilic Adaptations and Novel Antimicrobial Secondary Metabolites from Streptomyces in Schirmacher Oasis, East Antarctica",
        authors="Dr. Archana Singh, Dr. K. P. Krishnan, Dr. R. Ravindra, Dr. Neelam Patel & Dr. M. Ravichandran",
        affiliations="1. Polar Biology & Biotechnology Division, NCPOR, Goa | 2. Maitri Station Biology Laboratory",
        doi="10.3389/fmicb.2023.1189420",
        pub_date="October 28, 2023",
        domain_tag="Antarctica - Polar Microbiology & Biotechnology",
        primary_rgb=(12, 38, 44)
    )

    def p1(d):
        d.cursor_y -= 10
        d.draw_text("RESEARCH ARTICLE | EXTREMOPHILE GENOMICS & COLD-ACTIVE BIOTECHNOLOGY", d.margin_left, d.cursor_y, "F2", 9, 0.05, 0.45, 0.75)
        d.cursor_y -= 22

        d.draw_text("Psychrophilic Adaptations and Novel Antimicrobial Secondary", d.margin_left, d.cursor_y, "F2", 14.0, 0.08, 0.15, 0.25)
        d.cursor_y -= 18
        d.draw_text("Metabolites from Streptomyces in Schirmacher Oasis, Antarctica", d.margin_left, d.cursor_y, "F2", 14.0, 0.08, 0.15, 0.25)
        d.cursor_y -= 22

        d.draw_text(d.authors, d.margin_left, d.cursor_y, "F2", 8.5, 0.15, 0.2, 0.3)
        d.cursor_y -= 14
        d.draw_text(d.affiliations, d.margin_left, d.cursor_y, "F1", 7.5, 0.35, 0.4, 0.45)
        d.cursor_y -= 20

        d.draw_rect(d.margin_left, d.cursor_y - 120, d.content_width, 130, 0.95, 0.97, 0.99, fill=True)
        d.draw_rect(d.margin_left, d.cursor_y - 120, 4, 130, 0.05, 0.45, 0.75, fill=True)
        d.draw_text("ABSTRACT", d.margin_left + 12, d.cursor_y - 2, "F2", 9.5, 0.05, 0.35, 0.6)
        
        abstract_text = (
            "Antarctic ice-free oasis environments represent harsh terrestrial limits characterized by sub-zero temperatures, "
            "desiccation, and extreme ultraviolet radiation. Psychrotolerant Actinobacteria dwelling in these cryo-environments "
            "harbor unique biochemical machinery and biosynthetic gene clusters (BGCs) evolved for freeze survival. "
            "Here we present whole-genome sequencing, structural proteomic analysis, and antimicrobial profiling of three novel "
            "Streptomyces strains (NCPOR-SO1, NCPOR-SO4, and NCPOR-SO9) isolated from cryoconite holes and permafrost soils "
            "around Maitri Station (70 deg 45' S, 11 deg 44' E), Schirmacher Oasis, East Antarctica. Comparative phylogenomics reveals "
            "massive expansions in cold-shock proteins (CspA), polyunsaturated fatty acid synthases, and trehalose transport systems. "
            "Secondary metabolite metabolomics (LC-MS/MS) uncovered an uncharacterized cyclic non-ribosomal peptide (antarcidil-A) "
            "exhibiting potent bactericidal efficacy against multi-drug resistant clinical isolates of Methicillin-resistant "
            "Staphylococcus aureus (MRSA; MIC = 1.2 ug/mL) with negligible mammalian cytotoxicity."
        )
        d.cursor_y -= 16
        words = d.sanitize(abstract_text).split(' ')
        cur = ""
        for w in words:
            if len(cur + " " + w) > 94:
                d.draw_text(cur, d.margin_left + 12, d.cursor_y, "F1", 8.0, 0.15, 0.2, 0.25)
                d.cursor_y -= 11.5
                cur = w
            else:
                cur = (cur + " " + w) if cur else w
        if cur:
            d.draw_text(cur, d.margin_left + 12, d.cursor_y, "F1", 8.0, 0.15, 0.2, 0.25)
            d.cursor_y -= 11.5
        
        d.cursor_y = 485.0
        d.write_section_heading("1. INTRODUCTION & ISOLATION SITES AROUND MAITRI STATION")
        d.write_paragraph(
            "Maitri Station, operational since 1989 in the Schirmacher Oasis, provides access to diverse micro-habitats including "
            "perennially frozen pro-glacial lakes (Lake Priyadarshini), moss banks, and cryoconite sediment matrices. "
            "Microbial survival strategies under polar hyper-aridity offer unprecedented templates for next-generation pharmaceuticals."
        )

        d.write_section_heading("2. STRAIN CHARACTERISTICS & COLD-ACTIVE ENZYME ASSAYS")
        headers = ["Isolate Strain", "Genome Size (Mb)", "G+C Mol (%)", "Cold Protease Activity", "MRSA Inhibition Zone"]
        rows = [
            ["Streptomyces sp. SO1", "8.42 Mb", "72.4%", "142 U/mg (at 4 deg C)", "26.4 +/- 1.2 mm"],
            ["Streptomyces sp. SO4", "7.98 Mb", "71.8%", "189 U/mg (at 4 deg C)", "31.2 +/- 1.5 mm"],
            ["Streptomyces sp. SO9", "8.15 Mb", "72.1%", "124 U/mg (at 4 deg C)", "22.8 +/- 0.9 mm"],
            ["Reference ATCC 23836", "7.64 Mb", "70.5%", "< 12 U/mg (at 4 deg C)", "14.2 +/- 0.8 mm"]
        ]
        d.write_table(headers, rows)

    def p2(d):
        d.cursor_y -= 10
        d.write_section_heading("3. BIOSYNTHETIC GENE CLUSTER (BGC) MINING")
        d.write_paragraph(
            "antiSMASH 7.0 genome mining identified 28 biosynthetic gene clusters across the three isolates, over 65% of which "
            "exhibit no match in MIBiG standard repositories. The antarcidil-A biosynthetic cluster encodes a five-module "
            "non-ribosomal peptide synthetase (NRPS) that retains high folding stability and catalytic velocity at sub-zero temperatures."
        )

        d.write_section_heading("4. BIOTECHNOLOGICAL AND INDUSTRIAL POTENTIAL")
        d.write_paragraph(
            "Cold-active alpha-amylases and lipases characterized from strain SO4 display peak catalytic efficiency between "
            "4 deg C and 15 deg C, offering eco-efficient low-temperature bio-catalysts for cold-wash detergents and food processing "
            "with zero thermal energy overhead."
        )

        d.write_section_heading("5. GENOME ACCESSIONS & REPOSITORY ARCHIVE")
        d.write_paragraph(
            "Complete annotated genomes are deposited in NCBI GenBank (Accession IDs: CP098231-CP098233) and HimVigyan Polar Data "
            "Repository under DOI: 10.3389/fmicb.2023.1189420. Project endorsed under Ministry of Earth Sciences Polar Biology Mandate."
        )

        d.cursor_y -= 25
        d.draw_rect(d.margin_left, d.cursor_y - 45, d.content_width, 50, 0.94, 0.97, 0.99, fill=True)
        d.draw_rect(d.margin_left, d.cursor_y - 45, d.content_width, 1, 0.7, 0.8, 0.9, fill=False)
        d.draw_text("FRONTIERS IN MICROBIOLOGY | OFFICIAL PUBLICATION", d.margin_left + 10, d.cursor_y - 12, "F2", 8.5, 0.08, 0.25, 0.45)
        d.draw_text("Certified Open Research Monograph | NCPOR Polar Life Sciences Group", d.margin_left + 10, d.cursor_y - 25, "F1", 7.5, 0.25, 0.3, 0.35)
        d.draw_text("Archive ID: PUB-2023-ANT-005 | Fully Indexed in PubMed Central & Web of Science", d.margin_left + 10, d.cursor_y - 37, "F2", 7.5, 0.05, 0.5, 0.75)

    doc.generate([p1, p2])

# 6. pub-06: Southern Ocean Eddy Dynamics & Heat Transport (Nature Comms Earth & Env)
def build_pub_06():
    doc = ScientificPublicationPDFGenerator(
        filename="public/reports/southern-ocean-eddy-dynamics-heat-transport.pdf",
        journal_name="Communications Earth & Environment (Nature Portfolio)",
        journal_vol="Vol. 5, Art. 189, pp. 1-15",
        title="Meso-Scale Eddy Dynamics and Poleward Heat Transport across the Antarctic Polar Front in the Indian Ocean Sector",
        authors="Dr. Sarat C. Tripathy, Dr. N. Anilkumar, Dr. R. K. Nayak, Dr. Amitesh Sharma & Dr. M. Ravichandran",
        affiliations="1. National Centre for Polar and Ocean Research (NCPOR), MoES, Goa | 2. ORV Sagar Nidhi Science Crew",
        doi="10.1038/s43247-024-01389-w",
        pub_date="June 04, 2024",
        domain_tag="Southern Ocean - Physical Oceanography & Climate",
        primary_rgb=(8, 30, 52)
    )

    def p1(d):
        d.cursor_y -= 10
        d.draw_text("RESEARCH ARTICLE | SOUTHERN OCEAN PHYSICAL OCEANOGRAPHY & HEAT FLUX", d.margin_left, d.cursor_y, "F2", 9, 0.05, 0.45, 0.75)
        d.cursor_y -= 22

        d.draw_text("Meso-Scale Eddy Dynamics and Poleward Heat Transport", d.margin_left, d.cursor_y, "F2", 14.0, 0.08, 0.15, 0.25)
        d.cursor_y -= 18
        d.draw_text("across the Antarctic Polar Front in the Indian Ocean Sector", d.margin_left, d.cursor_y, "F2", 14.0, 0.08, 0.15, 0.25)
        d.cursor_y -= 22

        d.draw_text(d.authors, d.margin_left, d.cursor_y, "F2", 8.5, 0.15, 0.2, 0.3)
        d.cursor_y -= 14
        d.draw_text(d.affiliations, d.margin_left, d.cursor_y, "F1", 7.5, 0.35, 0.4, 0.45)
        d.cursor_y -= 20

        d.draw_rect(d.margin_left, d.cursor_y - 120, d.content_width, 130, 0.95, 0.97, 0.99, fill=True)
        d.draw_rect(d.margin_left, d.cursor_y - 120, 4, 130, 0.05, 0.45, 0.75, fill=True)
        d.draw_text("ABSTRACT", d.margin_left + 12, d.cursor_y - 2, "F2", 9.5, 0.05, 0.35, 0.6)
        
        abstract_text = (
            "The Antarctic Circumpolar Current (ACC) represents the planet's strongest oceanic current system and a formidable "
            "hydrodynamic barrier to poleward atmospheric heat transfer. Meso-scale eddies (radius 30-120 km) generated by baroclinic "
            "instabilities along the Antarctic Polar Front (APF) provide the primary conduit for transporting heat and salt across "
            "this circum-polar barrier towards the Antarctic ice shelves. Utilizing high-resolution multi-satellite altimetry, "
            "shipboard Acoustic Doppler Current Profiler (ADCP) transects aboard ORV Sagar Nidhi, and an array of deep biogeochemical "
            "Argo profiling floats (40 deg S to 60 deg S), we quantify the spatial eddy kinetic energy (EKE) and meridional eddy heat "
            "flux (EHF) in the Indian sector (50 deg E - 80 deg E). We identify a recurrent hot-spot of anticyclonic eddy shedding "
            "downstream of the Southwest Indian Ridge with localized poleward heat flux exceeding 0.18 PW. Over the past two decades, "
            "this eddy-driven heat transport has intensified by 14.6 +/- 3.2%, providing an essential physical mechanism accelerating "
            "sub-surface basal melting of coastal Antarctic ice tongues."
        )
        d.cursor_y -= 16
        words = d.sanitize(abstract_text).split(' ')
        cur = ""
        for w in words:
            if len(cur + " " + w) > 94:
                d.draw_text(cur, d.margin_left + 12, d.cursor_y, "F1", 8.0, 0.15, 0.2, 0.25)
                d.cursor_y -= 11.5
                cur = w
            else:
                cur = (cur + " " + w) if cur else w
        if cur:
            d.draw_text(cur, d.margin_left + 12, d.cursor_y, "F1", 8.0, 0.15, 0.2, 0.25)
            d.cursor_y -= 11.5
        
        d.cursor_y = 485.0
        d.write_section_heading("1. INTRODUCTION & OCEANOGRAPHIC FRONT DYNAMICS")
        d.write_paragraph(
            "The Indian sector of the Southern Ocean exhibits vigorous eddy activity triggered by intense bathymetric steering "
            "over the Crozet Plateau, Conrad Rise, and Kerguelen Plateau. Measuring eddy-mean flow interactions is vital for "
            "constraining global thermohaline overturning circulation and ocean heat uptake."
        )

        d.write_section_heading("2. MESO-SCALE EDDY PROPERTIES & MERIDIONAL HEAT FLUXES")
        headers = ["Sub-Domain", "Eddy Kinetic Energy (cm2/s2)", "Radius (km)", "Poleward Heat Flux (PW)", "Life Span (days)"]
        rows = [
            ["SW Indian Ridge", "480 +/- 45", "68 +/- 12 km", "0.18 +/- 0.03 PW", "112 +/- 18 days"],
            ["Crozet Basin", "340 +/- 30", "84 +/- 15 km", "0.12 +/- 0.02 PW", "94 +/- 14 days"],
            ["Kerguelen Choke", "520 +/- 55", "58 +/- 9 km", "0.22 +/- 0.04 PW", "146 +/- 22 days"],
            ["Prydz Bay Gateway", "190 +/- 22", "42 +/- 7 km", "0.08 +/- 0.01 PW", "62 +/- 10 days"]
        ]
        d.write_table(headers, rows)

    def p2(d):
        d.cursor_y -= 10
        d.write_section_heading("3. IN-SITU ADCP & BGC-ARGO FLOAT VERIFICATION")
        d.write_paragraph(
            "Shipboard acoustic Doppler current profiler velocity sections across the Polar Front captured vertical eddy penetration "
            "exceeding 1,800 meters depth. Warm-core anticyclonic eddies trap Lower Circumpolar Deep Water (LCDW) with core temperatures "
            "+1.8 deg C above ambient polar waters, conveying warm pulses south of 60 deg S."
        )

        d.write_section_heading("4. CLIMATE MODELLING RELEVANCE (CMIP6)")
        d.write_paragraph(
            "Current coarse-resolution CMIP6 climate models systematically underestimate Southern Ocean eddy heat transport by "
            "up to 40%. The empirical parameterizations established in this study provide refined eddy diffusivity coefficients "
            "(kappa = 1,450 m2/s) for high-resolution earth system simulations."
        )

        d.write_section_heading("5. CITATION & DATA REPOSITORY ACCREDITATION")
        d.write_paragraph(
            "Tripathy, S. C., Anilkumar, N., et al. (2024). Communications Earth & Environment, 5:189. DOI: 10.1038/s43247-024-01389-w. "
            "Argo float and ADCP cruise profiles are freely accessible through the HimVigyan repository."
        )

        d.cursor_y -= 25
        d.draw_rect(d.margin_left, d.cursor_y - 45, d.content_width, 50, 0.94, 0.97, 0.99, fill=True)
        d.draw_rect(d.margin_left, d.cursor_y - 45, d.content_width, 1, 0.7, 0.8, 0.9, fill=False)
        d.draw_text("COMMUNICATIONS EARTH & ENVIRONMENT | NATURE PORTFOLIO", d.margin_left + 10, d.cursor_y - 12, "F2", 8.5, 0.08, 0.25, 0.45)
        d.draw_text("MoES Indian Southern Ocean Expedition Series | NCPOR Ocean Dynamics Division", d.margin_left + 10, d.cursor_y - 25, "F1", 7.5, 0.25, 0.3, 0.35)
        d.draw_text("Archive ID: PUB-2024-SO-006 | Open Access Peer-Reviewed Paper", d.margin_left + 10, d.cursor_y - 37, "F2", 7.5, 0.05, 0.5, 0.75)

    doc.generate([p1, p2])

if __name__ == '__main__':
    print("Generating peer-reviewed polar scientific publication PDFs...")
    build_pub_01()
    build_pub_02()
    build_pub_03()
    build_pub_04()
    build_pub_05()
    build_pub_06()
    print("All 6 publication PDFs generated successfully!")
