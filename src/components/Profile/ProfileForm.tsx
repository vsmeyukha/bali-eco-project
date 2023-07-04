import { ReactElement, FormEvent, useState } from "react";
import { useTranslation } from "next-i18next";
import { z } from 'zod';

import Form from "../Form/Form";
import Input from "../Form/Input";
import BigBlueButton from "../MainPageNotLoggedIn/BigBlueButton";

interface profileFormState {
  nickname: string,
  name: string,
  surname: string,
  email: string,
  password: string,
}

const ProfileForm: React.FC = (): ReactElement => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const { t } = useTranslation('profile');

  const [profileForm, setProfileForm] = useState<profileFormState>({
    nickname: '',
    name: '',
    surname: '',
    email: '',
    password: ''
  });

  const nicknameValidation = z.string().min(3);
  const nameValidation = z.string().min(5);
  const surnameValidation = z.string().min(3);
  const emailValidation = z.string().email();
  const passwordValidation = z.string().min(8);

  const nicknameValResult = nicknameValidation.safeParse(profileForm.nickname);
  const nameValResult = nameValidation.safeParse(profileForm.name);
  const surnameValResult = surnameValidation.safeParse(profileForm.surname);
  const emailValResult = emailValidation.safeParse(profileForm.email);
  const passwordValResult = passwordValidation.safeParse(profileForm.password);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  }

  return (
    <div className="ml-[28px] mb-[24px] mt-[59px]">
      <Form onSubmit={handleSubmit}>
        <Input
          label={t('nickname')}
          name="nickname"
          value={profileForm.nickname}
          handleChange={handleFormChange}
          valSuccess={nicknameValResult.success}
          valErrorMessage={t('nicknameValidationMessage')}
        />
        <Input
          label={t('name')}
          name="name"
          value={profileForm.name}
          handleChange={handleFormChange}
          valSuccess={nameValResult.success}
          valErrorMessage={t('nameValidationMessage')}
        />
        <Input
          label={t('surname')}
          name="surname"
          value={profileForm.surname}
          handleChange={handleFormChange}
          valSuccess={surnameValResult.success}
          valErrorMessage={t('surnameValidationMessage')}
        />
        <Input
          label={t('email')}
          name="email"
          value={profileForm.email}
          handleChange={handleFormChange}
          valSuccess={emailValResult.success}
          valErrorMessage={t('emailValidationMessage')}
        />
        <Input
          label={t('password')}
          name="password"
          value={profileForm.password}
          type="password"
          handleChange={handleFormChange}
          valSuccess={passwordValResult.success}
          valErrorMessage={t('passwordValidationMessage')}
        />
        <BigBlueButton size="large" type="submit" text={t('save')} />
      </Form>
    </div>
  )
}

export default ProfileForm;