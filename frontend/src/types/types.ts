export type Message = {
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
