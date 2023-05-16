import { ReactElement, FormEvent } from "react";
import BigBlueButton from '../BigBlueButton';
import { inputStyles } from "@/utils/styles";
import { RegSignInPopup } from '../../../utils/types';
import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import useViewportWidth from "@/hooks/calculateWidth";

interface RegFormPropsType {
  onRegButtonClick: (e: FormEvent<HTMLFormElement>) => void,
  whichPopup: RegSignInPopup,
}

const RegistrationForm: React.FC<RegFormPropsType> = ({ onRegButtonClick, whichPopup }: RegFormPropsType): ReactElement => {
  const viewportWidth = useViewportWidth();

  const buttonSize = viewportWidth >= 640 ? 'big' : 'small';
    
  return (
    <Form onSubmit={onRegButtonClick}>
      <Input label="Имя" name="username" />
      <Input label="E-mail" name="email" />
      <Input label="Пароль" name="password" />
      <BigBlueButton size={buttonSize} type="submit" text={whichPopup.buttonText} />
    </Form>
  );
}

export default RegistrationForm;