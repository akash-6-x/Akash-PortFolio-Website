import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { _auth } from '../../Backend/firebase';

export const AuthContextAPI = createContext();
const AuthContext = ({children}) => {

    let [authUser , setauthUser] = useState(null)
    let [loading , setLoading] = useState(true);
    let [justLoggedIn, setJustLoggedIn] = useState(false);
    let [justLoggedOut, setJustLoggedOut] = useState(false);

    // useEffect(()=>{
    //     console.log("Auth User:", authUser);
    // },[authUser])
    
    useEffect(()=>{
        onAuthStateChanged(_auth , (user)=>{
            if(user && user.emailVerified)
            {
                setauthUser(user);
            }
            else
            {
                setauthUser(null);
            }
            setLoading(false);
        })
    },[])

  return (
    <AuthContextAPI.Provider value={{authUser,setauthUser,loading,justLoggedIn,setJustLoggedIn,justLoggedOut,setJustLoggedOut}}>
        {children}
    </AuthContextAPI.Provider>
  )
}

export default AuthContext