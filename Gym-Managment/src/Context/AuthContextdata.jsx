import React, { createContext } from "react";
import { useState } from "react";

export const AuthContextdata = createContext()

export const AuthdataProvider = ({children}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  return (
    <AuthContextdata.Provider value={{email,setEmail,password,setPassword}}>
            {children}
    </AuthContextdata.Provider>
  )
}


