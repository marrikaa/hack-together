import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getExternalUserByUserName, updateExternalProfile } from '../../client/client';
import { AppContext } from '../../context/AppContext';
import { Link, User } from '../../types/types';
import ProfileLink from '../ProfileLink/ProfileLink';
import { ProfileNewLink } from '../ProfileNewLink/ProfileNewLink';
import { ProfileNewTag } from '../ProfileNewTag/ProfileNewTag';
import TextArea from '../TextArea/TextArea';
import './Profile.css'

const addIcon = require('../../assets/images/add.png');
const deleteIcon = require('../../assets/images/delete.png');

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
            setCurrentDescription(newUser!.about);
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
                        <h1 className='profile-username'>{profileUser.username}</h1>
                        {isEditButton && !editEnabled && <img className='edit-button'
                            onClick={() => setEditEnabled((editEnabled) => !editEnabled)}
                            src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png"
                            width="40px" height="40px" alt="" />
                        }
                    </div>
                    {<TextArea canType={editEnabled} currentDescription={profileUser.about} onTyping={changeCurrentDescription} />}
                    <h2>Tech stack</h2>
                    <div className='profile-tags-container'>
                        {currentTags.map((skill, i) => {
                            return (<div className='skill-tag' key={i}><p>{skill}</p>
                                {editEnabled && <img src={deleteIcon} className='remove-tag-button' alt="" onClick={() => removeTag(i)} />}
                            </div>)
                        })}
                        {editEnabled && <img src={addIcon} onClick={addTag} className='new-tag-button' alt="" />}
                    </div>
                    <h2>Social media and portfolio</h2>
                    <div className='profile-links-container'>
                        {currentLinks.map((link, i) => {
                            return (<div className='profile-one-link editable'><ProfileLink name={link.name} value={link.value} />{editEnabled && <button className='profile-remove-link-button' onClick={() => removeLink(i)}>x</button>}</div>)
                        })}
                        {editEnabled && <img src={addIcon} className='new-tag-button' onClick={() => setLinkDialogVisible(true)} alt="" />}

                        {editEnabled && <button className='red-button' onClick={save}>Save</button>}
                    </div>
                </div >}
        </div>
    )
}