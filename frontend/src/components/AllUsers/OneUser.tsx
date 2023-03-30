import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from '../../types/types'
import ProfileLink from '../ProfileLink/ProfileLink'
import './AllUsers.css'

type OneUserProps = {
    username: string,
    img: string,
    about: string,
    links: Link[],
    skills: string[],
}

export const OneUser = ({ username, img, about, links, skills, }: OneUserProps) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/profile/${username}`)
    }

    return (
        <div className='user-list-one-user-container' onClick={handleClick}>
            <h2 className='user-card-title'>{username}</h2>
            <p>{about}</p>
            <div className='flex'>
                {skills?.map((skill, i) => <label key={i} className='skill-tag'>{skill}</label>)}
            </div>
            <div className='flex'>
                {links?.map((link, i) => <ProfileLink key={i} value={link.value} name={link.name} />)}
            </div>
        </div >
    )
}