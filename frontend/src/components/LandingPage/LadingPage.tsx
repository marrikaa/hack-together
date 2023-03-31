import React, { useContext } from 'react'
import { landingPageTextOne, landingPageTextTwo } from '../../contents/contentStrings'
import Logo from '../../assets/images/logo.png';
import { AppContext } from '../../context/AppContext';
import './LandingPage.css'
import { useNavigate } from 'react-router-dom';


export const LandingPage = () => {

    const navigate = useNavigate();

    const { user } = useContext(AppContext)
    return (
        <div className='landing-page-box'>
            <h1>What is hack together?</h1>
            <p className='title-landing'>{landingPageTextOne}</p>
            <img className='landing-page-logo' src={Logo} alt="" />
            <p>{landingPageTextTwo}</p>
            {!user?.username && <button onClick={() => navigate('/register')} className='red-button join-us'>Join us!</button>}
        </div>
    )
}
