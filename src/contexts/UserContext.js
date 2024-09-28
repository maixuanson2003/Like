import React, { createContext, useEffect, useState } from 'react';
import { getMyUser } from 'services/user.service';

export const UserContext = createContext()

const GetDataUser = () => {
    const [currentUser, setCurrentUser] = useState();
    const [login, setLogin] = useState();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        setIsLoading(true);
        getMyUser().then(res=>{
            if(!res.data){
                localStorage.removeItem("token");
            // navigate("/login")
            window.location.href = "/login";
            }
            console.log(res.data)
            setCurrentUser(res.data)
            setIsLoading(false)
        }).catch(e=>{
            localStorage.removeItem("token");
            // navigate("/login")
            window.location.href = '/login'
        })
    },[])

    return {currentUser, setCurrentUser, login, setLogin, isLoading, setIsLoading};
}

export const UserProvider = ({children}) =>{
    return (
        <UserContext.Provider value={{...GetDataUser()}}>
         {children}
        </UserContext.Provider>
    )
}

export const useCurrentUser = () => React.useContext(UserContext)