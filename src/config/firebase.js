// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcNbE3xaJX-I_Pr8vhc5c4vZ55WCrXUDI",
  authDomain: "shiv-portfolio-47ce9.firebaseapp.com",
  projectId: "shiv-portfolio-47ce9",
  storageBucket: "shiv-portfolio-47ce9.firebasestorage.app",
  messagingSenderId: "255250938014",
  appId: "1:255250938014:web:9ffd8e25847e604d2c638f",
  measurementId: "G-641WB6JY66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app)
export {auth}
