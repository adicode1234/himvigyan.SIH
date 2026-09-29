import os
import sys
from PIL import Image

class PDFWriter:
    def __init__(self, filename="HimVigyan_Project_Summary_and_Tech_Stack.pdf"):
        self.filename = filename
        self.pages = []  # list of byte streams for page contents
        self.objects = [] # list of (obj_num, bytes_content)
        self.images = {}  # name -> (width, height, bytes)
        self.obj_counter = 0

        # Page setup: A4
        self.width = 595.28
        self.height = 841.89
        self.margin_left = 42.0
        self.margin_right = 553.28
        self.margin_top = 795.0
        self.margin_bottom = 45.0
        self.content_width = self.margin_right - self.margin_left

        self.current_stream = []
        self.cursor_y = self.margin_top
        self.current_page_num = 1

    def sanitize(self, text):
        replacements = {
            '•': '*',
            '—': '--',
            '–': '-',
            '’': "'",
            '‘': "'",
            '“': '"',
            '”': '"',
            '→': '->',
            '⚡': '[+]',
            'ℹ': '[i]',
            '✓': '[OK]',
            '…': '...',
            'é': 'e',
            'Å': 'A'
        }
        for k, v in replacements.items():
            text = text.replace(k, v)
        return text.encode('ascii', 'replace').decode('ascii')

    def add_image_resource(self, name, filepath):
        im = Image.open(filepath).convert('RGB')
        w, h = im.size
        import io
        buf = io.BytesIO()
        im.save(buf, format='JPEG', quality=90)
        jpeg_data = buf.getvalue()
        self.images[name] = (w, h, jpeg_data)

    def new_page(self, is_cover=False):
        if self.current_stream:
            self.pages.append((self.current_stream, is_cover))
        self.current_stream = []
        self.cursor_y = self.margin_top
        self.current_page_num += 1

    def check_page_break(self, needed_space=40):
        if self.cursor_y - needed_space < self.margin_bottom:
            self.new_page()
            self.draw_running_header()

    def draw_running_header(self):
        self.rect(self.margin_left, 810, self.content_width, 1.2, fill=True, color=(0.02, 0.52, 0.82))
        self.draw_text("HimVigyan", self.margin_left, 816, font="Helvetica-Bold", size=9, color=(0.03, 0.12, 0.28))
        self.draw_text("| National Polar & Ocean Science Knowledge Platform (MoES / NCPOR)", self.margin_left + 54, 816, font="Helvetica", size=8.5, color=(0.3, 0.4, 0.5))
        self.draw_text("SIH Problem 26063", self.margin_right - 85, 816, font="Helvetica-Bold", size=8.5, color=(0.02, 0.52, 0.82))
        self.cursor_y = 785

    def draw_text(self, text, x, y, font="Helvetica", size=10, color=(0.1, 0.15, 0.25)):
        r, g, b = color
        clean_text = self.sanitize(text).replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')
        stream_cmd = f"BT /{font} {size} Tf {r:.3f} {g:.3f} {b:.3f} rg {x:.2f} {y:.2f} Td ({clean_text}) Tj ET"
        self.current_stream.append(stream_cmd)

    def rect(self, x, y, w, h, fill=True, stroke=False, color=(0.9, 0.9, 0.9), line_width=1):
        r, g, b = color
        cmd = f"q {line_width:.2f} w "
        if fill:
            cmd += f"{r:.3f} {g:.3f} {b:.3f} rg "
        if stroke:
            cmd += f"{r:.3f} {g:.3f} {b:.3f} RG "
        op = "B" if (fill and stroke) else ("f" if fill else "S")
        cmd += f"{x:.2f} {y:.2f} {w:.2f} {h:.2f} re {op} Q"
        self.current_stream.append(cmd)

    def draw_image(self, name, x, y, w, h):
        cmd = f"q {w:.2f} 0 0 {h:.2f} {x:.2f} {y:.2f} cm /{name} Do Q"
        self.current_stream.append(cmd)

    def draw_heading(self, text, level=1):
        if level == 1:
            self.check_page_break(50)
            self.cursor_y -= 14
            self.rect(self.margin_left, self.cursor_y - 2, 4, 18, fill=True, color=(0.02, 0.52, 0.82))
            self.draw_text(text, self.margin_left + 10, self.cursor_y, font="Helvetica-Bold", size=14, color=(0.04, 0.12, 0.28))
            self.cursor_y -= 18
        elif level == 2:
            self.check_page_break(35)
            self.cursor_y -= 10
            self.draw_text(text, self.margin_left, self.cursor_y, font="Helvetica-Bold", size=11.5, color=(0.05, 0.25, 0.45))
            self.cursor_y -= 14
        elif level == 3:
            self.check_page_break(25)
            self.cursor_y -= 6
            self.draw_text(text, self.margin_left + 4, self.cursor_y, font="Helvetica-Bold", size=10, color=(0.1, 0.2, 0.35))
            self.cursor_y -= 12

    def draw_paragraph(self, text, size=9, font="Helvetica", color=(0.15, 0.2, 0.3), line_height=12.5, indent=0):
        words = self.sanitize(text).split()
        lines = []
        current_line = []
        char_limit = int((self.content_width - indent) / (size * 0.48))
        
        for w in words:
            if len(" ".join(current_line + [w])) <= char_limit:
                current_line.append(w)
            else:
                lines.append(" ".join(current_line))
                current_line = [w]
        if current_line:
            lines.append(" ".join(current_line))

        for line in lines:
            self.check_page_break(line_height + 4)
            self.draw_text(line, self.margin_left + indent, self.cursor_y, font=font, size=size, color=color)
            self.cursor_y -= line_height
        self.cursor_y -= 4

    def draw_bullet(self, bold_prefix, text, size=8.8, color=(0.15, 0.2, 0.3)):
        self.check_page_break(18)
        # Draw clean vector cyan bullet square
        self.rect(self.margin_left + 8, self.cursor_y + 2, 4, 4, fill=True, color=(0.02, 0.52, 0.82))
        
        full_text = f"{bold_prefix} {text}" if bold_prefix else text
        words = self.sanitize(full_text).split()
        lines = []
        cur = []
        char_limit = int((self.content_width - 24) / (size * 0.48))
        for w in words:
            if len(" ".join(cur + [w])) <= char_limit:
                cur.append(w)
            else:
                lines.append(" ".join(cur))
                cur = [w]
        if cur:
            lines.append(" ".join(cur))
            
        for line in lines:
            self.check_page_break(13)
            self.draw_text(line, self.margin_left + 22, self.cursor_y, font="Helvetica", size=size, color=color)
            self.cursor_y -= 12
        self.cursor_y -= 2

    def draw_table(self, headers, rows, col_widths, font_size=8):
        table_width = sum(col_widths)
        row_height = 18
        
        self.check_page_break(row_height * 2 + 10)
        self.rect(self.margin_left, self.cursor_y - 4, table_width, row_height, fill=True, color=(0.05, 0.18, 0.38))
        
        cur_x = self.margin_left
        for i, h in enumerate(headers):
            self.draw_text(h, cur_x + 5, self.cursor_y, font="Helvetica-Bold", size=font_size, color=(1, 1, 1))
            cur_x += col_widths[i]
        self.cursor_y -= row_height
        
        for r_idx, row in enumerate(rows):
            self.check_page_break(row_height + 4)
            bg_color = (0.96, 0.98, 1.0) if r_idx % 2 == 0 else (1.0, 1.0, 1.0)
            self.rect(self.margin_left, self.cursor_y - 4, table_width, row_height, fill=True, stroke=True, color=bg_color, line_width=0.4)
            self.rect(self.margin_left, self.cursor_y - 4, table_width, row_height, fill=False, stroke=True, color=(0.85, 0.88, 0.92), line_width=0.4)
            
            cur_x = self.margin_left
            for c_idx, cell in enumerate(row):
                is_bold = (c_idx == 0)
                font_name = "Helvetica-Bold" if is_bold else "Helvetica"
                text_color = (0.05, 0.15, 0.3) if is_bold else (0.2, 0.25, 0.35)
                max_chars = int(col_widths[c_idx] / (font_size * 0.52))
                display_val = cell if len(cell) <= max_chars else cell[:max_chars-2] + ".."
                self.draw_text(display_val, cur_x + 5, self.cursor_y, font=font_name, size=font_size, color=text_color)
                cur_x += col_widths[c_idx]
            self.cursor_y -= row_height
        self.cursor_y -= 8

    def draw_callout(self, title, text, icon="[i]"):
        self.check_page_break(45)
        box_y = self.cursor_y - 32
        self.rect(self.margin_left, box_y, self.content_width, 42, fill=True, stroke=True, color=(0.93, 0.96, 1.0), line_width=0.8)
        self.rect(self.margin_left, box_y, 4, 42, fill=True, color=(0.02, 0.52, 0.82))
        
        self.draw_text(f"{icon}  {title}", self.margin_left + 12, self.cursor_y - 2, font="Helvetica-Bold", size=9.5, color=(0.02, 0.35, 0.65))
        self.draw_text(text, self.margin_left + 12, self.cursor_y - 18, font="Helvetica", size=8.5, color=(0.2, 0.25, 0.35))
        self.cursor_y -= 48

    def build_pdf(self):
        if self.current_stream:
            self.pages.append((self.current_stream, False))

        total_pages = len(self.pages)
        objects_data = {}
        
        objects_data[1] = "<< /Type /Catalog /Pages 2 0 R >>"

        fonts = {
            "Helvetica": "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
            "Helvetica-Bold": "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
            "Helvetica-Oblique": "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>",
            "Courier": "<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>",
            "Times-Roman": "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >>",
            "Times-Bold": "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >>"
        }
        font_obj_start = 3
        font_obj_map = {}
        curr_obj = font_obj_start
        for fname, fdef in fonts.items():
            font_obj_map[fname] = curr_obj
            objects_data[curr_obj] = fdef
            curr_obj += 1

        image_obj_map = {}
        for iname, (iw, ih, idata) in self.images.items():
            image_obj_map[iname] = curr_obj
            img_header = f"<< /Type /XObject /Subtype /Image /Width {iw} /Height {ih} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length {len(idata)} >>\nstream\n"
            objects_data[curr_obj] = (img_header, idata)
            curr_obj += 1

        page_obj_ids = []
        content_obj_ids = []

        for p_idx in range(total_pages):
            page_obj_ids.append(curr_obj)
            curr_obj += 1
            content_obj_ids.append(curr_obj)
            curr_obj += 1

        kids_str = " ".join([f"{pid} 0 R" for pid in page_obj_ids])
        objects_data[2] = f"<< /Type /Pages /Kids [{kids_str}] /Count {total_pages} >>"

        font_res_entries = " ".join([f"/{fname} {foid} 0 R" for fname, foid in font_obj_map.items()])
        img_res_entries = " ".join([f"/{iname} {ioid} 0 R" for iname, ioid in image_obj_map.items()])
        
        resources_dict = f"<< /Font << {font_res_entries} >> /XObject << {img_res_entries} >> >>"

        for p_idx, (stream_cmds, is_cover) in enumerate(self.pages):
            pid = page_obj_ids[p_idx]
            cid = content_obj_ids[p_idx]

            if not is_cover:
                footer_line = f"q 0.85 w 0.8 0.85 0.9 RG {self.margin_left:.2f} 32.00 {self.content_width:.2f} 0.00 re S Q"
                footer_text_left = f"BT /Helvetica 8 Tf 0.4 0.45 0.55 rg {self.margin_left:.2f} 22.00 Td (HimVigyan Architecture & Technical Dossier -- SIH Problem 26063) Tj ET"
                footer_text_right = f"BT /Helvetica-Bold 8 Tf 0.02 0.52 0.82 rg {self.margin_right - 65:.2f} 22.00 Td (Page {p_idx+1} of {total_pages}) Tj ET"
                stream_cmds.append(footer_line)
                stream_cmds.append(footer_text_left)
                stream_cmds.append(footer_text_right)

            stream_content = "\n".join(stream_cmds).encode('latin1')
            stream_obj_str = f"<< /Length {len(stream_content)} >>\nstream\n"
            objects_data[cid] = (stream_obj_str, stream_content)

            objects_data[pid] = f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {self.width:.2f} {self.height:.2f}] /Resources {resources_dict} /Contents {cid} 0 R >>"

        pdf_bytes = bytearray()
        pdf_bytes.extend(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")

        offsets = {}
        max_obj_id = max(objects_data.keys())

        for obj_id in range(1, max_obj_id + 1):
            if obj_id not in objects_data:
                continue
            offsets[obj_id] = len(pdf_bytes)
            data = objects_data[obj_id]
            pdf_bytes.extend(f"{obj_id} 0 obj\n".encode('latin1'))
            if isinstance(data, tuple):
                header_str, raw_bytes = data
                pdf_bytes.extend(header_str.encode('latin1'))
                pdf_bytes.extend(raw_bytes)
                pdf_bytes.extend(b"\nendstream\n")
            else:
                pdf_bytes.extend(data.encode('latin1'))
                pdf_bytes.extend(b"\n")
            pdf_bytes.extend(b"endobj\n")

        xref_start = len(pdf_bytes)
        pdf_bytes.extend(f"xref\n0 {max_obj_id + 1}\n".encode('latin1'))
        pdf_bytes.extend(b"0000000000 65535 f \n")
        for obj_id in range(1, max_obj_id + 1):
            if obj_id in offsets:
                pdf_bytes.extend(f"{offsets[obj_id]:010d} 00000 n \n".encode('latin1'))
            else:
                pdf_bytes.extend(b"0000000000 65535 f \n")

        pdf_bytes.extend(f"trailer\n<< /Size {max_obj_id + 1} /Root 1 0 R >>\nstartxref\n{xref_start}\n%%EOF\n".encode('latin1'))

        with open(self.filename, 'wb') as f:
            f.write(pdf_bytes)
        print(f"PDF written successfully: {self.filename} ({len(pdf_bytes)} bytes)")

