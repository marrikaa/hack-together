import React, { useContext, useEffect } from 'react'
import { landingPageTextOne, landingPageTextTwo } from '../../contents/contentStrings'
import Logo from '../../assets/images/logo.png';
import { AppContext } from '../../context/AppContext';


export const LandingPage = () => {
    const { user } = useContext(AppContext)
    return (
        <div>
            <h1>What is hack together?</h1>
            <p>{landingPageTextOne}</p>
            <img className='landing-page-logo' src={Logo} alt="" />
            <p>{landingPageTextTwo}</p>
            {!user?.username && <button className='red-button'>Join us!</button>}
        </div>
    )
}
