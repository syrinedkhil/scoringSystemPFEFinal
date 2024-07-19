
from fastapi import FastAPI, HTTPException 
from pydantic import BaseModel
import numpy as np
from transformers import pipeline
from scipy.special import softmax
from transformers import AutoTokenizer,AutoConfig, AutoModelForSequenceClassification
import torch
from fastapi import FastAPI, HTTPException, Request
from typing import List
from transformers import ZeroShotClassificationPipeline, AutoTokenizer, AutoModelForSequenceClassification
from pydantic import BaseModel
from newspaper import Article
from Clean_Article import clean_article
from Company import scoreCompanies
app = FastAPI()
#classificationModel
model_path = "savedModel"
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForSequenceClassification.from_pretrained(model_path)
classifier = ZeroShotClassificationPipeline(model=model, tokenizer=tokenizer,max_length=512, truncation=True)

#sentimentModel

SentimentModel="savedModelForSentiment"
Tokenizer = AutoTokenizer.from_pretrained(SentimentModel)
config = AutoConfig.from_pretrained(SentimentModel)
sentimentmodel = AutoModelForSequenceClassification.from_pretrained(SentimentModel)
sentiment_task = pipeline("sentiment-analysis", model=sentimentmodel, tokenizer=Tokenizer,max_length=512, truncation=True)

class ClassificationRequest(BaseModel):
    sequence_to_classify : str
    candidate_labels: List[str]
class ClassificationResponse(BaseModel):
    labels: List[str]
    scores: List[float]
class ClassificationRequestForCompanyAndTopics(BaseModel):
    sequence_to_classify : str
    candidate_labels: List[str]
    candidate_companies: List[str]
class ClassificationResponseForCompanyAndTopics(BaseModel):
    labels: List[str]
    scores_labels: List[float]
    companies_names: List[str]
    scores_companies: List[float]
    sentiment_label:str
    sentiment_score:float


@app.post("/classify")
async def classify_sequence(request_body: ClassificationRequest):
    sequence_to_classify  = request_body.sequence_to_classify
    candidate_labels = request_body.candidate_labels
    print(sequence_to_classify)
    print(candidate_labels)
    if not sequence_to_classify or not candidate_labels:
        raise HTTPException(status_code=400, detail="Sequence or candidate labels missing in the request body")
    label_probabilities = classifier(sequence_to_classify, candidate_labels, multi_label=True)
    response = ClassificationResponse(
        labels=label_probabilities['labels'],
        scores=[score for score in label_probabilities['scores']]
    )
   
    return response


@app.post('/classifyArticle')
def classifyArticle(request_body: ClassificationRequestForCompanyAndTopics):
    url = request_body.sequence_to_classify
    candidate_companies=request_body.candidate_companies
    article = Article(url)
    article.download()
    try:
        article.parse()
        article.nlp()
        sequence_to_classify = article.text
    except Exception as e:
        sequence_to_classify = None  
    
        
    
    candidate_labels = request_body.candidate_labels
    
    if not sequence_to_classify or not candidate_labels:
        raise HTTPException(status_code=400, detail="Sequence or candidate labels missing in the request body")

    sequence_to_classify=clean_article(sequence_to_classify)
    label_probabilities = classifier(sequence_to_classify, candidate_labels, multi_label=True)
    companies_probabilities = scoreCompanies(sequence_to_classify, candidate_companies)
   
    print(companies_probabilities)
    sentiment_probabilities=sentiment_task(sequence_to_classify)
    response = ClassificationResponseForCompanyAndTopics(
        labels=label_probabilities['labels'],
        scores_labels=[score*100 for score in label_probabilities['scores']],
        companies_names=companies_probabilities['labels'],
        scores_companies=[score for score in companies_probabilities['scores']],
        sentiment_label=sentiment_probabilities[0]['label'],
        sentiment_score=sentiment_probabilities[0]['score']*100
    )
   
    print(response)
    return response


