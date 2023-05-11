import { ReactElement, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import SmallPostOnMap from "./SmallPostOnMap";
import BigPostOnMap from "./BigPostOnMap";

import { CoordsConvertedToPixels } from '../GoogleMaps';

interface SmallAndBigPostsProps {
  position?: CoordsConvertedToPixels,
  isPostOnMapOpen: boolean,
  isBigPostOpen: boolean,
}

const SmallAndBigPosts: React.FC<SmallAndBigPostsProps> = ({position, isPostOnMapOpen, isBigPostOpen }):ReactElement => {
  return (
    <div className="relative z-50">
      <Popover>
        <Popover.Button>
          <SmallPostOnMap position={position} isPostOnMapOpen={isPostOnMapOpen} />
        </Popover.Button>
        <Transition
        as={Fragment}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        >
          <Popover.Panel className="fixed top-0 left-0 w-4/5 mx-auto grid grid-cols-2 bg-white rounded-[10px] border border-black border-solid z-10000">
            <BigPostOnMap />
          </Popover.Panel>
        </Transition>
        </Popover>
    </div>
  );
}

export default SmallAndBigPosts;