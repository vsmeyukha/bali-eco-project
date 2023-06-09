import { ReactElement, FormEvent } from "react";
import SignInForm from "./SignInForm";
import OrBlock from "./OrBlock";
import RegOrSignViaSocialMedia from "./RegOrSignViaSocialMedia";
import { RegSignInPopup } from '../../../utils/types';

interface LayoutProps {
  onClose: () => void,
  whichPopup: RegSignInPopup,
  isRegPopup: boolean,
}

const SignInLayout: React.FC<LayoutProps> = ({ onClose, whichPopup, isRegPopup }: LayoutProps): ReactElement => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onClose();
  }

  return (
    <div className="w-full flex flex-col items-center">
      <SignInForm onSignInButtonClick={handleSubmit} whichPopup={whichPopup} />
      <OrBlock />
      <RegOrSignViaSocialMedia regOrSign={whichPopup} isRegPopup={isRegPopup} />
    </div>
  );
}

export default SignInLayout;