import React, { ReactElement, FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
import { z } from 'zod';

import BigBlueButton from '../BigBlueButton';
import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import SmallLoader from "@/components/loaders/SmallLoader";

import useViewportWidth from "@/hooks/calculateWidth";

import { signIn } from "@/firebase/auth";
import { errorMessages, firebaseErrorCode } from '../../../utils/consts';

import handleSubmitConstructor from "@/helpers/handleSubmit";

import { SignInTranslationKeys } from "../../../utils/consts";

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

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
  const isButtonActive: boolean =
    Boolean(emailValidation.success)
    &&
    Boolean(passwordValidation.success);

  const handleSubmitRegistration = handleSubmitConstructor();

  return (
    <Form onSubmit={(e) => handleSubmitRegistration({
      e,
      setSubmitButtonText,
      t,
      translationKeys: SignInTranslationKeys,
      setIsLoading,
      signUpOrSignIn: signIn,
      state: signInFormState,
      setFirebaseErrorCode,
      onClose,
      setState: setSignInFormState
    })}>
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
      <BigBlueButton size={buttonSize} type="submit" text={submitButtonText} disabled={!isButtonActive}>
        {isLoading && <SmallLoader />}
      </BigBlueButton>
    </Form>
  );
}

export default SignInForm;