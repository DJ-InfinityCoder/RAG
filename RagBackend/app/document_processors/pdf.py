"""
PDF extraction with pdfplumber: tables, OCR fallback, header/footer stripping.
"""

from typing import List
from langchain_core.documents import Document
from langchain_community.document_loaders import PyPDFLoader

from app.config import get_logger
from app.document_processors.base import format_table_as_markdown

logger = get_logger("askdoc.processors.pdf")


def extract_pdf_pages_with_tables(pdf_path: str, filename: str) -> List[Document]:
    """
    Extracts text and tables from PDF pages using pdfplumber:
    1. Detects and inlines tables in structured Markdown format.
    2. Detects repeated headers/footers (>50% pages) and strips them.
    3. Detects scanned/image-only pages (near-empty text) and falls back to OCR via pdf2image + pytesseract.
    4. Attaches page and page_number metadata to each page document.
    """
    try:
        import pdfplumber
    except ImportError:
        logger.warning("pdfplumber not available, falling back to PyPDFLoader")
        loader = PyPDFLoader(pdf_path)
        return loader.load()

    raw_pages_data = []
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            total_pages = len(pdf.pages)
            
            for page_idx, page in enumerate(pdf.pages):
                page_num = page_idx + 1
                
                # 1. Extract tables and their bounding boxes
                tables = page.find_tables()
                table_bboxes = [t.bbox for t in tables] if tables else []
                extracted_tables = [t.extract() for t in tables] if tables else []
                
                # Extract text outside tables or full text
                page_text = page.extract_text(layout=False) or ""
                
                # If tables are found, build page content with inlined Markdown tables
                if tables and extracted_tables:
                    md_tables = []
                    for tbl in extracted_tables:
                        md_tbl = format_table_as_markdown(tbl)
                        if md_tbl.strip():
                            md_tables.append(md_tbl)
                    
                    if md_tables:
                        try:
                            # Extract non-table text by filtering out table bounding box elements
                            non_table_text = page.filter(lambda obj: not any(
                                bbox[0] <= obj.get("x0", 0) <= bbox[2] and bbox[1] <= obj.get("top", 0) <= bbox[3]
                                for bbox in table_bboxes
                            )).extract_text() or ""
                        except Exception:
                            non_table_text = page_text
                            
                        if non_table_text.strip():
                            combined_content = non_table_text.strip() + "\n\n" + "\n\n".join(md_tables)
                        else:
                            combined_content = "\n\n".join(md_tables)
                    else:
                        combined_content = page_text
                else:
                    combined_content = page_text

                # 2. Check for scanned / near-empty text page -> OCR fallback
                clean_word_count = len(combined_content.strip().split())
                if clean_word_count < 8:
                    try:
                        import pytesseract
                        from pdf2image import convert_from_path
                        logger.info(f"Page {page_num} of {filename} appears scanned/near-empty ({clean_word_count} words). Attempting OCR fallback...")
                        images = convert_from_path(pdf_path, first_page=page_num, last_page=page_num)
                        if images:
                            ocr_text = pytesseract.image_to_string(images[0]).strip()
                            if len(ocr_text) > len(combined_content.strip()):
                                logger.info(f"OCR successfully extracted {len(ocr_text)} characters for page {page_num}")
                                combined_content = ocr_text
                    except Exception as ocr_err:
                        logger.warning(f"OCR fallback on page {page_num} skipped/failed ({ocr_err}). Using extracted text.")

                raw_pages_data.append({
                    "page_num": page_num,
                    "content": combined_content
                })
    except Exception as pdf_err:
        logger.warning(f"pdfplumber extraction error ({pdf_err}), falling back to PyPDFLoader")
        loader = PyPDFLoader(pdf_path)
        return loader.load()

    if not raw_pages_data:
        return []

    # 3. Strip repeated headers/footers (>50% of pages)
    if total_pages > 2:
        top_lines_count = {}
        bottom_lines_count = {}
        
        for p in raw_pages_data:
            lines = [l.strip() for l in p["content"].split("\n") if l.strip()]
            if lines:
                first_line = lines[0]
                top_lines_count[first_line] = top_lines_count.get(first_line, 0) + 1
                last_line = lines[-1]
                bottom_lines_count[last_line] = bottom_lines_count.get(last_line, 0) + 1
                
        threshold = total_pages * 0.5
        repeated_headers = {line for line, count in top_lines_count.items() if count > threshold and len(line) > 3}
        repeated_footers = {line for line, count in bottom_lines_count.items() if count > threshold and len(line) > 3}
        
        for p in raw_pages_data:
            lines = p["content"].split("\n")
            filtered_lines = []
            for idx, line in enumerate(lines):
                stripped = line.strip()
                if idx == 0 and stripped in repeated_headers:
                    continue
                if idx == len(lines) - 1 and stripped in repeated_footers:
                    continue
                filtered_lines.append(line)
            p["content"] = "\n".join(filtered_lines).strip()

    # 4. Construct Document list with page metadata
    documents = []
    for p in raw_pages_data:
        if p["content"].strip():
            documents.append(Document(
                page_content=p["content"],
                metadata={
                    "source": filename,
                    "title": filename,
                    "page": p["page_num"],
                    "page_number": p["page_num"]
                }
            ))

    return documents
