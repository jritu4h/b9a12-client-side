
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
// import { auth } from '../firebase/firebase.config';
import {auth} from '../firebase/firebase.config'
import axios from 'axios';
export const authContext=createContext(null)
const Provider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    const provider=new GoogleAuthProvider()
   const gitProvider=new GithubAuthProvider()

    const createAccount=(email,password)=>{
      return createUserWithEmailAndPassword(auth,email,password)
    }
    const loginUser=(email,password)=>{
      return signInWithEmailAndPassword(auth,email,password)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }
    const logOut = () => {
        return signOut(auth);
    }
    const googleLogin = () => {
        return signInWithPopup(auth,provider) ;
    }
    const githubLogin = () => {
        return signInWithPopup(auth,gitProvider) ;
    }

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,currentUser=>{
            console.log(currentUser)
            setUser(currentUser)
         
            if (currentUser) {
                axios.post('https://pet-server-taupe.vercel.app/jwt',{email:currentUser.email})
                .then(data =>{
                  // console.log(data.data.token)
                  localStorage.setItem('access-pet-token', data.data.token)
                  setLoading(false);
              })
             }
             else{
              localStorage.removeItem('access-pet-token')
            
              
          }
        
         
          
        })
        return ()=>{
            return unsubscribe()
        }
    },[])

    const value={
      user,
      createAccount,
      updateUserProfile,
      loginUser,
      logOut,
      googleLogin,
      loading,
      githubLogin
    }
    return (
        <div>
                  <div>
            <authContext.Provider value={value}>
                {children}
            </authContext.Provider>
        </div>
        </div>
    );
};

export default Provider;