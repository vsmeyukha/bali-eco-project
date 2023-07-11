import { ReactElement, FormEvent } from "react";

import RegistrationForm from "./RegistrationForm";
import OrBlock from "./OrBlock";
import RegOrSignViaSocialMedia from "./RegOrSignViaSocialMedia";
import { RegSignInPopup } from '../../../utils/types';

import { popupStateType } from '@/pages';

interface LayoutProps {
  popup: popupStateType,
  onClose: () => void,
}

const RegistrationLayout: React.FC<LayoutProps> = ({ popup, onClose }: LayoutProps): ReactElement => {

  return (
    <div className="w-full flex flex-col items-center">
      <RegistrationForm onClose={onClose} />
      <OrBlock />
      <RegOrSignViaSocialMedia popup={popup} onClose={onClose} />
    </div>
  )
}

export default RegistrationLayout;