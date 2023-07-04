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
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
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
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.created_at}</td>
                                <td>
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