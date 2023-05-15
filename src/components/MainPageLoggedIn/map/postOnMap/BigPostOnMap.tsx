import { ForwardedRef, ReactElement, forwardRef, Fragment, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import DirtButton from "./DirtButton";

import Jungle from '../../../../../public/images/backgrounds/jungle.png';
import Manatee from '../../../../../public/images/backgrounds/manatee.png';
import SadSmile from '../../../../../public/images/svgs/icons/sadsmile.svg';
import CheerfulSmile from '../../../../../public/images/svgs/icons/cheerfulsmile.svg';
import ShareArrow from '../../../../../public/images/svgs/icons/shareArrow.svg';
import CopyIcon from '../../../../../public/images/svgs/icons/copyIcon.svg';

const BigPostOnMap = forwardRef<HTMLDivElement, {isBigPopupOpen: boolean}>((props, ref: ForwardedRef<HTMLDivElement>): ReactElement => {
  const [heightForPositioning, setHeightForPositioning] = useState<number>(0);

  useEffect(() => {
    setHeightForPositioning(window.innerHeight / 2);
  }, []);

  return (
    <Transition
    as={Fragment}
    show={props.isBigPopupOpen}
    enter="transition-opacity duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-300"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div className="
      absolute
      left-1/2
      transform
      -translate-x-1/2
      w-4/5
      mx-auto
      grid
      grid-cols-2
      bg-white
      rounded-[10px]
      z-50"
      style={{ top: `${heightForPositioning}px` }}
      ref={ref}
    >
      <div className="relative ml-[32px] flex items-center">
        <Image src={Jungle} alt="Jungle" className="object-center object-contain rounded-[10px]" />
      </div>
      <div className="pl-[24px] pr-[42px] pt-[32px] text-[#00265F] flex flex-col">
        <div className="flex flex-row justify-between">
          <h3 className="text-[18px] leading-[22px] font-montserrat-bold">Крутая терраса</h3>
          <button>
            <CopyIcon />
          </button>
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
        <p className="font-montserrat text-[16px] leading-[19.5px] mt-[8px] mb-[16px]">Место отличное! Красиво, уютно, птички поют, Можно покормить обезьянок. Советую всем)</p>
        <div className="bg-[#F5F5F5] rounded-[10px] w-full flex flex-col">
          <p className="font-montserrat-bold text-[14px] leading-[17px] ml-[12px] mt-[12px]">Оцените место</p>
          <div className="w-full border-[#00265F] border-opacity-10 border-[0.5px] mt-[12px]"></div>
          <p className="font-montserrat text-[14px] leading-[17px] ml-[12px] mt-[8px]">Грязно?</p>
          <div className="flex flex-row justify-center w-full mt-[6px] mb-[15px] space-x-[14px]">
            <DirtButton smile={<SadSmile />} text="Да" />
            <DirtButton smile={<CheerfulSmile />} text="Нет" />
          </div>
        </div>
        <h4 className="font-montserrat font-semibold text-[14px] leading-[17px] my-[16px]">Комментарии (2)</h4>
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
          <p className="font-montserrat font-semibold text-[16px] leading-[19.5px] ml-[8px]">Добавьте комментарий...</p>
        </div>
      </div>
      </div>
      </ Transition>
  )
});

BigPostOnMap.displayName = 'BigPostOnMap';

export default BigPostOnMap;