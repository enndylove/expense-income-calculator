from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import easyocr
import io
from PIL import Image
import re
import numpy as np

app = FastAPI()

# Додаємо CORS middleware для доступу з фронтенду
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ініціалізуємо EasyOCR для розпізнавання тексту
reader = easyocr.Reader(['uk', 'en', 'ru'])  # Підтримка української, англійської та російської мов

# Моделі даних
class ReceiptItem(BaseModel):
    name: str
    price: float
    quantity: float = 1.0
    total: Optional[float] = None
    
class ReceiptData(BaseModel):
    items: List[ReceiptItem]
    date: Optional[str] = None
    total: Optional[float] = None
    store_name: Optional[str] = None

@app.post("/process", response_model=ReceiptData)
async def process_receipt(file: UploadFile = File(...)):
    # Перевіряємо, чи це зображення
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Завантажений файл повинен бути зображенням")
    
    # Читаємо зображення
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    
    # Конвертуємо PIL Image в numpy array для EasyOCR
    image_np = np.array(image)
    
    # Розпізнаємо текст
    results = reader.readtext(image_np)
    
    # Витягуємо весь текст
    full_text = "\n".join([text for _, text, _ in results])
    
    # Аналізуємо текст для отримання структурованих даних
    receipt_data = parse_receipt_text(full_text)
    
    return receipt_data

def parse_receipt_text(text):
    """Аналізує текст чеку та витягує структуровані дані."""
    
    # Спробуємо знайти дату за допомогою регулярних виразів
    date_patterns = [
        r'(\d{2}[./-]\d{2}[./-]\d{2,4})',  # DD.MM.YYYY, DD/MM/YYYY, DD-MM-YYYY
        r'(\d{2,4}[./-]\d{2}[./-]\d{2})',  # YYYY.MM.DD, YYYY/MM/DD, YYYY-MM-DD
    ]
    
    date = None
    for pattern in date_patterns:
        date_match = re.search(pattern, text)
        if date_match:
            date = date_match.group(1)
            break
    
    # Розбиваємо текст на рядки
    lines = text.split('\n')
    
    # Знаходимо товари та ціни
    items = []
    
    # Шаблони для пошуку цін
    price_patterns = [
        r'(\d+[.,]\d{2})',  # Стандартний формат ціни: 123.45 або 123,45
        r'(\d+)\s*грн',     # Ціна в гривнях: 123 грн
    ]
    
    # Шаблони для пошуку кількості
    quantity_patterns = [
        r'x\s*(\d+[.,]?\d*)',           # Формат: x2 або x2.5
        r'(\d+[.,]?\d*)\s*шт',          # Формат: 2 шт або 2.5 шт
        r'(\d+[.,]?\d*)\s*кг',          # Формат: 2 кг або 2.5 кг
        r'(\d+[.,]?\d*)\s*г',           # Формат: 200 г
        r'кількість\s*[:-]?\s*(\d+)',   # Формат: кількість: 2
    ]
    
    for i, line in enumerate(lines):
        # Пропускаємо порожні рядки
        if not line.strip():
            continue
        
        # Шукаємо ціну в рядку
        price = None
        for pattern in price_patterns:
            price_match = re.search(pattern, line)
            if price_match:
                price_str = price_match.group(1).replace(',', '.')
                try:
                    price = float(price_str)
                    break
                except ValueError:
                    continue
        
        if price is None:
            continue
        
        # Шукаємо кількість
        quantity = 1.0
        for pattern in quantity_patterns:
            quantity_match = re.search(pattern, line)
            if quantity_match:
                quantity_str = quantity_match.group(1).replace(',', '.')
                try:
                    quantity = float(quantity_str)
                    break
                except ValueError:
                    continue
        
        # Визначаємо назву товару
        # Спочатку видаляємо ціну та кількість з рядка
        name_line = line
        for pattern in price_patterns + quantity_patterns:
            name_line = re.sub(pattern, '', name_line)
        
        # Очищаємо назву від зайвих символів
        name = name_line.strip()
        
        # Якщо назва дуже коротка, спробуємо взяти попередній рядок
        if len(name) < 3 and i > 0:
            name = lines[i-1].strip()
        
        # Якщо назва все ще порожня або дуже коротка, пропускаємо цей рядок
        if len(name) < 2:
            continue
        
        # Обчислюємо загальну вартість
        total = price * quantity
        
        items.append(ReceiptItem(
            name=name,
            price=price,
            quantity=quantity,
            total=total
        ))
    
    # Знаходимо загальну суму чеку
    total_patterns = [
        r'(СУМА|ВСЬОГО|ИТОГО|TOTAL)[:\s]*(\d+[.,]\d{2})',
        r'(СУМА|ВСЬОГО|ИТОГО|TOTAL)[:\s]*(\d+)',
    ]
    
    total = None
    for pattern in total_patterns:
        total_match = re.search(pattern, text, re.IGNORECASE)
        if total_match:
            total_str = total_match.group(2).replace(',', '.')
            try:
                total = float(total_str)
                break
            except ValueError:
                continue
    
    # Знаходимо назву магазину (зазвичай на початку чеку)
    store_name = None
    if len(lines) > 0:
        store_name = lines[0].strip()
        # Якщо перший рядок дуже короткий, спробуємо взяти другий
        if len(store_name) < 3 and len(lines) > 1:
            store_name = lines[1].strip()
    
    return ReceiptData(
        items=items,
        date=date,
        total=total,
        store_name=store_name
    )

# Для тестування локально
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
