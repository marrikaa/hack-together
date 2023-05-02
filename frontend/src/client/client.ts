import { Project, User, ProjectWithoutId, Application, Message, ConversationType } from '../types/types';

const root = 'https://us-central1-hacktogether-api.cloudfunctions.net/app';

const logReq = (message: string) => {
    console.log(`fetching ${message}`);
}

export const createExternalUser = async (username: string, email: string, password: string) => {
    logReq('createExternalUser');
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
    logReq('getExternalTags');
    const response = await fetch(`${root}/api/tags`);
    const tags = response.json();
    return tags
}

export const getExternalProjects = async (): Promise<Project[]> => {
    logReq('getExternalProjects');
    const response = await fetch(`${root}/api/projects`);
    const projects = response.json();
    return projects;
}

export const getExternalProjectById = async (id: string): Promise<Project> => {
    logReq('getExternalProjectById');
    const response = await fetch(`${root}/api/project/${id}`);
    const project = response.json();
    return project;
}

type ExternalUserResponse = {
    message: string;
    user: User
}

export const getExternalUser = async (email: string, password: string): Promise<User> => {
    logReq('getExternalUser');
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
    logReq('getExternalUserByUserName');
    const response = await fetch(`${root}/api/profile/${UserName}`);
    return response.json();
}

export const getAllExternalUsers = async (): Promise<User[]> => {
    logReq('getAllExternalUser');
    const response = await fetch(`${root}/api/users`);
    return response.json();
}

export const updateExternalProfile = async (user: User) => {
    logReq('updateExternalProfile');
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
    logReq('createProjectInDB');
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
    logReq('getUserExternalProjects');
    const response = await fetch(`${root}/api/profile/${uid}/projects`);
    return response.json();
}

export const addProjectToUser = async (userId: string, currentProjectId: string) => {
    logReq('addProjectToUser');
    const response = await fetch(`${root}/api/profile/${userId}/projects`, {
        method: 'POST',
        body: JSON.stringify({ projectId: currentProjectId }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
    return response.text()
}

export const addApplicationToPosition = async (projectId: string, positionId: string, aplication: Application) => {
    logReq('addApplicationToPosition');
    const response = await fetch(`${root}/api/project/${projectId}/${positionId}`, {
        method: 'POST',
        body: JSON.stringify(aplication),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
    return response.text();
}


export const acceptDeveloper = async (projectId: string, positionId: string, username: string) => {
    logReq('acceptDeveloper');
    const response = await fetch(`${root}/api/project/${projectId}/${positionId}`, {
        method: 'PATCH',
        body: JSON.stringify({ username: username }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
    return response.text();
}

export const rejectDeveloper = async (projectId: string, positionId: string, username: string) => {
    logReq('rejectDeveloper');
    const response = await fetch(`${root}/api/project/${projectId}/${positionId}`, {
        method: 'DELETE',
        body: JSON.stringify({ username: username }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
    const text = await response.text();
    return text;
}

export const addMessagesInConversations = async (message: Message, receiverUsername: string) => {
    logReq('addMessagesInConversations');
    const response = await fetch(`${root}/api/messages/${receiverUsername}`, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
    return response.json();
}

export const getMyConversations = async (id: string): Promise<ConversationType[]> => {
    logReq('getMyConversations');
    const response = await fetch(`${root}/api/messages/${id}`);
    const conversations: ConversationType[] = await response.json();
    return conversations;
}

export const setConversationRead = async (conversationId: string, username: string) => {
    const response = await fetch(`${root}/api/conversation/${conversationId}`, {
        method: 'PATCH',
        body: JSON.stringify({ username: username }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    });
}