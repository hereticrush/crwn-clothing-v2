import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app'; //firebase init
import { 
    getAuth,
      signInWithPopup,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      signOut,
       GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAgkw0CF5OfYaFDlW6oyUkmofzhZLTyIxc",
    authDomain: "crwn-clothing-udemy-db.firebaseapp.com",
    projectId: "crwn-clothing-udemy-db",
    storageBucket: "crwn-clothing-udemy-db.appspot.com",
    messagingSenderId: "1016785885684",
    appId: "1:1016785885684:web:fe3fdf2fbfe435b25e01a1"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//Google sign in provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account",
});
//setting auth, database, google popup signing
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const db = getFirestore();

//creating users in database
export const createUserDocumentFromAuth = async (userAuth,
    additional = {}) => {
    
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    //pseudo code
    //if user data exists -> return userDocRef
    //if user data not exists -> set doc with the data userAuth in the collection

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt, ...additional});
        } catch (error) {
            console.log('Error creating the user', error.message);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;
    
    return await createUserWithEmailAndPassword(auth, email, password);
} 

export const signInAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => {
    return await signOut(auth);
}