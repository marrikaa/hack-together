import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { User } from '../../types/types';
import './Header.css'


const Logo = require('../../assets/images/logo.png');
const emailWhite = require('../../assets/images/email_white.png');
//const user = require('../../assets/images/user.png');
const userWhite = require('../../assets/images/user-white.png');

const Header = () => {
    const { user, setUser } = useContext(AppContext)
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
            <div className='header-menu'>
                {/* {user?.username && <div className='header-link-div' onClick={() => navigate(`/profile/${user.username}/projects`)}>My Projects</div>} */}
                {user?.username && <img onClick={() => navigate(`/profile/${user?.username}`)} src={userWhite} className='header-link-div header-icon' alt="" />}
                {user?.username && <img className="header-link-div header-icon" onClick={() => navigate('/messages')} src={emailWhite} alt="" />}
                <div className='header-link-div' onClick={() => navigate('/about')}>About</div>
                <div className='header-link-div' onClick={() => navigate('/projectlist')}>Projects</div>
                <div className='header-link-div' onClick={() => navigate('/allUsers')}>Users</div>
                {!user?.username && <div className='header-link-div' onClick={() => navigate('/login')}>Login</div>}
                {user?.username && <div className='header-link-div' onClick={logOut}>Logout</div>}
                {!user?.username && <div className='header-link-div' onClick={() => navigate('/register')}>Register</div>}
            </div>
        </header>
    )
}

export default Header