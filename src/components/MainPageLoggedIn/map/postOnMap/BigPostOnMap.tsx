import { ForwardedRef, ReactElement, forwardRef, Fragment, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";

import DirtButton from "./DirtButton";
import useViewportWidth from "@/hooks/calculateWidth";

import Jungle from '../../../../../public/images/backgrounds/jungle.png';
import Manatee from '../../../../../public/images/backgrounds/manatee.png';
import SadSmile from '../../../../../public/images/svgs/icons/sadsmile.svg';
import CheerfulSmile from '../../../../../public/images/svgs/icons/cheerfulsmile.svg';
import ShareArrow from '../../../../../public/images/svgs/icons/shareArrow.svg';
import CopyIcon from '../../../../../public/images/svgs/icons/copyIcon.svg';
import TrashBin from '../../../../../public/images/svgs/icons/trashbin.svg';

import { IMarker } from "@/pages/map";

interface BigPostOnMapProps {
  activeMarker: IMarker | null,
}

const BigPostOnMap = forwardRef<HTMLDivElement, BigPostOnMapProps>((props, ref: ForwardedRef<HTMLDivElement>): ReactElement => {
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

  return (
    <Transition
    as={Fragment}
    show={Boolean(props.activeMarker)}
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
      z-50
      overflow-auto"
        style={{
          top: `${heightForPositioning}px`,
          width: popupWidth,
          maxHeight: '80vh',
        }}
      ref={ref}
    >
      <div className="relative lg:ml-[32px] lg:mr-0 lg:mt-0 mx-[12px] mt-[12px] flex items-center rounded-[10px] py-[20px]">
        <img
          src={props.activeMarker?.imageUrl as string}
          alt="Jungle"
          className="w-full object-center lg:object-contain object-cover rounded-[10px]"
        />
      </div>
      <div className="pl-[24px] pr-[42px] pt-[32px] text-[#00265F] flex flex-col">
        <div className="flex flex-row justify-between">
          <h3 className="text-[18px] leading-[22px] font-montserrat-bold">{props.activeMarker?.title}</h3>
          <div className="flex flex-row">
            <button>
              <CopyIcon />
            </button>
            <button>
              <TrashBin className="ml-[16px]" />
            </button>
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
          <p className="font-montserrat font-semibold text-[16px] leading-[19.5px] ml-[8px]">Имя Фамилия</p>
        </div>
          <p className="font-montserrat text-[16px] leading-[19.5px] mt-[8px] mb-[16px]">{props.activeMarker?.comment}</p>
        <div className="bg-[#F5F5F5] rounded-[10px] w-full flex flex-col">
            <p className="font-montserrat-bold text-[14px] leading-[17px] ml-[12px] mt-[12px]">{ t('rateThePlace')}</p>
          <div className="w-full border-[#00265F] border-opacity-10 border-[0.5px] mt-[12px]"></div>
            <p className="font-montserrat text-[14px] leading-[17px] ml-[12px] mt-[8px]">{ t('isItDirty')}</p>
          <div className="flex flex-row justify-center w-full mt-[6px] mb-[15px] space-x-[14px]">
            <DirtButton smile={<SadSmile />} text={t('itIsDirty')} />
            <DirtButton smile={<CheerfulSmile />} text={t('itIsNotDirty')} />
          </div>
        </div>
          <h4 className="font-montserrat font-semibold text-[14px] leading-[17px] my-[16px]">{`${t('comments')} (2)`}</h4>
        <h3 className="font-montserrat font-semibold text-[16px] leading-[19.5px]">Имя Фамилия</h3>
        <p className="font-montserrat text-[16px] leading-[19.5px] mt-[8px] mb-[16px]">Место отличное! Красиво, уютно, птички поют, Можно покормить обезьянок. Советую всем)</p>
        <div className="flex flex-row justify-start items-center mb-[24px]">
          <Link href="/profile" className="w-[30px] h-[30px] relative rounded-full overflow-hidden">
            <Image
              src={Manatee}
              alt="manatee"
              fill
              className="rounded-full object-cover object-center"
            />
          </Link>
            <p className="font-montserrat font-semibold text-[16px] leading-[19.5px] ml-[8px]">{ t('addAComment') }</p>
        </div>
      </div>
      </div>
      </ Transition>
  )
});

BigPostOnMap.displayName = 'BigPostOnMap';

export default BigPostOnMap;