from flask import Blueprint, request, make_response, jsonify

from database import add_user
from utils import check_and_hash, check_if_admin, validate_token

register_bp = Blueprint('register', __name__)


@register_bp.route('', methods=['POST'])
def register():
    token = validate_token(request.headers)
    if token:
        is_admin, err_msg, err_code = check_if_admin(token)
        if not is_admin:
            return make_response(jsonify({'message': err_msg}), err_code)
    else:
        is_admin = False

    input_json = request.get_json()
    fields = ['login', 'name', 'lastname', 'password', 'group_id', 'phone_number', 'address', 'email']

    hash_pass = check_and_hash(input_json, fields)
    if not hash_pass:
        return make_response(jsonify({'message': 'Bad request'}), 400)

    admin_level = int(input_json.get('admin_level', 0)) if is_admin else 0

    err = add_user(login=input_json['login'],
                   name=input_json['name'],
                   lastname=input_json['lastname'],
                   hash_pass=hash_pass,
                   group_id=input_json['group_id'],
                   phone_number=input_json['phone_number'],
                   address=input_json['address'],
                   email=input_json['email'],
                   admin_level=admin_level,
                   middlename=input_json.get('middlename'),
                   photo=input_json.get('photo'))

    if err:
        print(err)
        return make_response(jsonify({'message': str(err)}), 400)

    return make_response(jsonify({'message': 'OK'}), 200)
