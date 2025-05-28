# app/product/Dockerfile
FROM python:3.13

WORKDIR /app

COPY requirements.txt .
COPY start_with_retry.py /app/start_with_retry.py

RUN pip install --upgrade pip && pip install -r requirements.txt

EXPOSE 8000

CMD ["python", "start_with_retry.py"]