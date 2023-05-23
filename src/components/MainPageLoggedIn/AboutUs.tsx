import { ReactElement } from "react";
import Image from "next/image";
import PlanetIcon from '../../../public/images/svgs/icons/planet.svg';
import { projectDescription } from '../../utils/consts';
import JellyFish from '../../../public/images/backgrounds/jellyfish.png';

const AboutUs: React.FC = (): ReactElement => {
  let arr = projectDescription.repeat(4).split('.');
  arr.pop();

  return (
    <div className="
    flex
    flex-col
    items-center
    1440px:mx-[152px]
    xl:mx-[100px]
    lg:mx-[50px]
    md:mx-[40px]
    sm:mx-[32px]
    mx-[20px]
    pt-[30px]
    mb-[96px]"
    >
      <div className="flex flex-col items-start">
        <h2
          className="
            text-[#00265F]
            lg:text-[32px]
            lg:leading-[38px]
            md:text-[28px]
            md:leading-[38px]
            sm:text-[22px]
            sm:leading-[26px]
            text-[18px]
            leading-[21px]
            font-oceanic-bold
            "
        >О нас</h2>
        <div className="flex xl:flex-row flex-col-reverse justify-center mt-[32px]">
          <div
            className="
              grid
              sm:grid-cols-2
              sm:grid-rows-2
              grid-rows-4
              grid-cols-1
              md:gap-[30px]
              sm:gap-[24px]
              gap-[16px]
              font-montserrat
              text-[18px]
              leading-[26px]
              text-[#00265F]
              font-normal"
          >
            {
              arr.map((paragraph, index) => {
                return (
                  <div key={index} className="sm:max-w-[315px]">
                    <div className="w-[32px] h-[32px] bg-gray-300 rounded-[8px] flex justify-center items-center">
                      <PlanetIcon />
                    </div>
                    <h3 className="font-oceanic-bold text-[#00265F] text-[20px] leading-[24px] mt-[15px]">Зеленая сторона Бали</h3>
                    <p className="mt-[8px] font-montserrat-normal text-[18px] leading-[23px]">{paragraph}</p>
                  </div>
                );
              })
            }
          </div>
          {/* <div className="1440px:min-w-[560px] xl:min-w-[500px] lg:min-w-[450px] ml-[30px] relative mb-[36px]">
            <Image src={JellyFish} alt="jellyfish" fill className="object-cover object-center rounded-[10px]"/>
          </div> */}
          <Image
            src={JellyFish}
            alt="jellyfish"
            className="
            lg:min-w-[450px]
            object-cover
            object-center
            rounded-[10px]
            xl:ml-[30px]
            xl:mb-0
            md:mb-[32px]
            sm:mb-[24px]
            mb-[16px]
            "
          />
        </div>
      </div>
    </div>
  )
}
export default AboutUs;