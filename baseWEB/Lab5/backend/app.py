import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

from database import init_sqlite
from routes import register_bp, login_bp, user_bp


load_dotenv()
init_sqlite(os.environ['DB_NAME'], 'sqlite_init.sql')

app = Flask(__name__)
CORS(app)
app.register_blueprint(register_bp, url_prefix='/register')
app.register_blueprint(login_bp, url_prefix='/login')
app.register_blueprint(user_bp, url_prefix='/user')


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )
