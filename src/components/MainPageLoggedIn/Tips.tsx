import { ReactElement } from "react";
import { useTranslation } from "next-i18next";

import TipsButton from "@/components/TipsButton";
import useViewportWidth from "@/hooks/calculateWidth";

const Tips: React.FC = (): ReactElement => {
  const viewportWidth = useViewportWidth();

  const { t } = useTranslation('mapPage');

  return (
    <div
      style={viewportWidth < 1024 ? {backgroundColor: '#0D87FF'} : {}}
      className="
      lg:min-h-[1000px]
      lg:bg-tips-blue-wave
      flex
      flex-col
      xl:px-[152px]
      lg:px-[120px]
      md:px-[80px]
      sm:px-[40px]
      px-[20px]
      lg:pt-[138px]
      pt-[40px]"
    >
      <h2 className="font-oceanic-bold text-[32px] leading-[38px] text-white">{ t('recommendationTitle') }</h2>
      <div className="flex flex-col items-center lg:my-[32px] my-[32px]">
        <h3
          className="
          font-oceanic-bold
          lg:text-[20px]
          leading-[26px]
          text-[16px]
          text-white
          max-w-[352px]
          text-center
          lg:mb-[102px]
          md:mb-[40px]
          sm:mb-[30px]
          mb-[20px]"
        >
          { t('recommendationDesc') }
        </h3>
        <TipsButton />
      </div>
    </div>
  );
}

export default Tips;