import { User } from '../types/types';

const root = 'https://us-central1-hacktogether-api.cloudfunctions.net/app';

export const createExternalUser = async (username: string, email: string, password: string) => {
    const response = await fetch(`${root}/api/register`, {
        method: "POST",
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return response.json();
}

export const getExternalTags = async (): Promise<string[]> => {
    const response = await fetch(`${root}/api/tags`);
    const tags = response.json();
    console.log(tags);

    return tags
}

export const getExternalUser = async (email: string, password: string): Promise<User> => {
    const response = await fetch(`${root}/api/login`, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return response.json();
}


export const getExternalUserByUserName = async (UserName: string): Promise<User> => {
    const response = await fetch(`${root}/api/profile/${UserName}`);
    return response.json();
}

export const updateExternalProfile = async (user: User) => {

    console.log(user);
    const response = await fetch(`${root}/api/profile/${user!.username}`, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    return response.json();
}