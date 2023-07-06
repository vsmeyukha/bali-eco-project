// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmZ0MJUYAk47I8Jf_YauTViUbrP_0n3XU",
  authDomain: "bali-eco-project.firebaseapp.com",
  projectId: "bali-eco-project",
  storageBucket: "bali-eco-project.appspot.com",
  messagingSenderId: "467439504412",
  appId: "1:467439504412:web:c683a9362967ccfd9f23d9",
  measurementId: "G-8ZKB8812XK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);