import { ReactElement, Dispatch, SetStateAction } from "react";
import { useTranslation } from "next-i18next";

import MediumLoader from "@/components/loaders/MediumLoader";

import ErrorTriangle from '../../../../../public/images/svgs/icons/errorTriangle.svg';

import { photoStatus, IPost } from "@/pages/map";

interface ImageBlockProps {
  photoStatus: photoStatus,
  setPhotoStatus: Dispatch<SetStateAction<photoStatus>>,
  activePost: IPost | null
}

const ImageBlock: React.FC<ImageBlockProps> = ({ photoStatus, setPhotoStatus, activePost }): ReactElement => {
  const { t } = useTranslation('bigPostPopup');

  const handleImageLoadingSuccess = (): void => {
    setPhotoStatus('success');
  }

  const handleImageLoadigError = (): void => {
    setPhotoStatus('error');
  }

  return (
    <div
      className="relative lg:ml-[32px] lg:mr-0 lg:mt-0 mx-[12px] mt-[12px] flex items-center justify-center rounded-[10px] py-[20px]"
    >
      <img
        src={activePost?.imageUrl}
        alt="Jungle"
        className={
          `w-full 
        object-center
        lg:object-contain
        object-cover
        rounded-[10px]
        ${photoStatus !== 'success' && 'hidden'}`
        }
        onLoad={handleImageLoadingSuccess}
        onError={handleImageLoadigError}
      />
      {photoStatus === 'loading' && <MediumLoader />}
      {
        photoStatus === 'error'
        &&
        <div className="flex flex-col items-center justify-center text-[#00265F] font-montserrat">
          <ErrorTriangle className="h-[100px] w-[100px]" />
            <p className="text-[18px] leading-[24px] mt-[12px] w-3/4 text-center">{t('errorWhileLoadingPhoto')}</p>
        </div>
      }
    </div>
  );
}

export default ImageBlock;