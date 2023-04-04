import React from 'react'
import { useNavigate } from 'react-router-dom';
import './BackArrow.css'

const backArrow = require('../../assets/images/previous.png')

const BackArrow = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }
    return (
        <img className='back-arrow' src={backArrow} alt='back-arrow' onClick={goBack}></img>
    )
}

export default BackArrow