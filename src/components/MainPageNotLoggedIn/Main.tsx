import { ReactElement, useState, MouseEvent, useContext } from 'react';
import { projectName } from '@/utils/consts';
import HiddenDesc from '../hiddenDesc';
import BaliMap from '../../../public/images/svgs/map.svg';
import RegistrationButton from './RegistrationButton';
import Popup from '../Popup';
import SidePopup from './RegOrSignInPopup/SidePopup';

interface MainProps {
  isPopupOpen: boolean,
  onPopupOpen: () => void,
  onPopupClose: () => void,
  isRegPopup: boolean,
  openRegPopup: () => void,
  openSignInPopup: () => void,
}

export default function Main ({isPopupOpen, onPopupOpen, onPopupClose, isRegPopup, openRegPopup, openSignInPopup}: MainProps): ReactElement {
  const handleRegPopupOpen = () => {
    openRegPopup();
    onPopupOpen();
  }

  return (
    <section className="ml-[65px] mr-[96px] relative">
      <h1
        className="
        text-white
        font-oceanic-poster
        text-[105px]
        leading-[126px]
        bg-clip-text
        bg-gradient-text
        text-transparent"
      >
        {projectName}
      </h1>
      <div className="flex flex-row justify-between align-top">
        <div>
          <HiddenDesc />
          <RegistrationButton size="small" type="button" onClick={handleRegPopupOpen} text="Зарегистрироваться" />
        </div>
        <BaliMap className="max-w-[533px] max-h-[330px]" />
      </div>
      <Popup />
      <SidePopup
        open={isPopupOpen}
        onClose={onPopupClose}
        isRegPopup={isRegPopup}
        openRegPopup={openRegPopup}
        openSignInPopup={openSignInPopup} />
    </section>
  )
}