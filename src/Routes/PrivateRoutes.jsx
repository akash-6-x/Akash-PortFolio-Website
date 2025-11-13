import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContextAPI } from '../Context/AuthContext';


const PrivateRoutes = ({children}) => {
    let {authUser,loading,justLoggedOut} = useContext(AuthContextAPI);
    if(loading) return null;
    if(!authUser && !justLoggedOut)   return <Navigate to={'/admin'} replace/>
    else    return <>{children}</>

    
}

export default PrivateRoutes