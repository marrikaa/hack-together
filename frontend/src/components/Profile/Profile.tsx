import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getExternalUserByUserName, updateExternalProfile } from '../../client/client';
import { AppContext } from '../../context/AppContext';
import { Link, User } from '../../types/types';
import ProfileLink from '../ProfileLink/ProfileLink';
import { ProfileNewLink } from '../ProfileNewLink/ProfileNewLink';
import { ProfileNewTag } from '../ProfileNewTag/ProfileNewTag';

export const Profile = () => {
    const [isEditButton, setisEditButton] = useState(false);
    const [editEnabled, setEditEnabled] = useState(false);
    const [profileUser, setProfileUser] = useState<User>(null);
    const [tagDialogVisible, setTagDialogVisible] = useState(false);
    const [linkDialogVisible, setLinkDialogVisible] = useState(false);
    const [currentDescription, setCurrentDescription] = useState<string>("");
    const [currentLinks, setCurrentLinks] = useState<Link[]>([]);
    const [currentTags, setCurrentTags] = useState<string[]>([]);
    const { username } = useParams();
    const { user } = useContext(AppContext);

    useEffect(() => {
        const getUser = async () => {
            const newUser = await getExternalUserByUserName(username!);
            setProfileUser(newUser);
            setCurrentTags(newUser!.skills)
            setCurrentLinks(newUser!.links);
            if (user && username === user.username) {
                setisEditButton(true);
            }
        }
        getUser();
    }, [user]);

    const addTag = () => {
        setTagDialogVisible(true);
    }

    const changeCurrentDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentDescription(e.currentTarget.value);
    }

    const save = () => {
        if (user) {
            const updates: User = {
                ...user,
                about: currentDescription,
                links: currentLinks,
                skills: currentTags
            }
            updateExternalProfile(updates);
            setEditEnabled(false);
        }
    }

    const removeTag = (index: number) => {
        const tempTags = [...currentTags];
        tempTags.splice(index, 1);
        setCurrentTags(tempTags);
    }

    const removeLink = (index: number) => {
        const tempLinks = [...currentLinks];
        tempLinks.splice(index, 1);
        setCurrentLinks(tempLinks);
    }

    return (
        <div>
            {tagDialogVisible && <ProfileNewTag setVisible={setTagDialogVisible} setTags={setCurrentTags} tags={currentTags} />}
            {linkDialogVisible && <ProfileNewLink setVisible={setLinkDialogVisible} setLinks={setCurrentLinks} links={currentLinks} />}
            {profileUser &&
                <div>
                    <div className='about-header'>
                        <h1>{profileUser.username}</h1>
                        {isEditButton && !editEnabled && <button className='edit-button' onClick={() => setEditEnabled((editEnabled) => !editEnabled)}>
                            <img src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png" width="40px" height="40px" />
                        </button>}
                    </div>
                    <h2>About:</h2>
                    {<textarea className='profile-description' name="aboutMe" readOnly={!editEnabled} defaultValue={profileUser.about} onChange={changeCurrentDescription} />}
                    <h2>Tech stack</h2>
                    <div className='profile-tags-container'>
                        {currentTags.map((skill, i) => {
                            return (<div className='skill-tag' key={i}><p>{skill}</p>
                                {editEnabled && <button onClick={() => removeTag(i)}>x</button>}
                            </div>)
                        })}
                        {editEnabled && <button onClick={addTag} className='new-tag-button'>+</button>}
                    </div>
                    <h2>Social media and portfolio</h2>
                    <div className='profile-links-container'>
                        {currentLinks.map((link, i) => {
                            return (<div className='profile-one-link'><ProfileLink name={link.name} value={link.value} />{editEnabled && <button onClick={() => removeLink(i)}>x</button>}</div>)
                        })}
                        {editEnabled && <button className='profile-new-link' onClick={() => setLinkDialogVisible(true)}>+</button>}
                    </div>
                    {editEnabled && <button className='red-button' onClick={save}>Save</button>}
                </div>}
        </div >)
}