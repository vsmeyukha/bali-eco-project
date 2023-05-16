import { ReactElement, Fragment, FormEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import LanguageChoice from "./LanguageChoice";
import useViewportWidth from '../../../hooks/calculateWidth';
import RegistrationLayout from "./RegistrationLayout";
import SignInLayout from "./SignInLayout";
import SwitchPopups from "./SwitchPopups";
import SwitchAndLangsContainer from './SwitchAndLangsContainer';
import { regPopup, signInPopup } from '../../../utils/consts';

interface PopupProps {
  open: boolean,
  onClose: () => void,
  isRegPopup: boolean,
  openRegPopup: () => void,
  openSignInPopup: () => void,
}

//? есть стейт изОпен на странице. также на странице есть стейт - открываем попап регистрации или сайн ин. и дальше внутри попапа в зависимости от второго стейта отрисовываем то или иное наполнение. Например, два объекта, для регистрации и сайнИна. 

const SidePopup: React.FC<PopupProps> = ({ open, onClose, isRegPopup, openRegPopup, openSignInPopup }: PopupProps): ReactElement => {
  const viewportWidth = useViewportWidth();

  const getContentWidth = (viewportWidth: number) => {
    if (viewportWidth >= 1536) return 1536;
    if (viewportWidth >= 1440) return 1440;
    if (viewportWidth >= 1280) return 1280;
    if (viewportWidth >= 1024) return 1024;
    if (viewportWidth >= 768) return 768;
    if (viewportWidth >= 640) return 640;
    return viewportWidth;
  }
  
  const maxPageWidth = getContentWidth(viewportWidth);

  const leftOffset = Math.max((viewportWidth - maxPageWidth) / 2, 0);

  const whichPopup = isRegPopup ? regPopup : signInPopup;

  const handleSwitchPopups = isRegPopup ? openSignInPopup : openRegPopup;

  return (
    <div className="relative">
      <Transition
      show={open}
      enter="transform transition duration-500 ease-in-out"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      >
        <Dialog onClose={onClose} as={Fragment}>
          <Dialog.Panel style={{ left: `${leftOffset}px` }} className='bg-white h-screen md:w-[653px] sm:w-[640px] w-full sm:pl-[65px] sm:pr-[33px] px-0 pt-[43px] absolute top-0 z-50 flex flex-col sm:items-start items-center slide-in overflow-auto'>
            <SwitchAndLangsContainer >
              <SwitchPopups whichPopup={whichPopup} handleSwitchPopups={handleSwitchPopups} />
              <LanguageChoice />
            </SwitchAndLangsContainer>
            <Dialog.Title className="mt-[80px] font-oceanic-bold text-[40px] leading-[48px] text-[#00265F]">{whichPopup.title}</Dialog.Title>
            {isRegPopup
              ?
              <RegistrationLayout onClose={onClose} whichPopup={whichPopup} />
              :
              <SignInLayout onClose={onClose} whichPopup={whichPopup} />
              }
            {isRegPopup && <p className="font-montserrat text-[10px] leading-[12px] text-[#00265F] text-opacity-40 mt-[40px] mb-[16px]">Регистрируясь, вы принимаете условия соглашения</p>}
          </Dialog.Panel>
        </Dialog>
      </Transition>
      </div>
  )
}

export default SidePopup;