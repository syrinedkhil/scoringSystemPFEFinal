import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer

model_name = "google-bert/bert-base-uncased"
output_dir = "savedModel"
import os
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

tokenizer = AutoTokenizer.from_pretrained(model_name, truncation=True)
model = AutoModelForSequenceClassification.from_pretrained(model_name)
model.save_pretrained(output_dir)
tokenizer.save_pretrained(output_dir)
model.config.save_pretrained(output_dir)

print("Model saved successfully at:", output_dir)
