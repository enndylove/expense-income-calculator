from fastapi import FastAPI, File, UploadFile
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import io
import pytesseract
import re

app = FastAPI()

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

# Ensure Tesseract is installed and the path is correctly set (change this according to your system setup)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"  # For Windows, adjust for your OS

@app.post("/process")
async def process_image(file: UploadFile = File(...)):
    image = Image.open(io.BytesIO(await file.read()))
    text = extract_text_from_image(image)
    items = extract_items_and_amounts(text)

    return {
        "productType": "receipt",  # assuming the image is a receipt
        "items": items,
        "productTitle": text  # this will contain OCR and BLIP caption information
    }

def extract_text_from_image(image):
    # Use Tesseract OCR to extract text from the image
    ocr_text = pytesseract.image_to_string(image)
    
    # Additionally, we can use BLIP for a caption, but OCR text will help more with number extraction
    inputs = processor(images=image, return_tensors="pt")
    output = model.generate(**inputs)
    caption = processor.decode(output[0], skip_special_tokens=True)
    
    return f"OCR Text: {ocr_text}\nBLIP Caption: {caption}"

def extract_items_and_amounts(text):
    items = []

    # Improved regex to extract item name and price from various formats
    item_pattern = re.compile(r'([A-Za-z0-9\s]+)\s?\$?(\d+(\.\d{1,2})?)')  # Matches "ItemName $Price" or "ItemName Price"
    items_matches = item_pattern.findall(text)

    for match in items_matches:
        item_name = match[0].strip()
        item_price = match[1]
        items.append({"itemName": item_name, "price": item_price})

    return items
