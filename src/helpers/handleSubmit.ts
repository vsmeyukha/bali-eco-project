import { Dispatch, FormEvent, SetStateAction } from "react";
import { TFunction } from "next-i18next";

import { firebaseErrorCode } from "@/utils/consts";

export type RegTranslationKeys = {
  inProcess: 'registrationInProcess',
  success: 'registrationSuccessful',
  inProcessFallback: 'Registration...',
  successFallback: 'Success!',
  default: 'Register',
  defaultFallback: 'Register'
}

export type SignInTranslationKeys = {
  inProcess: 'signInInProcess',
  success: 'signInSuccessful',
  inProcessFallback: 'Signing in...',
  successFallback: 'Success!',
  default: 'SignIn',
  defaultFallback: 'Sign In'
};

export type StateType = 
  {
    email: string;
    password: string
  }
  |
  {
    email: string;
    password: string;
    username: string
  };

interface HandleSubmitArgs {
  e: FormEvent<HTMLFormElement>,
  setSubmitButtonText: Dispatch<SetStateAction<string>>,
  t: TFunction,
  translationKeys: RegTranslationKeys | SignInTranslationKeys,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  state: StateType,
  signUpOrSignIn: (email: string, password: string, username?: string) => Promise<void>,
  setFirebaseErrorCode: Dispatch<SetStateAction<firebaseErrorCode>>,
  onClose: () => void,
  setState: Dispatch<SetStateAction<StateType>>
}

// ? функция сабмита формы. по клику на кнопку меняем стейт текста кнопки и вызываем асинхронную функцию входа в firebase, в которую передаем емэйл и пароль. если вход прошел успешно (то есть auth.currentUser не равен null), то мы меняем текст на кнопке на успешный, выжидаем полсекунды, редиректим пользователя на страницу с картой и закрываем попап. если при входе произошла ошибка (то есть auth.currentUser равен null), то мы показываем спан с конкретизацией ошибки и просьбой залогиниться снова, возвращаем форме изначальный текст и чистим стейт, тем самым деактивируем кнопку 

const handleSubmitConstructor = (): (args: HandleSubmitArgs) => Promise<void> => {
  return async (
    {
      e,
      setSubmitButtonText,
      t,
      translationKeys,
      setIsLoading,
      signUpOrSignIn,
      state,
      setFirebaseErrorCode,
      onClose,
      setState
    }: HandleSubmitArgs) => {
      try {
        e.preventDefault();
    
        setSubmitButtonText(t(translationKeys.inProcess) || translationKeys.inProcessFallback);
    
        setIsLoading(true);
    
        if ('username' in state) {
          await signUpOrSignIn(state.email, state.password, state.username);
        }
        else {
          await signUpOrSignIn(state.email, state.password);
        }
    
        setSubmitButtonText(t(translationKeys.success) || translationKeys.successFallback);
    
        setIsLoading(false);
    
        setFirebaseErrorCode('');
    
        setTimeout(() => { 
          onClose();
        }, 500);
      } catch (error: any) {
        setFirebaseErrorCode(error.code);
        setSubmitButtonText(t(translationKeys.default) || translationKeys.defaultFallback);
        setIsLoading(false);
    
        if ('username' in state) {
          setState({
            email: '',
            password: '',
            username: '',
          });
        }
        else {
          setState({
            email: '',
            password: '',
          });
        }
      }
  }
}

export default handleSubmitConstructor;