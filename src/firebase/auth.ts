import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth } from './config';

// ? классическая регистрация по почте и паролю
export const signUp = async (email: string, password: string): Promise<void> => {
  try {

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user);

    if (user) {
      await sendEmailVerification(user);
      console.log('verification email sent!');
    }
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
};

// ? вход по емэйлу и паролю
export const signIn = async (email: string, password: string): Promise<void> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user);
    console.log(user === auth.currentUser);
    console.log('signed in successfully');
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
const googleProvider = new GoogleAuthProvider();

if (typeof window !== 'undefined') {
  auth.languageCode = window.localStorage.getItem('language');
}


export const signUpWithGoogle = async (): Promise<void> => {
  try {
    await signInWithPopup(auth, googleProvider);
    console.log('signed in with google');
    console.log(auth.currentUser);
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
}

// ? разлогиниться
export const logOut = async () => {
  try {
    if (auth.currentUser) {
      await signOut(auth);
      console.log('signed out!');
      console.log(auth.currentUser);
    }
  } catch (error: any) {
    console.log(error);
  }
}