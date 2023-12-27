import os
import jwt

from .db_manager import fetch_one, fetch_all, execute


def add_user(login, name, lastname, hash_pass, group_id, phone_number, address, email,
             admin_level=0,
             middlename=None,
             photo=None):
    if middlename is None:
        middlename = 'NULL'
    if photo is None:
        photo = 'NULL'

    query = f"""
        INSERT INTO Users (Login, FirstName, LastName 
            {", MiddleName" if middlename is not None else ''}
            {", Photo" if photo is not None else ''}
            , GroupName, PhoneNumber, Address, Email, PasswordHash, AdminLevel) 
        VALUES
            ('{login}', 
             '{name}', 
             '{lastname}', 
             {"'" + middlename + "', " if middlename is not None else ''}
             {f"{photo}, " if photo is not None else ''}
             '{group_id}', 
             '{phone_number}', 
             '{address}', 
             '{email}', 
             '{hash_pass}', 
             {admin_level});
    """
    e = execute(query)

    return e


def login_user(login, hash_pass):
    query = f"""
            SELECT * FROM Users WHERE Login = '{login}' AND PasswordHash = '{hash_pass}';
        """

    return fetch_one(query)


def get_user_by_token(token):
    payload = jwt.decode(token, os.environ['SECRET_KEY'], algorithms=['HS256'])
    user_id = payload['user_id']

    query = f"""
            SELECT Login, FirstName, LastName, GroupName, PhoneNumber, Address, Email, AdminLevel
            FROM Users WHERE Id = {user_id};
        """

    return fetch_one(query)


def get_users():
    query = f"""
            SELECT Id, Login, FirstName, LastName, GroupName, PhoneNumber, Address, Email, AdminLevel 
            FROM Users;
        """

    return fetch_all(query)


def update_user_by_id(user_id, **kwargs):
    query = f"""
        UPDATE Users SET 
            {", ".join([f"{key} = '{value}'" for key, value in kwargs.items()])}
        WHERE Id = {user_id};
    """

    return execute(query)


def delete_user_by_id(user_id):
    query = f"""
        DELETE FROM Users WHERE Id = {user_id};
    """

    return execute(query)
