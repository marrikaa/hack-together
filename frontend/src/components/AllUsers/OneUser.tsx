import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LinkType } from '../../types/types';
import ProfileLink from '../ProfileLink/ProfileLink';
import './AllUsers.css';
const emailIcon = require('../../assets/images/email.png');


type OneUserProps = {
    username: string,
    img: string,
    about: string,
    links: LinkType[],
    skills: string[],
}

export const OneUser = ({ username, img, about, links, skills, }: OneUserProps) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/profile/${username}`)
    }
    const handleMailClick = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
        navigate(`/conversation/${username}`)
    }
    return (
        <div className='user-list-one-user-container' onClick={handleClick}>
            <div className='profile-pic-and-message'>
                <div className='profile-picture-and-username'>

                    <img src={img} className='all-users-profile-pic' alt="" />
                    <h2 className='user-card-title'>{username}</h2>
                </div>

                {username &&
                    <img className='send-message-icon' onClick={handleMailClick} src={emailIcon} alt="" />
                }
            </div>
            <p className='about-p'>{about}</p>
            <div className='flex'>
                {skills?.map((skill, i) => <label key={i} className='skill-tag'>{skill}</label>)}
            </div>
            <div className='one-position-skill-container'>
                {links?.map((link, i) => <ProfileLink key={i} index={i} link={link} editEnabled={false} />)}
            </div>
        </div >
    )
}