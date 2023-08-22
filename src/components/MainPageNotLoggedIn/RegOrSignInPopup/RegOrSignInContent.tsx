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

// ? Content component for registration or sign-in.
// ? This component decides which layout to render(Registration or Sign - In) based on the 'popup' prop value.

// ? Компонент контента для регистрации или входа.
// ? Этот компонент решает, какой макет отображать (Регистрация или Вход) на основе значения свойства 'popup'.

const RegOrSignInContent: React.FC<RegOrSignInPopupProps> = ({
  popup,
  onClose,
  openRegPopup,
  openSignInPopup
}: RegOrSignInPopupProps): ReactElement => {

  // ? Function to switch between registration and sign-in popups.
  // ? Функция для переключения между попапами регистрации и входа.
  const handleSwitchPopups = (): void => popup === 'regPopup' ? openSignInPopup() : openRegPopup();

  const { t } = useTranslation(['registerPopup', 'signInPopup']);

  return (
    <>
      {/* 
      Container for popups switcher and language choice.
      Контейнер для переключателя попапов и выбора языка.
      */}
      <SwitchAndLangsContainer >
        <SwitchPopups popup={popup} handleSwitchPopups={handleSwitchPopups} />
        <LanguageChoice />
      </SwitchAndLangsContainer>
      {/*
      Title that changes depending on the chosen popup (registration or sign-in).
      Заголовок, который меняется в зависимости от выбранного попапа (регистрация или вход).
       */}
      <Dialog.Title className="mt-[80px] font-oceanic-bold text-[40px] leading-[48px] text-[#00265F]">
        {popup === 'regPopup'
          ?
          t('registration')
          :
          t('signInPopup:enter')
        }
      </Dialog.Title>
      {/*
      Rendering either the registration layout or the sign-in layout based on the 'popup' prop value.
      Рендеринг либо лэйаута регистрации, либо лэйаута входа в зависимости от значения свойства 'popup'.
       */}
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