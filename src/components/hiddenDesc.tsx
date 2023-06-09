import { ReactElement, useState, MouseEvent, useEffect, memo } from "react";
import { Transition } from "@headlessui/react";
import { useTranslation } from 'next-i18next';

import { projectDescription, projectDescriptionContinue } from "@/utils/consts";
import DownArrow from "../../public/images/svgs/down-arrow.svg";
import UpArrow from "../../public/images/svgs/up-arrow.svg";

export default function HiddenDesc(): ReactElement {
  const [visible, setVisible] = useState<boolean>(false);

  const handleVisible = (): void => {
    setVisible((prevState) => !prevState);
  };

  const { t } = useTranslation('mainPageNotLoggedIn');

  return (
    <div
      className="
        sm:max-w-[589px]
        text-white
        font-montserrat
        font-light
        text-[22px]
        leading-[26px]
        text-center
        sm:text-left
        sm:mt-[42px]
        mt-[20px]
      "
    >
      <p className="pb-[16px]">{t('projectDescription')}</p>
      <div
        className="relative flex flex-col items-center"
        style={{ minHeight: visible ? '300px' : '0px', transition: 'min-height 300ms ease' }}
      >
        <button type="button" onClick={handleVisible}>
          {!visible && <DownArrow width="24" height="24" />}
        </button>
        <Transition
          show={visible}
          enter="transition-opacity ease-linear duration-300 absolute w-full"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          className="flex flex-col items-center"
        >
          <div className="overflow-hidden pb-[16px]">
            <p>{t('projectDescriptionExtended')}</p>
          </div>
          <button type="button" onClick={handleVisible}>
            {visible && <UpArrow width="24" height="24" />}
          </button>
        </Transition>
      </div>
    </div>
  );
}