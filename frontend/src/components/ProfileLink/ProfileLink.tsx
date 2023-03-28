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
        <div className='profile-one-link'>
            <a href={value}>
                <img src={image ? image : enlace} alt="" style={{ width: '50px', height: '50px' }} />
                <label>{name}</label>
            </a>
        </div>
    )
}

export default ProfileLink