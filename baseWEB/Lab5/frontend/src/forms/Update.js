import React, { useState } from 'react';
import { updateUser } from '../http/userApi';

const Update = ({ user, onClose, refreshUsers }) => {
    const [formData, setFormData] = useState({ ...user });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser(formData);
        refreshUsers();
        onClose();
    };

    return (
        <div className="modal show" tabIndex="-1" style={{display: 'block'}}>
            <div className="modal-backdrop show custom-backdrop"></div>
            <div className="modal-dialog custom-modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update User</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                {Object.keys(formData).map((key, i) => (
                                    <div key={i}>
                                        <label htmlFor={key} className="form-label">{key}</label>
                                        <input type="text" className="form-control" id={key} name={key}
                                               value={formData[key]} onChange={handleInputChange} required/>
                                    </div>
                                ))}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                                <button type="submit" className="btn btn-primary">Update User</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Update;
