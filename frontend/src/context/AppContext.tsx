import { createContext, ReactNode, useEffect, useState } from 'react'
import { getMyConversations } from '../client/client';
import { User, AppContextType, ConversationType, NotificationType } from '../types/types'

export const AppContext = createContext<AppContextType>({
    getUser: () => { },
    user: {} as User,
    setUser: (user: User) => { },
    conversations: [],
    notifications: [],
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [userState, setUserState] = useState<User>(null);
    const [conversations, setConversations] = useState<ConversationType[]>([]);
    const [notifications, setNotifications] = useState<NotificationType[]>([]);

    const setUser = (user: User) => {
        setUserState(user);
        window.sessionStorage.setItem('user', JSON.stringify(user));
    }

    const getUser = () => {
        setUserState(JSON.parse(window.sessionStorage.getItem('user')!));
    }

    useEffect(() => {
        const getMessages = async () => {
            const convos = await getMyConversations(userState!.uid)
            const newNotifications: NotificationType[] = [];
            convos.forEach((convo) => {
                convo?.messages.forEach(message => {
                    if (message.read === false && message.senderUsername !== userState!.username) {
                        newNotifications.push({
                            title: message.senderUsername,
                            message: message.messageContent,
                            type: 'message',
                        })
                    }
                })
            })
            setNotifications(newNotifications);
            setConversations([...convos]);
        }
        let msgInterval: NodeJS.Timer;
        if (userState?.username) {
            msgInterval = setInterval(() => {
                getMessages();
            }, 1000);
            getMessages();
            return () => clearInterval(msgInterval);
        }
        else {
            clearInterval(msgInterval!);
        }
    }, [userState]);

    useEffect(() => {
        console.log(conversations);
    }, [conversations])

    return (
        <AppContext.Provider value={{
            getUser,
            setUser,
            user: userState,
            conversations,
            notifications,
        }}>
            {children}
        </AppContext.Provider >
    )
}
