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

export type Position = {
    title: string,
    description: string,
    skills: string[];
    developer: string;
}

export type Project = {
    id: string,
    title: string,
    description: string,
    owner: string,
    positions: Position[],
}

export type ProjectWthoutId = {
    title: string,
    description: string,
    owner: string,
    positions: Position[],
}
