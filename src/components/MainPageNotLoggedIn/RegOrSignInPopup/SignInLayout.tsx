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
  return (
    <div className="w-full flex flex-col items-center">
      <SignInForm whichPopup={whichPopup} onClose={onClose} />
      <OrBlock />
      <RegOrSignViaSocialMedia regOrSign={whichPopup} isRegPopup={isRegPopup} onClose={onClose} />
    </div>
  );
}

export default SignInLayout;