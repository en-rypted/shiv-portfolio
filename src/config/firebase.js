// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.SHIV_PORT_FIREBASE_API_KEY,
  authDomain: process.env.SHIV_PORT_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.SHIV_PORT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.SHIV_PORT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.SHIV_PORT_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.SHIV_PORT_FIREBASE_APP_ID,
  measurementId: process.env.SHIV_PORT_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app)
export {auth}
