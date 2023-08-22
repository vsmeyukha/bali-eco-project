import { ReactElement, useState } from 'react';
import { Transition } from '@headlessui/react';

import BlueWave from '../../../public/images/backgrounds/bluewave.svg';
import useViewportWidth from '@/hooks/calculateWidth';

import { useTranslation } from 'next-i18next';

const PublishPhoto: React.FC = (): ReactElement => {
  const viewportWidth = useViewportWidth();

  const { t } = useTranslation('mapPage');

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  setTimeout(() => {
    setIsLoaded(true);
  }, 1000);

  return (
    <>
      <div className="max-w-full mx-auto relative">
        {viewportWidth > 500
          ?
          <BlueWave className="w-full absolute top-0 left-0 z-10" />
          :
          <div className='w-full bg-[#0D87FF] h-[140px] absolute top-0 left-0 z-10' />
        }
      </div>
      <div
        className="
        relative
        flex
        flex-row
        lg:justify-between
        justify-center
        1440px:ml-[183px]
        1440px:mr-[243px]
        xl:ml-[137px]
        xl:mr-[182px]
        lg:ml-[102px]
        lg:mr-[136px]
        lg:mt-[154px]
        md:mt-[100px]
        mt-[60px]
        z-20"
      >
        <h2 className="font-oceanic-bold text-[52px] leading-[62px] text-white max-w-[440px]">BaliGreenMap</h2>
        <Transition
          show={isLoaded}
          enter="transition-opacity ease-linear duration-2000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <p className="font-montserrat font-light text-[20px] leading-[24px] text-white">Нажмите на карту, чтобы добавить фото</p>
        </Transition>
        {/* {viewportWidth >= 1024 &&
          <button
            type="button"
            className="
            h-[56px]
            w-[263px]
            bg-white
            rounded-[8px]
            font-montserrat
            text-[20px]
            leading-[24px]
            text-[#0D87FF]
            font-bold
            hover:transform 
            hover:scale-105 
            duration-300"

            onClick={openPopup}
          >
            {t('publishPhoto')}
          </button>
        } */}
      </div>
    </>
  )
}

export default PublishPhoto;