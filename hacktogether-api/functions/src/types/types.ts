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
export type Link = {
    name: string,
    value: string,
}

export type Tags = {
    name: string,
}

