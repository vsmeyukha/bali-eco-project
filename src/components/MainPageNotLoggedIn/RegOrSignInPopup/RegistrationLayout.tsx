import { ReactElement, FormEvent } from "react";
import RegistrationForm from "./RegistrationForm";
import OrBlock from "./OrBlock";
import RegOrSignViaSocialMedia from "./RegOrSignViaSocialMedia";
import { RegSignInPopup } from '../../../utils/types';

interface LayoutProps {
  onClose: () => void,
  whichPopup: RegSignInPopup,
  isRegPopup: boolean,
}

const RegistrationLayout: React.FC<LayoutProps> = ({ onClose, whichPopup, isRegPopup }: LayoutProps): ReactElement => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onClose();
  }

  return (
    <div className="w-full flex flex-col items-center">
      <RegistrationForm onClose={onClose} />
      <OrBlock />
      <RegOrSignViaSocialMedia regOrSign={whichPopup} isRegPopup={isRegPopup} />
    </div>
  )
}

export default RegistrationLayout;