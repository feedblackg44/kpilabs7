import React, {useContext} from 'react'
import {Route, Routes} from "react-router-dom"
import {adminRoutes, authRoutes, publicRoutes} from "../routes"
import {Context} from "../index"
import {observer} from "mobx-react-lite"

const AppRouter = observer(() => {
    const {user} = useContext(Context)

    return (
        <Routes>
            {!user.isAuth && publicRoutes.map(route =>
                <Route key={route.path} path={route.path} element={<route.Component/>}/>
            )}
            {user.isAuth && authRoutes.map(route =>
                <Route key={route.path} path={route.path} element={<route.Component/>}/>
            )}
            {user.isAuth && user.user.AdminLevel > 0 && adminRoutes.map(route =>
                <Route key={route.path} path={route.path} element={<route.Component/>}/>
            )}
        </Routes>
    )
})

export default AppRouter