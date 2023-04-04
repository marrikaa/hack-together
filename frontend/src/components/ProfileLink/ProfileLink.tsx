import React, { useState, useEffect } from 'react';
import { socialMediaImages } from '../../assets/images/socialMediaIcons';
import enlace from '../../assets/images/socialMediaIcons/enlace.png'
import { LinkType } from '../../types/types';
import './ProfileLink.css';


type ProfileLinkProps = {
    link: LinkType;
    removeLink?: (index: number) => void;
    index: number;
    editEnabled: boolean;
}

const ProfileLink = ({ link, removeLink, index, editEnabled }: ProfileLinkProps) => {

    const [image, setImage] = useState("");
    useEffect(() => {
        socialMediaImages.forEach((image) => {
            if (link.name === image.name) {
                setImage(image.image);
            }
        })
    }, [])

    const eliminateSelf = () => {
        removeLink!(index);
    }

    return (
        <div className='one-profile-link'>
            <a href={link.value} rel="noreferrer" target="_blank">
                <img src={image ? image : enlace} alt="" style={{ width: '30px', height: '30px', marginRight: '15px' }} />
                {link.name}
            </a>
            {editEnabled && <button className='profile-remove-tags-button' onClick={eliminateSelf}>x</button>}
        </div>
    )
}

export default ProfileLink