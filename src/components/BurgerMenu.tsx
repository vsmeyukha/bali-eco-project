import { ReactElement, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { navListRu, navListForBurgerRu } from "@/utils/consts";
import BurgerMenuIcon from '../../public/images/svgs/icons/burgerMenu.svg';

const BurgerMenu: React.FC = (): ReactElement => {
  return (
    <Menu as="div" className="flex">
      <Menu.Button className="flex flex-col space-y-[4px] justify-center focus:outline-none">
        <BurgerMenuIcon />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1">
        <Menu.Items className="bg-white absolute top-[50px] transform -translate-x-full rounded-[10px] pl-[19px] pt-[27px] w-[235px] h-[208px] focus:outline-none space-y-[16px]">
          {navListForBurgerRu.map(paragraph => {
            const Icon = paragraph.icon;
            return (
              <Menu.Item key={paragraph.id}>
                <Link href={paragraph.link} className="flex flex-row items-center group">
                  <Icon className="text-[#00265F] group-hover:text-[#0D87FF] transition-colors duration-200"/>
                  <p className="ml-[10px] font-montserrat font-normal text-[18px] leading-[22px] text-[#00265F] hover:text-[#0D87FF] transition-colors duration-200 group-hover:text-[#0D87FF]">{paragraph.title}</p>
                </Link>
              </Menu.Item>
            )
          })
          }
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default BurgerMenu;