import os
from flask import Blueprint, request, make_response, jsonify
import jwt

from database import login_user
from utils import check_and_hash

login_bp = Blueprint('login', __name__)


@login_bp.route('', methods=['POST'])
def login():
    input_json = request.get_json()
    fields = ['login', 'password']

    hash_pass = check_and_hash(input_json, fields)
    if not hash_pass:
        return make_response(jsonify({'message': 'Bad request'}), 400)

    user, err = login_user(input_json['login'], hash_pass)

    if err:
        return make_response(jsonify({'message': str(err)}), 400)
    if user is None:
        return make_response(jsonify({'message': 'User not found'}), 404)

    secret_key = os.environ['SECRET_KEY']
    payload = {'user_id': user['Id'], 'login': user['Login']}
    token = jwt.encode(payload, secret_key, algorithm='HS256')

    return make_response(jsonify({'token': token}), 200)
