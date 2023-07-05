import { createContext, useContext, useState } from "react";
import React from "react";

interface StateContextType {
    user: any;
    token: any;
    setUser: (user: any) => void;
    setToken: (token: any) => void;
}

const StateContext = createContext<StateContextType>({
    user: null,
    token: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setUser: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setToken: () => {}
})

export const ContextProvider = ({children}: any) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token: any) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)