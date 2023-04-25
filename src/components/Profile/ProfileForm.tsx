import { ReactElement, FormEvent } from "react";
import Form from "../Form/Form";
import Input from "../Form/Input";
import BigBlueButton from "../MainPageNotLoggedIn/BigBlueButton";

const ProfileForm: React.FC = (): ReactElement => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <div className="ml-[28px] mb-[24px] mt-[59px]">
      <Form onSubmit={handleSubmit}>
        <Input label="Как к вам обращаться?" name="nickname" />
        <Input label="Имя" name="name" />
        <Input label="Фамилия" name="surname" />
        <Input label="E-mail" name="email" />
        <BigBlueButton size="large" type="submit" text="Сохранить" />
      </Form>
    </div>
  )
}

export default ProfileForm;