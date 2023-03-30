import { createContext, ReactNode, useState } from 'react'
import { User, AppContextType } from '../types/types'

export const AppContext = createContext<AppContextType>({
    getUser: () => { },
    user: {} as User,
    setUser: (user: User) => { },
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [userState, setUserState] = useState<User>(null);

    const setUser = (user: User) => {
        setUserState(user);
        window.sessionStorage.setItem('user', JSON.stringify(user));
    }

    const getUser = () => {
        setUserState(JSON.parse(window.sessionStorage.getItem('user')!));
    }

    return (
        <AppContext.Provider value={{
            getUser,
            setUser,
            user: userState,
        }}>
            {children}
        </AppContext.Provider >
    )
}
