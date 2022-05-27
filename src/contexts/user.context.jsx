import { createContext } from 'react';
import { useState } from 'react';

// actual value to be exported from this context file
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null, // null
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>; 
};