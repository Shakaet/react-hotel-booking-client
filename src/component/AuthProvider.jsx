import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState} from 'react';
import auth from './firebase.init';


export let AuthContext = createContext(null)

const AuthProvider = ({children}) => {

    let [user,setUser]=useState(null)
    const [loading,setLoading] = useState(true);

    
const provider = new GoogleAuthProvider();

let googleSign=()=>{
      
    setLoading(true)
    return signInWithPopup(auth, provider)
}

   


    let createRegistered=(email,password)=>{
        setLoading(true)
          return createUserWithEmailAndPassword(auth,email,password)
    }

    let loginSetup =(email,password)=>{
        setLoading(true)
         return signInWithEmailAndPassword(auth,email,password)
    }

    let signOuts=()=>{
        setLoading(true)
        return signOut(auth)
    }
    let updateUserProfile = (user, profileUpdates) => {
        setLoading(true)
        return updateProfile(user, profileUpdates);
      };

      useEffect(()=>{
        let unsubscribe= onAuthStateChanged(auth, (currentUser) => {
            
           
              setUser(currentUser)
            //   console.log(currentUser)
              setLoading(false)
            
            
    
            return ()=>{
                unsubscribe()
            }
            
          });
      },[])

    let val= {
         createRegistered,
         loginSetup,
         signOuts,
         googleSign,
         updateUserProfile,
         user,
         loading

    }





    return (
        <div>
            <AuthContext.Provider value={val}>
                {children}

            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;