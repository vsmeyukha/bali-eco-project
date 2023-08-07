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
        <Cross onClick={() => onClose(false)} className="outline-none hover:scale-110 transition-transform duration-200"/>
      </button>
      <Dialog.Title className="font-montserrat-bold text-[#4CAF50] text-[32px]">Нет доступа</Dialog.Title>
      <Dialog.Description className="font-montserrat">Вы зарегистрировались, но не подтвердили свою почту. Пройдите по ссылке в отправленном вам письме (возможно, оно попало в спам), и возможность добавлять посты на карту разблокируется</Dialog.Description>
    </>
  )
}

export default NotVerifiedUserPopupContent;