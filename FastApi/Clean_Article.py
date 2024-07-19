import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from transformers import pipeline
import re
import torch

nltk.download('stopwords')

summarizer = pipeline(task="summarization", model="t5-small", device=0 if torch.cuda.is_available() else -1)
lemmatizer = WordNetLemmatizer()
def clean_text(text):
    text = re.sub(r'[^A-Za-z\s]', '', text)
    tokens = word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word.lower() not in stop_words]
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    cleaned_text = ' '.join(tokens)
    return cleaned_text

def chunk_text(text, chunk_size=650):
    chunks = []
    words = text.split()
    for i in range(0, len(words), chunk_size):
        chunk = ' '.join(words[i:i+chunk_size])
        chunks.append(chunk)
    return chunks

def clean_article(Article):
    cleanArticle = clean_text(Article)
    chunked_article = chunk_text(cleanArticle,chunk_size =650)
    words=[]
    for chunk in chunked_article:
        test = summarizer(chunk)
        words.append(test[0]["summary_text"])
    summarized_text = ' '.join(words)
    words.append(test[0]["summary_text"])
    return summarized_text
