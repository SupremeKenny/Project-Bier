import psycopg2
import json
""" A procedural script to populate database with scraped data"""

data_dict = []
with open('output.json', 'r') as f:
    data_dict = json.load(f)

connection = psycopg2.connect('dbname=postgres user=postgres host=localhost')
cursor = connection.cursor()

for data in data_dict:
    if data:
        data['id'] = data['title'].replace(" ", "-").lower() + "-" + data['content']
        data['available'] = 1
        
        cursor.execute(
            """INSERT INTO "Products" VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""", (data['id'],
                data['title'],
                data['price'].replace(",", ".").strip(),
                bool(data['available']),
                data['description'],
                data['image_url'],
                data['category'],
                data['content'],
                data['alcohol_percentage'],
                data['brewer'],
                data['country']))

connection.commit()
cursor.close()
connection.close()