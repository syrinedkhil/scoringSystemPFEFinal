import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
tokenizer = AutoTokenizer.from_pretrained('MoritzLaurer/mDeBERTa-v3-base-mnli-xnli')
model = AutoModelForSequenceClassification.from_pretrained('MoritzLaurer/mDeBERTa-v3-base-mnli-xnli')
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(torch.cuda.is_available())
model.to(device)

def scoreCompanies(sequence,companies):
    result = {"labels": [], "scores": []}
    premise = sequence.lower()
    with torch.no_grad():  
        for label in companies:
            hypothesis = f'This text interests the company {label.lower()}.'
            input = tokenizer(premise, hypothesis, truncation=True, return_tensors="pt")
            output = model(input["input_ids"].to(device))  
            logits = output["logits"][0]
           
            logits = torch.cat((logits[:1], logits[2:]), dim=0)
            prediction = torch.softmax(logits, -1).tolist()
            label_names = ["entailment", "neutral", "contradiction"]
            prediction = {name: round(float( pred) * 100, 1) for pred, name in zip(prediction, label_names)}
            result["labels"].append(label)
            result["scores"].append(prediction["entailment"])
    return result