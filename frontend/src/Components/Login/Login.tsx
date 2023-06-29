import { Title } from "@mui/icons-material";
import { Button, FormControl, FormGroup, FormLabel, Link, TextField } from "@mui/material";
import React from "react";


function Login() {
    return (
        <FormControl className="bg-dark p-3 text-light rounded-4">
            <h2>Log in</h2>
            <FormGroup className="d-flex flex-row justify-content-between align-items-center text-light my-3">
                <FormLabel className="text-light">Email:</FormLabel>
                <TextField type="email" placeholder="Email" className="text-light" color="primary" />
            </FormGroup>
            <FormGroup className="d-flex flex-row justify-content-between align-items-center text-light my-3">
                <FormLabel className="text-light">Password:</FormLabel>
                <TextField type="password" placeholder="Password" className="text-light"/>
            </FormGroup>
            <FormGroup className="d-flex flex-row justify-content-between">
                <Link href="./Components/Register/Register">Register</Link>
                <Button type="submit">Log in</Button>
            </FormGroup>
        </FormControl>
    );
}

export default Login;