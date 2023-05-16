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
    <div className="w-4/5 flex flex-col items-center">
      <RegistrationForm onRegButtonClick={handleSubmit} whichPopup={whichPopup} />
      <OrBlock />
      <RegOrSignViaSocialMedia regOrSign={whichPopup} />
    </div>
  )
}

export default RegistrationLayout;