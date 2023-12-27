import React, {useState} from 'react';
import {registration} from "../http/userApi";

const Registration = ({onClose, refreshUsers, admin}) => {
    const [formData, setFormData] = useState(admin ? {
        login: "",
        name: "",
        lastname: "",
        password: "",
        group_id: "",
        phone_number: "",
        address: "",
        email: "",
        admin_level: ""
    } : {
        login: "",
        name: "",
        lastname: "",
        password: "",
        group_id: "",
        phone_number: "",
        address: "",
        email: ""
    })

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async () => {
        try {
            await registration(formData, admin);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <div className="modal show" tabIndex="-1" style={{display: 'block'}}>
            <div className="modal-backdrop show custom-backdrop"></div>
            <div className="modal-dialog custom-modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">User Creation</h5>
                        <button type="button" className="btn-close" onClick={() => {
                            onClose()
                            refreshUsers()
                        }}></button>
                    </div>
                    <div className="modal-body">
                        <form className="d-flex flex-column" onSubmit={async (e) => {
                            e.preventDefault();
                            await handleSubmit();
                            onClose()
                            refreshUsers()
                        }}>
                            {Object.keys(formData).map((key, i) => (
                                <div key={i} className="mb-3">
                                    <label htmlFor={key} className="form-label">Enter your {key}:</label>
                                    <input type="text" className="form-control" id={key} name={key}
                                           placeholder={`Enter your ${key}...`} value={formData[key]}
                                           onChange={handleInputChange} required/>
                                </div>
                            ))}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                        onClick={() => refreshUsers()}>Close
                                </button>
                                <button type="submit" className="btn btn-primary">Create account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Registration;
