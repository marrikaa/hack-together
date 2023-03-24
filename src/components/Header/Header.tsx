import React from 'react'
import { useNavigate } from 'react-router-dom';
import { StandardButton } from '../StandardButton/StandardButton';
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
                <StandardButton buttonText='Log in' url='/login' />
                <StandardButton buttonText='Register' url='/register' />
            </div>
        </div>
    )
}

export default Header