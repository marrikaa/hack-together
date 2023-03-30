import React, { useEffect, useState } from 'react'
import { getAllExternalUsers } from '../../client/client'
import { User } from '../../types/types'
import { OneUser } from './OneUser'


const AllUsers = () => {

    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const getAllUsers = async () => {
            const users = await getAllExternalUsers();
            setUsers(users);
        }
        getAllUsers()
    }, [])

    return (
        <div>
            {users.map((user, i) => <OneUser username={user!.username} key={i}
                img={user!.img} about={user!.about} links={user!.links} skills={user!.skills} />)}
        </div>
    )
}

export default AllUsers
