import { ReactElement } from "react";
import { Dialog } from "@headlessui/react";
import SwitchAndLangsContainer from "./SwitchAndLangsContainer";
import SwitchPopups from "./SwitchPopups";
import LanguageChoice from "./LanguageChoice";
import RegistrationLayout from "./RegistrationLayout";
import SignInLayout from "./SignInLayout";
import { regPopup, signInPopup } from "@/utils/consts";

interface RegOrSignInPopupProps {
  onClose: () => void,
  isRegPopup: boolean,
  openRegPopup: () => void,
  openSignInPopup: () => void,
}

const RegOrSignInContent: React.FC<RegOrSignInPopupProps> =
  ({ onClose, isRegPopup, openRegPopup, openSignInPopup }: RegOrSignInPopupProps): ReactElement => {
  const whichPopup = isRegPopup ? regPopup : signInPopup;

  const handleSwitchPopups = isRegPopup ? openSignInPopup : openRegPopup;

  return (
    <>
      <SwitchAndLangsContainer >
        <SwitchPopups whichPopup={whichPopup} handleSwitchPopups={handleSwitchPopups} />
        <LanguageChoice />
      </SwitchAndLangsContainer>
      <Dialog.Title className="mt-[80px] font-oceanic-bold text-[40px] leading-[48px] text-[#00265F]">
        {whichPopup.title}
      </Dialog.Title>
      {isRegPopup
        ?
        <RegistrationLayout onClose={onClose} whichPopup={whichPopup} />
        :
        <SignInLayout onClose={onClose} whichPopup={whichPopup} />
      }
      {isRegPopup && <p className="font-montserrat text-[10px] leading-[12px] text-[#00265F] text-opacity-40 mt-[40px] mb-[16px]">Регистрируясь, вы принимаете условия соглашения</p>}
    </>
  );
}

export default RegOrSignInContent;