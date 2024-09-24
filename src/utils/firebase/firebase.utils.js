import { initializeApp } from "firebase/app";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// FIRESTORE
export const db = getFirestore();

// method

export const createUserDocumentFromAuth = async (userAuth) => {
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
      });
    } catch (err) {
      console.log("Error creating user", err.message);
    }
  }

  return userDocRef;
};
