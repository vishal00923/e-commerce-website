import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD4FzJzLcr1J6-vqix-EsTSHZLdhUW2poM',
  authDomain: 'crown-clothing-399f7.firebaseapp.com',
  projectId: 'crown-clothing-399f7',
  storageBucket: 'crown-clothing-399f7.appspot.com',
  messagingSenderId: '24535546838',
  appId: '1:24535546838:web:bd6c1bc1760a50e0c1c277',
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

const db = getFirestore(firebaseApp);

const createUserDocumentFromAuth = async (userAuth) => {
  // existing document reference
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  // user data file object
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  // if user exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log('error creating the user: ', error.message);
    }
  }

  return userDocRef;
};

export {
  db,
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
};