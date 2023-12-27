import React, { useContext, useState } from 'react';
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../utils/consts";
import { get_info, login } from "../http/userApi";
import { Context } from "../index";
import Registration from '../forms/Registration';

const Login = () => {
    const navigate = useNavigate();
    const { user } = useContext(Context);
    const [formData, setFormData] = useState({ login: "", password: "" });
    const [showRegistration, setShowRegistration] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const token = await login(formData);
            localStorage.setItem('token', token);
            const data = await get_info();
            user.setUser(data);
            user.setIsAuth(true);
            navigate(HOME_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    const handleRegistrationClose = () => {
        setShowRegistration(false);
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">Authorization</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        type="text"
                        name="login"
                        className="mt-3"
                        placeholder="Enter your login..."
                        value={formData.login}
                        onChange={handleInputChange}
                    />
                    <Form.Control
                        type="password"
                        name="password"
                        className="mt-3"
                        placeholder="Enter your password..."
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <Row className="d-flex justify-content-between mt-3">
                        <div style={{ width: "auto" }}>
                            Don't have an account?
                            <Button variant="link" onClick={() => setShowRegistration(true)}>Sign up!</Button>
                        </div>
                        <Button
                            style={{ width: "auto", marginRight: 12 }}
                            variant={"outline-success"}
                            onClick={handleSubmit}
                        >
                            Log in
                        </Button>
                    </Row>
                </Form>
            </Card>

            {showRegistration && (
                <Registration
                    onClose={handleRegistrationClose}
                    refreshUsers={() => { }}
                    admin={false}
                />
            )}
        </Container>
    );
};

export default Login;