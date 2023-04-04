import { ReactElement, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import Manatee from '../../public/images/backgrounds/manatee.png';
import { quickToolsMenu } from "@/utils/consts";
import Profile from '../../public/images/svgs/icons/profile.svg';

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
                ml-[-350px]
                z-300
                bg-white
                w-[358px]
                h-[460px]
                rounded-[10px]
                py-[32px]
                flex
                flex-col
                items-center"
            >
        <div className="w-[100px] h-[100px] relative rounded-full overflow-hidden">
          <Image
            src={Manatee}
            alt="manatee"
            fill={true}
            objectFit="cover"
            objectPosition="center"
            className="rounded-full"
          />
        </div>
        <h3 className="font-montserrat-black text-[20px] leading-[24px] text-[#00265F] mt-[16px]">Имя Фамилия</h3>
        <ul className="w-full pl-[36px] mt-[16px]">
          {quickToolsMenu.map(paragraph => {
            const Icon = paragraph.icon;
            return (
              <li key={paragraph.id} className="mt-[24px]">
                <Link href={paragraph.href} className="flex">
                  <Icon />
                  <p className="ml-[20px] font-montserrat text-[16px] leading-[20px] text-[#00265F]">{paragraph.text}</p>
                </Link>
              </li>
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