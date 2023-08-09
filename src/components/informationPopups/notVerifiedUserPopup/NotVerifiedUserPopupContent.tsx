import { ReactElement, Dispatch, SetStateAction } from "react";
import { Dialog } from "@headlessui/react";

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
      <Dialog.Title
        className="font-montserrat-bold text-[#0D87FF] text-[20px] leading-[24px] mx-[8px]"
      >
        Нет доступа
      </Dialog.Title>
      <Dialog.Description
        className="font-montserrat text-[#0D87FF] mt-[16px] mx-[8px]"
      >
        Вы зарегистрировались, но не подтвердили свою почту. Пройдите по ссылке в отправленном вам письме (возможно, оно попало в спам), и возможность добавлять посты на карту разблокируется
      </Dialog.Description>
    </>
  )
}

export default NotVerifiedUserPopupContent;