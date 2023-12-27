import React, { useState, useEffect } from 'react';
import { get_info, deleteUser } from '../http/userApi';
import Update from '../forms/Update';
import Registration from '../forms/Registration';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [updatingUser, setUpdatingUser] = useState(null);
    const [showRegistration, setShowRegistration] = useState(false);

    useEffect(() => {
        fetchUsers().then();
    }, []);

    const fetchUsers = async () => {
        const data = await get_info(1);
        setUsers(data);
    };

    const handleDelete = async (id) => {
        await deleteUser(id);
        await fetchUsers();
    };

    const handleUpdateClick = (user) => {
        setUpdatingUser(user);
    };

    const closeUpdateModal = () => {
        setUpdatingUser(null);
    };

    const handleCreateNewUser = () => {
        setShowRegistration(true);
    };

    const handleRegistrationClose = () => {
        setShowRegistration(false);
    }

    return (
        <div className="container mt-5">
            <h2>Admin Panel</h2>

            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    {users[0] && Object.keys(users[0]).map((key, i) =>
                        <th key={i} scope="col">{key}</th>
                    )}
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        {Object.keys(user).map((key, i) =>
                            <td key={i}>{user[key]}</td>
                        )}
                        <td>
                            <button onClick={() => handleUpdateClick(user)}
                                    className="btn btn-primary btn-sm m-2">Update
                            </button>
                            <button onClick={async () => await handleDelete(user.Id)}
                                    className="btn btn-danger btn-sm m-2">Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="d-flex w-auto">
                <button onClick={handleCreateNewUser} className="btn btn-primary col-3">
                    Create new user
                </button>
            </div>

            {updatingUser && (
                <Update
                    user={updatingUser}
                    onClose={closeUpdateModal}
                    refreshUsers={fetchUsers}
                />
            )}

            {showRegistration && (
                <Registration
                    onClose={handleRegistrationClose}
                    refreshUsers={fetchUsers}
                    admin={true}
                />
            )}
        </div>
    );
};

export default Admin;
