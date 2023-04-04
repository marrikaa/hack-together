import React, { useContext, useEffect, useRef, useState } from 'react'
import { getAllExternalUsers } from '../../client/client'
import { User } from '../../types/types';
import { OneUser } from './OneUser';
import ProfileImages from '../../assets/images/profileImages';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';




const AllUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [usersStore, setUsersStore] = useState<User[]>([]);
    const [searchTag, setSearchTag] = useState<string>("");
    const { user } = useContext(AppContext);

    useEffect(() => {
        const getAllUsers = async () => {
            const users = await getAllExternalUsers();
            setUsersStore(users);
            setUsers(users);
        }
        getAllUsers()
    }, [])


    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTag(e.currentTarget.value);
    }

    const navigate = useNavigate();

    return (
        <>
            <div className='search-bar'>
                <input name="searchTag" type="text" className='search-input' onChange={inputChangeHandler} />
                <button className='search-button'>🔍</button>
            </div>
            {searchTag === "" && users.filter(u => u!.username !== user?.username).map((user, i) => <OneUser username={user!.username} key={i}
                img={ProfileImages[user?.img!]} about={user!.about} links={user!.links} skills={user!.skills} />)}
            {searchTag !== "" && users.filter(u => {
                for (const skill of u!.skills) {
                    if (skill.toLowerCase().startsWith(searchTag.toLowerCase()) && u!.username !== user?.username) {
                        return true;
                    }
                }
            }
            ).map((user, i) =>
                <div>
                    <OneUser username={user!.username} key={i}
                        img={ProfileImages[user?.img!]} about={user!.about} links={user!.links} skills={user!.skills} />
                </div>
            )}
        </>
    )
}

export default AllUsers
