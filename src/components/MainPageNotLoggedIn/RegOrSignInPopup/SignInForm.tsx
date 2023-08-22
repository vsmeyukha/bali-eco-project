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

// ? Validation rules for inputs written using 'zod' library
// ? Правила валидации инпутов, написанные с использованием библиотеки 'zod'
const emailValidationRule = z.string().email();
const passwordValidationRule = z.string().min(8);

const SignInForm: React.FC<SignInFormPropsType> = ({ onClose }: SignInFormPropsType): ReactElement => {

  // ? We determine the width of the page and on this basis we determine the size of the submit button
  // ? Определяем ширину страницы и на этом основании определяем размер кнопки сабмита
  const viewportWidth = useViewportWidth();
  const buttonSize = viewportWidth >= 640 ? 'big' : 'small';

  // ? We get a translation function and an object that stores information about the language
  // ? Получаем функцию перевода и объект, в котором хранится информация о языке
  const { t, i18n } = useTranslation(['signInPopup', 'authErrors']);

  const unknownErrorMessage: string = t('unknownError');

  const [signInFormState, setSignInFormState] = useState<SignInFormState>({
    email: '',
    password: '',
  });

  // ? The `submitButtonText` state is used to display different text on the submit button based on various stages of the registration process.
  // ? Стейт текста кнопки сабмита, который меняется в зависимости от стадии процесса регистрации
  const [submitButtonText, setSubmitButtonText] = useState<string>(t('signIn') || 'Sign In');

  // ? The `firebaseErrorCode` state is used to store any error codes returned by Firebase during the registration process.
  // ? Стейт 'firebaseErrorCode' используется для того, чтобы хранить ошибки, которые может вернуть firebase в процессе регистрации
  const [firebaseErrorCode, setFirebaseErrorCode] = useState<firebaseErrorCode>("");

  // ? The `isLoading` state helps in displaying a loader on the submit button while the registration is in progress.
  // ? Стейт `isLoading` используется для отображения лоадера на кнопке сабмита формы, чтобы показать пользователю, что регистрация в процессе
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let errorMessage: string | null | undefined = null;

  // todo ошибка тайпскриптовая, надо пофиксить 
  // ? If an error is found in an object with errors from firebase, then we pass the text of this error to the span with a registration error, and if it is not found, then we pass the text of the general error.
  // ? Если ошибка найдена в объекте с ошибками из firebase, то в спан с ошибкой регистрации передаем текст этой ошибки, а если не найдена, то передаем текст общей ошибки.
  if (errorMessages[firebaseErrorCode] !== undefined) {
    errorMessage = errorMessages[firebaseErrorCode];
  } else {
    errorMessage = unknownErrorMessage;
  }

  // ? Since we use the state to display different text on the submit button, depending on what stage the login process is at, and the state is not overwritten when we change the language, the problem arises that when switching the language everything on the page changes, but the text on the button remains in the previous language. we solve this problem by using useEffect, which listens to the language change, which is stored in the i18n.language property

  // ? Так как мы используем стейт для отображения разного текста на кнопке сабмита в зависимости от того, в какой стадии находится процесс входа, а стейт не перезаписывается, когда мы меняем язык, то возникает проблема, что при переключении языка все на странице меняется, но текст на кнопке остается на предыдущем языке. эту проблему мы решаем, используя useEffect, который слушает изменение языка, который хранится в свойстве i18n.language

  useEffect(() => {
    setSubmitButtonText(t('signIn') || 'Sign In');
  }, [t, i18n.language]);

  // ? Validation of inputs using the safeParse method from the 'zod' library. The method is called on validation rules. Either success or an error is returned, which we will show to the user in the span.
  // ? Валидация инпутов с использованием метода safeParse из библиотеки 'zod'. Метод вызывается на правилах валидации. Возвращается либо success, либо ошибка, которую мы покажем пользователю в спане.
  const emailValidation = emailValidationRule.safeParse(signInFormState.email);
  const passwordValidation = passwordValidationRule.safeParse(signInFormState.password);

  // ? The function `handleFormChange` updates the `registrationState` as the user types into the form fields.
  // ? Эта функция обновляет стейт регистрации, записывая в него значение инпута, которое пользователь вводит в поле
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInFormState({ ...signInFormState, [e.target.name]: e.target.value });
    setFirebaseErrorCode('');
  }

  // ? The submit button is active when all the three inputs validation checks return success.
  // ? Кнопка сабмита формы активна только тогда, когда валидация всех трех полей формы прошла успешно
  const isButtonActive: boolean =
    Boolean(emailValidation.success)
    &&
    Boolean(passwordValidation.success);

  // ? Creating a handle submit function using function-constructor
  // ? Создаем функцию сабмита формы регистрации, используя функцию-конструктор функций сабмита
  const handleSubmitRegistration = handleSubmitConstructor();

  return (
    // ? I pass handleSubmitRegistration function to onSubmit prop of the Form component with all the needed arguments
    // ? Передаю функцию handleSubmitRegistration в проп onSubmit компонента Form, передав в функцию все необходимые компоненты
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
        {firebaseErrorCode && t(errorMessage || '')} 
      </span>
      <BigBlueButton size={buttonSize} type="submit" text={submitButtonText} disabled={!isButtonActive}>
        {isLoading && <SmallLoader />}
      </BigBlueButton>
    </Form>
  );
}

export default SignInForm;