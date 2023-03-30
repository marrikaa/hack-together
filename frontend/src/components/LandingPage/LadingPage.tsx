import React, { useContext, useEffect } from 'react'
import { landingPageTextOne, landingPageTextTwo } from '../../contents/contentStrings'
import Logo from '../../assets/images/logo.png';
import { AppContext } from '../../context/AppContext';
import './LandingPage.css'


export const LandingPage = () => {
    const { user } = useContext(AppContext)
    return (
        <div className='landing-page-box'>
            <h1>What is hack together?</h1>
            <p className='title-landing'>{landingPageTextOne}</p>
            <img className='landing-page-logo' src={Logo} alt="" />
            <p>{landingPageTextTwo}</p>
            {!user?.username && <button className='red-button join-us'>Join us!</button>}
        </div>
    )
}
