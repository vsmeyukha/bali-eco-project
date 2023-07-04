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

  const nicknameValidation = z.string().min(3, { message: 'Nickname has to be longer than 3 symbols' });
  const nameValidation = z.string().min(5, { message: 'Name has to be longer than 5 symbols' });
  const surnameValidation = z.string().min(3, { message: 'Surname has to be longer than 3 symbols' });
  const emailValidation = z.string().email({message: 'This is not a valid email'});
  const passwordValidation = z.string().min(8, { message: 'Password has to be longer than 8 symbols' });

  const nicknameValResult = nicknameValidation.safeParse(profileForm.nickname);
  const nameValResult = nameValidation.safeParse(profileForm.name);
  const surnameValResult = surnameValidation.safeParse(profileForm.surname);
  const emailValResult = emailValidation.safeParse(profileForm.email);
  const passwordValResult = passwordValidation.safeParse(profileForm.password);

  let nicknameValidationMessage = '';
  let nameValidationMessage = '';
  let surnameValidationMessage = '';
  let emailValidationMessage = '';
  let passwordValidationMessage = '';

  if (!nicknameValResult.success) {
    nicknameValidationMessage = nicknameValResult.error.issues[0].message;
  }

  if (!nameValResult.success) {
    nameValidationMessage = nameValResult.error.issues[0].message;
  }

  if (!surnameValResult.success) {
    surnameValidationMessage = surnameValResult.error.issues[0].message;
  }

  if (!emailValResult.success) {
    emailValidationMessage = emailValResult.error.issues[0].message;
  }

  if (!passwordValResult.success) {
    passwordValidationMessage = passwordValResult.error.issues[0].message;
  }



  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm({ ...profileForm, nickname: e.target.value });
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm({ ...profileForm, name: e.target.value });
  }

  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm({ ...profileForm, surname: e.target.value });
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm({ ...profileForm, email: e.target.value });
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm({ ...profileForm, password: e.target.value });
  }

  return (
    <div className="ml-[28px] mb-[24px] mt-[59px]">
      <Form onSubmit={handleSubmit}>
        <Input label={t('nickname')} name="nickname" value={profileForm.nickname} handleChange={handleNicknameChange} />
        <span className="w-full text-left text-red-500 mt-[8px]">
          {(!nicknameValResult.success && profileForm.nickname !== '') && nicknameValidationMessage}
        </span>
        <Input label={t('name')} name="name" value={profileForm.name} handleChange={handleNameChange} />
        <span className="w-full text-left text-red-500 mt-[8px]">
          {(!nameValResult.success && profileForm.name !== '') && nameValidationMessage}
        </span>
        <Input label={t('surname')} name="surname" value={profileForm.surname} handleChange={handleSurnameChange} />
        <span className="w-full text-left text-red-500 mt-[8px]">
          {(!surnameValResult.success && profileForm.surname !== '') && surnameValidationMessage}
        </span>
        <Input label={t('email')} name="email" value={profileForm.email} handleChange={handleEmailChange} />
        <span className="w-full text-left text-red-500 mt-[8px]">
          {(!emailValResult.success && profileForm.email !== '') && emailValidationMessage}
        </span>
        <Input label={t('password')} name="password" value={profileForm.password} handleChange={handlePasswordChange} />
        <span className="w-full text-left text-red-500 mt-[8px]">
          {(!passwordValResult.success && profileForm.password !== '') && passwordValidationMessage}
        </span>
        <BigBlueButton size="large" type="submit" text={t('save')} />
      </Form>
    </div>
  )
}

export default ProfileForm;