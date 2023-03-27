import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { User } from '../../types/types';

const Logo = require('../../assets/images/logo.png');

const Header = () => {
    const { user, setUser, getUser } = useContext(AppContext)
    const navigate = useNavigate();
    const go = () => {
        navigate('/');
    }
    const logOut = () => {
        setUser({} as User);
        navigate('/');
    }

    return (
        <header className='header'>
            <div className='left-header' onClick={go}>
                <img src={Logo} alt="" className='header-logo' />
                <h2>HackTogether</h2>
            </div>
            <div className='button'>
                {user?.username}
                {!user?.username && <button className='red-button' onClick={() => navigate('/login')}>Login</button>}
                {user?.username && <button className='red-button' onClick={logOut}>Logout</button>}
                {!user?.username && <button className='red-button' onClick={() => navigate('/register')}>Register</button>}
            </div>
        </header>
    )
}

export default Header