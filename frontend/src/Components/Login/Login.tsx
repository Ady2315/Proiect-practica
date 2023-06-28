import React from "react";

function Input(props: any) {
    return (
        <div className="d-flex flex-column w-100 mb-3 form-row">
            <label htmlFor={props.id} className="form-label">{props.label}</label>
            <div className="input-group has-validation">
                <input type={props.type} id={props.id} className="form-control w-100" placeholder={props.phName} required />
                <div className="invalid-feedback">
                    Please choose a {props.label}.
                </div>  
            </div>  
        </div>
    );
}

function Submit(props: any) {
    return (
        <div className="">
            <button className="btn btn-primary" type="submit">{props.name}</button>
        </div>
    );
}

function Login() {
    return (
        <form className="bg-dark text-light needs-validation p-4 rounded" noValidate>
            <h2>LOGIN</h2>
            <Input type="email" phName="Email" id="emailInput" label="Email" />
            <Input type="password" phName="Password" id="passwordInput" label="Password" />
            <Submit name="Log in" />
        </form>
    );
}

export default Login;