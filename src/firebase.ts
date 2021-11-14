// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, FacebookAuthProvider, } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import {getMessaging, onMessage, deleteToken } from "firebase/messaging"
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

// Initialize messaging to request notifications.

export const messaging = getMessaging(app);

  /**
   * onMessage, display notification card for 2seconds.
   */
   onMessage(messaging, (payload) => {
    console.log("Message received: ", payload)
  })


// Add the public key generated from the console here.
/**Only works on build version. For testing, generate token manually 
 * create a firebase-messaging-sw.js in the public folder.
*/

// export const token = "dXNiY7Fql_l8CBLLeXVvXf:APA91bFsPuEJC9xZDZfm5gYO5YxEWhCkhax3V2iuUh6jIeyeekYU70WMuLePE9R1baqS1F8pETb-8NkBNtOdOb9Hf-uTmkdBWv72T_tMXIwv-w61SRF7NxfNah4ECUqC3XaZ7XXr2SBh";

