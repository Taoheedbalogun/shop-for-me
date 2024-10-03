import { initializeApp } from "firebase/app";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDR3xoziS3qZlKpBzsrbzg2IZFnigoUNYs",
  authDomain: "cloth-for-me.firebaseapp.com",
  projectId: "cloth-for-me",
  storageBucket: "cloth-for-me.appspot.com",
  messagingSenderId: "593518693772",
  appId: "1:593518693772:web:1b3b92a143e20839009aa9",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Using google Authentication
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

// sign in with google popup
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

//sign in with google redirect
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// FIRESTORE
export const db = getFirestore();

// method

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "user", userAuth.uid);

  //   console.log(userDocRef);
  //   getting data related to a document

  const userSnapShot = await getDoc(userDocRef);
  //   console.log(userSnapShot);

  // If user snapshot does not exist
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log("Error creating user", err.message);
    }
  }

  return userDocRef;
};

// function for creating user with email / password

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
