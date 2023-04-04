import { ReactElement, FormEvent } from "react";
import RegistrationButton from './RegistrationButton';
import { inputStyles } from "@/utils/styles";

interface RegFormPropsType {
  onRegButtonClick: (e: FormEvent<HTMLFormElement>) => void,
}

const RegistrationForm: React.FC<RegFormPropsType> = ({onRegButtonClick}: RegFormPropsType): ReactElement => {
  return (
    <form onSubmit={onRegButtonClick} className="flex flex-col mt-[40px] font-montserrat text-[16px] leading-[20px]">
      <label className="flex flex-col">
        Имя
        <input type="text" name="username" className={inputStyles}></input>
      </label>
      <label className="flex flex-col mt-[32px]">
        E-mail
        <input type="text" name="email" className={inputStyles}></input>
      </label>
      <label className="flex flex-col mt-[32px]">
        Пароль
        <input type="text" name="password" className={inputStyles}></input>
      </label>
      <RegistrationButton size="big" type="submit" />
    </form>
  );
}

export default RegistrationForm;