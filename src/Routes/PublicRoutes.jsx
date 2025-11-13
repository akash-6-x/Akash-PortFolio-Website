import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContextAPI } from '../Context/AuthContext';


const PublicRoutes = ({children}) => {
    let location = useLocation();
    let {authUser,loading,justLoggedIn} = useContext(AuthContextAPI);
    if(loading) return null;
    if(authUser && !justLoggedIn)   return <Navigate to={'/administrator'} replace/>
    else    return <>{children}</>

    
}

export default PublicRoutes