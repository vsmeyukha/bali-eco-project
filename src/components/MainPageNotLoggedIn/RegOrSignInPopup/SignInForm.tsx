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

  const emailValidationRule = z.string().email();
  const passwordValidationRule = z.string().min(8);

  const emailValidation = emailValidationRule.safeParse(signInFormState.email);
  const passwordValidation = passwordValidationRule.safeParse(signInFormState.password);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInFormState({ ...signInFormState, [e.target.name]: e.target.value });
  }

  const isButtonActive: boolean = emailValidation.success && passwordValidation.success;

  return (
    <Form onSubmit={onSignInButtonClick}>
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
      <BigBlueButton
        size={buttonSize}
        type="submit"
        text={t('signIn')}
        disabled={!isButtonActive}
      />
    </Form>
  );
}

export default SignInForm;