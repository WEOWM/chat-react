// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC57KE_gmqtn7qEy2hKUYLps_AerEMHEYU",
  authDomain: "react-chat-7718d.firebaseapp.com",
  projectId: "react-chat-7718d",
  storageBucket: "react-chat-7718d.firebasestorage.app",
  messagingSenderId: "834741147668",
  appId: "1:834741147668:web:d9667155bd4ad2cdabef01",
  measurementId: "G-5P5B3SB7GL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const provide = new GoogleAuthProvider()
export const db = getFirestore(app)