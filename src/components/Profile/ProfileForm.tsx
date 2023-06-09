import { ReactElement, FormEvent } from "react";
import { useTranslation } from "next-i18next";

import Form from "../Form/Form";
import Input from "../Form/Input";
import BigBlueButton from "../MainPageNotLoggedIn/BigBlueButton";

const ProfileForm: React.FC = (): ReactElement => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const { t } = useTranslation('profile');

  return (
    <div className="ml-[28px] mb-[24px] mt-[59px]">
      <Form onSubmit={handleSubmit}>
        <Input label={t('nickname')} name="nickname" />
        <Input label={t('name')} name="name" />
        <Input label={t('surname')} name="surname" />
        <Input label={t('email')} name="email" />
        <BigBlueButton size="large" type="submit" text={t('save')} />
      </Form>
    </div>
  )
}

export default ProfileForm;