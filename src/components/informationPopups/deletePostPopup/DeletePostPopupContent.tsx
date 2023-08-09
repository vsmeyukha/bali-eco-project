import { ReactElement, Dispatch, SetStateAction } from "react";
import { Dialog } from "@headlessui/react";

import DirtButton from "@/components/MainPageLoggedIn/map/postOnMap/DirtButton";

import Cross from "../../../../public/images/svgs/cross.svg";

import { deletePost } from "@/firebase/firestore";

import { IPost, IMarker } from "@/pages/map";

interface DeletePostPopupContentProps {
  onClose: Dispatch<SetStateAction<boolean>>,
  activePost: IPost | null,
  setActivePost: Dispatch<SetStateAction<IPost | null>>,
  setCoordinates: Dispatch<SetStateAction<IMarker[]>>
}

const DeletePostPopupContent: React.FC<DeletePostPopupContentProps> = (
  {
    onClose,
    activePost,
    setActivePost,
    setCoordinates
  }
): ReactElement => {

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
        <Cross
          onClick={() => onClose(false)} className="outline-none hover:scale-110 transition-transform duration-200 text-[#0D87FF]" />
      </button>
      <Dialog.Title className="font-montserrat-bold text-[#0D87FF] text-[20px] leading-[24px] text-center">Удалить пост?</Dialog.Title>
      <div className="w-full px-[12px] mt-[36px] mb-[30px] flex flex-row justify-center items-center space-x-[21px]">
        <DirtButton text="Да" textColor="text-[#0D87FF]" fontWeight="font-semibold" onClick={deleteCurrentPost} />
        <DirtButton text="Нет" textColor="text-[#0D87FF]" fontWeight="font-semibold" onClick={() => onClose(false)} />
      </div>
    </>
  )
}

export default DeletePostPopupContent;