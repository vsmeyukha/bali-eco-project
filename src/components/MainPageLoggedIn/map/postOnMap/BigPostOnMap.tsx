import {
  ForwardedRef,
  ReactElement,
  forwardRef,
  Fragment,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  FormEvent
} from "react";

import Image from "next/image";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";

import useViewportWidth from "@/hooks/calculateWidth";

import ImageBlock from "./ImageBlock";
import DirtButton from "./DirtButton";

import { IPost, IMarker, photoStatus } from "@/pages/map";

import Manatee from '../../../../../public/images/backgrounds/manatee.png';
import SadSmile from '../../../../../public/images/svgs/icons/sadsmile.svg';
import CheerfulSmile from '../../../../../public/images/svgs/icons/cheerfulsmile.svg';
import CopyIcon from '../../../../../public/images/svgs/icons/copyIcon.svg';
import TrashBin from '../../../../../public/images/svgs/icons/trashbin.svg';
import PaperAirplane from '../../../../../public/images/svgs/icons/paperAirplane.svg';

import { auth } from "@/firebase/config";

import { addComment } from "@/firebase/firestore";

interface BigPostOnMapProps {
  activePost: IPost | null,
  setActivePost: Dispatch<SetStateAction<IPost | null>>,
  photoStatus: photoStatus,
  setPhotoStatus: Dispatch<SetStateAction<photoStatus>>,
  setMarkers: Dispatch<SetStateAction<IMarker[]>>,
  setIsDeletePostPopupOpen: Dispatch<SetStateAction<boolean>>
}

interface Comment {
  comment: string,
  owner?: string
}

const BigPostOnMap = forwardRef<HTMLDivElement, BigPostOnMapProps>(
  (
    {
      activePost,
      photoStatus,
      setPhotoStatus,
      setIsDeletePostPopupOpen
    },
    ref: ForwardedRef<HTMLDivElement>
  ): ReactElement => {
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

  const popupWidth = getContentWidth(viewportWidth) * 0.8;

  const [heightForPositioning, setHeightForPositioning] = useState<number>(0);

  useEffect(() => {
    setHeightForPositioning(window.innerHeight / 5);
  }, []);

  const { t } = useTranslation('bigPostPopup');

  const [newComment, setNewComment] = useState<Comment | null>(null);
  
  const [comments, setComments] = useState<Comment[]>([]);

  const handleAddComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activePost && auth.currentUser?.uid && newComment) {
      addComment(activePost, auth.currentUser?.uid, newComment?.comment);
     }
  }

  return (
    <Transition
    as={Fragment}
    show={Boolean(activePost)}
    enter="transition-opacity duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-300"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
    >
      <div className="
        fixed
        left-1/2
        transform
        -translate-x-1/2
        mx-auto
        lg:grid
        lg:grid-cols-2
        flexflex-col
        bg-white
        rounded-[10px]
        z-40
        overflow-auto"
          style={{
            top: `${heightForPositioning}px`,
            width: popupWidth,
            maxHeight: '80vh',
          }}
        ref={ref}
      >
        <ImageBlock
          photoStatus={photoStatus}
          setPhotoStatus={setPhotoStatus}
          activePost={activePost}
        />
        <div className="pl-[24px] pr-[42px] pt-[32px] text-[#00265F] flex flex-col">
          <div className="flex flex-row justify-between">
            <h3 className="text-[18px] leading-[22px] font-montserrat-bold">{activePost?.title}</h3>
            <div className="flex flex-row">
              <button>
                <CopyIcon />
              </button>
              {
                auth.currentUser?.uid === activePost?.owner
                &&
                <button onClick={() => setIsDeletePostPopupOpen(true)}>
                  <TrashBin className="ml-[16px]" />
                </button>
              }
            </div>
          </div>
          <div className="flex flex-row justify-start items-center mt-[12px]">
            <Link href="/profile" className="w-[30px] h-[30px] relative rounded-full overflow-hidden">
              <Image
                src={Manatee}
                alt="manatee"
                fill
                className="rounded-full object-cover object-center"
              />
            </Link>
            <p className="font-montserrat font-semibold text-[16px] leading-[19.5px] ml-[8px]">Username</p>
          </div>
            <p className="font-montserrat text-[16px] leading-[19.5px] mt-[8px] mb-[16px]">{activePost?.comment}</p>
          <div className="bg-[#F5F5F5] rounded-[10px] w-full flex flex-col">
              <p className="font-montserrat-bold text-[14px] leading-[17px] ml-[12px] mt-[12px]">{ t('rateThePlace')}</p>
            <div className="w-full border-[#00265F] border-opacity-10 border-[0.5px] mt-[12px]"></div>
              <p className="font-montserrat text-[14px] leading-[17px] ml-[12px] mt-[8px]">{ t('isItDirty')}</p>
            <div className="flex flex-row justify-center w-full mt-[6px] mb-[15px] space-x-[14px]">
              <DirtButton
                smile={<SadSmile />}
                text={t('itIsDirty')}
                onClick={() => console.log('This is the button. Actual logic will be added later)')}
              />
              <DirtButton
                smile={<CheerfulSmile />}
                text={t('itIsNotDirty')}
                onClick={() => console.log('This is the button. Actual logic will be added later)')}
              />
            </div>
          </div>
            <h4 className="font-montserrat font-semibold text-[14px] leading-[17px] my-[16px]">{`${t('comments')} (2)`}</h4>
          <h3 className="font-montserrat font-semibold text-[16px] leading-[19.5px]">Username</h3>
          <p className="font-montserrat text-[16px] leading-[19.5px] mt-[8px] mb-[16px]">This is the mock comment. Actual logic will be added later)</p>
          <div className="flex flex-row justify-start items-center mb-[24px]">
            <Link href="/profile" className="w-[30px] h-[30px] relative rounded-full overflow-hidden">
              <Image
                src={Manatee}
                alt="manatee"
                fill
                className="rounded-full object-cover object-center"
              />
            </Link>
            <form
              onSubmit={(e) => handleAddComment(e)}
              className="w-full ml-[8px] flex flex-row justify-between items-center">
              <input
                className="
                bg-[#F5F5F5]
                rounded-[12px]
                  font-montserrat
                  font-semibold
                  text-[#00265F]
                  text-[16px]
                  leading-[19.5px]
                  h-[34px]
                  pl-[8px]
                  w-full 
                  focus:outline-none"
                placeholder={t('addAComment') || 'Add a comment'}
                type="text"
                name="comment"
                value={newComment?.comment || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewComment({...newComment, comment: e.target.value})}
              />
              <button
                type="submit"
                className="
                rounded-full
                h-[24px]
                w-[24px]
                bg-[#00265F]
                mr-[8px]
                flex
                flex-row
                justify-center
                items-center
                hover:transform
                hover:scale-110
                duration-200"
              >
                <PaperAirplane className="text-white h-[16px] w-[16px]" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </ Transition>
  )
});

BigPostOnMap.displayName = 'BigPostOnMap';

export default BigPostOnMap;