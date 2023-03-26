import {initializeApp} from 'firebase/app';
import {getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider} from 'firebase/auth';
 import {  getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBuM8j8cQAgUSApc4L7ETsDPd58zo6kqQw",
  authDomain: "crwn-clothing-db-vijay.firebaseapp.com",
  projectId: "crwn-clothing-db-vijay",
  storageBucket: "crwn-clothing-db-vijay.appspot.com",
  messagingSenderId: "910959597409",
  appId: "1:910959597409:web:a61d1e8039c9170cecd720"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithGoogleRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async  (userAuth) => {
  const { uid } = userAuth;
  const userDocRef  = doc(db, 'users', uid );
  const userSnapshot  = await getDoc(userDocRef);


  // if it does not
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    // create and set data
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (err) {
      console.log('error creating the user', err.message);
    }
  }

  // if exists return userDocRef
  return userDocRef;
}