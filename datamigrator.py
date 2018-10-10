import sqlite3
import json
""" A procedural script to populate database with scraped data"""

data_dict = []
with open('output.json', 'r') as f:
    data_dict = json.load(f)

connection = sqlite3.connect('app.db')
cursor = connection.cursor()

for data in data_dict:
    if data:
        data['id'] = data['title'].replace(" ", "-").lower() + "-" + data['content']
        data['available'] = 1
        
        cursor.execute(
            "insert into beer values (?,?,?,?,?,?,?,?,?,?,?)",(
                data['id'],
                data['title'],
                data['price'].replace(",", ".").strip(),
                data['available'],
                data['description'],
                data['image_url'],
                data['category'],
                data['content'],
                data['alcohol_percentage'],
                data['brewer'],
                data['country']
            ))

connection.commit()
