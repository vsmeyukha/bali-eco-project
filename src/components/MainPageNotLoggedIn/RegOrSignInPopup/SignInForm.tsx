import React, { ReactElement, FormEvent, useState } from "react";
import { useTranslation } from 'next-i18next';
import { z } from 'zod';

import BigBlueButton from '../BigBlueButton';
import { inputStyles } from "@/utils/styles";
import { RegSignInPopup } from '../../../utils/types';
import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import useViewportWidth from "@/hooks/calculateWidth";

interface SignInFormPropsType {
  onSignInButtonClick: (e: FormEvent<HTMLFormElement>) => void,
  whichPopup: RegSignInPopup,
}

interface SignInFormState {
  email: string,
  password: string,
}

const SignInForm: React.FC<SignInFormPropsType> = ({ onSignInButtonClick, whichPopup }: SignInFormPropsType): ReactElement => {
  const viewportWidth = useViewportWidth();

  const buttonSize = viewportWidth >= 640 ? 'big' : 'small';

  const { t } = useTranslation('signInPopup');

  const [signInFormState, setSignInFormState] = useState<SignInFormState>({
    email: '',
    password: '',
  });

  const emailValidationRule = z.string().email({ message: 'This is not a valid email' });
  const passwordValidationRule = z.string().min(8, { message: 'Password has to be longer than 8 symbols' });

  const emailValidation = emailValidationRule.safeParse(signInFormState.email);
  const passwordValidation = passwordValidationRule.safeParse(signInFormState.password);

  let EmailErrorMessage = '';
  let PasswordErrorMessage = '';

  if (!emailValidation.success) {
    EmailErrorMessage = emailValidation?.error?.issues[0].message;
  }

  if (!passwordValidation.success) {
    PasswordErrorMessage = passwordValidation?.error?.issues[0].message;
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInFormState({ ...signInFormState, email: e.target.value });
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInFormState({ ...signInFormState, password: e.target.value });
  }

  const isButtonActive: boolean = emailValidation.success && passwordValidation.success;

  return (
    <Form onSubmit={onSignInButtonClick}>
      <Input label={t('email')} name="email" value={signInFormState.email} handleChange={handleEmailChange} />
      <span className="w-full text-left text-red-500 mt-[8px]">
        {(!emailValidation.success && signInFormState.email !== '') && EmailErrorMessage}
      </span>
      <Input label={t('password')} name="password" value={signInFormState.password} handleChange={handlePasswordChange} />
      <span className="w-full text-left text-red-500 mt-[8px]">
        {(!passwordValidation.success && signInFormState.password !== '') && PasswordErrorMessage}
      </span>
      <BigBlueButton size={buttonSize} type="submit" text={t('signIn')} disabled={!isButtonActive} />
    </Form>
  );
}

export default SignInForm;