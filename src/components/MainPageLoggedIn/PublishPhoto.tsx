import { ReactElement } from 'react';
import BlueWave from '../../../public/images/backgrounds/bluewave.svg';

const PublishPhoto: React.FC = (): ReactElement => {
  return (
    <>
      <BlueWave className="w-full absolute top-0 left-0 z-10" />
      <div className="relative flex flex-row justify-between ml-[183px] mr-[243px] mt-[154px] z-20">
        <h2 className="font-oceanic-bold text-[52px] leading-[62px] text-white max-w-[440px]">BaliGreenMap</h2>
        <button
          type="button"
          className="
          h-[56px]
          w-[263px]
          bg-white
          rounded-[8px]
          font-montserrat
          text-[20px]
          leading-[24px]
          text-[#0D87FF]
          font-bold
          hover:transform 
          hover:scale-105 
          duration-300"
        >Опубликовать фото</button>
      </div>
    </>
  )
}

export default PublishPhoto;