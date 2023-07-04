import { ReactElement, FormEvent, useState } from "react";
import { useTranslation } from 'next-i18next';
import { z } from 'zod';

import BigBlueButton from '../BigBlueButton';
import { inputStyles } from "@/utils/styles";
import { RegSignInPopup } from '../../../utils/types';
import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import useViewportWidth from "@/hooks/calculateWidth";

interface RegFormPropsType {
  onRegButtonClick: (e: FormEvent<HTMLFormElement>) => void,
}

interface RegFormState {
  name: string,
  email: string,
  password: string,
}

const RegistrationForm: React.FC<RegFormPropsType> = ({ onRegButtonClick }: RegFormPropsType): ReactElement => {
  const viewportWidth = useViewportWidth();

  const buttonSize = viewportWidth >= 640 ? 'big' : 'small';

  const { t } = useTranslation('registerPopup');

  const [registrationState, setRegistrationState] = useState<RegFormState>({
    name: '',
    email: '',
    password: '',
  });

  const nameValidationRule = z.string().min(5);
  const emailValidationRule = z.string().email();
  const passwordValidationRule = z.string().min(8);

  const nameValidation = nameValidationRule.safeParse(registrationState.name);
  const emailValidation = emailValidationRule.safeParse(registrationState.email);
  const passwordValidation = passwordValidationRule.safeParse(registrationState.password);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationState({ ...registrationState, name: e.target.value });
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationState({ ...registrationState, email: e.target.value });
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationState({ ...registrationState, password: e.target.value });
  }

  const isButtonActive: boolean = nameValidation.success && emailValidation.success && passwordValidation.success;

  return (
    <Form onSubmit={onRegButtonClick}>
      <Input label={t('name')} name="username" value={registrationState.name} handleChange={handleNameChange} />
      <span className="w-full text-left text-red-500 mt-[8px]">
        {(!nameValidation.success && registrationState.name !== '') && t('nameValidation')}
      </span>
      <Input label={t('email')} name="email" value={registrationState.email} handleChange={handleEmailChange} />
      <span className="w-full text-left text-red-500 mt-[8px]">
        {(!emailValidation.success && registrationState.email !== '') && t('emailValidation')}
      </span>
      <Input label={t('password')} name="password" value={registrationState.password} handleChange={handlePasswordChange} />
      <span className="w-full text-left text-red-500 mt-[8px]">
        {(!passwordValidation.success && registrationState.password !== '') && t('passwordValidation')}
      </span>
      <BigBlueButton size={buttonSize} type="submit" text={t('register')} disabled={!isButtonActive} />
    </Form>
  );
}

export default RegistrationForm;