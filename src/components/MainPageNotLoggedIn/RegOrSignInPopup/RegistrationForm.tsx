import { ReactElement, FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
import { z } from 'zod';

import { signUp } from "@/firebase/auth";
import { auth } from '../../../firebase/config';
import { errorMessages, firebaseErrorCode } from '../../../utils/consts';

import BigBlueButton from '../BigBlueButton';
import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import useViewportWidth from "@/hooks/calculateWidth";

interface RegFormPropsType {
  onClose: () => void,
}

interface RegFormState {
  username: string,
  email: string,
  password: string,
}

const nameValidationRule = z.string().min(5);
const emailValidationRule = z.string().email();
const passwordValidationRule = z.string().min(8);

const RegistrationForm: React.FC<RegFormPropsType> = ({ onClose }: RegFormPropsType): ReactElement => {
  const viewportWidth = useViewportWidth();

  const buttonSize = viewportWidth >= 640 ? 'big' : 'small';

  const { t, i18n } = useTranslation(['registerPopup', 'authErrors']);

  const unknownErrorMessage: string = t('unknownError');

  const [registrationState, setRegistrationState] = useState<RegFormState>({
    username: '',
    email: '',
    password: '',
  });

  // ? стейт текста кнопки сабмита, который меняется в зависимости от стадии процесса регистрации
  const [submitButtonText, setSubmitButtonText] = useState<string>(t('register') || 'Register');

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
    setSubmitButtonText(t('register') || 'Register');
  }, [t, i18n.language]);

  const nameValidation = nameValidationRule.safeParse(registrationState.username);
  const emailValidation = emailValidationRule.safeParse(registrationState.email);
  const passwordValidation = passwordValidationRule.safeParse(registrationState.password);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationState({ ...registrationState, [e.target.name]: e.target.value });
    setFirebaseErrorCode('');
  }

  const isButtonActive: boolean = nameValidation.success && emailValidation.success && passwordValidation.success;
    
  // ? инициализируем некстовый роутер
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      setSubmitButtonText(t('registrationInProcess') || 'Registration...');
      await signUp(registrationState.email, registrationState.password, registrationState.username);

      if (auth.currentUser) {
        setSubmitButtonText(t('registrationSuccessful') || 'Success!');
        setFirebaseErrorCode('');
        setTimeout(() => {
          router.push('/map');
          onClose();
        }, 500);
      }
    } catch (error: any) {
      setFirebaseErrorCode(error.code);
      setSubmitButtonText(t('register') || 'Register');
      setRegistrationState({
        username: '',
        email: '',
        password: '',
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label={t('name')}
        name="username"
        value={registrationState.username}
        handleChange={handleFormChange}
        valSuccess={nameValidation.success}
        valErrorMessage={t('nameValidation')}
      />
      <Input
        label={t('email')}
        name="email"
        value={registrationState.email}
        handleChange={handleFormChange}
        valSuccess={emailValidation.success}
        valErrorMessage={t('emailValidation')}
      />
      <Input
        label={t('password')}
        name="password"
        value={registrationState.password}
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
    </Form>
  );
}

export default RegistrationForm;