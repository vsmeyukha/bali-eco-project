import React, { ReactElement, FormEvent } from "react";
import RegistrationButton from '../RegistrationButton';
import { inputStyles } from "@/utils/styles";
import { RegSignInPopup } from '../../../utils/types';

interface SignInFormPropsType {
  onSignInButtonClick: (e: FormEvent<HTMLFormElement>) => void,
  whichPopup: RegSignInPopup,
}

const SignInForm: React.FC<SignInFormPropsType> = ({onSignInButtonClick, whichPopup}: SignInFormPropsType): ReactElement => {
  return (
    <form onSubmit={onSignInButtonClick} className="flex flex-col mt-[40px] font-montserrat text-[16px] leading-[20px]">
      <label className="flex flex-col">
        E-mail
        <input type="text" name="email" className={inputStyles}></input>
      </label>
      <label className="flex flex-col mt-[32px]">
        Пароль
        <input type="text" name="password" className={inputStyles}></input>
      </label>
      <RegistrationButton size="big" type="submit" text={whichPopup.buttonText} />
    </form>
  );
}

export default SignInForm;