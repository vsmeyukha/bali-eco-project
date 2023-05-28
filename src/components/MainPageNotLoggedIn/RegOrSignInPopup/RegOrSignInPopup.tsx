import SidePopup from "../../SidePopup";
import RegOrSignInContent from "./RegOrSignInContent";
import { ReactElement } from "react";

interface RegOrSignInPopupProps {
  open: boolean,
  onClose: () => void,
  isRegPopup: boolean,
  openRegPopup: () => void,
  openSignInPopup: () => void,
}

const RegOrSignInPopup: React.FC<RegOrSignInPopupProps> = ({ open, onClose, isRegPopup, openRegPopup, openSignInPopup }: RegOrSignInPopupProps): ReactElement => {
  return (
    <SidePopup open={open} onClose={onClose}>
      <RegOrSignInContent
        onClose={onClose}
        isRegPopup={isRegPopup}
        openRegPopup={openRegPopup}
        openSignInPopup={openSignInPopup}
      />
    </SidePopup>
  );
}

export default RegOrSignInPopup;