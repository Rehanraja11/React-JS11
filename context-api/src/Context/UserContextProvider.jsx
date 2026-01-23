import React, { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) =>{
    const [user,userHandler] =useState(null)
    return(
        <UserContext.Provider value={{user,userHandler}} >
        {children}
        </UserContext.Provider>
    )

}

export default UserContextProvider;