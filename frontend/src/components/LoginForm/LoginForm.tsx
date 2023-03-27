import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { getExternalUser } from '../../client/client';
import { AppContext } from '../../context/AppContext';
import { User } from '../../types/types';

const LoginForm = () => {

    const { user, setUser } = useContext(AppContext);
    const navigate = useNavigate();
    const formSubmitted = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { emailInput, passwordInput } = event.currentTarget;
        let currentUser: (User | undefined) = await getExternalUser(emailInput.value, passwordInput.value)
        if (currentUser) {
            setUser({ ...user, ...currentUser });
            navigate(`/profile/${currentUser.username}`);
        }
    }

    const seeState = () => {
        console.log(user);
    }

    return (
        <>
            <form onSubmit={formSubmitted} className='formInput' method='get'>
                <h2>Log in</h2>
                <input name="emailInput" placeholder='Your email adress' type="email" />
                <input name="passwordInput" placeholder='Your password' type="password" />
                <button className='red-button' type='submit'>log in</button>
            </form>
            <button onClick={seeState}>see state</button>
        </>
    )
}

export default LoginForm