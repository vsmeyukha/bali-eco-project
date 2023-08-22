import { ReactElement } from 'react';
import { useTranslation } from 'next-i18next';

import { popupStateType } from '@/pages';

import { projectName } from '@/utils/consts';
import HiddenDesc from '../hiddenDesc';
import BaliMap from '../../../public/images/svgs/map.svg';
import BigBlueButton from './BigBlueButton';
import useViewportWidth from '@/hooks/calculateWidth';
import RegOrSignInPopup from './RegOrSignInPopup/RegOrSignInPopup';

interface MainProps {
  popup: popupStateType,
  onPopupClose: () => void,
  openRegPopup: () => void,
  openSignInPopup: () => void,
}

// ? Main Component

// ? This component serves as the primary content for the landing page meant for users who are not logged in.
// ? It showcases the project name, a brief description, and provides buttons for registration and sign-in.

// ? Этот компонент служит контейнером для основного содержимого стартовой страницы для незалогиненных пользователей.
// ? Он отображает название проекта, краткое описание и предоставляет кнопки для регистрации и входа в систему.
// ? Также в нем хранится компонент сайдбара регистрации и входа.


export default function Main({ popup, onPopupClose, openRegPopup, openSignInPopup }: MainProps): ReactElement {

  // ? Determine the viewport width to adjust styles dynamically
  // ? Определяем ширину области видимости для динамической настройки стилей
  const viewportWidth = useViewportWidth();

  // ? Determine button size based on the viewport width
  // ? Задаем размер кнопки в зависимости от ширины области видимости
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
            <BigBlueButton
              size={buttonSize}
              type="button"
              onClick={openRegPopup}
              text={t('register')}
            />

            {/* Conditional rendering for smaller screens: dDisplay a message and button for users who are already registered */}
            {/* Условный рендеринг вопроса "Вы уже зарегистрированы?" и кнопки "Войти" на малых разрешениях. на больших экранах эта кнопка отображается в хэдере, однако на малых нет. */}
            {viewportWidth < 1280
              &&
              <div className=' flex flex-row mt-[15px] font-montserrat text-[14px] leading-[17px] text-white'>
                <p className='font-normal'>{ t('alreadyRegistered')}</p>
                <button
                  className='ml-[10px] font-bold text-[#0D87FF]'
                  onClick={openSignInPopup}
                >
                  {t('signIn')}
                </button>
              </div>
            }
          </div>
        </div>

        {/* Display a map illustration for larger screens */}
        {viewportWidth >= 1280 && <BaliMap className="max-w-[533px] max-h-[330px]" />}
      </div>

      {/* Popup for registration or sign-in */}
      {/* Попап-сайдбар для регистрации или входа */}
      <RegOrSignInPopup
        popup={popup}
        onClose={onPopupClose}
        openRegPopup={openRegPopup}
        openSignInPopup={openSignInPopup} />
    </section>
  )
}