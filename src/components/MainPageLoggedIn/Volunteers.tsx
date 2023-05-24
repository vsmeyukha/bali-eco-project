import Image from "next/image";
import { ReactElement } from "react";
import { volunteersImages } from "@/utils/consts"; 

const Volunteers: React.FC = (): ReactElement => {
  return (
    <div
      className="
      w-full 
      1440px:px-[152px]
      xl:px-[100px]
      lg:px-[50px]
      md:px-[40px]
      sm:px-[32px]
      px-[20px]
      lg:pb-[128px]
      md:pb-[80px]
      sm:pb-[60px]
      pb-[40px]
      lg:mt-[-70px] 
      mt-[20px]"
    >
      <h3 className="font-oceanic-bold text-[32px] leading-[38px] text-[#00265F]">Волонтеры</h3>
      <div className="flex lg:flex-row flex-col justify-center mt-[50px]">
        <div
          className="
          w-full
          lg:grid
          lg:grid-cols-3
          lg:grid-rows-2
          lg:gap-y-[35px]
          1440px:gap-x-[93px]
          xl:gap-x-[50px]
          lg:gap-x-[30px]
          max-w-[673px]
          align-bottom
          flex
          flex-row
          justify-between
          overflow-x-auto
          lg:overflow-x-visible
          lg:space-x-0
          space-x-[32px]"
        >
            {
              volunteersImages.map((image, index) => {
                return (
                  <div
                    key={index}
                    className="
                    1440px:w-[175px]
                    1440px:h-[130px]
                    xl:w-[131px]
                    xl:h-[97px]
                    lg:w-[120px]
                    lg:h-[89px]
                    w-[160px]
                    h-[118px]
                    flex
                    flex-col
                    justify-end
                    relative
                    lg:shrink
                    shrink-0"
                  >
                    <Image src={image} alt='vol' fill className="object-contain"/>
                  </div>
                )
              })
            }
          </div>
        <div
          className="
          w-full
          flex
          flex-col
          items-center
          lg:ml-[98px]
          xl:ml-[113px]
          1440px:ml-[133px]
          lg:mt-0
          mt-[40px]
          font-montserrat
          text-[20px]
          leading-[24px]
          text-[#00265F]"
        >
            <p>Здесь какой-то текст про волонтерские организации. Откуда они взялись, по какому принципу работают, кому помогают.</p>
            <p className="lg:mt-[40px] md:mt-[30px] sm:mt-[20px] mt-[16px]">Здесь какой-то текст про волонтерские организации. Откуда они взялись, по какому принципу работают, кому помогают.</p>
            <p className="lg:mt-[40px] md:mt-[30px] sm:mt-[20px] mt-[16px]">Здесь какой-то текст про волонтерские организации. Откуда они взялись, по какому принципу работают, кому помогают.</p>
          </div>
      </div>
    </div>
  );
}

export default Volunteers;