import Image from "next/image";
import { ReactElement } from "react";
import { volunteersImages } from "@/utils/consts"; 

const Volunteers: React.FC = (): ReactElement => {
  return (
    <div className="w-full 1440px:px-[152px] xl:px-[100px] lg:px-[50px] pb-[128px] mt-[-70px]">
      <h3 className="font-oceanic-bold text-[32px] leading-[38px] text-[#00265F]">Волонтеры</h3>
      <div className="flex justify-center mt-[50px]">
        <div
          className="
          w-full
          grid
          grid-cols-3
          grid-rows-2
          gap-y-[35px]
          1440px:gap-x-[93px]
          xl:gap-x-[50px]
          lg:gap-x-[30px]
          max-w-[673px]
          align-bottom"
        >
            {
              volunteersImages.map((image, index) => {
                return (
                  <div key={index} className="1440px:w-[175px] 1440px:h-[130px] xl:w-[131px] xl:h-[97px] flex flex-col justify-end relative">
                    <Image src={image} alt='vol' fill className="object-contain"/>
                  </div>
                )
              })
            }
          </div>
          <div className="flex flex-col ml-[113px] max-w-[553px] font-montserrat text-[20px] leading-[24px] text-[#00265F]">
            <p>Здесь какой-то текст про волонтерские организации. Откуда они взялись, по какому принципу работают, кому помогают.</p>
            <p className="mt-[40px]">Здесь какой-то текст про волонтерские организации. Откуда они взялись, по какому принципу работают, кому помогают.</p>
            <p className="mt-[40px]">Здесь какой-то текст про волонтерские организации. Откуда они взялись, по какому принципу работают, кому помогают.</p>
          </div>
      </div>
    </div>
  );
}

export default Volunteers;