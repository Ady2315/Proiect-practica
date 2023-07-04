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
        <div className="container">
            <header className="d-flex justify-content-center mb-5">
                <nav className="navbar navbar-expand-lg w-50 p-3 rounded-bottom-5 bg-secondary">
                    <div className="container-fluid">
                        <span className="fw-bold text-light">
                            {user.name}
                        </span>
                        <Link className="link-offset-2" to={"/users"}>Users</Link>
                        <Link onClick={onLogout} className="link-offset-2" to={"#"}>Logout</Link>
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