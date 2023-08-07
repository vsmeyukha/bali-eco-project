import { ReactElement, Dispatch, SetStateAction } from "react";
import { Dialog } from "@headlessui/react";

import Cross from "../../../../public/images/svgs/cross.svg";

import { deletePost } from "@/firebase/firestore";

import { IPost, IMarker } from "@/pages/map";

interface DeletePostPopupContentProps {
  onClose: Dispatch<SetStateAction<boolean>>,
  activePost: IPost | null,
  setActivePost: Dispatch<SetStateAction<IPost | null>>,
  setCoordinates: Dispatch<SetStateAction<IMarker[]>>
}

const DeletePostPopupContent: React.FC<DeletePostPopupContentProps> = ({ onClose, activePost, setActivePost, setCoordinates }): ReactElement => {
  const deleteCurrentPost = async (): Promise<void> => {
    try {
      console.log(activePost);
      await deletePost(activePost);

      setCoordinates((prevCoordinates) => {
        const newCoordinates = prevCoordinates.filter(marker => marker.id !== activePost?.id);
        return newCoordinates;
      });

      setActivePost(null);
      onClose(false);
    } catch (error: any) {
      console.log(error);
    } 
  }

  return (
    <>
      <button className="flex flex-row-reverse">
        <Cross onClick={() => onClose(false)} className="outline-none hover:scale-110 transition-transform duration-200"/>
      </button>
      <Dialog.Title className="font-montserrat-bold text-[#4CAF50] text-[32px]">Вы точно хотите удалить пост?</Dialog.Title>
      <Dialog.Description className="font-montserrat">Это действиеи нельзя отменить</Dialog.Description>
      <div className="w-full px-[12px] flex flex-row justify-center items-center">
        <button
          className="bg-[#4CAF50] text-white font-montserrat text-[32px]"
          onClick={deleteCurrentPost}
        >Да</button>
        <button
          className="bg-[#4CAF50] text-white font-montserrat text-[32px] ml-[12px]"
          onClick={() => onClose(false)}
        >Нет</button>
      </div>
    </>
  )
}

export default DeletePostPopupContent;