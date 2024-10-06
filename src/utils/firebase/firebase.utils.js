// import { initializeApp } from "firebase/app";

// import {
//   getFirestore,
//   doc,
//   getDoc,
//   setDoc,
//   collection,
//   writeBatch,
//   query,
//   getDocs,
// } from "firebase/firestore";

// import {
//   getAuth,
//   signInWithRedirect,
//   signInWithPopup,
//   GoogleAuthProvider,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDR3xoziS3qZlKpBzsrbzg2IZFnigoUNYs",
//   authDomain: "cloth-for-me.firebaseapp.com",
//   projectId: "cloth-for-me",
//   storageBucket: "cloth-for-me.appspot.com",
//   messagingSenderId: "593518693772",
//   appId: "1:593518693772:web:1b3b92a143e20839009aa9",
// };

// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);

// // Using google Authentication
// const googleProvider = new GoogleAuthProvider();

// googleProvider.setCustomParameters({
//   prompt: "select_account",
// });

// export const auth = getAuth();

// // sign in with google popup
// export const signInWithGooglePopup = () =>
//   signInWithPopup(auth, googleProvider);

// //sign in with google redirect
// export const signInWithGoogleRedirect = () =>
//   signInWithRedirect(auth, googleProvider);

// // FIRESTORE
// export const db = getFirestore();

// export const addCollectionAndDocument = async (collectionKey, objectToAdd) => {
//   const collectionRef = collection(db, collectionKey);
//   const batch = writeBatch(db);

//   objectToAdd.forEach((object) => {
//     const docRef = doc(collectionRef, object.title.toLowerCase());
//     batch.set(docRef, object);
//   });

//   await batch.commit();
// };

// export const getCategoriesAndDocuments = async () => {
//   const collectionRef = collection(db, "categories");
//   const q = query(collectionRef);

//   const querySnapshot = await getDocs(q);
//   const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
//     const { title, items } = docSnapshot.data();
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {});

//   return categoryMap;
// };

// // methods

// export const createUserDocumentFromAuth = async (
//   userAuth,
//   additionalInformation = {}
// ) => {
//   if (!userAuth) return;

//   const userDocRef = doc(db, "user", userAuth.uid);

//   //   console.log(userDocRef);
//   //   getting data related to a document

//   const userSnapShot = await getDoc(userDocRef);
//   //   console.log(userSnapShot);

//   // If user snapshot does not exist
//   if (!userSnapShot.exists()) {
//     const { displayName, email } = userAuth;
//     const createdAt = new Date();

//     try {
//       await setDoc(userDocRef, {
//         displayName,
//         email,
//         createdAt,
//         ...additionalInformation,
//       });
//     } catch (err) {
//       console.log("Error creating user", err.message);
//     }
//   }

//   return userDocRef;
// };

// // function for creating user with email / password

// export const createAuthUserWithEmailAndPassword = async (email, password) => {
//   if (!email || !password) return;

//   return await createUserWithEmailAndPassword(auth, email, password);
// };

// export const signInAuthUserWithEmailAndPassword = async (email, password) => {
//   if (!email || !password) return;

//   return await signInWithEmailAndPassword(auth, email, password);
// };

// export const signOutUser = async () => await signOut(auth);

// export const onAuthStateChangedListener = (callback) =>
//   onAuthStateChanged(auth, callback);

import { initializeApp } from "firebase/app";
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
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  writeBatch,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDU4V-_QV3M8GyhC9SVieRTDM4dbiT0Yk",
  authDomain: "crwn-clothing-db-98d4d.firebaseapp.com",
  projectId: "crwn-clothing-db-98d4d",
  storageBucket: "crwn-clothing-db-98d4d.appspot.com",
  messagingSenderId: "626766232035",
  appId: "1:626766232035:web:506621582dab103a4d08d6",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

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
