export type Message = {
    senderId: string,
    receiverUsername: string,
    messageContent: string,
}

export type Link = {
    name: string,
    value: string,
}


export type User = {
    uid: string,
    username: string,
    img: string,
    about: string,
    links: Link[],
    projects: string[],
    skills: string[],
    messages: string[],
} | null

export type AppContextType = {
    user: User,
    getUser: () => void,
    setUser: (user: User) => void,
}

export type Position = {
    title: string,
    description: string,
    skills: string[];
    fullfilled: boolean;
    applications: Application[],
    id?: string | undefined
}

export type Project = {
    id: string,
    title: string,
    description: string,
    owner: string,
    positions: Position[],
    developers: string[],
}

export type ProjectWithoutId = {
    title: string,
    description: string,
    owner: string,
    positions: Position[],
}

export type Application = {
    username: string,
    message: string,
}