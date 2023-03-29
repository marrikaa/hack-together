import React, { useState, useEffect } from 'react';
import { socialMediaImages } from '../../assets/images/socialMediaIcons';
import enlace from '../../assets/images/socialMediaIcons/enlace.png'


type ProfileLinkProps = {
    name: string,
    value: string
}

const ProfileLink = ({ name, value }: ProfileLinkProps) => {

    const [image, setImage] = useState("");
    useEffect(() => {
        socialMediaImages.forEach((image) => {
            if (name === image.name) {
                setImage(image.image);
            }
        })
    }, [])

    return (
        <a href={value} rel="noreferrer" target="_blank" className='profile-one-link'>
            <img src={image ? image : enlace} alt="" style={{ width: '30px', height: '30px' }} />
            <label>{name}</label>
        </a>
    )
}

export default ProfileLink