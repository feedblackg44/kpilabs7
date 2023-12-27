import {
    LOGIN_ROUTE,
    HOME_ROUTE,
    ADMIN_ROUTE
} from "./utils/consts";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

export const publicRoutes = [
    {path: LOGIN_ROUTE, Component: Login}
]

export const authRoutes = [
    {path: HOME_ROUTE, Component: Home}
]

export const adminRoutes = [
    {path: ADMIN_ROUTE, Component: Admin}
]