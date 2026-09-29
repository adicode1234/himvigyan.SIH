# Clean replacement for generate_summary_pdf.py with ASCII/Latin-1 safe encoding and real vector bullet points
with open("generate_summary_pdf.py", "r") as f:
    code = f.read()

# Replace draw_text to sanitize text
sanitize_func = '''
    def sanitize(self, text):
        replacements = {
            '\\u2022': '*',
            '•': '*',
            '—': '--',
            '–': '-',
            '’': "'",
            '‘': "'",
            '“': '"',
            '”': '"',
            '→': '->',
            '⚡': '[Lightning]',
            'ℹ': '[i]',
            '✓': '[OK]',
            '…': '...',
            'é': 'e',
            'Å': 'A'
        }
        for k, v in replacements.items():
            text = text.replace(k, v)
        # remove any remaining non-ascii characters
        return text.encode('ascii', 'replace').decode('ascii')
'''

# We will regenerate generate_summary_pdf.py cleanly
print("Ready to update generate_summary_pdf.py")
