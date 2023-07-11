import { ReactElement, FormEvent } from "react";
import SignInForm from "./SignInForm";
import OrBlock from "./OrBlock";
import RegOrSignViaSocialMedia from "./RegOrSignViaSocialMedia";
import { RegSignInPopup } from '../../../utils/types';

import { popupStateType } from '@/pages';

interface LayoutProps {
  popup: popupStateType,
  onClose: () => void,
}

const SignInLayout: React.FC<LayoutProps> = ({ onClose, popup }: LayoutProps): ReactElement => {
  return (
    <div className="w-full flex flex-col items-center">
      <SignInForm onClose={onClose} />
      <OrBlock />
      <RegOrSignViaSocialMedia popup={popup} onClose={onClose} />
    </div>
  );
}

export default SignInLayout;