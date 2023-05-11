import { Fragment, ReactElement } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import { smallPostOnMapInfo } from "@/utils/consts";

import { CoordsConvertedToPixels } from '../GoogleMaps';

import Jungle from '../../../../../public/images/backgrounds/jungle.png';

interface smallPostProps {
  position?: CoordsConvertedToPixels,
  isPostOnMapOpen: boolean,
  onClick: () => void,
}

const SmallPostOnMap: React.FC<smallPostProps> = ({ position, isPostOnMapOpen, onClick }): ReactElement => {
  const defaultPosition: CoordsConvertedToPixels = { x: 0, y: 0 };
  const currentPosition = position || defaultPosition;

  return (
    <Transition
      as={Fragment}
      show={isPostOnMapOpen}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`
          w-[372px]
          h-[190px]
          grid
          grid-cols-10
          grid-rows-1
          rounded-[10px]
          bg-white
          z-10
          absolute
        `}
        style={{
          left: `${currentPosition.x - 390}px`,
          top: `${currentPosition.y - 235}px`,
        }}
        onClick={onClick}
      >
        <div className="col-span-4 relative">
          <Image src={Jungle} fill alt="jungle" className="object-cover object-center rounded-tl-[10px] rounded-bl-[10px]" />
        </div>
        <ul className="col-span-6 space-y-[12px] flex flex-col justify-center">
          {smallPostOnMapInfo.map((paragraph) => {
            const Icon = paragraph.icon;
            return (
              <li key={paragraph.id} className="flex flex-row mx-[16px] items-center">
                <Icon />
                <p className="ml-[8px] font-montserrat font-normal text-[14px] leading-[17px] text-[#00265F] max-w-[163px] line-clamp-2">{paragraph.text}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </Transition>
  );
}

export default SmallPostOnMap;