import React from "react";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

function Users() {
    const [users, setUsers] = useState<{ id: number; name: string; email: string; created_at: string; }[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, [])

    const onDelete = (u: any) => {
        if (!window.confirm("Are you sure you wabt to delete this user?")) {
            return
        }

        axiosClient.delete(`/users/${u.id}`)
            .then(() => {
                getUsers()
            })
    }

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
            .then(({data}) => {
                setLoading(false)
                setUsers(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Users</h1>
                <Link to="/users/new" className="btn btn-success">Add new</Link>
            </div>
            <div className="card">
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Create Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    {loading && <tbody>
                        <tr>
                            <td colSpan={5} className="text-center">
                                Loading...
                            </td>
                        </tr>
                    </tbody>
                    }
                    {!loading && <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <th scope="row">{u.id}</th>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.created_at}</td>
                                <td className="d-flex justify-content-between">
                                    <Link className="btn btn-primary" to={'/users/'+u.id}>Edit</Link>
                                    <button onClick={ev => onDelete(u)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    }
                </table>
            </div>
        </div>
    );
}

export default Users;