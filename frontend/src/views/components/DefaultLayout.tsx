import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../../axios-client";

function DefaultLayout() {
    const {user, token, setUser, setToken} = useStateContext()

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (ev: any) => {
        ev.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data);
            });
    }, []);

    return (
        <div className="container w-75">
            <header className="d-flex justify-content-center mb-5">
                <nav className="navbar navbar-expand-lg w-100 p-3 rounded-bottom-5 bg-dark">
                    <div className="container-fluid">
                        <span className="fw-bold text-light">
                            {user.name}
                        </span>
                        <Link className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" to={"/users"}>Users</Link>
                        <Link onClick={onLogout} className="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" to={"#"}>Logout</Link>
                    </div>
                </nav>
                
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default DefaultLayout;