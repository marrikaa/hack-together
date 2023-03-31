import React, { useEffect, useRef, useState } from 'react'
import { getAllExternalUsers } from '../../client/client'
import { User } from '../../types/types'
import { OneUser } from './OneUser'


const AllUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [usersStore, setUsersStore] = useState<User[]>([]);
    const [searchTag, setSearchTag] = useState<string>("");

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
        // if (e.currentTarget.value === "") {
        //     setUsers(usersStore)
        // }
        // changeUsersListHandler(e.currentTarget.value)
    }

    // const changeUsersListHandler = (value: string) => {
    //     const newUsers = users.filter(user => {
    //         const filter = user?.skills!.filter(skill => skill.toLowerCase().startsWith(value));
    //         if (filter) {
    //             return user
    //         }
    //     }
    //     setUsers(newUsers);
    // }


    return (
        <div>
            <div className='search-bar'>
                <input name="searchTag" type="text" className='search-input' onChange={inputChangeHandler} />
                <button className='search-button' >🔍</button>
            </div>
            {searchTag === "" && users.map((user, i) => <OneUser username={user!.username} key={i}
                img={user!.img} about={user!.about} links={user!.links} skills={user!.skills} />)}
            {searchTag !== "" && users.filter(user => {
                for (const skill of user!.skills) {
                    if (skill.toLowerCase().startsWith(searchTag.toLowerCase())) {
                        return true;
                    }
                }
            }
            ).map((user, i) => <OneUser username={user!.username} key={i}
                img={user!.img} about={user!.about} links={user!.links} skills={user!.skills} />)}

        </div>
    )
}

export default AllUsers
