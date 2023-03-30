import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { createExternalUser, getExternalUser } from '../../client/client';
import { AppContext } from '../../context/AppContext';

const RegistrationForm = () => {

    const { setUser } = useContext(AppContext);

    const [wrongInput, setWrongInput] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            setWrongInput("");
        }, 2000);
    }, [wrongInput]);

    const formSubmitted = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, username, password, password_2 } = event.currentTarget;
        if (password.value !== password_2.value) {
            setWrongInput("Passwords are not the same!");
            return;
        }
        let res = await createExternalUser(username.value, email.value, password.value);
        if (res.message !== 'success') {
            setWrongInput(res.message);
        } else {
            setUser(await getExternalUser(email.value, password.value))
            navigate('/');
        }
    }

    return (
        <div className='login-form'>
            <form onSubmit={formSubmitted} className='formInput'>
                <h2>Register</h2>
                <h3>{wrongInput}</h3>
                <input name='email' placeholder='Your email adress' type="email" />
                <input name='username' placeholder='Your username' type="text" />
                <input name='password' placeholder='Your password' type="password" />
                <input name='password_2' placeholder='Your password' type="password" />
                <button className='red-button'>Register</button>
                {wrongInput !== "" && <label>{wrongInput}</label>}
            </form>
        </ div>
    )
}

export default RegistrationForm;