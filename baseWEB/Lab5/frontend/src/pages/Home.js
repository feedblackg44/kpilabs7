import React, {useContext} from 'react';
import {Context} from "../index";

const Home = () => {
    const {user} = useContext(Context)

    return (
        <div className="container mt-5">
            <table className="table">
                <thead>
                <tr>
                    <th colSpan="2" className="text-center">User Info</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(user.user).map((key, i) => (
                    <tr key={i}>
                        <td>{key}</td>
                        <td>{user.user[key]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Home