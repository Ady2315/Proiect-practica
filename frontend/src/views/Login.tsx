import React from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function Login() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState(null);
    const {setUser, setToken} = useStateContext()

    const onSubmit = (ev: any) => {
        ev.preventDefault()
        const payload = {
            email: emailRef.current?.value || "",
            password: passwordRef.current?.value || "",
        }
        
        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    const errorData = response.data.errors || { email: [response.data.message] };
                    setErrors(errorData);
                }
            })
    }

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="card p-5 w-50 m-5 bg-light">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Login into your account
                    </h1>
                    {errors && <div className="alert alert-danger" role="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                    </div>
                    } 
                    <div className="mb-3 d-flex flex-column">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input ref={emailRef} type="email" id="email" className="form-control" placeholder="Email" />
                    </div>
                    <div className="mb-3 d-flex flex-column">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input ref={passwordRef} type="password" id="password" className="form-control" placeholder="Password" />
                    </div>
                    <div className="mb-3 d-flex flex-column-reverse">
                        <p className="message">
                            Not Registered? <Link to="/signup">Create an account</Link>
                        </p>
                        <button className="btn btn-primary mb-3">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;