import React, { useEffect } from 'react'
import { landingPageTextOne, landingPageTextTwo } from '../../contents/contentStrings'
import { StandardButton } from '../StandardButton/StandardButton'
import Logo from '../../assets/images/logo.png';
import { login, register } from '../../database/dbManager';

export const LandingPage = () => {
    useEffect(() => {
        login('marika@gmail.com', 'gonzal')

    }, [])
    return (
        <div>
            <h1>What is hack together?</h1>
            <p>{landingPageTextOne}</p>
            <img className='landing-page-logo' src={Logo} alt="" />
            <p>{landingPageTextTwo}</p>
            <StandardButton buttonText='Join us' url='/register' />
        </div>

    )
}
