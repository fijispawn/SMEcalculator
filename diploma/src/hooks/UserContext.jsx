import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState("Initial Name");

    const changeUserName = (newName) => {
        console.log("Updating user name in context to:", newName);
        setUserName(newName);
    };

    return (
        <UserContext.Provider value={{ userName, setUserName: changeUserName }}>
            {children}
        </UserContext.Provider>
    );
};

