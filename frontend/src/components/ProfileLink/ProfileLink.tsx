import React, { useState, useEffect } from 'react';
import { socialMediaImages } from '../../assets/images/socialMediaIcons';

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
        <div>
            <img src={image} alt="" />
            <label>{value}</label>
        </div>
    )
}

export default ProfileLink