// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, FacebookAuthProvider, } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import {getMessaging, getToken } from "firebase/messaging"
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
// connectFirestoreEmulator(db, 'localhost', 8080);
export const Googleprovider = new GoogleAuthProvider();
export const Facebookprovider = new FacebookAuthProvider();
export const auth = getAuth();

// Initialize messaging to request notifications.

export const messaging = getMessaging(app);

// Add the public key generated from the console here.
/**Only works on build version. For testing, generate token manually */
// getToken(messaging, { vapidKey: 'BLFRbbKh7i-skCjTBESy0m4xdv_644zN92do2g98YC0BUt-SBgYcj0hb2NFE584YDKAZChVS01AfgMsEpT6Xgs8' }).then((currentToken) => {
//   if (currentToken) {
//     console.log(currentToken, "watching");
//     // ...
//   } else {
//     // Show permission request UI
//     console.log('No registration token available. Request permission to generate one.');
//     // ...
//   }
// }).catch((err) => {
//   console.log('An error occurred while retrieving token. ', err);
//   // ...
// });

export const token = "dXNiY7Fql_l8CBLLeXVvXf:APA91bFsPuEJC9xZDZfm5gYO5YxEWhCkhax3V2iuUh6jIeyeekYU70WMuLePE9R1baqS1F8pETb-8NkBNtOdOb9Hf-uTmkdBWv72T_tMXIwv-w61SRF7NxfNah4ECUqC3XaZ7XXr2SBh";


// getToken(messaging,{vapidKey: 'BHF4Im3xkuXDg_JlL-f4SMKRKFULrsBRwZPWQ-yxMVOId0XX8z7DMPVkrzX1cT5d-9sYyqmuQNAMZqsxLia_qEA'}).then((currentToken) => console.log(currentToken));