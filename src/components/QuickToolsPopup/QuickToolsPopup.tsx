import { ReactElement, Fragment} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Popover, Transition } from "@headlessui/react";
import { useTranslation } from 'next-i18next';

import Manatee from '../../../public/images/backgrounds/manatee.png';
import { quickToolsMenu } from "@/utils/consts";
import Profile from '../../../public/images/svgs/icons/profile.svg';
import { QuickToolsMenuType } from '../../utils/types';
import QuickToolsMenuItem from './QuickToolsMenuItem';
import QuickPopupSwitchContainer from './QuickPopupSwitchContainer';
import { switchContent } from '../../utils/types';
import SwitchLanguage from "./SwitchLanguage";
import SwitchDayAndNight from "./SwitchDayAndNight";

import { logOut } from "@/firebase/auth";
import { auth } from '../../firebase/config';

interface QuickToolsPopupProps {
  isDay: string, 
  handleColorTheme: (code: string) => void,
}

const QuickToolsPopup: React.FC<QuickToolsPopupProps> = ({ isDay, handleColorTheme }): ReactElement => {
  const { t } = useTranslation('quickToolsPopup');

  const router = useRouter();

  const signOut = async () => {
    try {
      await logOut();
      if (!auth.currentUser) {
        router.push('/');
      }
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
          <Popover.Button className="active:border-none active:outline-none focus:outline-none">
            <Profile className={`text-white fill-current h-[28px] w-[28px] ${open ? 'opacity-25' : ''}`} />
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
                h-[490px]
                rounded-[10px]
                py-[32px]
                flex
                flex-col
                items-center"
            >
              <Link href="/profile" className="w-[100px] h-[100px] relative rounded-full overflow-hidden">
                <Image
                  src={Manatee}
                  alt="manatee"
                  fill
                  className="object-cover object-center"
                />
              </Link>
              <Link href="/profile" className="font-montserrat-bold text-[20px] leading-[24px] text-[#00265F] mt-[16px]">
                Имя Фамилия
              </Link>
              <ul className="w-full px-[36px] mt-[16px]">
                {quickToolsMenu.map((paragraph: QuickToolsMenuType, index) => {
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
                      {paragraph.id === 3
                        &&
                        (
                          <QuickPopupSwitchContainer>
                            <SwitchLanguage />
                          </QuickPopupSwitchContainer>
                        )
                      }
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