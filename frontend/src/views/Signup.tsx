import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

function Signup() {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmationRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState(null);
    const {setUser, setToken} = useStateContext()

    const onSubmit = (ev: any) => {
        ev.preventDefault()
        const payload = {
            name: nameRef.current?.value || "",
            email: emailRef.current?.value || "",
            password: passwordRef.current?.value || "",
            password_confirmation: passwordConfirmationRef.current?.value || ""
        }
        axiosClient.post('/signup', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errrors)
                }
            })
    }

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="card p-5 w-50 m-5 bg-dark">
                <form onSubmit={onSubmit}>
                    <h1 className="title text-light mb-4">
                        Signup for free
                    </h1>
                    {errors && <div className="alert alert-danger">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                    </div>                                                                                                                                                                      
                        
                    }
                    <div className="mb-4 form-floating">
                        <input ref={nameRef} type="text" className="form-control" id="name" placeholder="Full Name" />
                        <label htmlFor="name" className="form-label">Name</label>
                    </div>
                    <div className="mb-4 form-floating">
                        <input ref={emailRef} type="email" className="form-control" id="email" placeholder="Email" />
                        <label htmlFor="email" className="form-label">Email</label>
                    </div>
                    <div className="mb-4 form-floating">
                        <input ref={passwordRef} type="password" className="form-control" id="password" placeholder="Password" />
                        <label htmlFor="password" className="form-label">Password</label>
                    </div>
                    <div className="mb-4 form-floating">
                        <input ref={passwordConfirmationRef} type="password" className="form-control" id="passwordConfirmation" placeholder="Password Confirmation" />
                        <label htmlFor="passwordConfirmation" className="form-label">Password Confirmation</label>
                    </div>
                    <div className="mb-3 d-flex flex-column-reverse">
                        <p className="message text-light">
                            Already Registered? <Link to="/login" className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Sign in</Link>
                        </p>
                        <button className="btn btn-primary mb-3">Signup</button>                     
                    </div>                                                                                                                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                    
                </form>
            </div>
        </div>
    );
}

export default Signup;