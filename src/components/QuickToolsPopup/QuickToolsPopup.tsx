import { ReactElement, Fragment} from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { useTranslation } from 'next-i18next';

const ManateeImage = require('../../../public/images/backgrounds/manatee.png');
import { quickToolsMenu } from "@/utils/consts";
import Profile from '../../../public/images/svgs/icons/profile.svg';
import { QuickToolsMenuType } from '../../utils/types';
import QuickToolsMenuItem from './QuickToolsMenuItem';
import QuickPopupSwitchContainer from './QuickPopupSwitchContainer';
import SwitchLanguage from "./SwitchLanguage";
import SwitchDayAndNight from "./SwitchDayAndNight";

import { logOut } from "@/firebase/auth";
import { auth } from '../../firebase/config';

interface QuickToolsPopupProps {
  isDay: string, 
  handleColorTheme: (code: string) => void,
}

// ? QuickToolsPopup Component
// ? This component renders a popup menu for quick user tools. It provides the user with options like switching language and signing out.
// ? It also displays the user's profile picture and provides a shortcut to the user's profile page.

// ? Попап быстрых настроек
// ? Этот компонент отображает всплывающее меню для быстрых пользовательских инструментов. Он предоставляет пользователю такие опции, как переключение языка и выход из системы.
// ? Он также отображает изображение профиля пользователя и предоставляет ярлык для перехода на страницу профиля пользователя.

const QuickToolsPopup: React.FC<QuickToolsPopupProps> = ({ isDay, handleColorTheme }): ReactElement => {
  const { t } = useTranslation('quickToolsPopup');

  // ? Function to sign out the user
  const signOut = async () => {
    try {
      await logOut();
    } catch (error: any) {
      console.log(error);
      console.log(error.code);
      console.log(error.message);
    }
  }

  return (
    <Popover>
      {({ open }) => (
        <div className="relative"> 
          {/* Button to trigger the popup */}
          <Popover.Button className="active:border-none active:outline-none focus:outline-none">
            {/* Display user's profile picture or default picture */}
            {auth.currentUser?.photoURL
              ?
              <img className="h-[28px] w-[28px] rounded-full" src={auth.currentUser?.photoURL} alt='ava-img' /> 
              :
              <Profile className={`text-white fill-current h-[28px] w-[28px] ${open ? 'opacity-25' : ''}`} />
            }
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1">
            <Popover.Panel
              className="
                absolute
                top-0
                left-0
                mt-[35px]
                ml-[-420px]
                z-300
                bg-white
                w-[430px]
                rounded-[10px]
                py-[32px]
                flex
                flex-col
                items-center"
            >
              {/* User's profile picture or default picture with link to profile */}
              <Link href="/profile" className="w-[90px] h-[90px] relative rounded-full overflow-hidden">
                <img
                  src={auth.currentUser?.photoURL || ManateeImage}
                  alt="manatee"
                  className="object-cover object-center m-0 p-0"
                />
              </Link>
              <Link href="/profile" className="font-montserrat-bold text-[20px] leading-[24px] text-[#00265F] mt-[16px]">
                {auth.currentUser?.email}
              </Link>
              {/* List of quick tools */}
              <ul className="w-full px-[36px] mt-[16px]">
                {quickToolsMenu.map((paragraph: QuickToolsMenuType) => {
                  const Icon = paragraph.icon;
                  return (
                    <QuickToolsMenuItem
                      key={paragraph.id}
                      icon={Icon}
                      href={paragraph.href}
                      titleKey={t(paragraph.titleKey)}
                      isSwitch={paragraph.id === 3 || paragraph.id === 4}
                      isButton={paragraph.id === 5}
                      onButtonClick={signOut}
                    >
                      {/* Conditional rendering for switch items */}
                      {paragraph.id === 3
                        &&
                        (
                          <QuickPopupSwitchContainer>
                            <SwitchLanguage />
                          </QuickPopupSwitchContainer>
                        )
                      }
                      {/* Conditional rendering for switch items */}
                      {paragraph.id === 4
                        &&
                        (
                        <QuickPopupSwitchContainer>
                          <SwitchDayAndNight isDay={isDay} handleColorTheme={handleColorTheme} />
                        </QuickPopupSwitchContainer>
                        )
                      }
                    </QuickToolsMenuItem>
                  )
                })}
              </ul>
            </Popover.Panel>
          </Transition>
        </div>
      )}
    </Popover>
  )
}

export default QuickToolsPopup;