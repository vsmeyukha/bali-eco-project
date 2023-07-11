import { ReactElement } from "react";
import { Dialog } from "@headlessui/react";
import { useTranslation } from 'next-i18next';

import { popupStateType } from '@/pages';

import SwitchAndLangsContainer from "./SwitchAndLangsContainer";
import SwitchPopups from "./SwitchPopups";
import LanguageChoice from "./LanguageChoice";
import RegistrationLayout from "./RegistrationLayout";
import SignInLayout from "./SignInLayout";

interface RegOrSignInPopupProps {
  popup: popupStateType,
  onClose: () => void,
  openRegPopup: () => void,
  openSignInPopup: () => void,
}

const RegOrSignInContent: React.FC<RegOrSignInPopupProps> = ({
  popup,
  onClose,
  openRegPopup,
  openSignInPopup
}: RegOrSignInPopupProps): ReactElement => {

  const handleSwitchPopups = (): void => popup === 'regPopup' ? openSignInPopup() : openRegPopup();

  const { t } = useTranslation(['registerPopup', 'signInPopup']);

  return (
    <>
      <SwitchAndLangsContainer >
        <SwitchPopups popup={popup} handleSwitchPopups={handleSwitchPopups} />
        <LanguageChoice />
      </SwitchAndLangsContainer>
      <Dialog.Title className="mt-[80px] font-oceanic-bold text-[40px] leading-[48px] text-[#00265F]">
        {popup === 'regPopup'
          ?
          t('registration')
          :
          t('signInPopup:enter')
        }
      </Dialog.Title>
      {popup === 'regPopup'
        ?
        <RegistrationLayout onClose={onClose} popup={popup} />
        :
        <SignInLayout onClose={onClose} popup={popup} />
      }
      {popup === 'regPopup' && <p className="font-montserrat text-[10px] leading-[12px] text-[#00265F] text-opacity-40 mt-[40px] mb-[16px]">
        {t('agreement')}
      </p>}
    </>
  );
}

export default RegOrSignInContent;