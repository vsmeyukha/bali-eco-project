import { ReactElement, Dispatch, SetStateAction } from "react";
import { Dialog } from "@headlessui/react";

import DirtButton from "@/components/MainPageLoggedIn/map/postOnMap/DirtButton";

import Cross from "../../../../public/images/svgs/cross.svg";

interface NotVerifiedUserPopupContentProps {
  onClose: Dispatch<SetStateAction<boolean>>,
}

const NotVerifiedUserPopupContent: React.FC<NotVerifiedUserPopupContentProps> = ({onClose}): ReactElement => {
  return (
    <>
      <button className="flex flex-row-reverse">
        <Cross
          onClick={() => onClose(false)}
          className="outline-none hover:scale-110 transition-transform duration-200 text-[#0D87FF]"
        />
      </button>
      <div className="flex flex-col items-center">
        <Dialog.Title
          className="font-montserrat-bold text-[#0D87FF] text-[20px] leading-[24px] mx-[8px] text-center"
        >
          Нет доступа
        </Dialog.Title>
        <Dialog.Description
          className="font-montserrat text-[#0D87FF] mt-[24px] mx-[8px] mb-[24px] text-center"
        >
          Вы зарегистрировались, но не подтвердили свою почту. Пройдите по ссылке в отправленном вам письме (возможно, оно попало в спам), и возможность добавлять посты на карту разблокируется.
        </Dialog.Description>
        <DirtButton text="OK" textColor="text-[#0D87FF]" fontWeight="font-semibold" onClick={() => onClose(false)} />
      </div>
    </>
  )
}

export default NotVerifiedUserPopupContent;