import { FormEvent, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { logIn } from '../utils/consts';
import Cross from "../../public/images/svgs/cross.svg";
import Apple from "../../public/images/svgs/icons/apple.svg";
import Fb from "../../public/images/svgs/icons/fb.svg";
import Google from "../../public/images/svgs/icons/google.svg";
import Yandex from "../../public/images/svgs/icons/yandex.svg";
import PopupContext from "@/contexts/PopupContext";

// ? надо сделать попап-болванку, в который пробрасывается чилдреном любая разметка, его наполняющая

const Popup: React.FunctionComponent = () => {
  const { isPopupOpen, handlePopupClose } = useContext(PopupContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handlePopupClose();
  }

  return (
      <Dialog open={isPopupOpen} onClose={handlePopupClose} className="relative z-50">
        <Dialog.Backdrop className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-[12px] w-full max-w-sm pt-[20px] pl-[30px] pr-[30px] pb-[15px] flex flex-col">
            <div className="flex flex-row-reverse">
              <Cross onClick={handlePopupClose} className="opacity-30 outline-none hover:scale-110 transition-transform duration-200"/>
            </div>
            <Dialog.Title className="font-roboto-black text-[32px]">Войти</Dialog.Title>
            <Dialog.Description className="font-roboto-thin">Чтобы войти, введите почту и пароль</Dialog.Description>
            <form onSubmit={handleSubmit} className="min-w-100 font-roboto-thin flex flex-col items-center mt-[12px]">
              <input type="text" placeholder="email" className="w-full border-b border-solid border-[#4CAF50] outline-none focus:ring-2 focus:ring-[#4CAF50] focus:ring-opacity-50"></input>
              <input type="text" placeholder="password" className="w-full mt-[20px] border-b border-solid border-[#4CAF50] outline-none focus:ring-2 focus:ring-[#4CAF50] focus:ring-opacity-50"></input>
              <button
                type="submit"
                className="
                  h-[50px]
                  w-[180px]
                bg-[#4CAF50]
                  rounded-[12px]
                text-white
                  text-[16px]
                  leading-[20px]
                hover:bg-[#8BC34A]
                  transition-all 
                  duration-300 
                  ease-in-out
                  m-0
                  mt-[16px]"
            >
              {logIn.ru}
            </button>
            </form>
            <p className="font-roboto-medium text-[16px] mt-[16px] text-gray-500">Или через соцсети:</p>
            <div className="flex flex-row justify-center mt-[16px]">
              <Apple className="opacity-80 hover:scale-110 transition-transform duration-200" />
              <Yandex className="ml-[30px] opacity-80 hover:scale-110 transition-transform duration-200" />
              <Google className="ml-[30px] opacity-80 hover:scale-110 transition-transform duration-200" />
              <Fb className="ml-[30px] opacity-80 hover:scale-110 transition-transform duration-200" style={{ fill: "green" }} />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
  );
}

export default Popup;