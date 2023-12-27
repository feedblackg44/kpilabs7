from flask import Blueprint, request, make_response, jsonify

from database import get_users, delete_user_by_id, update_user_by_id, get_user_by_token
from utils import validate_token, check_if_admin, check_access

user_bp = Blueprint('user', __name__)


@user_bp.route('', methods=['GET'])
def get_user_info():
    get_all = int(request.args.get('all', False))

    try:
        token = validate_token(request.headers)
        if not token:
            return make_response(jsonify({'message': 'Bad request'}), 400)
        if get_all:
            is_admin, err_msg, err_code = check_if_admin(token)
            if not is_admin:
                return make_response(jsonify({'message': err_msg}), err_code)
            users, err = get_users()
            if err:
                return make_response(jsonify({'message': str(err)}), 400)
            if not users:
                return make_response(jsonify({'message': 'Users not found'}), 404)
            return make_response(jsonify(users), 200)
        else:
            user, err = get_user_by_token(token)
            if err:
                return make_response(jsonify({'message': str(err)}), 400)
            if not user:
                return make_response(jsonify({'message': 'User not found'}), 404)
            return make_response(jsonify(user), 200)
    except Exception as e:
        print(e)
        return make_response(jsonify({'message': 'Internal server error'}), 500)


@user_bp.route('', methods=['PUT'])
def update():
    try:
        user_id = request.args.get('id')
        err_msg, err_code = check_access(request.headers, user_id)
        if err_msg:
            return make_response(jsonify({'message': err_msg}), err_code)

        update_data = request.get_json()
        err = update_user_by_id(user_id, **update_data)
        if err:
            return make_response(jsonify({'message': str(err)}), 400)

        return make_response(jsonify({'message': 'OK'}), 200)
    except Exception as e:
        print(e)
        return make_response(jsonify({'message': 'Internal server error'}), 500)


@user_bp.route('', methods=['DELETE'])
def delete():
    try:
        user_id = request.args.get('id')
        err_msg, err_code = check_access(request.headers, user_id)
        print(user_id)
        if err_msg:
            return make_response(jsonify({'message': err_msg}), err_code)

        err = delete_user_by_id(user_id)
        if err:
            return make_response(jsonify({'message': str(err)}), 400)

        return make_response(jsonify({'message': 'OK'}), 200)
    except Exception as e:
        print(e)
        return make_response(jsonify({'message': 'Internal server error'}), 500)
