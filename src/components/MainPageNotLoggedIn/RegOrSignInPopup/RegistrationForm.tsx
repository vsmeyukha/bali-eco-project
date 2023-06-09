import { ReactElement, FormEvent } from "react";
import { useTranslation } from 'next-i18next';

import BigBlueButton from '../BigBlueButton';
import { inputStyles } from "@/utils/styles";
import { RegSignInPopup } from '../../../utils/types';
import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import useViewportWidth from "@/hooks/calculateWidth";

interface RegFormPropsType {
  onRegButtonClick: (e: FormEvent<HTMLFormElement>) => void,
}

const RegistrationForm: React.FC<RegFormPropsType> = ({ onRegButtonClick }: RegFormPropsType): ReactElement => {
  const viewportWidth = useViewportWidth();

  const buttonSize = viewportWidth >= 640 ? 'big' : 'small';

  const { t } = useTranslation('registerPopup');
    
  return (
    <Form onSubmit={onRegButtonClick}>
      <Input label={t('name')} name="username" />
      <Input label={t('email')} name="email" />
      <Input label={t('password')} name="password" />
      <BigBlueButton size={buttonSize} type="submit" text={t('register')} />
    </Form>
  );
}

export default RegistrationForm;