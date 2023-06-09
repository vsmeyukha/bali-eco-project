import React, { ReactElement, FormEvent } from "react";
import { useTranslation } from 'next-i18next';

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

const SignInForm: React.FC<SignInFormPropsType> = ({ onSignInButtonClick, whichPopup }: SignInFormPropsType): ReactElement => {
  const viewportWidth = useViewportWidth();

  const buttonSize = viewportWidth >= 640 ? 'big' : 'small';

  const { t } = useTranslation('signInPopup');

  return (
    <Form onSubmit={onSignInButtonClick}>
      <Input label={t('email')} name="email"/>
      <Input label={t('password')} name="password"/>
      <BigBlueButton size={buttonSize} type="submit" text={t('signIn')} />
    </Form>
  );
}

export default SignInForm;