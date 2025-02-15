import {createContext, useEffect, useState} from 'react';
import {createUserDocumentFromAuth, onAuthStateChangeListener} from "../utils/firebase/firebase.utils";

// as the actual value we want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value ={ currentUser, setCurrentUser }

  // [] -> only once when component mounts
  useEffect(()=> {
   const unsubscribe = onAuthStateChangeListener((user) => {
     if (user) {
       createUserDocumentFromAuth(user);
     }
     setCurrentUser(user);
   });

    return unsubscribe;
  }, [])

  return <UserContext.Provider value={value}>{children} </UserContext.Provider>
}