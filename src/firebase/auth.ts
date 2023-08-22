// Import necessary Firebase Authentication methods
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';

// ? Import Firestore methods for user data storage after authentication
import {doc, setDoc} from 'firebase/firestore/lite';

// ? Import Firebase auth and Firestore database instances
import { auth, db } from './config';

// ? Sign up a user using email and password.
// ? After successful registration, the user will receive a verification email.
// ? классическая регистрация по почте и паролю
export const signUp = async (email: string, password: string, username?: string): Promise<void> => {
  try {

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user && username) { // Check if there is a user also a username is provided
      await sendEmailVerification(user); // Send verification email to the new user

      // Store additional user details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username,
        email,
        createdAt: Date.now()
      });
    }
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);

    throw error;
  }
};

// ? вход по емэйлу и паролю
// ? Sign in a user using email and password.
export const signIn = async (email: string, password: string): Promise<void> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    console.log(error);
    console.log(auth);

    throw error;
  }
}

// ? регистрация через гугл-аккаунт
// ? Set up Google Authentication provider
const googleProvider = new GoogleAuthProvider();

// ? Set the language for Firebase authentication based on local storage value, if available
if (typeof window !== 'undefined') {
  auth.languageCode = window.localStorage.getItem('language');
}


// ? Sign up (or sign in) a user using their Google account.
export const signUpWithGoogle = async (): Promise<void> => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
}

// ? разлогиниться
// ? Log out the currently authenticated user
export const logOut = async () => {
  try {
    if (auth.currentUser) {
      await signOut(auth);
    }
  } catch (error: any) {
    console.log(error);
  }
}