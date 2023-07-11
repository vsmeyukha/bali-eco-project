import SidePopup from "../../SidePopup";
import RegOrSignInContent from "./RegOrSignInContent";
import { ReactElement } from "react";

import { popupStateType } from '@/pages';

interface RegOrSignInPopupProps {
  popup: popupStateType,
  open: boolean,
  onClose: () => void,
  // isRegPopup: boolean,
  openRegPopup: () => void,
  openSignInPopup: () => void,
}

const RegOrSignInPopup: React.FC<RegOrSignInPopupProps> = ({ popup, open, onClose, openRegPopup, openSignInPopup }: RegOrSignInPopupProps): ReactElement => {
  return (
    <SidePopup open={Boolean(popup)} onClose={onClose}>
      <RegOrSignInContent
        popup={popup}
        onClose={onClose}
        openRegPopup={openRegPopup}
        openSignInPopup={openSignInPopup}
      />
    </SidePopup>
  );
}

export default RegOrSignInPopup;