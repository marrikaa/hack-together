import React, { useEffect } from 'react'
import { landingPageTextOne, landingPageTextTwo } from '../../contents/contentStrings'
import Logo from '../../assets/images/logo.png';
import { login, register } from '../../database/dbManager';

export const LandingPage = () => {
    return (
        <div>
            <h1>What is hack together?</h1>
            <p>{landingPageTextOne}</p>
            <img className='landing-page-logo' src={Logo} alt="" />
            <p>{landingPageTextTwo}</p>
            <button className='red-button'>Join us!</button>
        </div>
    )
}
