import { ReactElement, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { navListRu } from "@/utils/consts";

const BurgerMenu: React.FC = (): ReactElement => {
  return (
    <Menu as="div" className="flex">
      <Menu.Button className="flex flex-col space-y-[4px] justify-center focus:outline-none">
        <div className="bg-white w-[30px] h-[3px]"></div>
        <div className="bg-white w-[30px] h-[3px]"></div>
        <div className="bg-white w-[30px] h-[3px]"></div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1">
        <Menu.Items className="bg-white absolute top-[50px] transform -translate-x-full rounded-[10px] p-[32px] focus:outline-none">
          {navListRu.map(paragraph =>
            <Menu.Item key={paragraph.id}>
              <Link href={paragraph.link}>
                <p className="font-montserrat font-normal text-[18px] leading-[22px] text-[#00265F] hover:text-[#0D87FF] transition-colors duration-200">{paragraph.title}</p>
              </Link>
            </Menu.Item>)
          }
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default BurgerMenu;