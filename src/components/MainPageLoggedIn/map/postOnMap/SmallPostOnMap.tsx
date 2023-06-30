import { Fragment, ReactElement, useRef } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import { smallPostOnMapInfo } from "@/utils/consts";

import { CoordsConvertedToPixels } from '../GoogleMaps';

import { usePopper } from "react-popper";

import Jungle from '../../../../../public/images/backgrounds/jungle.png';

import { IMarker } from "@/pages/map";

import GeoTag from '../../../../../public/images/svgs/icons/geotag.svg';
import Quotation from '../../../../../public/images/svgs/icons/quotation.svg';
import Dialog from '../../../../../public/images/svgs/icons/dialog.svg';
import Dirt from '../../../../../public/images/svgs/icons/dirt.svg';

// interface smallPostProps {
//   position?: CoordsConvertedToPixels,
//   isPostOnMapOpen: boolean,
//   onClick: () => void,
//   activeMarker: IMarker | null,
// }

interface smallPostProps {
  onClick: () => void,
  activePointerMarker: IMarker | null,
}

const SmallPostOnMap: React.FC<smallPostProps> = ({ onClick, activePointerMarker }): ReactElement => {
  const defaultPosition: CoordsConvertedToPixels = { x: 0, y: 0 };
  const currentPosition = activePointerMarker?.coordsToPixels || defaultPosition;

  const calculatedXPosition = currentPosition.x < 390 ? currentPosition.x + 15 : currentPosition.x - 390;

  return (
    <Transition
      as={Fragment}
      show={Boolean(activePointerMarker)}
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
          hover:cursor-pointer
        `}
        style={{
          left: `${calculatedXPosition}px`,
          top: `${currentPosition.y - 235}px`,
        }}
        onClick={onClick}
      >
        <div className="col-span-4 relative">
          <Image src={activePointerMarker?.imageUrl as string || Jungle} fill alt="jungle" className="object-cover object-center rounded-tl-[10px] rounded-bl-[10px]" />
        </div>
        {/* <ul className="col-span-6 space-y-[12px] flex flex-col justify-center">
          {smallPostOnMapInfo.map((paragraph) => {
            const Icon = paragraph.icon;
            return (
              <li key={paragraph.id} className="flex flex-row mx-[16px] items-center">
                <Icon />
                <p className="ml-[8px] font-montserrat font-normal text-[14px] leading-[17px] text-[#00265F] max-w-[163px] line-clamp-2">{paragraph.text}</p>
              </li>
            )
          })}
        </ul> */}
        <ul className="col-span-6 space-y-[12px] flex flex-col justify-center">
          <li className="flex flex-row mx-[16px] items-center">
            <GeoTag />
            <p className="ml-[8px] font-montserrat font-normal text-[14px] leading-[17px] text-[#00265F] max-w-[163px] line-clamp-2">
              {activePointerMarker?.coordinates.lat || 'Не удалось загрузить координаты'}
            </p>
          </li>
          <li className="flex flex-row mx-[16px] items-center">
            <Quotation />
            <p className="ml-[8px] font-montserrat font-normal text-[14px] leading-[17px] text-[#00265F] max-w-[163px] line-clamp-2">
              {activePointerMarker?.title || 'Не удалось загрузить заголовок'}
            </p>
          </li>
          <li className="flex flex-row mx-[16px] items-center">
            <Dialog />
            <p className="ml-[8px] font-montserrat font-normal text-[14px] leading-[17px] text-[#00265F] max-w-[163px] line-clamp-2">
              Комментарии (2)
            </p>
          </li>
          <li className="flex flex-row mx-[16px] items-center">
            <Dirt />
            <p className="ml-[8px] font-montserrat font-normal text-[14px] leading-[17px] text-[#00265F] max-w-[163px] line-clamp-2">
              Отметки Грязно (1)
            </p>
          </li>
          {/* {smallPostOnMapInfo.map((paragraph) => {
            const Icon = paragraph.icon;
            return (
              <li key={paragraph.id} className="flex flex-row mx-[16px] items-center">
                <Icon />
                <p className="ml-[8px] font-montserrat font-normal text-[14px] leading-[17px] text-[#00265F] max-w-[163px] line-clamp-2">{paragraph.text}</p>
              </li>
            )
          })} */}
        </ul>
      </div>
    </Transition>
  );
}



// const SmallPostOnMap: React.FC<smallPostProps> = ({ position, isPostOnMapOpen, onClick }): ReactElement => {
//   const defaultPosition: CoordsConvertedToPixels = { x: 0, y: 0 };
//   const currentPosition = position || defaultPosition;

//   const calculatedXPosition = currentPosition.x < 390 ? currentPosition.x + 15 : currentPosition.x - 390;

//   return (
//     <Transition
//       as={Fragment}
//       show={isPostOnMapOpen}
//       enter="transition-opacity duration-300"
//       enterFrom="opacity-0"
//       enterTo="opacity-100"
//       leave="transition-opacity duration-300"
//       leaveFrom="opacity-100"
//       leaveTo="opacity-0"
//     >
//       <div
//         className={`
//           w-[372px]
//           h-[190px]
//           grid
//           grid-cols-10
//           grid-rows-1
//           rounded-[10px]
//           bg-white
//           z-10
//           absolute
//         `}
//         style={{
//           left: `${calculatedXPosition}px`,
//           top: `${currentPosition.y - 235}px`,
//         }}
//         onClick={onClick}
//       >
//         <div className="col-span-4 relative">
//           <Image src={Jungle} fill alt="jungle" className="object-cover object-center rounded-tl-[10px] rounded-bl-[10px]" />
//         </div>
//         <ul className="col-span-6 space-y-[12px] flex flex-col justify-center">
//           {smallPostOnMapInfo.map((paragraph) => {
//             const Icon = paragraph.icon;
//             return (
//               <li key={paragraph.id} className="flex flex-row mx-[16px] items-center">
//                 <Icon />
//                 <p className="ml-[8px] font-montserrat font-normal text-[14px] leading-[17px] text-[#00265F] max-w-[163px] line-clamp-2">{paragraph.text}</p>
//               </li>
//             )
//           })}
//         </ul>
//       </div>
//     </Transition>
//   );
// }

// interface smallPostProps {
//   reference: any,
//   isPostOnMapOpen: boolean,
//   onClick: () => void,
// }

// const SmallPostOnMap: React.FC<smallPostProps> = ({ reference, isPostOnMapOpen, onClick }): ReactElement => {
//   const popupRef = useRef<HTMLDivElement>(null);

//   const { styles, attributes } = usePopper(reference, popupRef.current, {
//     placement: 'auto',
//   });

//   const defaultPosition: CoordsConvertedToPixels = { x: 0, y: 0 };
//   const currentPosition = position || defaultPosition;

//   const calculatedXPosition = currentPosition.x < 390 ? currentPosition.x + 15 : currentPosition.x - 390;

//   return (
//     <Transition
//       as={Fragment}
//       show={isPostOnMapOpen}
//       enter="transition-opacity duration-300"
//       enterFrom="opacity-0"
//       enterTo="opacity-100"
//       leave="transition-opacity duration-300"
//       leaveFrom="opacity-100"
//       leaveTo="opacity-0"
//     >
//       <div
//         ref={popupRef}
//         className={`
//           w-[372px]
//           h-[190px]
//           grid
//           grid-cols-10
//           grid-rows-1
//           rounded-[10px]
//           bg-white
//           z-10
//           absolute
//         `}
//         style={styles.popper}
//         {...attributes.popper}
//         onClick={onClick}
//       >
//         <div className="col-span-4 relative">
//           <Image src={Jungle} fill alt="jungle" className="object-cover object-center rounded-tl-[10px] rounded-bl-[10px]" />
//         </div>
//         <ul className="col-span-6 space-y-[12px] flex flex-col justify-center">
//           {smallPostOnMapInfo.map((paragraph) => {
//             const Icon = paragraph.icon;
//             return (
//               <li key={paragraph.id} className="flex flex-row mx-[16px] items-center">
//                 <Icon />
//                 <p className="ml-[8px] font-montserrat font-normal text-[14px] leading-[17px] text-[#00265F] max-w-[163px] line-clamp-2">{paragraph.text}</p>
//               </li>
//             )
//           })}
//         </ul>
//       </div>
//     </Transition>
//   );
// }

export default SmallPostOnMap;