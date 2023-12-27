import React, {useContext} from 'react'
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE} from "../utils/consts";

const NavBar = observer( () => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    function logOut() {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        navigate(LOGIN_ROUTE)
    }

    return (
        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>Lab5</Navbar.Brand>
                <Nav className="me-auto">
                    {user.isAuth && <Nav.Link onClick={() => navigate(HOME_ROUTE)}>Cabinet</Nav.Link>}
                    {user.isAuth && user.user.AdminLevel > 0 && <Nav.Link onClick={() => navigate(ADMIN_ROUTE)}>Admin Panel</Nav.Link>}
                </Nav>
                <Nav className="ms-auto">
                    {
                        user.isAuth
                        ? <Button onClick={logOut} variant="outline-light">Log out</Button>
                        : <Button variant="outline-light">Log in</Button>
                    }
                </Nav>
            </Container>
        </Navbar>
    )
})

export default NavBar