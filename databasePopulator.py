import psycopg2
import json
import logging


class DatabasePopulator:
    """ 
    Utility class that procedurally populates remote database 
    with scraped data from output.json
    """

    def __init__(self, password, host, dbname="postgres", username="postgres",):
        self.username = username
        self.password = password
        self.host = host
        self.dbname = dbname
        self.json_data = []

        self.run()

    def run(self):
        if (self.get_cursor()):
            self.read_data()
            self.populate_database()
            self.close()

    def get_cursor(self):
        """
        Connects to the database

        returns:
            True: if connection could be made
            False: if connection could not be made
        """
        try:
            self.connection = psycopg2.connect(
                f'dbname={self.dbname} user={self.username} host={self.host} password={self.password}')
            self.cursor = self.connection.cursor()
            return True
        except Exception as e:
            logging.exception(f"Caught exception connecting to database {e}")
            return False

    def close(self):
        self.cursor.close()
        self.connection.close()

    def read_data(self):
        with open('output.json', 'r') as f:
            self.json_data = json.load(f)

    def populate_database(self):
        try:
            seen_id = set()
            for data in self.json_data:
                if data:
                    # Generate an id
                    data['id'] = data['title'].lower().replace(
                        " ", "-").replace("/", "") + "-" + str(data['content'])

                    # Make sure there are no duplicate ids, because it is a key
                    if data['id'] not in seen_id:
                        seen_id.add(data['id'])
                    else:
                        data['id'] = data['id'] + '2'
                        seen_id.add(data['id'])

                    image_url = '/images/' + data['title'].lower().replace(" ", "-").replace("/", "-").replace(
                        ".", "-").replace("!", "-").replace("?", "-").replace("*", "-").replace(":", "-") + '.png'
                    self.cursor.execute(
                        """INSERT INTO "Beers" VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""", (
                            data['id'],
                            data['title'],
                            data['price'],
                            True,
                            data['description'],
                            image_url,
                            data['category'],
                            data['content'],
                            data['alcohol_percentage'],
                            data['brewer'],
                            data['country'],
                            data['serving_temperature'],
                            data['serving_glass'],
                            data['beer_colour']))

                    self.connection.commit()
        except Exception as e:
            logging.exception(f"Caught exception writing to database {e}")


if __name__ == "__main__":
    populator = DatabasePopulator("ZMWX4BLb5jEk2u6n", "188.166.77.23")
