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

  const nameValidationRule = z.string().min(5, { message: 'Name has to be longer than 5 symbols' });
  const emailValidationRule = z.string().email({ message: 'This is not a valid email' });
  const passwordValidationRule = z.string().min(8, { message: 'Password has to be longer than 8 symbols' });

  const nameValidation = nameValidationRule.safeParse(registrationState.name);
  const emailValidation = emailValidationRule.safeParse(registrationState.email);
  const passwordValidation = passwordValidationRule.safeParse(registrationState.password);

  let nameErrorMessage = '';
  let EmailErrorMessage = '';
  let PasswordErrorMessage = '';

  if (!nameValidation.success) {
    nameErrorMessage = nameValidation?.error?.issues[0].message;
  }

  if (!emailValidation.success) {
    EmailErrorMessage = emailValidation?.error?.issues[0].message;
  }

  if (!passwordValidation.success) {
    PasswordErrorMessage = passwordValidation?.error?.issues[0].message;
  }

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
        {(!nameValidation.success && registrationState.name !== '') && nameErrorMessage}
      </span>
      <Input label={t('email')} name="email" value={registrationState.email} handleChange={handleEmailChange} />
      <span className="w-full text-left text-red-500 mt-[8px]">
        {(!emailValidation.success && registrationState.email !== '') && EmailErrorMessage}
      </span>
      <Input label={t('password')} name="password" value={registrationState.password} handleChange={handlePasswordChange} />
      <span className="w-full text-left text-red-500 mt-[8px]">
        {(!passwordValidation.success && registrationState.password !== '') && PasswordErrorMessage}
      </span>
      <BigBlueButton size={buttonSize} type="submit" text={t('register')} disabled={!isButtonActive} />
    </Form>
  );
}

export default RegistrationForm;