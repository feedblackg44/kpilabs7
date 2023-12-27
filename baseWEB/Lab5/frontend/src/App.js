import './App.css'
import {BrowserRouter} from "react-router-dom"
import AppRouter from "./components/AppRouter"
import {useContext, useEffect} from "react"
import {Context} from "./index"
import {get_info} from "./http/userApi"
import NavBar from "./components/NavBar";

function App() {
    const {user} = useContext(Context)

    useEffect(() => {
        get_info().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
        }).catch(e => {
            console.log(e)
        })
    }, [user])

    return (
        <div className="App">
            <BrowserRouter>
                <NavBar/>
                <AppRouter/>
            </BrowserRouter>
        </div>
    )
}

export default App
