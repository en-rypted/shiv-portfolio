import React, { useEffect, useState } from 'react'
import authContext from './authContext';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../config/firebase';

export const Auth = (props) => {
   const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // useful for route protection

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup listener
  }, []);
  return (
    <authContext.Provider value={{user,loading}}>
        {props.children}
    </authContext.Provider>
  )
}
