export type Message = {

}

export type Link = {
    name: string,
    value: string,
}

export interface User {
    username: string,
    uid: string,
    img: string,
    about: string,
    links: Link[],
    projects: string[],
    email: string,
    skills: string[],
    messages: string[],
}

export type AppContextType = {
    username: string,
    setUserName: (str: string) => void,
    uid: string,
    setUid: (str: string) => void,
    email: string,
    setEmail: (str: string) => void,
    messages: Message[],
    setMessages: (msgs: Message[]) => void,
    about: string,
    setAbout: (str: string) => void,
    img: string,
    setImg: (str: string) => void,
    links: Link[],
    setLinks: (links: Link[]) => void,
    projects: string[],
    setProjects: (projects: string[]) => void,
    skills: string[],
    setSkills: (skills: string[]) => void,
    setUser: (user: User) => void
}
