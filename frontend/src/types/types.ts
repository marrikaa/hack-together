
export type LinkType = {
    name: string,
    value: string,
}


export type User = {
    uid: string,
    username: string,
    img: number,
    about: string,
    links: LinkType[],
    projects: string[],
    skills: string[],
    messages: string[],
} | null

export type AppContextType = {
    user: User,
    getUser: () => void,
    setUser: (user: User) => void,
    conversations: ConversationType[],
    notifications: NotificationType[]
}

export type Position = {
    title: string,
    description: string,
    skills: string[];
    fullfilled: boolean;
    applications: Application[],
    id?: string | undefined,
    developer: { username: string }
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

export type Message = {
    senderUsername: string,
    messageContent: string,
    read?: boolean,
}

export type ConversationType = {
    conversationId?: string,
    person1: string,
    person2: string,
    messages: Message[],
} | null

export type ErrorType = {
    message: string,
}

export type NotificationType = {
    type: string,
    title: string,
    message: string,
}