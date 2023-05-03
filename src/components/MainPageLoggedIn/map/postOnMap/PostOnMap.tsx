import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import DirtButton from "./DirtButton";

import Jungle from '../../../../../public/images/backgrounds/jungle.png';
import Manatee from '../../../../../public/images/backgrounds/manatee.png';
import SadSmile from '../../../../../public/images/svgs/icons/sadsmile.svg';
import CheerfulSmile from '../../../../../public/images/svgs/icons/cheerfulsmile.svg';

const PostOnMap: React.FC = (): ReactElement => {
  return (
    <div className="w-[334px] relative rounded-[10px] bg-white flex flex-col z-50">
      <div className="w-full h-[200px] relative">
        <Image src={Jungle} alt="jungle" fill className="rounded-[10px] object-cover object-center" />
      </div>
      <div className="px-[16px] pt-[32px] text-[#00265F] flex flex-col">
        <h3 className="text-[18px] leading-[22px] font-montserrat-bold">Крутая терраса</h3>
        <div className="flex flex-row justify-start items-center mt-[12px]">
          <Link href="/profile" className="w-[30px] h-[30px] relative rounded-full overflow-hidden">
            <Image
              src={Manatee}
              alt="manatee"
              fill
              className="rounded-full object-cover object-center"
            />
          </Link>
          <p className="font-montserrat font-semibold text-[16px] leading-[19.5px] ml-[8px]">Имя Фамилия</p>
        </div>
        <p className="font-montserrat text-[16px] leading-[19.5px] mt-[8px] mb-[16px]">Место отличное! Красиво, уютно, птички поют, Можно покормить обезьянок. Советую всем)</p>
        <div className="bg-[#F5F5F5] rounded-[10px] w-full flex flex-col">
          <p className="font-montserrat-bold text-[14px] leading-[17px] ml-[12px] mt-[12px]">Оцените место</p>
          <div className="w-full border-[#00265F] border-opacity-10 border-[0.5px] mt-[12px]"></div>
          <p className="font-montserrat text-[14px] leading-[17px] ml-[12px] mt-[8px]">Грязно?</p>
          <div className="flex flex-row justify-center w-full mt-[6px] mb-[15px] space-x-[14px]">
            <DirtButton smile={<SadSmile />} text="Да" />
            <DirtButton smile={<CheerfulSmile />} text="Нет" />
          </div>
        </div>
        <h4 className="font-montserrat font-semibold text-[14px] leading-[17px] my-[16px]">Комментарии (2)</h4>
        <h3 className="font-montserrat font-semibold text-[16px] leading-[19.5px]">Имя Фамилия</h3>
        <p className="font-montserrat text-[16px] leading-[19.5px] mt-[8px] mb-[16px]">Место отличное! Красиво, уютно, птички поют, Можно покормить обезьянок. Советую всем)</p>
        <div className="flex flex-row justify-start items-center mb-[24px]">
          <Link href="/profile" className="w-[30px] h-[30px] relative rounded-full overflow-hidden">
            <Image
              src={Manatee}
              alt="manatee"
              fill
              className="rounded-full object-cover object-center"
            />
          </Link>
          <p className="font-montserrat font-semibold text-[16px] leading-[19.5px] ml-[8px]">Добавьте комментарий...</p>
        </div>
      </div>
    </div>
  );
}

export default PostOnMap;