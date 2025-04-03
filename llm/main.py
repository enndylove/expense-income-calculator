from fastapi import FastAPI, File, UploadFile
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import io

app = FastAPI()

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

@app.post("/process")
async def process_image(file: UploadFile = File(...)):
    image = Image.open(io.BytesIO(await file.read()))
    text = extract_text_from_image(image)

    return {"text": text}

def extract_text_from_image(image):
    inputs = processor(images=image, return_tensors="pt")
    output = model.generate(**inputs)
    caption = processor.decode(output[0], skip_special_tokens=True)
    return caption
