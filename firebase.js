// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { createUserWithEmailAndPassword, getAuth , onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { useEffect, useState } from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth(app);

export{app, db, storage, auth};
export function signup(email, password){
 return createUserWithEmailAndPassword(auth , email, password);
}

export function login(email, password){
  return signInWithEmailAndPassword(auth , email, password);
 }

export function logout(){
  return signOut(auth);
}

export function useAuth(){
    const [currentUser, setCurrentUser] = useState();
  
  useEffect(() => {
   const unsub = onAuthStateChanged(auth, user => setCurrentUser(user) );
   return unsub;
  },[])
  return currentUser;
}