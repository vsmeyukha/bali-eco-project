import { ReactElement } from 'react';
import { useTranslation } from 'next-i18next';

import { projectName } from '@/utils/consts';
import HiddenDesc from '../hiddenDesc';
import BaliMap from '../../../public/images/svgs/map.svg';
import BigBlueButton from './BigBlueButton';
import Popup from '../Popup';
import useViewportWidth from '@/hooks/calculateWidth';
import RegOrSignInPopup from './RegOrSignInPopup/RegOrSignInPopup';

interface MainProps {
  isPopupOpen: boolean,
  onPopupOpen: () => void,
  onPopupClose: () => void,
  isRegPopup: boolean,
  openRegPopup: () => void,
  openSignInPopup: () => void,
}

export default function Main ({isPopupOpen, onPopupOpen, onPopupClose, isRegPopup, openRegPopup, openSignInPopup}: MainProps): ReactElement {
  const handleRegPopupOpen = (): void => {
    openRegPopup();
    onPopupOpen();
  }

  const handleSignInPopupOpen = (): void => {
    openSignInPopup();
    onPopupOpen();
  }

  const viewportWidth = useViewportWidth();

  const buttonSize = viewportWidth >= 600 ? 'big' : 'small';

  const { t } = useTranslation('mainPageNotLoggedIn');

  return (
    <section
      className="
      1440px:pl-[152px]
      sm:pl-[65px]
      sm:pr-[96px]
      px-0
      sm:relative
      flex
      flex-col
      items-center
      sm:items-start
      w-full"
    >
      <h1
        className="
        text-white
        font-oceanic-poster
        lg:text-[105px]
        lg:leading-[126px]
        md:text-[80px]
        md:leading-[100px]
        sm:text-[60px]
        sm:leading-[80px]
        text-[42px]
        leading-[36px]
        bg-clip-text
        bg-gradient-text
        text-transparent
        mt-[378px]
        sm:mt-0"
      >
        {projectName}
      </h1>
      <div className="flex flex-row justify-between align-top sm:w-full w-4/5 mb-[32px]">
        <div className='flex flex-col sm:items-start items-center '>
          <HiddenDesc />
          <div className='flex flex-col items-center'>
            <BigBlueButton size={buttonSize} type="button" onClick={handleRegPopupOpen} text={t('register')} />
            {viewportWidth < 1280
              &&
              <div className=' flex flex-row mt-[15px] font-montserrat text-[14px] leading-[17px] text-white'>
                <p className='font-normal'>{ t('alreadyRegistered')}</p>
                <button className='ml-[10px] font-bold text-[#0D87FF]' onClick={handleSignInPopupOpen}>{ t('signIn')}</button>
              </div>
            }
          </div>
        </div>
        {viewportWidth >= 1280 && <BaliMap className="max-w-[533px] max-h-[330px]" />}
      </div>
      <Popup />
      <RegOrSignInPopup
        open={isPopupOpen}
        onClose={onPopupClose}
        isRegPopup={isRegPopup}
        openRegPopup={openRegPopup}
        openSignInPopup={openSignInPopup} />
    </section>
  )
}