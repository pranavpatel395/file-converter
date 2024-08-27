import sys
from pdf2docx import Converter

if len(sys.argv) != 3:
    print("Usage: pdf_to_docx.py <input_pdf_path> <output_docx_path>")
    sys.exit(1)

input_pdf_path = sys.argv[1]
output_docx_path = sys.argv[2]

try:
    cv = Converter(input_pdf_path)
    cv.convert(output_docx_path, start=0, end=None)
    cv.close()
    print(f"Successfully converted {input_pdf_path} to {output_docx_path}")
except Exception as e:
    print(f"Error during conversion: {str(e)}")
    sys.exit(1)
