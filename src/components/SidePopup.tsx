import { ReactElement, Fragment, FormEvent, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useViewportWidth from '../hooks/calculateWidth';

interface PopupProps {
  open: boolean,
  onClose: () => void,
  children: ReactNode,
}

//? есть стейт изОпен на странице. также на странице есть стейт - открываем попап регистрации или сайн ин. и дальше внутри попапа в зависимости от второго стейта отрисовываем то или иное наполнение. Например, два объекта, для регистрации и сайнИна. 

const SidePopup: React.FC<PopupProps> = ({ open, onClose, children }: PopupProps): ReactElement => {
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

  return (
    <div className="relative">
      <Transition
        as={Fragment}
        show={open}
        enter="transform transition duration-500 ease-in-out"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
      >
        <Dialog onClose={onClose} as={Fragment}>
          <Dialog.Panel
            className='
            bg-white
            h-screen
            md:w-[653px]
            sm:w-[640px]
            w-full
            sm:px-[65px]
            px-[32px]
            pt-[43px]
            pb-[65px]
            fixed
            top-0
            z-50
            flex
            flex-col
            sm:items-start
            items-center
            slide-in
            overflow-auto'
            style={{ left: `${leftOffset}px` }}
          >
            {children}
          </Dialog.Panel>
        </Dialog>
      </Transition>
      </div>
  )
}

export default SidePopup;