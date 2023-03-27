import React, { useState, useEffect } from 'react'
import { register } from '../../database/dbManager';

const RegistrationForm = () => {

    const [wrongInput, setWrongInput] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setWrongInput("");
        }, 2000);
    }, [wrongInput]);

    const formSubmitted = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, username, password, password_2 } = event.currentTarget;
        if (password.value !== password_2.value) {
            setWrongInput("Passwords are not the same!");
            return;
        }
        try { register(username.value, email.value, password.value) }
        catch {
            setWrongInput("Mail is being used");
        }
    }

    return (
        <form onSubmit={formSubmitted}>
            <h2>Register</h2>
            <h3>{wrongInput}</h3>
            <input name='email' placeholder='Your email adress' type="email" />
            <input name='username' placeholder='Your username' type="text" />
            <input name='password' placeholder='Your password' type="password" />
            <input name='password_2' placeholder='Your password' type="password" />
            <button className='red-button'>Register</button>
            {wrongInput !== "" && <label>{wrongInput}</label>}
        </form>
    )
}

export default RegistrationForm;