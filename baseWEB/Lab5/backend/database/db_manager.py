import os
import sqlite3


def fetch_one(query):
    db = sqlite3.connect(os.environ['DB_NAME'])
    try:
        db.row_factory = sqlite3.Row
        cursor = db.cursor()
        cursor.execute(query)
        row = cursor.fetchone()
        cursor.close()
        e = None
        result = dict(row)
    except sqlite3.Error as e:
        result = None
    finally:
        db.close()

    return result, e


def fetch_all(query):
    db = sqlite3.connect(os.environ['DB_NAME'])
    try:
        db.row_factory = sqlite3.Row
        cursor = db.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
        cursor.close()
        e = None
        result = [dict(row) for row in rows]
    except sqlite3.Error as e:
        result = None
    finally:
        db.close()

    return result, e


def execute(query):
    db = sqlite3.connect(os.environ['DB_NAME'])
    try:
        cursor = db.cursor()
        cursor.execute(query)
        cursor.close()
        db.commit()
        e = None
    except sqlite3.Error as e:
        db.close()
        return e
    db.close()

    return e
