import sqlite3


def init_sqlite(database_name, filename):
    database = sqlite3.connect(database_name)
    cursor = database.cursor()
    with open(filename, 'r') as f:
        sql = f.read()
    cursor.executescript(sql)
    cursor.close()
    database.commit()
    database.close()
