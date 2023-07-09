import { ReactElement, FormEvent, useState } from "react";
import { useTranslation } from 'next-i18next';
import { z } from 'zod';

import { signUp } from "@/firebase/auth";

import BigBlueButton from '../BigBlueButton';
import { inputStyles } from "@/utils/styles";
import { RegSignInPopup } from '../../../utils/types';
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

  const { t } = useTranslation('registerPopup');

  const [registrationState, setRegistrationState] = useState<RegFormState>({
    username: '',
    email: '',
    password: '',
  });

  const nameValidation = nameValidationRule.safeParse(registrationState.username);
  const emailValidation = emailValidationRule.safeParse(registrationState.email);
  const passwordValidation = passwordValidationRule.safeParse(registrationState.password);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationState({ ...registrationState, [e.target.name]: e.target.value });
  }

  const isButtonActive: boolean = nameValidation.success && emailValidation.success && passwordValidation.success;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp(registrationState.email, registrationState.password);
    onClose();
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
      <BigBlueButton
        size={buttonSize}
        type="submit"
        text={t('register')}
        disabled={!isButtonActive}
      />
    </Form>
  );
}

export default RegistrationForm;