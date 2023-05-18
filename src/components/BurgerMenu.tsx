import { ReactElement, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { navListForBurgerRu } from "@/utils/consts";
import BurgerMenuIcon from '../../public/images/svgs/icons/burgerMenu.svg';
import ProfileIcon from '../../public/images/svgs/icons/profile.svg';
import Manatee from '../../public/images/backgrounds/manatee.png';

interface BurgerMenuProps {
  onSignInClick: () => void,
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({onSignInClick}): ReactElement => {
  const router = useRouter();

  const currentPage = router.pathname;

  const handleSignInButtonClick = (close: () => void): void => {
    close();
    onSignInClick();
  }

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
        <Menu.Items className="bg-white absolute top-[50px] transform -translate-x-full rounded-[10px] pl-[19px] pt-[27px] w-[235px] focus:outline-none space-y-[16px]">
          {navListForBurgerRu.map(paragraph => {
            const Icon = paragraph.icon;
            return (
              <Menu.Item key={paragraph.id}>
                <Link href={paragraph.link} className="flex flex-row items-center group">
                  <Icon className="text-[#00265F] group-hover:text-[#0D87FF] transition-colors duration-200" />
                  <p className="ml-[10px] font-montserrat font-normal text-[18px] leading-[22px] text-[#00265F] hover:text-[#0D87FF] transition-colors duration-200 group-hover:text-[#0D87FF]">{paragraph.title}</p>
                </Link>
              </Menu.Item>
            )
          })
          }
          <div className="w-[203px] border-b border-[#00265F] border-b-1/2 border-opacity-10" />
          <Menu.Item as={Fragment}>
            {({ close }) => (
              currentPage === '/'
              ?
              <button onClick={() => handleSignInButtonClick(close)} className="text-[#00265F] flex flex-row pb-[25px] group">
                <ProfileIcon className="fill-current w-[20px] h-[20px] group-hover:text-[#0D87FF] transition-colors duration-200" />
                <p className="ml-[10px] font-montserrat font-normal text-[18px] leading-[22px] group-hover:text-[#0D87FF] transition-colors duration-200">Войти</p>
              </button>
              :
              <Link href='/profile' className="text-[#00265F] flex flex-row items-center pb-[25px] group">
                <div className="w-[20px] h-[20px] rounded-full relative overflow-hidden">
                  <Image src={Manatee} alt='manatee' fill className="object-cover object-center" />
                </div>
                <p className="ml-[10px] font-montserrat font-normal text-[18px] leading-[22px] group-hover:text-[#0D87FF] transition-colors duration-200">Имя Фамилия</p>
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default BurgerMenu;