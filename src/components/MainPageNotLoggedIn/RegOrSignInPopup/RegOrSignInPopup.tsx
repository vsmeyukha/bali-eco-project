import SidePopup from "../../SidePopup";
import RegOrSignInContent from "./RegOrSignInContent";
import { ReactElement } from "react";

import { popupStateType } from '@/pages';

interface RegOrSignInPopupProps {
  popup: popupStateType,
  onClose: () => void,
  openRegPopup: () => void,
  openSignInPopup: () => void,
}

// ? RegOrSignInPopup Component 

// ? This component wraps the actual registration and sign-in content within a side popup.
// ? It uses the generic SidePopup component to handle the display, and the specific logic for registration and sign-in is managed inside the RegOrSignInContent component.

// ? Этот компонент является оберткой для компонентов, которые осуществляют фактическое отображение и отвечают за логику регистрации и входа в приложение.

const RegOrSignInPopup: React.FC<RegOrSignInPopupProps> = ({ popup, onClose, openRegPopup, openSignInPopup }: RegOrSignInPopupProps): ReactElement => {
  return (
    <SidePopup open={Boolean(popup)} onClose={onClose}>
      {/* 
       The actual content of the popup. It might contain the forms for registration or sign-in based on the 'popup' prop value.
       Фактическое содержимое всплывающего окна. Оно может содержать формы для регистрации или входа в зависимости от значения свойства 'popup'.
       */}
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