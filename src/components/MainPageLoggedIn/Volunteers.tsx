import Image from "next/image";
import { ReactElement } from "react";
import { volunteersImages } from "@/utils/consts"; 

const Volunteers: React.FC = (): ReactElement => {
  return (
    <div className="w-full pl-[65px] pr-[70px] pb-[128px] mt-[-70px]">
      <h3 className="font-oceanic-bold text-[32px] leading-[38px] text-[#00265F]">Волонтеры</h3>
      <div className="flex justify-center mt-[50px]">
          <div className="grid grid-cols-3 grid-rows-2 gap-y-[35px] gap-x-[93px] max-w-[673px] align-bottom">
            {
              volunteersImages.map((image, index) => {
                return (
                  <div key={index} className="w-[175px] h-[130px] flex flex-col justify-end">
                    <Image src={image} alt='vol'/>
                  </div>
                )
              })
            }
          </div>
          <div className="flex flex-col ml-[183px] max-w-[553px] font-montserrat text-[20px] leading-[24px] text-[#00265F]">
            <p>Здесь какой-то текст про волонтерские организации. Откуда они взялись, по какому принципу работают, кому помогают.</p>
            <p className="mt-[40px]">Здесь какой-то текст про волонтерские организации. Откуда они взялись, по какому принципу работают, кому помогают.</p>
            <p className="mt-[40px]">Здесь какой-то текст про волонтерские организации. Откуда они взялись, по какому принципу работают, кому помогают.</p>
          </div>
      </div>
    </div>
  );
}

export default Volunteers;