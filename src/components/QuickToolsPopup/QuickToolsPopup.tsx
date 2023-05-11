import { ReactElement, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import Manatee from '../../../public/images/backgrounds/manatee.png';
import { quickToolsMenu } from "@/utils/consts";
import Profile from '../../../public/images/svgs/icons/profile.svg';
import { QuickToolsMenuType } from '../../utils/types';
import QuickToolsMenuItem from './QuickToolsMenuItem';
import QuickPopupSwitchContainer from './QuickPopupSwitchContainer';
import { switchContent } from '../../utils/types';

const languages: Array<switchContent> = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'id', label: 'ID' },
];

const dayAndNight: Array<switchContent> = [
  { code: 'on', label: 'ON' },
  { code: 'off', label: 'OFF' },
];

const QuickToolsPopup: React.FC = (): ReactElement => {
  return (
    <Popover>
      {({ open }) => (
        <div className="relative"> 
          <Popover.Button className="active:border-none active:outline-none focus:outline-none">
            <Profile className={open ? 'opacity-25' : ''} />
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
              <Link href="/profile" className="font-montserrat-bold text-[20px] leading-[24px] text-[#00265F] mt-[16px]">Имя Фамилия</Link>
        <ul className="w-full px-[36px] mt-[16px]">
          {quickToolsMenu.map((paragraph: QuickToolsMenuType, index) => {
            const Icon = paragraph.icon;
            return (
              <QuickToolsMenuItem
                key={paragraph.id}
                icon={Icon}
                href={paragraph.href}
                text={paragraph.text}
                isDiv={index === 2 || index === 3}
              >
                {index === 2 && (<QuickPopupSwitchContainer content={languages} />)}
                {index === 3 && (<QuickPopupSwitchContainer content={dayAndNight} />)}
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