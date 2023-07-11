import React, { ReactElement, FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
import { z } from 'zod';

import BigBlueButton from '../BigBlueButton';
import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import useViewportWidth from "@/hooks/calculateWidth";

import { signIn, logOut } from "@/firebase/auth";
import { auth } from '../../../firebase/config';
import { errorMessages, firebaseErrorCode } from '../../../utils/consts';

interface SignInFormPropsType {
  onClose: () => void,
}

interface SignInFormState {
  email: string,
  password: string,
}

const emailValidationRule = z.string().email();
const passwordValidationRule = z.string().min(8);

const SignInForm: React.FC<SignInFormPropsType> = ({ onClose }: SignInFormPropsType): ReactElement => {
  // ? определяем ширину страницы и на этом основании определяем размер кнопки сабмита
  const viewportWidth = useViewportWidth();
  const buttonSize = viewportWidth >= 640 ? 'big' : 'small';

  // ? получаем функцию перевода и объект, в котором хранится информация о языке
  const { t, i18n } = useTranslation(['signInPopup', 'authErrors']);

  const unknownErrorMessage: string = t('unknownError');

  // ? стейт формы
  const [signInFormState, setSignInFormState] = useState<SignInFormState>({
    email: '',
    password: '',
  });

  // ? стейт текста кнопки сабмита, который меняется в зависимости от стадии процесса входа
  const [submitButtonText, setSubmitButtonText] = useState<string>(t('signIn') || 'Sign In');

  const [firebaseErrorCode, setFirebaseErrorCode] = useState<firebaseErrorCode>("");

  let errorMessage: string | null = null;

  // todo ошибка тайпскриптовая, надо пофиксить 
  if (errorMessages[firebaseErrorCode] !== undefined) {
    errorMessage = errorMessages[firebaseErrorCode];
  } else {
    errorMessage = unknownErrorMessage;
  }

  // ? так как мы используем стейт для отображения разного текста на кнопке сабмита в зависимости от того, в какой стадии находится процесс входа, а стейт не перезаписывается, когда мы меняем язык, то возникает проблема, что при переключении языка все на странице меняется, но текст на кнопке остается на предыдущем языке. эту проблему мы решаем, используя useEffect, который слушает изменение языка, который хранится в свойстве i18n.language
  useEffect(() => {
    setSubmitButtonText(t('signIn') || 'Sign In');
  }, [t, i18n.language]);

  // const signInFormValidationRules = z.object({
  //   email: z.string().email(),
  //   password: z.string().min(8),
  // });

  // ? переделать на объект
  // const signInFormValidation = signInFormValidationRules.safeParse(signInFormState);
  // if (!signInFormValidation.success) {
  //   console.log(signInFormValidation.error.issues);
  // }

  // ? функции валидации введенных пользователем в инпуты данных с помощью библиотеки zod
  const emailValidation = emailValidationRule.safeParse(signInFormState.email);
  const passwordValidation = passwordValidationRule.safeParse(signInFormState.password);

  // ? функция, записывающая в стейт value инпута
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInFormState({ ...signInFormState, [e.target.name]: e.target.value });
    setFirebaseErrorCode('');
  }

  // ? кнопка сабмита активна только тогда, когда и емэйл, и пароль прошли zod-валидацию, и свойство success объекта, возвращаемого функцией safeParse, равно true
  const isButtonActive: boolean = emailValidation.success && passwordValidation.success;

  // ? инициализируем некстовый роутер
  const router = useRouter();

  // ? функция сабмита формы. по клику на кнопку меняем стейт текста кнопки и вызываем асинхронную функцию входа в firebase, в которую передаем емэйл и пароль. если вход прошел успешно (то есть auth.currentUser не равен null), то мы меняем текст на кнопке на успешный, выжидаем полсекунды, редиректим пользователя на страницу с картой и закрываем попап. если при входе произошла ошибка (то есть auth.currentUser равен null), то мы показываем спан с конкретизацией ошибки и просьбой залогиниться снова, возвращаем форме изначальный текст и чистим стейт, тем самым деактивируем кнопку 
  // todo дописать негативный сценарий
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    try { 
      setSubmitButtonText(t('signInInProcess') || 'Signing in...');
      e.preventDefault();
      await signIn(signInFormState.email, signInFormState.password);
      
      if (auth.currentUser) {
        setSubmitButtonText(t('signInSuccessful') || 'Success!');
        setFirebaseErrorCode('');
        setTimeout(() => {
          router.push('/map');
          onClose();
        }, 500);
      }
    } catch (error: any) {
      setFirebaseErrorCode(error.code);
      setSubmitButtonText(t('signIn') || 'Sign In');
      setSignInFormState({
        email: '',
        password: '',
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label={t('email')}
        name="email"
        value={signInFormState.email}
        handleChange={handleFormChange}
        valSuccess={emailValidation.success}
        valErrorMessage={t('emailValidation')}
      />
      <Input
        label={t('password')}
        name="password"
        value={signInFormState.password}
        type="password"
        handleChange={handleFormChange}
        valSuccess={passwordValidation.success}
        valErrorMessage={t('passwordValidation')}
      />
      <span className="w-full text-left text-red-500 mt-[40px]">
        {firebaseErrorCode && t(errorMessage)} 
      </span>
      <BigBlueButton
        size={buttonSize}
        type="submit"
        text={submitButtonText}
        disabled={!isButtonActive}
      />
      <button type="button" onClick={logOut}>Sign Out</button>
    </Form>
  );
}

export default SignInForm;