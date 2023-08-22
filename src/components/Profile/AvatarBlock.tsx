import { ReactElement, useState, useRef } from "react";
import { useTranslation } from "next-i18next";

import AvatarButton from "./AvatarButton";

import Manatee from '../../../public/images/backgrounds/manatee.png';
import Camera from '../../../public/images/svgs/icons/camera.svg';
import TrashBin from '../../../public/images/svgs/icons/trashbin.svg';
import Profile from '../../../public/images/svgs/icons/profile.svg';

import { auth } from '../../firebase/config';

const AvatarBlock: React.FC = (): ReactElement => {
  const { t } = useTranslation('profile');

  // ? Creating a ref on the file upload input. This is necessary in order to be able to hide the input itself, because an input with the 'file' type cannot be customized by design, and create a custom element that simulates the file upload input.

  // ? Создаем реф на инпут загрузки файла. Это нужно для того, чтобы иметь возможность скрыть сам инпут, потому что инпут с типом 'file' нельзя кастомизировать по дизайну, и нарисовать кастомный элемент, который имитирует инпут загрузки файла. 
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avaUrl, setAvaUrl] = useState<string | null>(auth.currentUser?.photoURL || null);

  // ? The method that we pass to the button that simulates the input of the file download. First we stop the default action. If there is a ref to a real input, then we initiate a click on it.

  // ? Метод, который мы вешаем на кнопку, которая имитирует инпут загрузки файла. Останавливаем действие по умолчанию. Если есть реф на настоящий инпут, то инициируем клик по нему.
  const handleFileUpload = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // ? We pass this method to the file upload input itself. We take the first downloaded file from event.target.files. If there is a file and a newPost has been passed to AddPostPopup component props, then we add the file to the selectedFile state.

  // ? Этот метод мы вешаем на сам инпут загрузки файла. Берем первый загруженный файл из event.target.files. Если есть file и пропсами пришел newPost, то складываем файл в стейт selectedFile. 
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