import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { login } from '../../database/dbManager'
import { User } from '../../types/types';

const LoginForm = () => {

    const { setUser, username } = useContext(AppContext);
    const [error, setError] = useState("");

    const formSubmitted = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, password } = event.currentTarget;
        let currentUser: (User | undefined) = await login(email.value, password.value);
        if (currentUser) {
            setUser(currentUser);
        }
    }

    const seeState = () => {
        console.log(username);
    }

    return (
        <>
            <form onSubmit={formSubmitted} className='formInput' method='get'>
                <h2>Log in</h2>
                <input name="email" placeholder='Your email adress' type="email" />
                <input name="password" placeholder='Your password' type="password" />
                <button className='red-button' type='submit'>log in</button>
            </form>
            <button onClick={seeState}>see state</button>
        </>
    )
}

export default LoginForm