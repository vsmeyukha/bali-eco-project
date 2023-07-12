import { Dispatch, FormEvent, ReactElement, SetStateAction, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { logIn } from '../utils/consts';
import Cross from "../../public/images/svgs/cross.svg";
import Apple from "../../public/images/svgs/icons/apple.svg";
import Fb from "../../public/images/svgs/icons/fb.svg";
import Google from "../../public/images/svgs/icons/google.svg";
import Yandex from "../../public/images/svgs/icons/yandex.svg";
import PopupContext from "@/contexts/PopupContext";

interface PopupProps {
  notVerifiedPopupOpen: boolean,
  setNotVerifiedPopupOpen: Dispatch<SetStateAction<boolean>>
}

const Popup: React.FunctionComponent<PopupProps> = ({notVerifiedPopupOpen, setNotVerifiedPopupOpen}): ReactElement => {

  return (
      <Dialog open={notVerifiedPopupOpen} onClose={() => setNotVerifiedPopupOpen(false)} className="relative z-50">
        <Dialog.Backdrop className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-[12px] w-full max-w-sm pt-[20px] pl-[30px] pr-[30px] pb-[15px] flex flex-col">
            <div className="flex flex-row-reverse">
              <Cross onClick={() => setNotVerifiedPopupOpen(false)} className="opacity-30 outline-none hover:scale-110 transition-transform duration-200"/>
            </div>
            <Dialog.Title className="font-montserrat-bold text-[#4CAF50] text-[32px]">Нет доступа</Dialog.Title>
            <Dialog.Description className="font-montserrat">Вы зарегистрировались, но не подтвердили свою почту. Пройдите по ссылке в отправленном вам письме (возможно, оно попало в спам), и возможность добавлять посты на карту разблокируется</Dialog.Description>
          </Dialog.Panel>
        </div>
      </Dialog>
  );
}

export default Popup;