import { ReactElement, Dispatch, SetStateAction, ReactNode } from "react";

import InformationPopup from '../InformationPopup';
import NotVerifiedUserPopupContent from "./NotVerifiedUserPopupContent";

interface NotVerifiedUserPopupProps {
  open: boolean,
  onClose: Dispatch<SetStateAction<boolean>>,
}

const NotVerifiedUserPopup: React.FC<NotVerifiedUserPopupProps> = ({open, onClose}): ReactElement => {
  return (
    <InformationPopup open={open} onClose={onClose}>
      <NotVerifiedUserPopupContent onClose={onClose} />
    </InformationPopup>
  )
}

export default NotVerifiedUserPopup;