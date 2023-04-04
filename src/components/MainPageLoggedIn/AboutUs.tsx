import { ReactElement } from "react";
import Image from "next/image";
import PlanetIcon from '../../../public/images/svgs/icons/planet.svg';
import { projectDescription } from '../../utils/consts';
import JellyFish from '../../../public/images/backgrounds/jellyfish.png';

const AboutUs: React.FC = (): ReactElement => {
  let arr = projectDescription.repeat(4).split('.');
  arr.pop();

  return (
    <div className="flex flex-col items-center mx-[65px] pt-[30px] mb-[96px]">
      <div className="flex flex-col items-start">
        <h2
          className="
            text-[#00265F]
            text-[32px]
            leading-[38px]
            font-oceanic-bold
            "
        >О нас</h2>
        <div className="flex flex-row justify-center mt-[32px]">
          <div
            className="
              grid
              grid-cols-2
              grid-rows-2
              gap-[30px]
              font-montserrat
              text-[18px]
              leading-[26px]
              text-[#00265F]
              font-normal"
          >
            {
              arr.map((paragraph, index) => {
                return (
                  <div key={index} className="max-w-[315px]">
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
          <Image width={671} src={JellyFish} alt="jellyfish" className="min-w-[671px] ml-[30px]"/>
        </div>
      </div>
    </div>
  )
}
export default AboutUs;