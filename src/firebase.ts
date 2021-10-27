// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, FacebookAuthProvider, } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAg7fx_ZmX9G-mYFtC_rSLolKSBlYX9Scs",
  authDomain: "chat-b7198.firebaseapp.com",
  projectId: "chat-b7198",
  storageBucket: "chat-b7198.appspot.com",
  messagingSenderId: "481393102879",
  appId: "1:481393102879:web:931fa859c40b91aeb2852a",
  measurementId: "G-TYK2DTKH6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore() 
connectFirestoreEmulator(db, 'localhost', 8080);
export const Googleprovider = new GoogleAuthProvider();
export const Facebookprovider = new FacebookAuthProvider();
export const auth = getAuth();
