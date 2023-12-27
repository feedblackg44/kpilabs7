import hashlib
import os

import jwt

from database import get_user_by_token


def check_and_hash(input_json, fields):
    for field in fields:
        if not input_json.get(field):
            return None
        else:
            input_json[field] = input_json[field].strip()

    hash_pass = hashlib.sha256(input_json['password'].encode()).hexdigest()

    return hash_pass


def check_if_admin(token):
    admin, err = get_user_by_token(token)
    if err:
        return False, str(err), 400
    if not admin:
        return False, 'User not found', 404
    if admin.get('AdminLevel') < 1:
        return False, 'Permission denied', 403
    return True, None, None


def validate_token(headers):
    token = headers.get('Authorization')
    if not token or not token.startswith('Bearer '):
        return None
    token = token.replace('Bearer ', '')
    return token


def check_access(headers, user_id):
    token = validate_token(headers)
    if not user_id or not token:
        return 'Bad request', 400

    payload = jwt.decode(token, os.environ['SECRET_KEY'], algorithms=['HS256'])
    admin_id = payload['user_id']
    is_admin, err_msg, err_code = check_if_admin(token)
    if admin_id != user_id and not is_admin:
        return err_msg, err_code

    return None, None
