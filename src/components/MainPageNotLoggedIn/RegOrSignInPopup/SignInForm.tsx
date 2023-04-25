import React, { ReactElement, FormEvent } from "react";
import BigBlueButton from '../BigBlueButton';
import { inputStyles } from "@/utils/styles";
import { RegSignInPopup } from '../../../utils/types';
import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input";

interface SignInFormPropsType {
  onSignInButtonClick: (e: FormEvent<HTMLFormElement>) => void,
  whichPopup: RegSignInPopup,
}

const SignInForm: React.FC<SignInFormPropsType> = ({onSignInButtonClick, whichPopup}: SignInFormPropsType): ReactElement => {
  return (
    <Form onSubmit={onSignInButtonClick}>
      <Input label="E-mail" name="email"/>
      <Input label="Пароль" name="password"/>
      <BigBlueButton size="big" type="submit" text={whichPopup.buttonText} />
    </Form>
  );
}

export default SignInForm;