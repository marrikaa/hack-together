import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getExternalUserByUserName, updateExternalProfile } from '../../client/client';
import { AppContext } from '../../context/AppContext';
import { LinkType, User } from '../../types/types';
import ImageUpload from '../ImageUpload/ImageUpload';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ProfileLink from '../ProfileLink/ProfileLink';
import { ProfileNewLink } from '../ProfileNewLink/ProfileNewLink';
import { ProfileNewTag } from '../ProfileNewTag/ProfileNewTag';
import { SelectImagePopUp } from '../SelectImagePopUp.tsx/SelectImagePopUp';
import TextArea from '../TextArea/TextArea';
import './Profile.css';
import ProfileImages from '../../assets/images/profileImages';



const addIcon = require('../../assets/images/add.png');
const deleteIcon = require('../../assets/images/delete.png');
const emailIcon = require('../../assets/images/email.png');
const editIcon = require('../../assets/images/edit-246.png');

const Profile = () => {
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [ImagePopUpVisible, setImagePopUpVisible] = useState(false);
    const [editEnabled, setEditEnabled] = useState(false);
    const [profileUser, setProfileUser] = useState<User>(null);
    const [tagDialogVisible, setTagDialogVisible] = useState(false);
    const [linkDialogVisible, setLinkDialogVisible] = useState(false);
    const [currentDescription, setCurrentDescription] = useState<string>("");
    const [currentLinks, setCurrentLinks] = useState<LinkType[]>([]);
    const [currentTags, setCurrentTags] = useState<string[]>([]);
    const [currentImage, setCurrentImage] = useState(-1);
    const { username } = useParams();
    const { user } = useContext(AppContext);


    useEffect(() => {
        const getUser = async () => {
            const newUser = await getExternalUserByUserName(username!);
            setProfileUser(newUser);
            setCurrentDescription(newUser!.about);
            setCurrentTags(newUser!.skills)
            setCurrentLinks(newUser!.links);
            setCurrentImage(newUser!.img || -1);
            if (user && username === user.username) {
                setIsMyProfile(true);
            }
        }
        getUser();
    }, [username, user]);

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
                skills: currentTags,
                img: currentImage
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

    const editImage = () => {
        if (editEnabled) {
            setImagePopUpVisible(true)
        }
    }

    return (
        <div>
            {!profileUser && <LoadingSpinner />}
            {profileUser && <>
                {tagDialogVisible && <ProfileNewTag setVisible={setTagDialogVisible} setTags={setCurrentTags} tags={currentTags} />}
                {linkDialogVisible && <ProfileNewLink setVisible={setLinkDialogVisible} setLinks={setCurrentLinks} links={currentLinks} />}
                {ImagePopUpVisible && <SelectImagePopUp currentImageIndex={currentImage} setSelectedIndex={setCurrentImage} setVisible={setImagePopUpVisible} />}
                {profileUser &&
                    <div>
                        <div className='about-header'>
                            {/* <ImageUpload isEditable={editEnabled} currentImage={currentImage || null} setCurrentImage={updateImage} /> */}
                            <div className='profile-picture-and-username'>
                                {< img className='profile-picture' src={currentImage === -1 ? 'https://www.vhv.rs/dpng/d/526-5268314_empty-avatar-png-user-icon-png-transparent-png.png' : ProfileImages[currentImage]} alt='' onClick={editImage} />}
                                <h1 className='profile-username'>{profileUser.username}</h1>
                            </div>
                            {isMyProfile && !editEnabled && <img className='edit-button'
                                onClick={() => setEditEnabled((editEnabled) => !editEnabled)}
                                src={editIcon}
                                width="40px" height="40px" alt="" />
                            }
                            {!isMyProfile && user?.username &&
                                <Link to={`/conversation/${profileUser.username}`}> <img className='send-message-icon' src={emailIcon} alt="" /></Link>
                            }
                        </div>
                        {<TextArea canType={editEnabled} currentDescription={currentDescription} onTyping={changeCurrentDescription} />}
                        <h2>Tech stack</h2>

                        <div className='profile-tags-container'>
                            {currentTags?.map((skill, i) => {
                                return (<div className='skill-tag' key={i}><p>{skill}</p>
                                    {editEnabled && <img src={deleteIcon} className='remove-tag-button' alt="" onClick={() => removeTag(i)} />}
                                </div>)
                            })}
                            {editEnabled && <img src={addIcon} onClick={addTag} className='new-tag-button' alt="" />}
                        </div>

                        <h2>Social media and portfolio</h2>

                        <div className='profile-links-container'>
                            {currentLinks?.map((link, i) => {
                                return <ProfileLink key={i} link={link} index={i} removeLink={removeLink} editEnabled={editEnabled} />
                            })}
                            {editEnabled && <img src={addIcon} className='new-tag-button' onClick={() => setLinkDialogVisible(true)} alt="" />}
                        </div>

                        {editEnabled && <button className='red-button' onClick={save}>Save</button>}
                    </div >
                }
            </>}
        </div >
    )
}
export default Profile;