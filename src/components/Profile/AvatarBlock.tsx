import { ReactElement } from "react";
import Image from "next/image";
import Manatee from '../../../public/images/backgrounds/manatee.png';
import Camera from '../../../public/images/svgs/icons/camera.svg';
import TrashBin from '../../../public/images/svgs/icons/trashbin.svg';
import AvatarButton from "./AvatarButton";

const AvatarBlock: React.FC = (): ReactElement => {
  return (
    <div className="flex justify-center items-center mt-[20px]">
      <AvatarButton icon={<Camera />} text="Изменить" />
      <div className="w-[154px] h-[154px] relative rounded-full overflow-hidden mx-[133px]">
        <Image
          src={Manatee}
          alt="manatee"
          fill={true}
          objectFit="cover"
          objectPosition="center"
          className="rounded-full"
        />
      </div>
      <AvatarButton icon={<TrashBin />} text="Удалить" />
    </div>
  );
}

export default AvatarBlock;