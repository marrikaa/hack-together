import { createContext, ReactNode, useState } from 'react'
import { Link, Message, User, AppContextType } from '../types/types'

export const AppContext = createContext<AppContextType>({
    username: "",
    setUserName: () => { },
    uid: "",
    setUid: () => { },
    email: "",
    setEmail: () => { },
    messages: [],
    setMessages: () => { },
    about: "",
    setAbout: () => { },
    img: "",
    setImg: () => { },
    links: [],
    setLinks: () => { },
    projects: [],
    setProjects: () => { },
    skills: [],
    setSkills: () => { },
    setUser: () => { }
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUserName] = useState("");
    const [uid, setUid] = useState("");
    const [email, setEmail] = useState("");
    const [about, setAbout] = useState("");
    const [img, setImg] = useState("");
    const [links, setLinks] = useState<Link[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [projects, setProjects] = useState<string[]>([]);
    const [skills, setSkills] = useState<string[]>([]);

    const setUser = (user: User) => {
        setUserName(user.username);
        setUid(user.uid);
        setEmail(user.email);
        setAbout(user.about);
        setLinks(user.links);
        setMessages(user.messages);
        setProjects(user.projects);
        setSkills(user.skills);
    }

    return (
        <AppContext.Provider value={{
            username: username,
            setUserName: setUserName,
            uid: uid,
            setUid: setUid,
            email: email,
            setEmail: setEmail,
            about: about,
            setAbout: setAbout,
            img: img,
            setImg: setImg,
            links: links,
            setLinks: setLinks,
            messages: messages,
            setMessages: setMessages,
            projects: projects,
            setProjects: setProjects,
            skills: skills,
            setSkills: setSkills,
            setUser: setUser,
        }}>
            {children}
        </AppContext.Provider >
    )
}
