import { Project, User, ProjectWithoutId } from '../types/types';

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

export const getExternalProjects = async (): Promise<Project[]> => {
    const response = await fetch(`${root}/api/projects`);
    const projects = response.json();
    return projects
}

export const getExternalProjectById = async (id: string): Promise<Project> => {
    const response = await fetch(`${root}/api/project/${id}`);
    const project = response.json();
    return project;
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

export const createProjectInDB = async (project: ProjectWithoutId) => {
    const response = await fetch(`${root}/api/project`, {
        method: "POST",
        body: JSON.stringify(project),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return response.json();
}

export const getUserExternalProjects = async (uid: string) => {
    const response = await fetch(`${root}/api/profile/${uid}/projects`);
    return response.json();
}

export const addProjectToUser = async (userId: string, currentProjectId: string) => {
    const response = await fetch(`${root}/api/profile/${userId}/projects`, {
        method: 'POST',
        body: JSON.stringify({ projectId: currentProjectId }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
    return response.text();
}
