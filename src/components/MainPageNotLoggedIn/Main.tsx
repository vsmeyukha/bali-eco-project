import { ReactElement, useState, MouseEvent, useContext } from 'react';
import { projectName } from '@/utils/consts';
import HiddenDesc from '../hiddenDesc';
import BaliMap from '../../../public/images/svgs/map.svg';
import RegistrationButton from './RegistrationButton';
import Popup from '../Popup';
import RegistrationPopup from './RegistrationPopup';

export default function Main(): ReactElement {
  const [isRegPopupOpen, setIsRegPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setIsRegPopupOpen(true);
  }

  const handlePopupClose = () => {
    setIsRegPopupOpen(false);
  }

  return (
    <section className="ml-[65px] mr-[96px]" >
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
          <RegistrationButton size="small" type="button" onClick={handlePopupOpen} />
        </div>
        <BaliMap className="max-w-[533px] max-h-[330px]" />
      </div>
      <Popup />
      <RegistrationPopup open={isRegPopupOpen} onClose={handlePopupClose} />
    </section>
  )
}