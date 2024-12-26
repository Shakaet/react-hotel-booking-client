import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = ({children}) => {
    let {user,loading} = useContext(AuthContext)
    const location = useLocation()

    if(loading){
        return <LoadingSpinner></LoadingSpinner>
      }
      if(user){
        return children
 }
    
 return <Navigate state={{from:location.pathname}} to="/login"></Navigate>

};

export default PrivateRoute;