FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir fastapi==0.70.0 \
    uvicorn \
    numpy \
    transformers \
    scipy \
    newspaper3k \
    nltk \
    torch \
    lxml[html_clean]
RUN python -m nltk.downloader punkt
COPY . .
EXPOSE 80
CMD ["uvicorn", "classification:app", "--host", "0.0.0.0", "--port", "80"]

