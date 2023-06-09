import { ReactElement } from "react";
import { useTranslation } from 'next-i18next';

const OrBlock: React.FC = (): ReactElement => {
  const { t } = useTranslation('registerPopup');

  return (
    <div className="flex flex-row items-center w-full mt-[40px]">
      <div className="border-b border-1 border-[#00265F] border-opacity-10 w-full" />
      <p className="font-montserrat text-[10px] leading-[12px] text-[#00265F] mx-[12px]">{ t('or')}</p>
      <div className="border-b border-1 border-[#00265F] border-opacity-10 w-full" />
    </div>
  );
}

export default OrBlock;