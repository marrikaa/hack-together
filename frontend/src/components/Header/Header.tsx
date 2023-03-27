import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logo = require('../../assets/images/logo.png');

const Header = () => {
    const navigate = useNavigate();
    const go = () => {
        navigate('/');
    }
    return (
        <div className='header'>
            <div className='left-header' onClick={go}>
                <img src={Logo} alt="" width="50px" height="50px" />
                <h2>HackTogether</h2>
            </div>
            <div className='button'>
                <button className='red-button' onClick={() => navigate('/login')}>Login</button>
                <button className='red-button' onClick={() => navigate('/register')}>Register</button>
            </div>
        </div>
    )
}

export default Header