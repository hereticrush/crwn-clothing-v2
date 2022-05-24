import { initializeApp } from 'firebase/app'; //firebase init
import { 
    getAuth,
     signInWithRedirect,
      signInWithPopup,
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
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});
//setting auth, database, google popup signing
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

//creating users in database
export const createUserDocumentFromAuth = async (userAuth) => {
    
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    //pseudo code
    //if user data exists -> return userDocRef
    //if user data not exists -> set doc with the data userAuth in the collection

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt});
        } catch (error) {
            console.log('Error creating the user', error.message);
        }
    }

    return userDocRef;
};