import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getExternalUserByUserName } from '../../client/client';
import { AppContext } from '../../context/AppContext';
import { User } from '../../types/types';
import ProfileLink from '../ProfileLink/ProfileLink';

export const Profile = () => {
    const [isDescriptionEditable, setIsDescriptionEditable] = useState(false);
    const [user, setUser] = useState<User>(null);
    const { username } = useParams();

    useEffect(() => {
        const getUser = async () => {
            setUser(await getExternalUserByUserName(username!));
        }
        getUser();
    }, []);

    const addTag = () => {

    }

    const editAboutMe = () => {

    }

    return (
        <div>
            {user &&
                <div>
                    <h1>{user.username}</h1>
                    <h2>About:</h2>
                    <textarea name="aboutMe">{user.about}</textarea>
                    <h2>Tech stack</h2>
                    <div className='profile-tags-container'>
                        {user.skills.map(skill => <label className='skill-tag'>{skill}</label>)}
                        <button onClick={addTag}>+</button>
                    </div>
                    <h2>Social media and portfolio</h2>
                    <div className='profile-links-container'>
                        {user.links.map(link => <a href={link.value} className='link-tag'>
                            <ProfileLink name={link.name} value={link.value} /></a>)}
                    </div>
                </div>}
        </div>)
}