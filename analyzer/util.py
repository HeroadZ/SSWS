import json

def read_data(path):
    with open(path, 'rb') as f:
        data = json.load(f)
    return data

def save_data(data, path):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)