import { ReactElement, FormEvent } from "react";
import RegistrationForm from "./RegistrationForm";
import OrBlock from "./OrBlock";
import RegOrSignViaSocialMedia from "./RegOrSignViaSocialMedia";
import { RegSignInPopup } from '../../../utils/types';

interface LayoutProps {
  onClose: () => void,
  whichPopup: RegSignInPopup,
}

const RegistrationLayout: React.FC<LayoutProps> = ({ onClose, whichPopup }: LayoutProps): ReactElement => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onClose();
  }

  return (
    <>
      <RegistrationForm onRegButtonClick={handleSubmit} whichPopup={whichPopup} />
      <OrBlock />
      <RegOrSignViaSocialMedia regOrSign={whichPopup} />
    </>
  )
}

export default RegistrationLayout;