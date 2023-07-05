import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

function UserForm() {
    const {id} = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null);
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/users/${id}`)
                .then(({data}) => {
                    setLoading(false)
                    setUser(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const onSubmit = (ev: any) => {
        ev.preventDefault();
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        } else {
            axiosClient.post(`/users`, user)
                .then(() => {
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        }
    }

    return (
        <div>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card p-5 w-100 bg-dark">
                {loading && (
                    <div className="text-center">Loading...</div>
                )}
                {errors && <div className="alert alert-danger">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                    </div>                                                                                                                                                                             
                }
                {!loading &&
                    <form onSubmit={onSubmit}>
                        <div className="mb-4 form-floating">
                            <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} type="text" placeholder="Name" id="name" className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="mb-4 form-floating">
                            <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} type="email" placeholder="Email" id="email" className="form-control" />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="mb-4 form-floating">
                            <input onChange={ev => setUser({...user, password: ev.target.value})} type="password" placeholder="Password" id="password" className="form-control" />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="mb-4 form-floating">
                            <input onChange={ev => setUser({...user, password_confirmation: ev.target.value})} type="password" placeholder="Password Confirmation" id="password-confirmation" className="form-control" />
                            <label htmlFor="password-confirmation">Password Confirmation</label>
                        </div>
                        <button className="btn btn-success">Save</button>
                    </form>
                }
            </div>
        </div>
    );
}

export default UserForm;