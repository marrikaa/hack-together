import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getExternalUser } from '../../client/client';
import { AppContext } from '../../context/AppContext';

const LoginForm = () => {

    const { setUser } = useContext(AppContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const formSubmitted = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { emailInput, passwordInput } = event.currentTarget;
        let currentUser = await getExternalUser(emailInput.value, passwordInput.value);
        if (currentUser!.username) {
            setUser(currentUser);
            navigate(-1);
        }
        else {
            setError(currentUser!.uid.split('Error ')[1].replaceAll(/[()]/g, ""));
        }
    }

    return (
        <div className='login-form'>
            <form onSubmit={formSubmitted} className='formInput' method='get'>
                <h2>Log in</h2>
                <input name="emailInput" placeholder='Your email adress' type="email" />
                <input name="passwordInput" placeholder='Your password' type="password" />
                <button className='red-button' type='submit'>log in</button>
            </form>
            {error && <label style={{ marginTop: '1em' }}>{error}</label>}
        </div>
    )
}

export default LoginForm