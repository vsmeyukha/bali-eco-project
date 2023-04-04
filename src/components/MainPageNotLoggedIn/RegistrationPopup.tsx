import { ReactElement, Fragment, FormEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import LanguageChoice from "./LanguageChoice";
import RegistrationForm from "./RegistrationForm";
import Apple from '../../../public/images/svgs/icons/apple.svg';
import Google from '../../../public/images/svgs/icons/google.svg';
import { buttonStyles } from "@/utils/styles";

interface PopupProps {
  open: boolean,
  onClose: () => void,
}

const RegistrationPopup: React.FC<PopupProps> = ({ open, onClose }: PopupProps): ReactElement => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onClose();
  }

  return (
    <Transition
    show={open}
    enter="transform transition duration-500 ease-in-out"
    enterFrom="-translate-x-full"
    enterTo="translate-x-0"
    >
      <Dialog onClose={onClose} as={Fragment}>
        <Dialog.Panel className='bg-white h-screen w-[653px] pl-[65px] pr-[33px] pt-[43px] absolute left-0 top-0 z-50 flex flex-col slide-in'>
          <div className='flex flex-row justify-between w-full font-montserrat text-[14px] leading-[17px] relative'>
            <div className='flex flex-row'>
              <p className="text-[#00265F]">Уже зарегистрированы?</p>
              <p className="text-[#0D87FF] ml-[16px]"><a>Войти</a></p>
            </div>
            <LanguageChoice />
          </div>
          <Dialog.Title className="mt-[80px] font-oceanic-bold text-[40px] leading-[48px] text-[#00265F]">Регистрация</Dialog.Title>
          <RegistrationForm onRegButtonClick={handleSubmit} />
          <div className="flex flex-row items-center w-[440px] mt-[40px]">
            <div className="border-b border-1 border-[#00265F] border-opacity-10 w-full"></div>
            <p className="font-montserrat text-[10px] leading-[12px] text-[#00265F] mx-[12px]">или</p>
            <div className="border-b border-1 border-[#00265F] border-opacity-10 w-full"></div>
          </div>
          <div className="mt-[24px]">
            <button className={buttonStyles}>
              <Apple style={{ fill: "#00265F" }} className="h-[20px] w-[17px]" />
              <p className="ml-[10px]">Зарегистрироваться с Apple</p>
            </button>
            <button className={buttonStyles}>
              <Google style={{ fill: "#00265F" }} className="h-[21px] w-[21px]" />
              <p className="ml-[10px]">Зарегистрироваться с Google</p>
            </button>
          </div>
          <p className="font-montserrat text-[10px] leading-[12px] text-[#00265F] text-opacity-40 mt-[40px]">Регистрируясь, вы принимаете условия соглашения</p>
        </Dialog.Panel>
        </Dialog>
      </Transition>
  )
}

export default RegistrationPopup;