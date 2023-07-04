import { ReactElement, useState, useRef } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import AvatarButton from "./AvatarButton";

import Manatee from '../../../public/images/backgrounds/manatee.png';
import Camera from '../../../public/images/svgs/icons/camera.svg';
import TrashBin from '../../../public/images/svgs/icons/trashbin.svg';
import Profile from '../../../public/images/svgs/icons/profile.svg';


const AvatarBlock: React.FC = (): ReactElement => {
  const { t } = useTranslation('profile');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avaUrl, setAvaUrl] = useState<string | null>(null);

  const handleFileUpload = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvaUrl(imageUrl);
    }
  };

  const handleDeleteAvatar = () => {
    if (avaUrl) {
      URL.revokeObjectURL(avaUrl);
      setAvaUrl(null);
    }
  }

  return (
    <div className="flex justify-center items-center mt-[20px]">
      <input
        type="file"
        name="photo"
        accept=".jpg, .jpeg, .png, .webp"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <AvatarButton icon={<Camera />} text={avaUrl ? t('changePhoto') : t('addPhoto')} onClick={handleFileUpload} />
      <div className="w-[154px] h-[154px] bg-[#00265F] bg-opacity-10 relative rounded-full overflow-hidden mx-[133px] flex items-center justify-center">
        {/* <Image
          src={Manatee}
          alt="manatee"
          fill={true}
          objectFit="cover"
          objectPosition="center"
          className="rounded-full"
        /> */}
        {avaUrl ? <img src={avaUrl} alt="ava" /> : <Profile className="text-[#00265F] h-[70px] w-[70px]" />}
      </div>
      <AvatarButton icon={<TrashBin />} text={t('deletePhoto')} onClick={handleDeleteAvatar} />
    </div>
  );
}

export default AvatarBlock;