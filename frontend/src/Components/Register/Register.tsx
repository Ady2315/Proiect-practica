import { Title } from "@mui/icons-material";
import { Button, FormControl, FormGroup, FormLabel, Link, TextField } from "@mui/material";
import React from "react";


function Register() {
    return (
        <FormControl className="bg-dark p-3 text-light rounded-4">
            <h2>Register</h2>
            <FormGroup className="d-flex flex-row justify-content-between align-items-center text-light my-3">
                <FormLabel className="text-light">Email:</FormLabel>
                <TextField type="email" placeholder="Email" className="text-light" />
            </FormGroup>
            <FormGroup className="d-flex flex-row justify-content-between align-items-center text-light my-3">
                <FormLabel className="text-light">Password:</FormLabel>
                <TextField type="password" placeholder="Password" className="text-light"/>
            </FormGroup>
            <FormGroup className="d-flex flex-row justify-content-between align-items-center text-light my-3">
                <FormLabel className="text-light">Confirm password:</FormLabel>
                <TextField type="password" placeholder="Password" className="text-light"/>
            </FormGroup>
            <FormGroup className="d-flex flex-row justify-content-between">
                <Link>Log in</Link>
                <Button type="submit">Register</Button>
            </FormGroup>
        </FormControl>
    );
}

export default Register;