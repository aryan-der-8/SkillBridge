import { createContext, useEffect, useState } from "react"

export const UserContext = createContext();

export default function UserProvider({ children }) {

    // Bussiness Owner Icon
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("BusinessRegister");
        return saved === "true";
    });

    useEffect(() => {
        localStorage.setItem("BusinessRegister", JSON.stringify(user));
    }, [user])

    // UserIcon
     const [userIcon, setUserIcon] = useState(() => {
        const saved = localStorage.getItem("UserRegister");
        return saved === "true";
    }); 

    useEffect(() => {
        localStorage.setItem("UserRegister", JSON.stringify(userIcon));
    }, [userIcon])

    // User Data saved in localstorage
    const [userData, setUserData] = useState(() => {
        const saved = localStorage.getItem("userLoginData");
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem("userLoginData", JSON.stringify(userData));
    }, [userData])


    return (
        <UserContext.Provider value={{ user, setUser, userData, setUserData, userIcon, setUserIcon }}>
            {children}
        </UserContext.Provider>
    )
}