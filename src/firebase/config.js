// ? Import necessary Firebase SDK modules
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore/lite";
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// ? Your web app's Firebase configuration
// ? For Firebase JS SDK v7.20.0 and later, measurementId is optional

// ? Firebase configuration object containing Firebase project details.
// ? This object is generated when setting up a new Firebase project in the Firebase console.

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// ? Initialize the Firebase application with the provided configuration.
// ? This is the core Firebase app instance for interacting with Firebase services.
const app = initializeApp(firebaseConfig);

// ? Export initialized Firebase services for use throughout the application.

export const auth = getAuth(app); // ? Firebase authentication service
export const db = getFirestore(app); // ? Firestore database service
export const storage = getStorage(app); // ? Firebase storage service for storing files, images, etc.