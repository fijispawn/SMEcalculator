import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState(() => {
        return localStorage.getItem('userName') || "Initial Name";
    });

    const changeUserName = (newName) => {
        console.log("Updating user name in context to:", newName);
        localStorage.setItem('userName', newName);  
        setUserName(newName);
    };

    return (
        <UserContext.Provider value={{ userName, setUserName: changeUserName }}>
            {children}
        </UserContext.Provider>
    );
};
